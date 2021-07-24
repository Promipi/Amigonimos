from flask import Flask, request
import pyodbc
import json 
import datetime
import uuid
import sys
from QueryValues import QuerysFlask
import os
from dotenv import load_dotenv




#saco las variables .env por seguridad
load_dotenv("file.env")
DB_PASS = os.getenv('DB_KEY')
DB_IDUSER = os.getenv('DB_IDUSER')
DB_SERVER = os.getenv('DB_SERVER')

#App
app = Flask(__name__)


#Connection to the remote database
DataBaseConnection = pyodbc.connect("DRIVER={ODBC Driver 17 for SQL Server};SERVER={" + DB_SERVER + "};PORT=1344;UID={" + DB_IDUSER + "};PWD={" + DB_PASS + "},DATABASE=Tips;")

#Connection to the local database
#DataBaseConnection = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=192.168.100.64;PORT=1344;UID=usuario1;PWD=cola;DATABASE=SQL Tutorial')





#Esta va ser la ruta la cual va permitir cargar el like o el voto o si alguien desvota
@app.route("/api/Tips/Vote/<Id>", methods=['PUT'])
def VoteOrDevote(Id):
	cursor = DataBaseConnection.cursor()
	QueryObject = QuerysFlask(request.query_string)
	ListQuery = QueryObject.QueryDics()
	if ListQuery['Querys'] == None:
		return json.dumps({"Message" : "The action is not specified", "Sucess" : False}, indent=4)
	if ListQuery['Querys'][0]['Action'] == "Add":
		cursor.execute("UPDATE Tips SET Votes = Votes + 1 WHERE Id = ?;", (Id))
	elif ListQuery['Querys'][0]['Action'] == "Subtract":
		cursor.execute("UPDATE Tips SET Votes = Votes - 1 WHERE Id = ?;", (Id))
	DataBaseConnection.commit()
	cursor.execute("SELECT * FROM Tips WHERE Id = ?;", (Id))
	try:
		TipShow = list(list(cursor)[0])
		DataBaseConnection.commit()
	except:
		DataBaseConnection.commit()
		return json.dumps({"Message" : "That Id = {} for a Tip does not exist".format(Id), "Success" : False}, indent=4)
	return json.dumps({"Message" : "The Vote from Id {} was updated".format(Id), "Sucess" : True,
		"Tip" : {"Id" : TipShow[4], "OwnerId" : TipShow[3], "Title" : TipShow[0], "Content" : TipShow[1], "CreationDate" : TipShow[2], "Votes" : TipShow[5]}}, indent=4)






#Esta va ser la ruta para poder actualizar los datos de un Tip
@app.route('/api/Tips/<Id>', methods=['PUT'])
def UpdateTip(Id):
	cursor = DataBaseConnection.cursor()
	Title = ""
	Content = ""
	for i in request.json:
		if i == "Title":
			Title = request.json[i]
		elif i == "Content":
			Content = request.json[i]
	if Title == "" and Content == "":
		return json.dumps({"Message" : "Your send wrong the json or you don't send anything", "Sucess" : False})
	cursor.execute("SELECT * FROM Tips WHERE Id = ?;", (Id))
	try:
		TipShow = list(list(cursor)[0])
		DataBaseConnection.commit()
	except:
		DataBaseConnection.commit()
		return json.dumps({"Message" : "That Id = {} for a Tip does not exist".format(Id), "Success" : False}, indent=4)
	Title = Title if Title != "" else TipShow[0]
	Content = Content if Content != "" else TipShow[1]
	cursor.execute("UPDATE Tips SET Title = ?, Content = ? WHERE Id = ?;",
	(Title, Content, Id))
	DataBaseConnection.commit()
	return json.dumps({"Message" : "I The Tips with id = {} was updated".format(Id), "Sucess" : False, 
		"PastTip" : {"Id" : TipShow[4], "OwnerId" : TipShow[3], "Title" : TipShow[0], "Content" : TipShow[1], "CreationDate" : TipShow[2], "Votes" : TipShow[5]}, 
		"NewTip" : {"Id" : TipShow[4], "OwnerId" : TipShow[3], "Title" : Title, "Content" : Content, "CreationDate" : TipShow[2], "Votes" : TipShow[5]}}, indent=4)








