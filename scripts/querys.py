import pyodbc
from dotenv import load_dotenv
import os

load_dotenv("file.env")
DB_PASS = os.getenv('DB_KEY')
DB_IDUSER = os.getenv('DB_IDUSER')
DB_SERVER = os.getenv('DB_SERVER')
DataBaseConnection = pyodbc.connect("DRIVER={ODBC Driver 17 for SQL Server};SERVER={" + DB_SERVER + "};PORT=1344;UID={" + DB_IDUSER + "};PWD={" + DB_PASS + "},DATABASE=Tips;")



def main():	
	cursor = DataBaseConnection.cursor()
	#cursor.execute("ALTER TABLE Tips ADD Valid BIT DEFAULT 'FALSE'")
	#cursor.commit()
	cursor.execute("EXEC SP_COLUMNS Tips;")
	for i in list(cursor):
		print(i)




if "__main__" == __name__:
	main()