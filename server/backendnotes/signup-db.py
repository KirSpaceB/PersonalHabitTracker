from flask import Flask, make_response, request,jsonify,session
import random
from flask_cors import CORS
import jwt
from datetime import datetime, timedelta
import os
import json
from colorama import init
from colorama import Fore, Back, Style
from Database import InstantiateDatabase

init()
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True) # This allows CORS to accept all websites
app.secret_key = 'bakai'
secret_key = os.environ.get('SECRET_KEY') or 'hard-to-guess-string'
#Creates new user up signup
@app.route('/user-signup', methods=['POST'])
def signup_db():
    #data from Signup page turn to json object
    data=request.get_json()
    try:
        DB = InstantiateDatabase(
            user='root',
            password='ManOfSorrows1!',
            host='localhost',
            database='habit_tracker_users'
        )
    except:
        return jsonify({'message':'Someting went wrong in the user-signup endpoint'})

    #Set pointer to 
    userName = data['userName']
    password = data['password']

    userAccount = (userName,password)

    sqlInsertUserName = "INSERT INTO users (user_name,password) VALUES (%s,%s)"

    DB.execute_insert_query(sqlInsertUserName,userAccount)

    return {"message": "Successfully Registered"}
#Create seperate files for each class(put in own folder)
#Create a script that checks the files in the queries folder and look for specifc queries to execute base on needed functionality
#This decorator function needs a function exactly below it
@app.route("/user-auth", methods=["POST", "GET"])
def authenticate_user():
    print('User-auth is working')
    try:
        DB = InstantiateDatabase(
            user='root',
            password='ManOfSorrows1!',
            host='localhost',
            database='habit_tracker_users'
        )
    except:
        return jsonify({'message':'user-auth failed to connect to db'})
    selectAllFromUsersTable = DB.execute_query('SELECT * FROM users')
    #When user tries and logins in
    if request.method == "POST":
        try:
            loginInfo = request.get_json() # GET REQUEST DONT HAVE A BODY AND GET_JSON GETS FROM THE BODY AKA ANY REQUEST THAT HAS A BODY(POST)
            print(Fore.GREEN, "loginInfo", loginInfo)
        except:
            print('invalid request')
            return ({'message':'return statement in try-catch line 66'}), 400
        
        for row in selectAllFromUsersTable:
            print(row)
            if row[1] == loginInfo['userName'] and row[2] == loginInfo['password']:
                user_id = row[0]
                token = jwt.encode(
                    {'user_id':user_id}, 'SECRET_KEY', algorithm='HS256'
                )
                return jsonify({'token':token})
        return jsonify({'message':'POST request conditional was not hit'})
    #Flask automatically gives cookie for each new session because they are two seperate requests it will lead to different(This was a bug still do not know why this was the case)
    #Gets user_habit depending on user_id
    if request.method == "GET":
        auth_header = request.headers.get('Authorization')
        auth_dict = json.loads(auth_header.replace('Bearer', '').strip())
        token = auth_dict['token']
        decode_jwt = jwt.decode(token, 'SECRET_KEY', algorithms=['HS256'])
        print(Fore.GREEN, 'Decoding request in GET request', decode_jwt)
        
        #Guard clause
        if 'user_id' not in decode_jwt:
            return jsonify({'message':'user_id is not in token'}), 404
        #Query to check for users_id
        selectUserIdFromHabitTable = DB.execute_query('SELECT user_id FROM users_habits')

        print(Fore.GREEN, "Query to get all userID from the habits table", selectUserIdFromHabitTable)
        #This for loop matches the user session_id to the actual user in the database
        for (users,) in selectUserIdFromHabitTable:
            if decode_jwt['user_id'] != users:
                return jsonify({'message':'Went wrong with matching decoded_jwt to user id line 96'})
            # We create a select query to get the data from the table
            selectUserHabitInfoFromHabitTable = DB.execute_query('SELECT user_id, user_habit, habit_count FROM users_habits')
            #Create handling to make sure frontend is not sending an empty array
            for (users_id, user_habit, habit_count) in selectUserHabitInfoFromHabitTable:
                if decode_jwt['user_id'] != users_id:
                    return jsonify({'message':'Went wrong with matching decoded_jwt to user id line 103'})
                return jsonify({'habits': [
                    {
                    'user_habit':user_habit,
                    'habit_count':habit_count
                    }
                ]})
        return jsonify({'message':'For loop in get request was not hit'})
    return jsonify({'message':'could not reach get or post request'})

@app.route("/createUserHabits", methods=["POST", "GET"])
def connect():
    print(Fore.GREEN + 'createUserHabitsEndPoint is working')
    try:
        DB = InstantiateDatabase(
            user='root',
            password='ManOfSorrows1!',
            host='localhost',
            database='habit_tracker_users'
        )
    except:
        return {'message':'Could not instantiate database in createUserHabits endpoint'}, 400
    #Part GET Request logic
    userIdFromJwtToken = None
    if request.method == "GET":
        try:
            createUserHabitsHeader = request.headers.get('Authorization')
            createUserHabitsHeaderDict = json.loads(createUserHabitsHeader.replace('Bearer', '').strip())
            token = createUserHabitsHeaderDict['token']
            userIdFromJwtToken = jwt.decode(token, 'SECRET_KEY', algorithms=['HS256'])
            print(Fore.RED, 'Decoded Token in createUserHabitsHeader', userIdFromJwtToken)
        except:
            return jsonify({'message':'GET request failed in createUserHabits'}), 400

    selectAllUsersHabitsQuery = DB.execute_query('SELECT * FROM users_habits')
    print(Fore.RED, 'Query in createUserHabitsHeader', selectAllUsersHabitsQuery)

    if request.method == "POST":
        for tupleItems in selectAllUsersHabitsQuery:
            print(Fore.RED, 'user_id in for loop', tupleItems[0])
            print(Fore.RED, 'Query in createUserHabitsHeader', userIdFromJwtToken)

            if userIdFromJwtToken != tupleItems[0]:
                return jsonify({'message':'something went wrong in for loop line 140'}), 400
            dataFromPostRequest = request.get_json()
            print(Fore.RED,'Line 148 dataFromPostRequest',dataFromPostRequest)
            habitFromRequest = dataFromPostRequest['habits'][0]['text']
            countFromRequest = dataFromPostRequest['habits'][0]['count']
            valPassedToInsertQuery = (habitFromRequest,countFromRequest)
            DB.execute_insert_query('INSERT INTO users_habits (user_habit,habit_count) VALUES (%s,%s)',valPassedToInsertQuery)
            return jsonify({'Message': 'Successfully Executed Post Request'}), 200
    return jsonify({'message':'Something went wrong with createUserHabits'}), 400
if __name__ == "__main__":
    app.run(debug=True)