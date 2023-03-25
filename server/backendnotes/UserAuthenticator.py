# This is closed because we wont have to touch the data base
class Database:
    def __init__(self, user:str, password:str, host:str, database:str):
        self.user = user
        self.password = password
        self.host = host
        self.database = database
    #Allow query to be resuable
    def execute_query(self, query:str, params: tuple = None):
        cursor = self.connection.cursor()
        cursor.execute(query, params)
        result = cursor.fetchall()
        cursor.close()
        return result
    def close_query(self):
        cursor = self.connection.cursor()
        self.connect.close = cursor.close
# 
class UserAuthenticator:
    def __init__(self, database: Database):
        self.database = database
# Look into an ORM
    def authenticate_user(self, username: str, password: str) -> Optional[str]:
        query = "SELECT * FROM users WHERE username=%s AND password=%s"
        result = self.database.execute_query(query, (username, password))
        if result:
            user_id = result[0][0]
            token = jwt.encode(
                {'user_id': user_id},
                'SECRET_KEY',
                algorithm='HS256'
            )
            return token

class UserHabitHandler:
    def __init__(self, database: Database):
        self.database = database

    def get_user_habits(self, user_id: int) -> List[Dict[str, Any]]:
        query = "SELECT user_habit, habit_count FROM users_habits WHERE user_id=%s"
        result = self.database.execute_query(query, (user_id,))
        habits = []
        for row in result:
            habit = {'user_habit': row[0], 'habit_count': row[1]}
            habits.append(habit)
        return habits

class AuthController:
    def __init__(self, authenticator: UserAuthenticator):
        self.authenticator = authenticator

    def authenticate_user(self, request: Request) -> Response:
        try:
            login_info = request.get_json()
        except:
            return {'message': 'Invalid request'}, 400

        token = self.authenticator.authenticate_user(login_info['username'], login_info['password'])
        if token:
            return {'token': token}
        else:
            return {'message': 'Invalid username or password'} 