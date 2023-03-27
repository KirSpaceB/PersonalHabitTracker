import json
from colorama import Fore
from flask import Blueprint, jsonify, request
import jwt
from Database import InstantiateDatabase

user_auth_blueprint = Blueprint('user_auth', __name__)
@user_auth_blueprint.route('/user-auth', methods=['POST', 'GET'])
def authenticate_user():
    print('User-auth is working line 10 in user_Auth')
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
            return ({'message':'return statement in try-catch line 28'}), 400
        
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
        
        #Guard clause
        if 'user_id' not in decode_jwt:
            return jsonify({'message':'user_id is not in token'}), 404
        #Query to check for users_id
        selectUserIdFromHabitTable = DB.execute_query('SELECT user_id FROM users_habits')

        #This for loop matches the user session_id to the actual user in the database
        for (users,) in selectUserIdFromHabitTable:

            if decode_jwt['user_id'] == users:
                # We create a select query to get the data from the table
                selectUserHabitInfoFromHabitTable = DB.execute_query('SELECT user_id, user_habit, habit_count FROM users_habits')
                print(Fore.BLUE, "Query that slects UserHabitsFromTable", selectUserHabitInfoFromHabitTable)

            habits_set = set()

            for (users_id, user_habit, habit_count) in selectUserHabitInfoFromHabitTable:
                if decode_jwt['user_id'] == users_id:
                    habits_set.add((user_habit, habit_count))
            habits_list = [{'user_habit': user_habit, 'habit_count': habit_count} for user_habit, habit_count in habits_set]
            return jsonify({'habits': habits_list})
        return jsonify({'message':'For loop in get request was not hit'})
    return jsonify({'message':'could not reach get or post request'})