#Funcion para eliminar un tip o los todos los tips de un usuario o los tips del usuasrio pero de hacer semana
#o para eliminar los tips de un usuario el ultimo mes
@app.route('/api/Tips/<Id>', methods=['DELETE'])
def DeleteTip(Id):
	cursor = DataBaseConnection.cursor()
	QueryObject = QuerysFlask(request.query_string)
	ListQuery = QueryObject.QueryDics()
	CurrentTime = datetime.date.today()
	if ListQuery['Querys'] == None or ListQuery['Querys'][0]['Type'] == 'Tip':
		cursor.execute("SELECT * FROM Tips WHERE Id = ?;", (Id))
		TipDeleted = list(list(cursor)[0])
		DataBaseConnection.commit()
		if not TipDeleted:
			return json.dumps({"Message" : "The Id {} does not exist".format(Id), "Sucess" : False}, indent=4)

		cursor.execute("DELETE FROM Tips WHERE Id = ?;", (Id))
		DataBaseConnection.commit()
		return json.dumps({"Message" : "The tip was deleted", "Sucess" : True, 
			"Element deleted" : {"Id" : TipDeleted[4], "OwnerId" : TipDeleted[3], "Title" : TipDeleted[0], "Content" : TipDeleted[1], "CreationDate" : TipDeleted[2], "Votes" : TipDeleted[5]}}, indent=4)


	elif ListQuery['Querys'][0]['Type'] == 'User':
		if len(ListQuery['Querys']) == 1:
			cursor.execute("SELECT * FROM Tips WHERE OwnerId = ?;", (Id))
			DataList = reversed(list(cursor))
			DataBaseConnection.commit()
			Tips = []
			for row in DataList:
				RowList = list(row)
				DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2], "Votes" : RowList[5]}
				Tips.append(DicTip)
				cursor.execute("DELETE FROM Tips WHERE Id = ?;", (DicTip["Id"]))
				DataBaseConnection.commit()
			if not Tips:
				return json.dumps({"Message" : "The User by id = {} does not has Tips".format(Id), "Succes" : False}, indent = 4)
			return json.dumps({"Message" : "The tips from the user with id = {} were deleted it4".format(Id), "Sucess" : True,
				"Tips": Tips}, indent=4)

		elif ListQuery['Querys'][1]['Time'] == 'Week':
			cursor.execute("SELECT * FROM Tips WHERE OwnerId = ?;", (Id))
			Tips = []
			DataList = reversed(list(cursor))
			DataBaseConnection.commit()
			for row in DataList:
				RowList = list(row)
				PastDay = int(RowList[2].split("-")[2])
				PastMonth = int(RowList[2].split("-")[1])
				PastYear = int(RowList[2].split("-")[0])
				Pastdate = datetime.date(int(PastYear), int(PastMonth), int(PastDay))
				Timelapse = CurrentTime - Pastdate
				if int(Timelapse.days) <= 7:
					cursor.execute("DELETE FROM Tips WHERE Id = ?;", (RowList[4]))
					DataBaseConnection.commit()
					DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2], "Votes" : RowList[5]}
					Tips.append(DicTip)
				else:
					break
			return json.dumps({"Message" : "The tips from a week ago by the user id {} were deleted".format(Id), "Sucess" : True,
				"Tips": Tips}, indent=4)

		elif ListQuery['Querys'][1]['Time'] == 'Month':
			cursor.execute("SELECT * FROM Tips WHERE OwnerId = ?;", (Id))
			DataList = reversed(list(cursor))
			DataBaseConnection.commit()
			Tips = []
			for row in DataList:
				RowList = list(row)
				PastDay = int(RowList[2].split("-")[2])
				PastMonth = int(RowList[2].split("-")[1])
				PastYear = int(RowList[2].split("-")[0])
				Pastdate = datetime.date(int(PastYear), int(PastMonth), int(PastDay))
				Timelapse = CurrentTime - Pastdate
				if int(Timelapse.days) <= 31:
					cursor.execute("DELETE FROM Tips WHERE Id = ?;", (RowList[4]))
					DataBaseConnection.commit()
					DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2], "Votes" : RowList[5]}
					Tips.append(DicTip)
				else:
					break
			return json.dumps({"Message" : "The tips from a month ago by user id {} were deleted".format(Id), "Sucess" : True,
				"Tips": Tips}, indent=4)


	



