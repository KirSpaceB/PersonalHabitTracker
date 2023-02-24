import mysql.connector
from flask import Flask,request,jsonify
from flask_cors import CORS
#Initialize the flask application
app = Flask(__name__)
CORS(app)

# This will host the DB server

#Define endpoint that handles post requests
@app.route("/database", methods=["POST"])
def connect():
    #Review multi threading problem
    #Ecapsulate this variable
    DB = mysql.connector.connect(
        user="root",
        password="ManOfSorrows1!",
        host="localhost",
        database="testdb" #Species what tb to use when creating tables etc.
    )
    
    # Cursor allows us to communitcate the backend with the DB
    mycursor = DB.cursor()

    #Retrieve JSON data
    data=request.get_json() # returns hashmap
    #extract the data you want to insert into database
    print(data)

    try:
        text = data[0]['text']#From React
        count = data[0]['count'] #passing undefined to sql query causing error
        

        sql = "INSERT INTO users_habit (user_habit,user_count) VALUES (%s, %s);"
        val=(text,count)
        mycursor.execute(sql,val)
        DB.commit()
        return jsonify({'Message': 'Sent data successfully'}), 200
    except: 
        return 'Bad Request', 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001)