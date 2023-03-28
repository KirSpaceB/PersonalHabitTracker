from flask import Blueprint, request,jsonify
import json
from Database import InstantiateDatabase
delete_user_habit_blueprint = Blueprint('delete_user_habit',__name__)
@delete_user_habit_blueprint.route('/delete_user_habit', methods=['DELETE'])
def delete_habit_logic():
    try:
        DB = InstantiateDatabase(
            user='root',
            password='ManOfSorrows1!',
            host='localhost',
            database='habit_tracker_users'
        )
    except:
        return jsonify({'message':'DB is not working in delete_user_habit'})
    
    values_sent_to_delete_user_habit_backend = request.args.get('valuesSentToDeleteUserHabitBackend')

    if values_sent_to_delete_user_habit_backend:
        values_sent_to_delete_user_habit_backend = json.loads(values_sent_to_delete_user_habit_backend)

    print(values_sent_to_delete_user_habit_backend)
    delete_habit_query = f"DELETE FROM users_habits WHERE user_id = %s AND user_habit = %s"
    user_id = values_sent_to_delete_user_habit_backend['user_id']
    habit = values_sent_to_delete_user_habit_backend['habitGoingToBeDelete']['user_habit']
    valuesToDeleteFromTable = (user_id,habit)
    DB.execute_insert_query(delete_habit_query,valuesToDeleteFromTable)
    return jsonify({'message':'Sucessfully fetched delete_user_habit'}),200

