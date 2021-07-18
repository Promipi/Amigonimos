from flask import Flask, request
import pyodbc
import json #json.dumps(dataOr, ident=4)
import datetime
import uuid
import sys
from QueryValues import QuerysFlask
#App
app = Flask(__name__)


#Connection to the database
DataBaseConnection = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=SQL5053.site4now.net;PORT=1344;UID=db_a76731_amigonimodb_admin;PWD=Supersecreta123;')



#Funciones extras
def Reverse(lst):
    return [ele for ele in reversed(lst)]




#Funcion para eliminar un tip o todos los tips de un usuario
@app.route('/api/Tips/<Id>', methods=['DELETE'])
def DeleteTip(Id):
	cursor = DataBaseConnection.cursor()
	cursor.execute("SELECT * FROM Tips WHERE Id = ?;", (Id))
	TipDeleted = list(list(cursor)[0])
	if not TipDeleted:
		return json.dumps({"Message" : f"The Id {Id} does not exist", "Sucess" : False}, indent=4)
	cursor.execute("DELETE FROM Tips WHERE Id = ?;", (Id))
	return json.dumps({"Message" : "The tip was deleted", "Sucess" : True, 
		"Element deleted" : {"Id" : TipDeleted[4], "OwnerId" : TipDeleted[3], "Title" : TipDeleted[0], "Content" : TipDeleted[1], "CreationDate" : TipDeleted[2]}}, indent=4)
	


#Funcion para eliminar todos los tips de un usuario
@app.route('/api/Tips/User/<IdUser>', methods = ['DELETE'])
def DeleteTipsByIdUser(IdUser):
	cursor = DataBaseConnection.cursor()
	cursor.execute("SELECT * FROM Tips WHERE OwnerId = ?;", (IdUser))
	Tips = list(cursor)
	print(Tips)
	if not Tips:
		return json.dumps({"Message" : f"The User by id = {IdUser} does not has Tips", "Succes" : False}, indent = 4)
	return json.dumps({"Message" : "The tip was delete", "Sucess" : True,
		"Tips Deleted": {}}, indent=4)




#Funcion para mostrar todas los Tips
@app.route("/api/Tips", methods = ['GET'])
def ShowAllTips():
	cursor = DataBaseConnection.cursor()
	cursor.execute("SELECT * FROM Tips;")
	Tips = []
	for row in list(cursor):
		RowList = list(row)
		DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2]}
		Tips.append(DicTip)
	if not Tips:
		return json.dumps({"Message" : "There are not tips", "Sucess" : False}, indent=4)
	return json.dumps({"Message" : "The all Tips", "Sucess" : True, "Tips" : Tips}, indent=4)



#Funcion para mostrar un solo tip
@app.route("/api/Tips/<Id>", methods = ['GET'])
def ShowOneTip(Id):
	cursor = DataBaseConnection.cursor()
	QueryObject = QuerysFlask(request.query_string)
	ListQuery = QueryObject.QueryDics()
	if ListQuery[0]["TipOrUser"] == "User":
		cursor.execute("SELECT * FROM Tips WHERE OwnerId = ?;", (Id))
		Tips = []
		for row in list(cursor):
			RowList = list(row)
			DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2]}
			Tips.append(DicTip)
		if not Tips:
			return json.dumps({"Message" : f"The user by id = {Id} does not has Tips", "Succes" : False}, indent=4)
		return json.dumps({"Message" : f"The all Tips from a user with id = {Id}", "Sucess" : True, "Tips" : Tips}, indent=4)

	else:
		cursor.execute("SELECT * FROM Tips WHERE Id = ?;", (Id))
		TipShow = list(list(cursor)[0])
		if not TipShow:
			return json.dumps({"Message" : "That tip does not exist", "Sucess" : False, }, indent=4)
		TipDic = {"Id" : TipShow[4], "OwnerId" : TipShow[3], "Title" : TipShow[0], "Content" : TipShow[1], "CreationDate" : TipShow[2]}
		return json.dumps({"Message" : "One Tip", "Sucess" : True, "Tip" : TipDic}, indent=4)








#Funcion para mostrar los tips de hace una semana
@app.route("/api/Tips/Week", methods = ['GET'])
def ShowTipsWeekAgo():
	CurrentTime = datetime.date.today()
	cursor = DataBaseConnection.cursor()
	cursor.execute("SELECT * FROM Tips;")
	Tips = []
	for row in Reverse(list(cursor)):
		RowList = list(row)
		PastDay = int(RowList[2].split("-")[2])
		PastMonth = int(RowList[2].split("-")[1])
		PastYear = int(RowList[2].split("-")[0])
		Pastdate = datetime.date(int(PastYear), int(PastMonth), int(PastDay))
		Timelapse = CurrentTime - Pastdate
		if int(Timelapse.days) <= 7:
			DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2]}
			Tips.append(DicTip)
		else:
			break
	if not Tips:
		return json.dumps({"Message" : "There are not tips on the last week", "Sucess" : False}, indent=4)

	return json.dumps({"Message" : "Tips from a week ago", "Sucess" : True, "Tips" : Tips}, indent=4)



