import os
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()
API_KEY = os.getenv("Antropic_API_KEY")
client = Anthropic(api_key=API_KEY)


def claude(x, system):
    message = client.messages.create(
        model="claude-3-haiku-20240307",
        max_tokens=1555,
        temperature=1,
        system=system,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": x
                    }
                ]
            }
        ]
    )
    return message.content[0].text

