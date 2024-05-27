from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from utils import claude
from prompt import preprocess, analyze, distortedThoughts
from dotenv import load_dotenv
import pathlib
import os
import logging
from supabase import create_client, Client

load_dotenv()  
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def write_to_supabase(response_out):
    try:
        response = supabase.table('Unlogged Data').insert(response_out).execute()
        if response.data:
            logging.info("Data successfully inserted into Supabase")
            return True
        else:
            logging.error(f"Error inserting into Supabase: {response}")
            return False
    except Exception as e:
        logging.exception("Exception occurred while inserting into Supabase")

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
        print ('cleanedresponse',cleaned_response)
        emotions, valences, arousals, themes = cleaned_response.split("\n")
        emotions, valences, arousals, themes = eval(emotions), eval(valences), eval(arousals), eval(themes)

        recommended_actions = []
        added_actions = []
        if distorted == 'True':
            recommended_actions = [{"name": "Reframe your thoughts", "tag": "Grounding"}]


        process_emotions_and_actions(emotions, valences, arousals, recommended_actions, added_actions)
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
            }
        
        if write_to_supabase(response_out):
            return jsonify(response_out), 201
        else:
            return jsonify({"error": "Failed to insert data into Supabase"}), 500


    @web_app.route("/get_transcripts")
    def get_transcripts():
        try:
            response = supabase.table('Unlogged Data').select('*').order('timestamp', desc=True).limit(1).execute()
            if response.data:
                transcripts = response.data
                return jsonify(transcripts)
            else:
                logging.error(f"Error fetching transcripts from Supabase: {response}")
                return jsonify({"error": "Failed to fetch transcripts from Supabase"}), 500
        except Exception as e:
            logging.exception("Exception occurred while fetching transcripts from Supabase")
            return jsonify({"error": "An error occurred while fetching transcripts"}), 500


    return web_app

if __name__ == "__main__":
    app = create_app()
    port = int(os.getenv("PORT", 5001)) 
    app.run(host="0.0.0.0", port=port)
