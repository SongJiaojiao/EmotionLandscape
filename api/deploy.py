from modal import Image, App, wsgi_app, Volume, Secret
from app import create_app
import pathlib

app = App("emotion-detection-api")  # Note: prior to April 2024, "app" was called "stub"
image = Image.debian_slim().pip_install("flask", "anthropic", "flask-cors", "openai", "python-dotenv")
volume = Volume.from_name("transcript-volume")
volume_mount_path = pathlib.Path("/vol")

@app.function(image=image, volumes={"/vol": volume}, secrets=[
    Secret.from_name("my-openai-secret"),
    Secret.from_name("my-anthropic-secret")
])
@wsgi_app()
def flask_app():
    web_app = create_app()
    return web_app
