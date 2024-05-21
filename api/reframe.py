import openai
from http import HTTPStatus
from dotenv import load_dotenv
from http import HTTPStatus
import os

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
openai.api_key = api_key

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
                {"role": "system", "content": f"Identify cognitive distortions in the users' input. Please select no more than 3 that are applicable from: {', '.join(cognitive_distortions)}, rank them by relevancy."},
                {"role": "user", "content": transcript}
            ]
        )
        
        generated_distortions = [distortion for distortion in cognitive_distortions if distortion.lower() in completion.choices[0].message.content.lower()]
        print('generated_distortions', generated_distortions)
        
        explain_prompt = f"Give a very short explanation about why {transcript} demonstrates {generated_distortions}. Start your sentence with 'It seems like you are experiencing...' Explain why the user's input is demonstrating the distorted thoughts. Make sure you cover all the distorted thoughts. Do not give generic answers; be profound. Limit the response to 400 characters. A good example is: Seems like you are experiencing Catastrophizing, All-or-nothing, and Labeling. You are imagining the worst case scenario: not achieving anything in the next 6 months. You are overgeneralizing that your success solely based on achieving something significant in the next six months, without considering other aspects of your life. By labeling yourself as a failure if you don't achieve something within a specific timeframe, you're ignoring your strengths and successes."
    
        explain_completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": explain_prompt},
                {"role": "user", "content": "explain to me"}
            ]
        )
        explanation = explain_completion.choices[0].message.content

        print(f'explanation: ', explanation)
        return {"distortions": generated_distortions, "explanation": explanation}
    
    except Exception as e:
        return {"error": f"Unexpected Error: {e}"}, HTTPStatus.INTERNAL_SERVER_ERROR
    
async def help_challenge(transcript):

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

def help_reframe(transcript):

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
