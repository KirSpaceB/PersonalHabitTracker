from flask import Flask, request,jsonify,redirect, url_for,render_template, session
import random
from flask_cors import CORS
import mysql.connector
import jwt
import os

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}}) # This allows CORS to accept all websites
app.secret_key = 'bakai'
secret_key = os.environ.get('SECRET_KEY') or 'hard-to-guess-string'

@app.route('/user-signup', methods=['POST'])
def signup_db():
    print('Signup_db is working')
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
    print('User-auth is working')

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
    #Sessions are stored on the backend
    #Session data is stored in the backend but the frontend 
    #Frontend stores it as a cookie(its a text file stored in the browser)
    #Hacker can find cookie section in browser
    #Think of a session as a new tab(page session)
    #Session storage is stored for a specific session
    #Backend takes token figures which token user belongs to, then makes sql query based on user ID
    #Make HTTP request with the token so,
    #The token is not stored in a mySQL DB, its stored on the browser db, we use a HTTP header to 
    #Google has copies of everyones ip address
    for row in results:
        if row[1] == loginInfo['userName'] and row[2] == loginInfo['password']:
            payload = {'user_id': row[0]}
            token = jwt.encode(payload,secret_key,algorithm='HS256')
            session['token'] = token
            print('user is in')
            return jsonify({'message':'success', 'token': token})
    return jsonify({'message':'fail'})

    
@app.route("/database", methods=["POST"])
def connect():
    print('Database is working')
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
        userIdCount = 0#Basically a bootleg version of AUTO_INCREMENT
        # We have to figure out how to auto_increment our user_id along with foreign key
        sql = "INSERT INTO users_habits (user_id,user_habit,habit_count) VALUES (%s,%s, %s);"

        val = (text,count)

        mycursor.execute(userIdCount,sql,val) # Now executes the problem was with the sql variable, apparently it was wrong
        userIdCount+=1
        #This is not getting read
        print(mycursor.execute(userIdCount,sql,val))

        DBs.commit()
        return jsonify({'Message': 'Sent data successfully'}), 200
    except: 
        return 'Bad Request', 500
    
@app.route('/sendUserData', methods=['GET'])
def sendUserData():
    DB = mysql.connector.connect(
        user="root",
        password="ManOfSorrows1!",
        host="localhost",
        database="habit_tracker_users" 
    )
    mySQLCursor = DB.cursor()
    # We first select a table, then select the rows from that table that we want to mutate. After that we join the rows to the users table by the two matching primary keys on the table
    getUserIdQuery = "SELECT user_habit, habit_count FROM users_habits INNER JOIN users ON users_habits.user_id = users.user_id"

    mySQLCursor.execute(getUserIdQuery)

    results = mySQLCursor.fetchall()

    print('This is working and the line of code below this are the results')
    print(results)
    
    return results

if __name__ == "__main__":
    app.run(debug=True)
