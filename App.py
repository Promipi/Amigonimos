from flask import Flask, request
import pyodbc
import json #json.dumps(dataOr, ident=4)
from datetime import datetime
import uuid


#App
app = Flask(__name__)


#Connection to the database
DataBaseConnection = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=SQL5053.site4now.net;PORT=1344;UID=db_a76731_amigonimodb_admin;PWD=Supersecreta123;')


#Funcion para eliminar un tip
@app.route('/DeleteTip/<TipId>', methods=['DELETE'])
def Delete(TipId):
	cursor = DataBaseConnection.cursor()
	cursor.execute("SELECT * FROM Tips WHERE Id = ?;", (int(TipId)))
	TipDeleted = list(list(cursor)[0])
	if not TipDeleted:
		return json.dumps({"Message" : f"The Id {str(TipId)} does not exist", "Sucess" : False})
	cursor.execute("DELETE FROM Tips WHERE Id = ?;", (int(TipId)))
	return json.dumps({"Message" : "The tip was deleted", "Sucess" : True, 
		"Element deleted" : {"Id" : TipDeleted[0], "OwnerId" : TipDeleted[1], "Title" : TipDeleted[2], "Content" : TipDeleted[3], "CreationDate" : TipDeleted[4]}}, indent=4)



#Funcion para mostrar todas los Tips
@app.route("/ShowAllTips", methods = ['GET'])
def ShowAllTips():
	cursor = DataBaseConnection.cursor()
	cursor.execute("SELECT * FROM Tips;")
	Tips = []
	for row in list(cursor):
		RowList = list(row)
		DicTip = {"Id" : RowList[0], "OwnerId" : RowList[1], "Title" : RowList[2], "Content" : RowList[3], "CreationDate" : RowList[4]}
		Tips.append(DicTip)
	return json.dumps({"Message" : "The all Tips", "Sucess" : True, "Tips" : Tips})





#Funcion para mostrar un solo tip
@app.route("/ShowOneTip/<TipId>", methods = ['GET'])
def ShowOneTip(TipId):
	cursor = DataBaseConnection.cursor()
	cursor.execute("SELECT * FROM Tips WHERE Id = ?;", (int(TipId)))
	TipShow = list(list(cursor)[0])
	if not TipShow:
		return json.dumps({"Message" : "That tip does not exist", "Sucess" : False, })
	TipDic = {"Id" : TipShow[0], "OwnerId" : TipShow[1], "Title" : TipShow[2], "Content" : TipShow[3], "CreationDate" : TipShow[4]}
	return json.dumps({"Message" : "One Tip", "Sucess" : True, "Tip" : TipDic}, indent=4)


#Funcion para mostrar los tips de hace una semana
@app.route("/ShowTipsWeekAgo", methods = ['GET'])
def ShowTipsWeekAgo():
	CurrentTime = datetime.now()
	CreationDate = CurrentTime.strftime("%d/%m/%Y %H:%M:%S")
	cursor = DataBaseConnection.cursor()
	cursor.execute("SELECT * FROM Tips;")
	Tips = []
	CurrentDay = int(CreationDate.split(" ")[0].split("/")[0]) - 7
	CurrentMonth = int(CreationDate.split(" ")[0].split("/")[1])
	for row in list(cursor):
		RowList = list(row)
		PastDay = int(RowList[4].split(" ")[0].split("/")[0])
		PastMonth = int(RowList[4].split(" ")[0].split("/")[1])
		if CurrentDay <= PastDay and (PastMonth + 1 == CurrentMonth or PastMonth == CurrentMonth):
			DicTip = {"Id" : RowList[0], "OwnerId" : RowList[1], "Title" : RowList[2], "Content" : RowList[3], "CreationDate" : RowList[4]}
			Tips.append(DicTip)

	return json.dumps({"Message" : "Tips from a week ago", "Sucess" : True, "Days" : Tips})




#Funcion para agregar un tip 
@app.route("/AddTip", methods = ['POST'])
def AddTip():
	cursor = DataBaseConnection.cursor()
	if request.method == 'POST':
		try:
			CurrentTime = datetime.now()
			OwnerId = int(request.json["OwnerId"])
			Title = request.json["Title"]
			Content = request.json["Content"]
			CreationDate = CurrentTime.strftime("%d/%m/%Y %H:%M:%S")

		except:
			return json.dumps({"Message" : "Your send wrong the json", "Sucess" : False})
		cursor.execute(f"insert into Tips(OwnerId, Title, Content, CreationDate) values(?,?,?,?);",
		(int(OwnerId), Title, Content, CreationDate))
		cursor.commit()
		cursor.execute("SELECT TOP 1 * FROM Tips ORDER BY Id DESC;")
		return json.dumps({"Message" : "Tip added", "Sucess" : True,
		 "Element created" : {"Id" : list(cursor)[0][0], "OwnerId" : int(OwnerId), "Title" : Title, "Content" : Content, "CreationDate" : CreationDate}}, indent=4)
	return json.dumps({"Message" : "You can add a tip here"}, indent=4)




if __name__ == "__main__":
	app.run(host="127.0.0.1", port=8080, debug=True)