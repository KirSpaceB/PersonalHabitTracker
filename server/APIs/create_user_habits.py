from colorama import Fore
from flask import Blueprint, jsonify, request
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
    dataFromPostRequest = request.get_json()
    print(Fore.RED, 'Line 19 dataFromPostRequest', dataFromPostRequest)

    user_id = dataFromPostRequest['user_id'];

    for habit in dataFromPostRequest['habits']:
        habitFromRequest = habit['text'];
        countFromRequest = habit['count'];

        select_habit_query = 'SELECT * FROM users_habits WHERE user_id = %s AND user_habit = %s'
        existing_habit = DB.fetch_one(select_habit_query, (user_id, habitFromRequest))
            # If the habit already exists, return an error message
        if existing_habit:
            return jsonify({'message': f'cannot add multiple of the same habit: {habitFromRequest}'}),400
        
        valPassedToInsertQuery = (user_id, habitFromRequest, countFromRequest)
        try:
            DB.execute_insert_query('INSERT INTO users_habits (user_id, user_habit, habit_count) VALUES (%s, %s, %s)', valPassedToInsertQuery)
        except Exception as e:
            print('Failed to insert habit:', e),400
    return jsonify({'Message': 'Successfully Executed Line 33'}), 200