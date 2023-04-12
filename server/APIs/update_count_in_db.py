from flask import Blueprint, jsonify, request
from Database import InstantiateDatabase

update_count_in_db_blueprint = Blueprint('update_count_in_db_blueprint', __name__)

@update_count_in_db_blueprint.route('/updateCountDb', methods=['PATCH'])
def update_count_endpoint():
  try:
      DB = InstantiateDatabase(
        user='root',
        password='ManOfSorrows1!',
        host='localhost',
        database='habit_tracker_users'
      )
  except:
    return jsonify({'message':'Something went wrong with the database connection in update_count_endpoint'}), 400
  payloadFromPatchRequest = request.get_json();
  userID = payloadFromPatchRequest['payload']['user'];
  incrementedHabitCount = payloadFromPatchRequest['payload']['count']
  valuesPassedInInsertQuery = (incrementedHabitCount,userID)
  print("🐍 File: APIs/update_count_in_db.py | Line: 21 | update_count_endpoint ~ valuesPassedInInsertQuery",valuesPassedInInsertQuery)

  updateCountQuery = 'UPDATE users_habits SET habit_count = %s WHERE user_id = %s';
  DB.execute_insert_query(updateCountQuery,valuesPassedInInsertQuery)
  return jsonify({'message':'something went wrong with the for loop in update_count_endpoint'})