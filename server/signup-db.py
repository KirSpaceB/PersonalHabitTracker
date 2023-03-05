from flask import Flask, request,jsonify,redirect, url_for,render_template, session
import random
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)
app.secret_key = 'nutsack'

@app.route('/user-signup', methods=['POST'])
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

    userAccount = (userName,passWord)

    sqlInsertUserName = "INSERT INTO users (user_name,password) VALUES (%s,%s)"

    sqlCursor.execute(sqlInsertUserName, userAccount)
    sqlCursor.execute(sqlInsertUserName, (userName, passWord))

    DB.commit()

    return {"message": "Successfully Registered"}
# You cannot use double quotes in your string literals only single quotes ''
# We have to host the backend first before lauching the frontend
@app.route("/user-auth", methods=["POST"])
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

    #This use to break because an else statement was inside it, so after one iteration different user(one isn't in row one of the db) then it would automatically go to the else statement.
    for row in results:
        if row[1] == loginInfo['userName'] and row[2] == loginInfo['password']:
            token = random.randint(0,1000)
            session['token'] = token
            print('user is in')
            return jsonify({'message':'success', 'token': token})

    
@app.route("/database", methods=['POST'])
def connect():
    #Review multi threading problem
    #Ecapsulate this variable
    DBs = mysql.connector.connect(
        user="root",
        password="ManOfSorrows1!",
        host="localhost",
        database="habit_tracker_users" 
    )
    
    # Cursor allows us to communitcate the backend with the DB
    mycursor = DBs.cursor()

    #Retrieve JSON data
    data=request.get_json() # returns hashmap
    #extract the data you want to insert into database
    print(data)

    try:
        text = data[0]['text']#From React
        count = data[0]['count'] #passing undefined to sql query causing error

        sql = "INSERT INTO users_habits (user_habit,habit_count) VALUES (%s, %s);"

        val = (text,count)

        mycursor.execute(sql,val) # Now executes the problem was with the sql variable, apparently it was wrong

        print(mycursor.execute(sql,val))

        DBs.commit()
        return jsonify({'Message': 'Sent data successfully'}), 200
    except: 
        return 'Bad Request', 500

if __name__ == "__main__":
    app.run(debug=True)
