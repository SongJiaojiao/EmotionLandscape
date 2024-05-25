from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from utils import claude
from prompt import preprocess, analyze, distortedThoughts
from dotenv import load_dotenv
import pathlib
import os
from reframe import help_identify
import logging

load_dotenv()  


def process_emotions_and_actions(emotions, valences, arousals, recommended_actions, added_actions):
    def add_action_if_not_added(name, tag):
        if name not in added_actions:
            recommended_actions.append({"name": name, "tag": tag})
            added_actions.append(name)

    for i in range(len(emotions)):
        valence = valences[i]
        arousal = arousals[i]

        if arousal >= 5 and valence >= 5:
            add_action_if_not_added("Name one thing you are grateful", "Expanding")
            add_action_if_not_added("Share with a friend", "Expanding")
        elif arousal <= -1 and valence >= 5:
            add_action_if_not_added("Write a goal", "Exploring")
        elif arousal >= 5 and valence <= -1:
            add_action_if_not_added("Down regulating breath work", "Grounding")
            add_action_if_not_added("Listen to a calming song", "Grounding")
        elif arousal <= -1 and valence <= -1:
            add_action_if_not_added("Up regulating breath work", "Elevating")
            add_action_if_not_added("Listen to upbeat music", "Elevating")
            
            
def create_app():
    web_app = Flask(__name__)
    CORS(web_app)
    
    # logging.basicConfig(level=logging.DEBUG)
    # logger = logging.getLogger(__name__)
    
    # openai_api_key = os.getenv("OPENAI_API_KEY")
    # anthropic_api_key = os.getenv("ANTHROPIC_API_KEY")
    # logger.debug(f"OPENAI_API_KEY: {openai_api_key}")
    # logger.debug(f"ANTHROPIC_API_KEY: {anthropic_api_key}")

    volume_mount_path = pathlib.Path(os.getenv("VOLUME_PATH", "vol"))

    if not volume_mount_path.exists():
        print(f"Creating directory: {volume_mount_path}")
        volume_mount_path.mkdir(parents=True, exist_ok=True)

    @web_app.route('/')
    def home():
        return 'Hello, World!'

    @web_app.route("/save_transcript", methods=["POST"])
    def save_transcript():
        data = request.get_json()
        transcript = data["transcript"]
        timestamp = data["timestamp"]
        analysis = claude(transcript, system=analyze)
        response = claude(transcript, system=preprocess)
        distorted = claude(transcript, system=distortedThoughts)
        print ('response',response)
        cleaned_response = response.split("\n")
        cleaned_response = [line.strip() for line in cleaned_response if line.startswith("[") and line.endswith("]")]
        cleaned_response = "\n".join(cleaned_response)
        emotions, valences, arousals, themes = cleaned_response.split("\n")
        emotions, valences, arousals, themes = eval(emotions), eval(valences), eval(arousals), eval(themes)

        recommended_actions = []
        added_actions = []
        if distorted == 'True':
            identifiedDistortions = help_identify(transcript)
            recommended_actions = [{"name": "Reframe your thoughts", "tag": "Grounding"}]
        else:
            identifiedDistortions = None

        process_emotions_and_actions(emotions, valences, arousals, recommended_actions, added_actions)

        with open(volume_mount_path / "transcripts.jsonl", "a") as file:
            response_out = {
                "transcript": transcript,
                "analysis": analysis,
                "emotions": emotions,
                "valence": valences,
                "arousal": arousals,
                "themes": themes,
                "timestamp": timestamp,
                "recommendedActions": recommended_actions,
                "distorted": distorted,
                "identifiedDistortions": identifiedDistortions
            }
            json.dump(response_out, file)
            file.write("\n")

        return jsonify(response_out)

    @web_app.route("/get_transcripts")
    def get_transcripts():
        with open(volume_mount_path / "transcripts.jsonl", "r") as file:
            last_line = None
            for line in file:
                if line.strip():
                    last_line = json.loads(line)
            transcripts = [last_line] if last_line else []
        return jsonify(transcripts)

    return web_app

if __name__ == "__main__":
    app = create_app()
    port = int(os.getenv("PORT", 5001))  # Default to port 5001 if PORT is not set
    app.run(host="0.0.0.0", port=port)
