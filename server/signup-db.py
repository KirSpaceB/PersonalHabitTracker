from flask import Flask, request,jsonify,session
import random
from flask_cors import CORS
import mysql.connector
import jwt
import os

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True) # This allows CORS to accept all websites
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
@app.route("/user-auth", methods=["POST", "GET"])
def authenticate_user():

    print('User-auth is working')
    try:
        DB = mysql.connector.connect(
            user="root",
            password="ManOfSorrows1!",
            host="localhost",
            database="habit_tracker_users" #Species what tb to use when creating tables etc.
        )
    except:
        print('sql error')


    sqlCursor = DB.cursor()
    #SQL command to execute
    checkForUser = ("SELECT * FROM users")
    #Execute query
    sqlCursor.execute(checkForUser)
    #generate token on server
    #ui saves token
    
    #Make initial authorization request, the server responds with the bearer token, header has authorization bearer, sever get header and matches with session, then gets correct session, therefore matching user data.
    #Difference between bearer and cookie is, instead of sent by cookie, it sent by the http header.

    #Fetches all the selected users in the DB
    results = sqlCursor.fetchall()

    if request.method == "POST":
        
        try:
            loginInfo = request.get_json() # GET REQUEST DONT HAVE A BODY AND GET_JSON GETS FROM THE BODY AKA ANY REQUEST THAT HAS A BODY(POST)
            print("request.getjson", loginInfo)
        except:
            print('invalid request')
            return ({'message':'return statement in try-catch'}), 400
        
        for row in results:
            print(session)
            if row[1] == loginInfo['userName'] and row[2] == loginInfo['password']:
                #row[0] is the user_id in the users table
                # This session allows us to attach a session key to user_id from the database and since that user_id is a foreign key to users_habits we can then get the many to one relationship also know as the habits for users
                session['loged_in'] = True
                session['user_id'] = row[0]
                value = request.cookies.get('session')
                print("request cookie", value)
                print('This is the users session_id', session['user_id'])#This changes dynamically
                print(session)

                return({'message':'success'})
        return jsonify({'message':'POST request conditional was not hit'})
    #Flask automatically gives cookie for each new session because they are two seperate requests it will lead to different
    if request.method == "GET":
        print('test')
        print(session)
        if 'user_id' in session: # This does not work because session is empty and does not read user id from the previous statement
            print('Inside Request.method=GET')
            #Query to check for users_id
            getUsersIdFromHabitTracker = ("SELECT user_id FROM users_habits")
            sqlCursor.execute(getUsersIdFromHabitTracker)
            #fetches all remaining rows from a query
            users_habit_user_id = sqlCursor.fetchall()

            print("users habits", users_habit_user_id)
            #This for loop matches the user session_id to the actual user in the database
            for (users,) in users_habit_user_id:
                if session['user_id'] == users:
                    print('We have to create another query to get the users stuff')
                    print(users_habit_user_id)
                    #We want to add a query here that renders the html and stuff so instead of the endpoint send user data it returns this
                    return jsonify({'message':'user GET REQUEST'})
        return jsonify({'message':'GET request conditional was not hit'})
                
            
    print('this is after the POST request', session['user_id'])

    # The point of this is to match the user_session_id with user_habits
    return jsonify({'message':'could not reach get or post request'})

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
        # userIdCount = 0#Basically a bootleg version of AUTO_INCREMENT
        # # We have to figure out how to auto_increment our user_id along with foreign key
        sql = "INSERT INTO users_habits (user_habit,habit_count) VALUES (%s, %s);"

        val = (text,count)

        mycursor.execute(sql,val) # Now executes the problem was with the sql variable, apparently it was wrong

        print(mycursor.execute(sql,val))

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
    getUserIdQuery = "SELECT * FROM users_habits INNER JOIN users ON users_habits.user_id = users.user_id"
    print('test')
    # We need to match user_id to users_habits
    # It should only fetch user_id 4
    # Only fetch if user_id from users_habits matches user_id from users.
    mySQLCursor.execute(getUserIdQuery)
    
    results = mySQLCursor.fetchall()

    print('This is working and the line of code below this are the results')
    # print(results)
    # for users in results:
    #     # print(users)
    
    return results

if __name__ == "__main__":
    app.run(debug=True)
