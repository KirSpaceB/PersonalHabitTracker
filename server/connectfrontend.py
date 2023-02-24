from flask import Flask,request,jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
#Define an endpoint that handles post request, becuase the frontend method is using "POST"
@app.route("/connect", methods=['POST']) #Post is the request
def connect():
    #Retreive JSON data from the request
    data = request.get_json()
    #Send success method
    print(data)
    return data # We need to use jsonify to turn our python code to JSON code for JS to read

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
