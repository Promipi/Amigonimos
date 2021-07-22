from flask import Flask, request
import pyodbc
import json 
import datetime
import uuid
import sys
from QueryValues import QuerysFlask




#App
app = Flask(__name__)


#Connection to the database
DataBaseConnection = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=SQL5053.site4now.net;PORT=1344;UID=db_a76731_amigonimodb_admin;PWD=Supersecreta123;')





#Funcion para eliminar un tip o los todos los tips de un usuario o los tips del usuasrio pero de hacer semana
#o para eliminar los tips de un usuario el ultimo mes
@app.route('/api/Tips/<Id>', methods=['DELETE'])
def DeleteTip(Id):
	cursor = DataBaseConnection.cursor()
	QueryObject = QuerysFlask(request.query_string)
	ListQuery = QueryObject.QueryDics()
	CurrentTime = datetime.date.today()
	print(ListQuery)
	if ListQuery['Querys'] == [] or ListQuery['Querys'][0]['Type'] == 'Tip':
		cursor.execute("SELECT * FROM Tips WHERE Id = ?;", (Id))
		TipDeleted = list(list(cursor)[0])
		if not TipDeleted:
			return json.dumps({"Message" : f"The Id {Id} does not exist", "Sucess" : False}, indent=4)
		cursor.execute("DELETE FROM Tips WHERE Id = ?;", (Id))
		return json.dumps({"Message" : "The tip was deleted", "Sucess" : True, 
			"Element deleted" : {"Id" : TipDeleted[4], "OwnerId" : TipDeleted[3], "Title" : TipDeleted[0], "Content" : TipDeleted[1], "CreationDate" : TipDeleted[2]}}, indent=4)


	elif ListQuery['Querys'][0]['Type'] == 'User':
		if len(ListQuery['Querys']) == 1:	
			cursor.execute("SELECT * FROM Tips WHERE OwnerId = ?;", (Id))
			Tips = []
			for row in reversed(list(cursor)):
				RowList = list(row)
				DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2]}
				Tips.append(DicTip)
				cursor.execute("DELETE FROM Tips WHERE Id = ?;", (RowList[4]))
			if not Tips:
				return json.dumps({"Message" : f"The User by id = {Id} does not has Tips", "Succes" : False}, indent = 4)
			return json.dumps({"Message" : "The tips were delete", "Sucess" : True,
				"Tips Deleted": Tips}, indent=4)

		elif ListQuery['Querys'][1]['Time'] == 'Week':
			cursor.execute("SELECT * FROM Tips WHERE OwnerId = ?;", (Id))
			Tips = []
			for row in reversed(list(cursor)):
				RowList = list(row)
				PastDay = int(RowList[2].split("-")[2])
				PastMonth = int(RowList[2].split("-")[1])
				PastYear = int(RowList[2].split("-")[0])
				Pastdate = datetime.date(int(PastYear), int(PastMonth), int(PastDay))
				Timelapse = CurrentTime - Pastdate
				if int(Timelapse.days) <= 7:
					cursor.execute("DELETE FROM Tips WHERE Id = ?;", (RowList[4]))
					DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2]}
					Tips.append(DicTip)
				else:
					break
			return json.dumps({"Message" : "The tips were delete", "Sucess" : True,
				"Tips Deleted": Tips}, indent=4)

		elif ListQuery['Querys'][1]['Time'] == 'Month':
			cursor.execute("SELECT * FROM Tips WHERE OwnerId = ?;", (Id))
			for row in reversed(list(cursor)):
				RowList = list(row)
				PastDay = int(RowList[2].split("-")[2])
				PastMonth = int(RowList[2].split("-")[1])
				PastYear = int(RowList[2].split("-")[0])
				Pastdate = datetime.date(int(PastYear), int(PastMonth), int(PastDay))
				Timelapse = CurrentTime - Pastdate
				if int(Timelapse.days) <= 31:
					cursor.execute("DELETE FROM Tips WHERE Id = ?;", (RowList[4]))
				else:
					break
			return json.dumps({"Message" : "The tips were delete", "Sucess" : True,
				"Tips Deleted": Tips}, indent=4)


	



#Funcion para mostrar todas los Tips o muestra todos los tips de una ultima semana
#o de un ultimo mes y de la ultima semana 
@app.route("/api/Tips", methods = ['GET'])
def ShowAllTips():
	cursor = DataBaseConnection.cursor()
	QueryObject = QuerysFlask(request.query_string)
	ListQuery = QueryObject.QueryDics()
	CurrentTime = datetime.date.today()
	cursor.execute("SELECT * FROM Tips;")
	Tips = []
	if ListQuery["Querys"] == []:
		for row in list(cursor):
			RowList = list(row)
			DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2]}
			Tips.append(DicTip)
		if not Tips:
			return json.dumps({"Message" : "There are not tips", "Sucess" : False}, indent=4)
		return json.dumps({"Message" : "The all Tips", "Sucess" : True, "Tips" : Tips}, indent=4)

	elif ListQuery['Querys'][0]['Time'] == "Week":
		for row in reversed(list(cursor)):
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

	elif ListQuery['Querys'][0]['Time'] == "Month":
		for row in reversed(list(cursor)):
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





#Funcion para mostrar un solo tip o muetra los tips de todos los usuarios
#O Los usuarios de un mes o de una semana
@app.route("/api/Tips/<Id>", methods = ['GET'])
def ShowTipOrUserTips(Id):
	cursor = DataBaseConnection.cursor()
	QueryObject = QuerysFlask(request.query_string)
	ListQuery = QueryObject.QueryDics()
	CurrentTime = datetime.date.today()

	print(ListQuery)
	if ListQuery['Querys'] == [] or ListQuery['Querys'][0]["Type"] == "Tip":
		cursor.execute("SELECT * FROM Tips WHERE Id = ?;", (Id))
		TipShow = list(list(cursor)[0])
		if not TipShow:
			return json.dumps({"Message" : "That tip does not exist", "Sucess" : False, }, indent=4)
		TipDic = {"Id" : TipShow[4], "OwnerId" : TipShow[3], "Title" : TipShow[0], "Content" : TipShow[1], "CreationDate" : TipShow[2]}
		return json.dumps({"Message" : "One Tip", "Sucess" : True, "Tip" : TipDic}, indent=4)

	elif ListQuery['Querys'][0]["Type"] == "User":
		cursor.execute("SELECT * FROM Tips WHERE OwnerId = ?;", (Id))
		Tips = []
		if len(ListQuery['Querys']) == 1:
			for row in list(cursor):
				RowList = list(row)
				DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2]}
				Tips.append(DicTip)
			if not Tips:
				return json.dumps({"Message" : f"The user by id = {Id} does not has Tips", "Succes" : False}, indent=4)
			return json.dumps({"Message" : f"The all Tips from a user with id = {Id}", "Sucess" : True, "Tips" : Tips}, indent=4)

		elif ListQuery['Querys'][1]['Time'] == "Week":
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
				return json.dumps({"Message" : f"There are not tips on the last week for that user with id = {Id}", "Sucess" : False}, indent=4)

			return json.dumps({"Message" : f"Tips from a week ago from the user with id = {Id}", "Sucess" : True, "Tips" : Tips}, indent=4)

		elif ListQuery['Querys'][1]['Time'] == "Month":
			cursor.execute("SELECT * FROM Tips WHERE OwnerId = ?;", (Id))
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

			return json.dumps({"Message" : f"Tips from a month ago for user with id = {Id}", "Sucess" : True, "Tips" : Tips}, indent=4)





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