#Funcion para mostrar todas los Tips o muestra todos los tips de una ultima semana
#o de un ultimo mes y de la ultima semana 
@app.route("/api/Tips", methods = ['GET'])
def ShowAllTips():
	cursor = DataBaseConnection.cursor()
	QueryObject = QuerysFlask(request.query_string)
	ListQuery = QueryObject.QueryDics()
	CurrentTime = datetime.date.today()
	cursor.execute("SELECT * FROM Tips;")
	DataList = list(cursor)
	DataBaseConnection.commit()
	Tips = []
	if ListQuery["Querys"] == None:
		for row in DataList:
			RowList = list(row)
			DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2], "Votes" : RowList[5]}
			Tips.append(DicTip)
		if not Tips:
			return json.dumps({"Message" : "There are not tips", "Sucess" : False}, indent=4)
		return json.dumps({"Message" : "The all Tips", "Sucess" : True, "Tips" : Tips}, indent=4)

	elif ListQuery['Querys'][0]['Time'] == "Week":
		for row in reversed(DataList):
			RowList = list(row)
			PastDay = int(RowList[2].split("-")[2])
			PastMonth = int(RowList[2].split("-")[1])
			PastYear = int(RowList[2].split("-")[0])
			Pastdate = datetime.date(int(PastYear), int(PastMonth), int(PastDay))
			Timelapse = CurrentTime - Pastdate
			if int(Timelapse.days) <= 7:
				DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2], "Votes" : RowList[5]}
				Tips.append(DicTip)
			else:
				break
		if not Tips:
			return json.dumps({"Message" : "There are not tips on the last week", "Sucess" : False}, indent=4)

		return json.dumps({"Message" : "Tips from a week ago", "Sucess" : True, "Tips" : Tips}, indent=4)

	elif ListQuery['Querys'][0]['Time'] == "Month":
		for row in reversed(DataList):
			RowList = list(row)
			PastDay = int(RowList[2].split("-")[2])
			PastMonth = int(RowList[2].split("-")[1])
			PastYear = int(RowList[2].split("-")[0])
			Pastdate = datetime.date(int(PastYear), int(PastMonth), int(PastDay))
			DaysAgo = CurrentTime - Pastdate
			if int(DaysAgo.days) <= 31:
				DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2], "Votes" : RowList[5]}
				Tips.append(DicTip)
			else:
				break
		if not Tips:
			return json.dumps({"Message" : "There are not tips on the last month", "Sucess" : False}, indent=4)
		return json.dumps({"Message" : "Tips from a month ago", "Sucess" : True, "Tips" : Tips}, indent=4)





