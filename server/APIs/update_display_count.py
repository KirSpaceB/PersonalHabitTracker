from flask import Blueprint,request,jsonify
from Database import InstantiateDatabase
update_display_count_blueprint = Blueprint('update_display_count', __name__)

@update_display_count_blueprint.route('/update_display_count', methods=['PATCH'])
def update_display_count_function():
  try:
      DB = InstantiateDatabase(
        user='root',
        password='ManOfSorrows1!',
        host='localhost',
        database='habit_tracker_users'
      )
  except:
    return jsonify({'message':'Something went wrong with the database connection in update_display_count_endpoint'}), 400
  
  payloadFromIncrementDisplayCount = request.get_json();

  payloadFromIncrementDisplayCountUserID = payloadFromIncrementDisplayCount['userID'];
  payloadFromIncrementDisplayCountHabit = payloadFromIncrementDisplayCount['habit'];
  payloadFromIncrementDisplayIncrementDisplayCount = payloadFromIncrementDisplayCount['incrementedNumber'];

  valuesMatchingUpdateDisplayCountQuery = (
    payloadFromIncrementDisplayIncrementDisplayCount,
    payloadFromIncrementDisplayCountUserID,
    payloadFromIncrementDisplayCountHabit,
  );
  print("🐍 File: APIs/update_display_count.py | Line: 28 | update_display_count_function ~ valuesMatchingUpdateDisplayCountQuery",valuesMatchingUpdateDisplayCountQuery)

  updateDisplayCountQuery = 'UPDATE users_habits SET habit_count = %s WHERE user_id = %s AND user_habit = %s';

  DB.execute_insert_query(updateDisplayCountQuery,valuesMatchingUpdateDisplayCountQuery);

  return jsonify({'requestjson':payloadFromIncrementDisplayCount}), 200