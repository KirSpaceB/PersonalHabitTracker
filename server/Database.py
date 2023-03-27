import mysql.connector
# We are using D.R.Y here = DONT REPEAT YOURSELF
class InstantiateDatabase:
    def __init__(self, user:str, password:str, host:str, database:str):
        self.user = user
        self.password = password
        self.host = host
        self.database = database
        self.connector = None

    def mysqlConnector(self):
        self.connector = mysql.connector.connect(
            user=self.user,
            password=self.password,
            host=self.host,
            database=self.database
        )

    def execute_query(self,query:str):
        if self.connector is None:
            self.mysqlConnector()
        cursor = self.connector.cursor()
        cursor.execute(query)
        results = cursor.fetchall()
        cursor.close
        return results

    def execute_insert_query(self,query:str, values:any):
        if self.connector is None:
            self.mysqlConnector()
        cursor = self.connector.cursor()
        cursor.execute(query, values)
        self.connector.commit()
        cursor.close()

    def fetch_one(self, query:str, values:any=None):
        if self.connector is None:
            self.mysqlConnector()
        cursor = self.connector.cursor()
        cursor.execute(query, values)
        result = cursor.fetchone()
        cursor.close()
        return result