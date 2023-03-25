from flask import Blueprint, jsonify, request
from Database import InstantiateDatabase

user_signup_blueprint = Blueprint('user_signup', __name__)
@user_signup_blueprint.route('/user-signup', methods=['POST'])
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