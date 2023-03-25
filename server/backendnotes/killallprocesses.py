import mysql.connector

# Replace the following values with your MySQL server credentials
config = {
    'user': 'root',
    'password': 'ManOfSorrows1!',
    'host': 'localhost',
    'database': 'habit_tracker_users'
}

def kill_mysql_processes():
    try:
        # Connect to the MySQL server
        connection = mysql.connector.connect(**config)
        cursor = connection.cursor()

        # Retrieve the list of processes
        cursor.execute("SHOW PROCESSLIST")
        process_list = cursor.fetchall()

        # Loop through the processes and kill each one
        for process in process_list:
            process_id = process[0]
            try:
                print(f"Killing process ID {process_id}")
                cursor.execute(f"KILL {process_id}")
            except mysql.connector.Error as e:
                if e.errno == 1094:  # Error code for "Unknown thread id"
                    print(f"Process ID {process_id} does not exist or has already been terminated")
                else:
                    print(f"Error: {e}")

        # Commit the changes and close the connection
        connection.commit()
    except mysql.connector.Error as e:
        print(f"Error: {e}")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == "__main__":
    kill_mysql_processes()
