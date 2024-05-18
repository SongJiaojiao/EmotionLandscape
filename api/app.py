from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from openai import OpenAI
from utils import claude
from prompt import preprocess, fix, distortedThoughts
from dotenv import load_dotenv
import os
from http import HTTPStatus


load_dotenv()

app = Flask(__name__)
CORS(app)

client = OpenAI()


cognitive_distortions = [
    "All-or-nothing thinking",
    "Overgeneralization",
    "Mental filter",
    "Disqualifying the positive",
    "Jumping to conclusions",
    "Emotional reasoning",
    "Should statements",
    "Labeling",
    "Personalization",
     "Catastrophizing"
]


def help_identify(transcript):
    try:
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": f"Identify cognitive distortions in the users' input. Please select no more than 3 that are applicable  from: {', '.join(cognitive_distortions)}, rank them by relevancy."},
                {"role": "user", "content": transcript}
            ]
        )
        
        generated_distortions = [distortion for distortion in cognitive_distortions if distortion.lower() in completion.choices[0].message.content.lower()]
        print ('generated_distortions',generated_distortions)
        
        explain_prompt = f"Give a very short explaination about why {transcript} demonstrates {generated_distortions}. Start your sentence with it seems like you are experiencing... explain why user's input is demonstrating the distorted thoughts. make sure you cover all the distorted thoughts. Do not give generic answer, be profound. limit the response into 400 characters.A good example is: Seems like you are experience Catastrophzing, All-or-nothing, and Labelling. You are imagining the worst case scenario: not achieving anything in the next 6 months. You are overgeneralizing that your success solely based on achieving something significant in the next six months, without considering other aspects of your life. By labeling yourself as a failure if you don't achieve something within a specific timeframe, you're ignoring your strengths and successes."
    
        explain_completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": explain_prompt},
                {"role": "user", "content": "explain to me"}
            ]
        )
        explanation = explain_completion.choices[0].message.content

        print(f'explanation: ', explanation)
        return {"distortions": generated_distortions,"explanation":explanation} 
    
    except Exception as e:
        return {"error": f"Unexpected Error: {e}"}, HTTPStatus.INTERNAL_SERVER_ERROR
    
    
@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/test')
def test():
    return ('testtest')


@app.route("/save_transcript", methods=["POST"])
def save_transcript():
    print ('called')
    data = request.get_json()
    transcript = data["transcript"]
    timestamp = data["timestamp"]
    analysis = claude(transcript, system=fix)
    response = claude(transcript, system=preprocess)
    distorted = claude(transcript,system=distortedThoughts)
    emotions, valences, arousals, themes= response.split("\n")
    emotions, valences, arousals, themes = eval(emotions), eval(valences), eval(arousals), eval(themes)
    
    recommended_actions = []
    added_actions = []
    if distorted == 'True':
        identifiedDistortions = help_identify(transcript)
        recommended_actions = [{"name": "Reframe your thoughts", "tag": "Grounding"}]
    else:
        identifiedDistortions = None
    



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
            "recommendedActions":recommended_actions,
            "distorted":distorted,
            "identifiedDistortions":identifiedDistortions
            
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



@app.route("/helpReframe",methods=["POST"])
def help_reframe():
    data = request.get_json()
    transcript = data["transcript"]
    try:
        
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": f"Imagine you are the user and are having a negative thought: {transcript}. Reframe this thought into a positive on using Cognitive Reframe. You must use first person tone'I'. Limit in 300 characters. Leave out sensitive details.Add an emoji at the end."},
                {"role": "user", "content": transcript}
            ]
        )
        
        generated_reframe = completion.choices[0].message.content
        print(f'generated_reframe: {generated_reframe}' )
        return {"generated_reframe": generated_reframe}
    
    except Exception as e:
        return {"error": f"Unexpected Error: {e}"}, HTTPStatus.INTERNAL_SERVER_ERROR



@app.route("/helpChallenge",methods=["POST"])
async def help_challenge():
    data = request.get_json()
    transcript = data["transcript"]
    try:
       
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", 
                 "content": f"Imagine you are the user and are having a negative thought: {transcript}.Ask only one question to challenge my thought using 'I'or'me'. The question should be based on CBT methodologies. Use a very calm and warm tone. You question should be succinct and focue on one point at a time. Use first person tone.  A example tone is: Is there any evidence that failing this will prevent me from graduating?"},
                {"role": "user", "content": transcript}
            ]
        )
        
        print(f'response help_challenge: {completion}')
        
        generated_challenge = completion.choices[0].message.content
        print(f'generated_challenge: {generated_challenge}')
        return {"challenge": generated_challenge}
    
    except Exception as e:
        return {"error": f"Unexpected Error: {e}"}, HTTPStatus.INTERNAL_SERVER_ERROR


if __name__ == "__main__":
    app.run()




