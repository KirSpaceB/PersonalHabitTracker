from flask import Flask
import mysql.connector
from mysql.connector import errorcode
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# So the plan is to create a DB using python
# Once the DB is created we can fetch data from the connectfront.py which is going to be data from the frontend
# Pass the fetched data into a table

# Get data from connectfrontend.py
# @app.route('')


# Saftey Check to avoid wrong username or database
try:
    connect_to_db = mysql.connector.connect( #This connect to the local mySQLWorkBench
        user="root",
        password="ManOfSorrows1!",
        host="localhost",
    )
except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with your username or password")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Data base does not exist")
    else:
        print(err)
else:
    connect_to_db.close()


DB_NAME = 'users'

TABLES = {}

TABLES[DB_NAME] = (
    "CREATE TABLE `users` ("
    " `user_id` int(11) NOT NULL AUTO_INCREMENT,"
    " `user_email` varchar(100) NOT NULL,"
    " PRIMARY KEY (`user_id`)"
    ") ENGINE=InnoDB"
)

connect_to_db.reconnect()
cursor = connect_to_db.cursor()

def create_database(cursor):
    try:
        cursor.execute(
            "CREATE DATABASE {} DEFAULT CHARACTER SET 'utf8'".format(DB_NAME)
            )
    except mysql.connector.Error as err:
        print("Failed Creating DB".format(err))
        exit(1)

try:
    cursor.execute("USE {}".format(DB_NAME))
except mysql.connector.Error as err:
    print("Database {} does not exist".format(DB_NAME))
    if err.errno == errorcode.ER_BAD_DB_ERROR:
        create_database(cursor)
        print("Database {} created successfully".format(DB_NAME))
        connect_to_db = DB_NAME
    else:
        print(err)
        exit(1)

#Give me error on first run, and does not create a table. Once the users schema is created and I run it again the code runs correctly without errors
for users in TABLES:
    tables_description = TABLES[users]
    try:
        print("Creating table {}:" .format(users), end='')
        cursor.execute(tables_description)
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
            print('it already exists')
        else:
            print(err.msg)
    else:
        print('Ok')  


def giveDBData():
    cursor.execute("INSERT INTO users(user_id, user_email) VALUES ('1','kirkflores@gmail.com')");

def finish():
    cursor.close()
    connect_to_db.close()

# Works when called above create_database
giveDBData()
create_database(cursor)
finish()



if __name__ == '__main__':
    app.run(debug=True)