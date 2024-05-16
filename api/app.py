from flask import Flask, request, jsonify
from flask_cors import CORS
import json

from utils import claude
from prompt import preprocess, fix

app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/about')
def about():
    return 'About'


@app.route("/save_transcript", methods=["POST"])
def save_transcript():
    print ('called')
    data = request.get_json()
    transcript = data["transcript"]
    timestamp = data["timestamp"]
    analysis = claude(transcript, system=fix)
    response = claude(transcript, system=preprocess)
    emotions, valences, arousals, themes= response.split("\n")
    emotions, valences, arousals, themes = eval(emotions), eval(valences), eval(arousals), eval(themes)


    recommended_actions = []
    added_actions = []

    def add_action_if_not_added(name, tag):
        nonlocal recommended_actions, added_actions
        if name not in added_actions:
            recommended_actions.append({"name": name, "tag": tag})
            added_actions.append(name)

    for i in range(len(emotions)):
        valence = valences[i]
        arousal = arousals[i]

        if arousal >= 6 and valence >= 6:
            add_action_if_not_added("Name one thing you are grateful", "Expanding")
            add_action_if_not_added("Share with a friend", "Expanding")
        elif arousal <= -2 and valence >= 6:
            add_action_if_not_added("Write a goal", "Exploring")
        elif arousal >= 6 and valence <= -2:
            add_action_if_not_added("Down regulating breath work", "Grounding")
            add_action_if_not_added("Listen to a calming song", "Grounding")
        elif arousal <= -2 and valence <= -2:
            add_action_if_not_added("Up regulating breath work", "Elevating")
            add_action_if_not_added("Listen to upbeat music", "Elevating")



    with open("transcripts.jsonl", "a") as file:
        response_out = {
            "transcript": transcript, 
            "analysis":analysis,
            "emotions": emotions,
            "valence": valences,
            "arousal": arousals,
            "themes": themes,
            "timestamp": timestamp,
            "recommendedActions":recommended_actions
            
        }
        json.dump(response_out, file)
        file.write("\n")

    print(response_out)
    return jsonify(response_out)

# @app.route("/get_transcripts")
# def get_transcripts():
#     with open("transcripts.jsonl", "r") as file:
#         # Reading all lines and converting each line back to dictionary
#         transcripts = [json.loads(line) for line in file if line.strip()]
#         print (transcripts)
#     return jsonify(transcripts)

@app.route("/get_transcripts")
def get_transcripts():
    with open("transcripts.jsonl", "r") as file:
        # Reading the last line and converting it to a dictionary
        last_line = None
        for line in file:
            if line.strip():
                last_line = json.loads(line)
        # Creating a list with the last line
        transcripts = [last_line] if last_line else []
    return jsonify(transcripts)



if __name__ == "__main__":
    app.run()




