from flask import Flask, request,jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

@app.route('/user-signup', methods=["POST"])
def signup_db():
    #data from Signup page turn to json object
    data=request.get_json()
    print(data)

    DB = mysql.connector.connect(
        user="root",
        password="ManOfSorrows1!",
        host="localhost",
        database="habit_tracker_users" #Species what tb to use when creating tables etc.
    )
    #Allows us to execute sql code in python
    sqlCursor = DB.cursor()

    #Set pointer to 
    userName = data['userName']
    passWord = data['password']
    email = data['email']

    userAccount = (userName,passWord,email)

    sqlInsertUserName = "INSERT INTO users (user_name,password,email) VALUES (%s,%s,%s)"

    sqlCursor.execute(sqlInsertUserName, userAccount)
    sqlCursor.execute(sqlInsertUserName, (userName, passWord, email))

    DB.commit()

    return {"message": "Successfully Registered"}

@app.route('/user-auth', methods=["GET"])
def authenticate_user():

    DB = mysql.connector.connect(
        user="root",
        password="ManOfSorrows1!",
        host="localhost",
        database="habit_tracker_users" #Species what tb to use when creating tables etc.
    )
    
    sqlCursor = DB.cursor()

    query = ("SELECT * FROM users")

    sqlCursor.execute(query)

    results = sqlCursor.fetchall()

    print(results)
    for result in results:
        print(result)
    return results
    


if __name__ == "__main__":
    app.run()
