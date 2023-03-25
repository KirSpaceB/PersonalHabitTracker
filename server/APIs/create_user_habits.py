import json
from colorama import Fore
from flask import Blueprint, jsonify, request
import jwt
from Database import InstantiateDatabase

create_user_habits_blueprint = Blueprint('create_user_habits', __name__)
@create_user_habits_blueprint.route('/createUserHabits',methods=["POST", "GET"])
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
            print(Fore.RED, 'userIdFromJwtToken in createUserHabitsHeader', userIdFromJwtToken)

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