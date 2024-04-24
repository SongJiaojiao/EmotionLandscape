from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI()
user_input = "Ted did not respond to me. I am worried he is annoyed at me. "


def generate_challenge():
    try:

        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Reframe users's thoughts into a positive one using `I`,Try to make this relatable and encourage. End with a emoji. Limit the response within 300 characters. Leave out the sensitive details."},
                {"role": "user", "content": user_input}
            ]
        )
        
        # Return the generated challenge text
        return ({"challenge": completion.choices[0].message.content})
    
    except Exception as e:
        return ({"error": f"Unexpected Error: {e}"}), 500

print (generate_challenge())
