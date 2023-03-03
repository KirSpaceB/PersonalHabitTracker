from flask import Flask, request,jsonify,redirect, url_for,render_template
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

@app.route('/user-auth', methods=["POST"])
def authenticate_user():

    DB = mysql.connector.connect(
        user="root",
        password="ManOfSorrows1!",
        host="localhost",
        database="habit_tracker_users" #Species what tb to use when creating tables etc.
    )
    loginInfo = request.get_json()
    print(loginInfo)


    sqlCursor = DB.cursor()
    #SQL command to execute
    checkForUser = ("SELECT * FROM users")
    #Execute query
    sqlCursor.execute(checkForUser)
    #Fetches all the selected users in the DB
    results = sqlCursor.fetchall()

    for row in results:
        print('testicles')
        if row[0] == loginInfo['userName'] and row[1] == loginInfo['password']:
            print('user is in')
            return jsonify({'message':'success'})
        else:
            print('login failed')
            return jsonify({'message':'failed'})
        #This conditional works but, I want it to redirect the user to a different react component changing the ui 

    return
    
@app.route('/HabitTracker/Home')
def redirectToReactComponent():
    return render_template('HabitTracker/Home.html')

if __name__ == "__main__":
    app.run(debug=True)
