import mysql.connector

"""
All the sql connection files were put in one file in sql_connection.py 
and in all files where cursor needed it is imported from sql_connection.py
If there is need to change port host database user password or autocommit thing just go into sql_connection.py 
and change and DON'T COMMIT AND PUSH YOUR OWN CHANGES IN sql_connection.py
"""

yhteys = mysql.connector.connect(
    host='127.0.0.1',
    port=3306,
    database='maksa_velat',
    user='root',
    password='red_banana',
    autocommit=True
)
kursori = yhteys.cursor()
