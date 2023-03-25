from flask import Flask
from APIs import APIEndPoint
from flask import Flask
from flask_cors import CORS
import os

app = Flask(__name__)

# CORS configuration
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# Secret keys
app.secret_key = 'bakai'
secret_key = os.environ.get('SECRET_KEY') or 'hard-to-guess-string'
APIEndPoint(app)
if __name__ == "__main__":
    app.run(debug=True)