#Funcion para mostrar los tips de hace una semana de un usuario
@app.route("/api/Tips/Week/<IdUser>", methods = ['GET'])
def ShowTipsWeekAgoFromUser(IdUser):
	CurrentTime = datetime.date.today()
	cursor = DataBaseConnection.cursor()
	cursor.execute("SELECT * FROM Tips WHERE OwnerId = ?;", (IdUser))
	Tips = []
	for row in Reverse(list(cursor)):
		RowList = list(row)
		PastDay = int(RowList[2].split("-")[2])
		PastMonth = int(RowList[2].split("-")[1])
		PastYear = int(RowList[2].split("-")[0])
		Pastdate = datetime.date(int(PastYear), int(PastMonth), int(PastDay))
		Timelapse = CurrentTime - Pastdate
		if int(Timelapse.days) <= 7:
			DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2]}
			Tips.append(DicTip)
		else:
			break
	if not Tips:
		return json.dumps({"Message" : f"There are not tips on the last week for that user with id = {IdUser}", "Sucess" : False}, indent=4)

	return json.dumps({"Message" : f"Tips from a week ago from the user with id = {IdUser}", "Sucess" : True, "Tips" : Tips}, indent=4)


#Funcion para mostrar los tips de hace un mes 
@app.route("/api/Tips/Month", methods = ['GET'])
def ShowTipsMonthAgo():
	CurrentTime = datetime.date.today()
	cursor = DataBaseConnection.cursor()
	cursor.execute("SELECT * FROM Tips;")
	Tips = []
	for row in Reverse(list(cursor)):
		RowList = list(row)
		PastDay = int(RowList[2].split("-")[2])
		PastMonth = int(RowList[2].split("-")[1])
		PastYear = int(RowList[2].split("-")[0])
		Pastdate = datetime.date(int(PastYear), int(PastMonth), int(PastDay))
		DaysAgo = CurrentTime - Pastdate
		if int(DaysAgo.days) <= 31:
			DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2]}
			Tips.append(DicTip)
		else:
			break
	if not Tips:
		return json.dumps({"Message" : "There are not tips on the last month", "Sucess" : False}, indent=4)
	return json.dumps({"Message" : "Tips from a month ago", "Sucess" : True, "Tips" : Tips}, indent=4 )

#Funcion para mostrar los tips de hace un mes de un usuario
@app.route("/api/Tips/Month/<IdUser>", methods = ['GET'])
def ShowTipsMonthAgoFromUser(IdUser):
	CurrentTime = datetime.date.today()
	cursor = DataBaseConnection.cursor()
	cursor.execute("SELECT * FROM Tips WHERE OwnerId = ?;", (IdUser))
	Tips = []
	for row in Reverse(list(cursor)):
		RowList = list(row)
		PastDay = int(RowList[2].split("-")[2])
		PastMonth = int(RowList[2].split("-")[1])
		PastYear = int(RowList[2].split("-")[0])
		Pastdate = datetime.date(int(PastYear), int(PastMonth), int(PastDay))
		DaysAgo = CurrentTime - Pastdate
		if int(DaysAgo.days) <= 31:
			DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2]}
			Tips.append(DicTip)
		else:
			break

	if not Tips:
		return json.dumps({"Message" : "There are not tips on the last month", "Sucess" : False}, indent=4)

	return json.dumps({"Message" : f"Tips from a month ago for user with id = {IdUser}", "Sucess" : True, "Tips" : Tips}, indent=4)


#Funcion para agregar un tip 
@app.route("/api/Tips", methods = ['POST'])
def AddTip():
	cursor = DataBaseConnection.cursor()
	if request.method == 'POST':
		try:
			OwnerId = request.json["OwnerId"]
			Title = request.json["Title"]
			Content = request.json["Content"]
			CreationDate = str(datetime.date.today())
		except:
			return json.dumps({"Message" : "Your send wrong the json", "Sucess" : False})
		Id = str(uuid.uuid4())
		cursor.execute(f"insert into Tips(Id, OwnerId, Title, Content, CreationDate) values(?, ?, ?, ?, ?);",
		(Id, OwnerId, Title, Content, CreationDate))
		cursor.commit()
		return json.dumps({"Message" : "Tip added", "Sucess" : True,
		 "Element created" : {"Id" : Id, "OwnerId" : OwnerId, "Title" : Title, "Content" : Content, "CreationDate" : CreationDate}}, indent=4)
	return json.dumps({"Message" : "You can add a tip here"}, indent=4)




if __name__ == "__main__":
	app.run(host="127.0.0.1", port=8080, debug=True)