#Funcion para mostrar un solo tip o muetra los tips de todos los usuarios
#O Los usuarios de un mes o de una semana
@app.route("/api/Tips/<Id>", methods = ['GET'])
def ShowTipOrUserTips(Id):
	cursor = DataBaseConnection.cursor()
	QueryObject = QuerysFlask(request.query_string)
	ListQuery = QueryObject.QueryDics()
	CurrentTime = datetime.date.today()

	if ListQuery['Querys'] == None or ListQuery['Querys'][0]["Type"] == "Tip":
		cursor.execute("SELECT * FROM Tips WHERE Id = ?;", (Id))
		try:
			TipShow = list(list(cursor)[0])
			DataBaseConnection.commit()
		except:
			DataBaseConnection.commit()
			return json.dumps({"Message" : "That Id for a Tip does not exist", "Success" : False}, indent=4)
		TipDic = {"Id" : TipShow[4], "OwnerId" : TipShow[3], "Title" : TipShow[0], "Content" : TipShow[1], "CreationDate" : TipShow[2], "Votes" : TipShow[5]}
		return json.dumps({"Message" : "One Tip", "Sucess" : True, "Tip" : TipDic}, indent=4)

	elif ListQuery['Querys'][0]["Type"] == "User":
		cursor.execute("SELECT * FROM Tips WHERE OwnerId = ?;", (Id))
		DataList = list(cursor)
		DataBaseConnection.commit()
		Tips = []
		if len(ListQuery['Querys']) == 1:
			for row in DataList:
				RowList = list(row)
				DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2], "Votes" : RowList[5]}
				Tips.append(DicTip)
			if not Tips:
				return json.dumps({"Message" : "The user by id = {} does not has Tips".format(Id), "Succes" : False}, indent=4)
			return json.dumps({"Message" : "The all Tips from a user with id = {}".format(Id), "Sucess" : True, "Tips" : Tips}, indent=4)

		elif ListQuery['Querys'][1]['Time'] == "Week":
			for row in reversed(DataList):
				RowList = list(row)
				PastDay = int(RowList[2].split("-")[2])
				PastMonth = int(RowList[2].split("-")[1])
				PastYear = int(RowList[2].split("-")[0])
				Pastdate = datetime.date(int(PastYear), int(PastMonth), int(PastDay))
				Timelapse = CurrentTime - Pastdate
				if int(Timelapse.days) <= 7:
					DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2], "Votes" : RowList[5]}
					Tips.append(DicTip)
				else:
					break
			if not Tips:
				return json.dumps({"Message" : "There are not tips on the last week for that user with id = {}".format(Id), "Sucess" : False}, indent=4)

			return json.dumps({"Message" : "Tips from a week ago by the user with id = {}".format(Id), "Sucess" : True, "Tips" : Tips}, indent=4)

		elif ListQuery['Querys'][1]['Time'] == "Month":
			for row in reversed(DataList):
				RowList = list(row)
				PastDay = int(RowList[2].split("-")[2])
				PastMonth = int(RowList[2].split("-")[1])
				PastYear = int(RowList[2].split("-")[0])
				Pastdate = datetime.date(int(PastYear), int(PastMonth), int(PastDay))
				DaysAgo = CurrentTime - Pastdate
				if int(DaysAgo.days) <= 31:
					DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2], "Votes" : RowList[5]}
					Tips.append(DicTip)
				else:
					break

			if not Tips:
				return json.dumps({"Message" : "There are not tips on the last month by user id {}".format(Id), "Sucess" : False}, indent=4)

			return json.dumps({"Message" : "Tips from a month ago by the user id = {}".format(Id), "Sucess" : True, "Tips" : Tips}, indent=4)





#Funcion para agregar un tip 
@app.route("/api/Tips", methods = ['POST'])
def AddTip():
	cursor = DataBaseConnection.cursor()
	try:
		Title = request.json["Title"]
		Content = request.json["Content"]
		OwnerId = request.json["OwnerId"]
		CreationDate = str(datetime.date.today())
	except:
		return json.dumps({"Message" : "Your send wrong the json or you don't send anything", "Sucess" : False})
	Id = str(uuid.uuid4())
	cursor.execute("INSERT INTO Tips(Id, OwnerId, Title, Content, CreationDate, Votes) VALUES(?, ?, ?, ?, ?, ?);",
	(Id, OwnerId, Title, Content, CreationDate, 0))
	DataBaseConnection.commit()
	return json.dumps({"Message" : "Tip added", "Sucess" : True,
		"Element created" : {"Id" : Id, "OwnerId" : OwnerId, "Title" : Title, "Content" : Content, "CreationDate" : CreationDate, "Votes" : 0}}, indent=4)




if __name__ == "__main__":
	app.run(host="127.0.0.1", port=8080, debug=True)