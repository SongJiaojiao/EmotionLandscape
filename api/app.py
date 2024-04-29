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
    

    transcript = claude(transcript, system=fix)
    response = claude(transcript, system=preprocess)
    print("Raw response:", repr(response))
    emotions, valence, arousal, themes= response.split("\n")
    emotions, valence, arousal, themes = eval(emotions), eval(valence), eval(arousal), eval(themes)
    print(emotions, valence, arousal)


    with open("transcripts.jsonl", "a") as file:
        response_out = {
            "transcript": transcript, 
            "emotions": emotions,
            "valence": valence,
            "arousal": arousal,
            "themes": themes,
            "timestamp": timestamp,
        }
        json.dump(response_out, file)
        file.write("\n")

    print(response_out)
    return jsonify(response_out)

if __name__ == "__main__":
    app.run()
