from flask import Flask, request
import pyodbc
import json 
import datetime
import uuid
import sys
from modules.QueryValues import QuerysFlask
import os
from dotenv import load_dotenv
from flask_cors import CORS


#saco las variables .env por seguridad
load_dotenv("file.env")
DB_PASS = os.getenv('DB_KEY')
DB_IDUSER = os.getenv('DB_IDUSER')
DB_SERVER = os.getenv('DB_SERVER')

#App
app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={
        r"/*" :{
            "origins" : "*"
        }
    }
)

#Connection to the remote database
DataBaseConnection = pyodbc.connect("DRIVER={ODBC Driver 17 for SQL Server};SERVER={" + DB_SERVER + "};PORT=1344;UID={" + DB_IDUSER + "};PWD={" + DB_PASS + "},DATABASE=Tips;")

#Connection to the local database
#DataBaseConnection = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=192.168.100.64;PORT=1344;UID=usuario1;PWD=cola;DATABASE=SQL Tutorial')


#Ruta para retornar tips al azar
@app.route('/api/tips/random', methods=['GET'])
def RandomTips():
    cursor = DataBaseConnection.cursor()
    Tips = []
    QueryObject = QuerysFlask(request.query_string)
    ListQuery = QueryObject.QueryDics()
    if ListQuery['Querys'] == None or int(ListQuery['Querys'][0]['Num']) == 0:
        return json.dumps({"message" : "You must to send a number and also this number must be different to zero", "success" : False}, indent=4)
    cursor.execute("SELECT * FROM Tips ORDER BY newid();")
    n = 0
    DataList = list(cursor)
    DataBaseConnection.commit()
    while n < int(ListQuery['Querys'][0]['Num']) and n < len(DataList):
        RowList = list(DataList[n])
        DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2], "Votes" : RowList[5], "Valid" : RowList[6]}
        Tips.append(DicTip)
        n += 1
    return json.dumps({"message" : "{} Tips from a random query".format(int(ListQuery['Querys'][0]['Num'])), "success" : True, "tips" : Tips}, indent=4)


#Esta va ser la ruta la cual va permitir cargar el like o el voto o si alguien desvota
@app.route("/api/tips/vote/<Id>", methods=['PUT'])
def VoteOrDevote(Id):
    cursor = DataBaseConnection.cursor()
    try:
        UserId = request.json['UserId']
    except:
        return json.dumps({"message" : "You don't send the user id", "success" : False}, indent=4)
    cursor.execute("SELECT * FROM Tips WHERE Id = ?;", (Id))
    try:
        TipShow = list(list(cursor)[0])
        DataBaseConnection.commit()
    except:
        DataBaseConnection.commit()
        return json.dumps({"message" : "The Tip id = {} does not exist".format(Id), "success" : False}, indent=4)
    cursor.execute("SELECT * FROM TipsVotesUser WHERE (TipId = ? AND UserId = ?);", (Id, UserId))
    try:
        Relation = list(list(cursor)[0])
        cursor.execute("DELETE FROM TipsVotesUser WHERE (TipId = ? AND UserId = ?);", (Id, UserId))
        DataBaseConnection.commit()
        cursor.execute("UPDATE Tips SET Votes = Votes - 1 WHERE Id = ?;", (Id))
        DataBaseConnection.commit()
        action = "Dislike"
    except:
        print("Does not exist, so now exist")
        DataBaseConnection.commit()
        cursor.execute("INSERT INTO TipsVotesUser(TipId, UserId) VALUES(?, ?);", (Id, UserId))
        DataBaseConnection.commit()
        cursor.execute("UPDATE Tips SET Votes = Votes + 1 WHERE Id = ?;", (Id))
        DataBaseConnection.commit()
        action = "Like"
    cursor.execute("SELECT * FROM Tips WHERE Id = ?;", (Id))
    TipShow = list(list(cursor)[0])
    DataBaseConnection.commit()
    return json.dumps({"message" : "The Vote from Id {} was updated the action was {}".format(Id, action), "success" : True,
        "tip" : {"Id" : TipShow[4], "OwnerId" : TipShow[3], "Title" : TipShow[0], "Content" : TipShow[1], "CreationDate" : TipShow[2], "Votes" : TipShow[5], "Valid" : TipShow[6]},
        "action" : action}, indent=4)



#Esta va ser la ruta que va retornar un numero de los like mas votados
@app.route('/api/tips/vote', methods=['GET'])
def TheMostBestTips():
    cursor = DataBaseConnection.cursor()
    QueryObject = QuerysFlask(request.query_string)
    ListQuery = QueryObject.QueryDics()
    Num = 0
    UserId = ""
    for dic in ListQuery['Querys']:
        for i in dic: 
            if i == "Num":
                try:
                    Num = int(dic["Num"])
                except:
                    return json.dumps({"message" : "You must send a number not a string", "success" : False}, indent=4)
            elif i == "UserId":
                UserId = dic["UserId"]
    if Num == 0:
        return json.dumps({"message" : "You must send a number lager then 0", "success" : False}, indent=4)
    elif UserId != "":
        cursor.execute("SELECT * FROM Tips WHERE Id = ? ORDER BY Votes DESC;", (UserId))
        if list(cursor) == []:
            return json.dumps({"message" : "There is not tips from the user id = {}".format(UserId), "success" : False}, indent=4)
        Tips = []
        n = 0
        while n < len(list(cursor)) and n < Num:
            RowList = list(list(cursor)[n])
            DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2], "Votes" : RowList[5], "Valid" : RowList[6]}
            Tips.append(DicTip)
            n += 1

        DataBaseConnection.commit()
        return json.dumps({"message" : "The top {} of the most voted tips from the user id = {}".format(str(Num), UserId), "success" : True, 
            "tips" : Tips}, indent=4)
    else:
        cursor.execute("SELECT * FROM Tips ORDER BY Votes DESC;")
        DataList = list(cursor)
        if DataList == []:
            return json.dumps({"message" : "There is not tips", "success" : False}, indent=4)
        Tips = []
        n = 0
        while n < len(DataList) and n < Num:
            RowList = list(DataList[n])
            DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2], "Votes" : RowList[5], "Valid" : RowList[6]}
            Tips.append(DicTip)
            n += 1

        DataBaseConnection.commit()
        return json.dumps({"message" : "The top {} of the most voted tips".format(str(Num)), "success" : True, 
            "tips" : Tips}, indent=4)


#Esta va ser la ruta para poder actualizar los datos de un Tip
@app.route('/api/tips/<Id>', methods=['PUT'])
def UpdateTip(Id):
    cursor = DataBaseConnection.cursor()
    Title = ""
    Content = ""
    ChangeValid = False
    for i in request.json:
        if i == "Title":
            Title = request.json[i]
        elif i == "Content":
            Content = request.json[i]
        elif i == "Valid":
            ChangeValid = True
    if Title == "" and Content == "" and not ChangeValid:
        return json.dumps({"message" : "Your send wrong the json or you don't send anything", "success" : False})
    cursor.execute("SELECT * FROM Tips WHERE Id = ?;", (Id))
    try:
        TipShow = list(list(cursor)[0])
        DataBaseConnection.commit()
    except:
        DataBaseConnection.commit()
        return json.dumps({"message" : "That Id = {} for a Tip does not exist".format(Id), "success" : False}, indent=4)
    Title = Title if Title != "" else TipShow[0]
    Content = Content if Content != "" else TipShow[1]
    Valid = request.json["Valid"] if ChangeValid else TipShow[6]
    cursor.execute("UPDATE Tips SET Title = ?, Content = ?, Valid = ? WHERE Id = ?;",
    (Title, Content, Valid, Id))
    DataBaseConnection.commit()
    return json.dumps({"message" : "I The Tips with id = {} was updated".format(Id), "success" : False, 
        "pasttip" : {"Id" : TipShow[4], "OwnerId" : TipShow[3], "Title" : TipShow[0], "Content" : TipShow[1], "CreationDate" : TipShow[2], "Votes" : TipShow[5], "Valid" : TipShow[6]}, 
        "newtip" : {"Id" : TipShow[4], "OwnerId" : TipShow[3], "Title" : Title, "Content" : Content, "CreationDate" : TipShow[2], "Votes" : TipShow[5], "Valid" : Valid}}, indent=4)








#Funcion para eliminar un tip o los todos los tips de un usuario o los tips del usuasrio pero de hacer semana
#o para eliminar los tips de un usuario el ultimo mes
@app.route('/api/tips/<Id>', methods=['DELETE'])
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
            return json.dumps({"message" : "The Id {} does not exist".format(Id), "success" : False}, indent=4)

        cursor.execute("DELETE FROM Tips WHERE Id = ?;", (Id))
        DataBaseConnection.commit()
        return json.dumps({"message" : "The tip was delete", "success" : True, 
            "tipdeleted" : {"Id" : TipDeleted[4], "OwnerId" : TipDeleted[3], "Title" : TipDeleted[0], "Content" : TipDeleted[1], "CreationDate" : TipDeleted[2], "Votes" : TipDeleted[5], "Valid" : TipDeleted[6]}}, indent=4)


    elif ListQuery['Querys'][0]['Type'] == 'User':
        if len(ListQuery['Querys']) == 1:
            cursor.execute("SELECT * FROM Tips WHERE OwnerId = ?;", (Id))
            DataList = reversed(list(cursor))
            DataBaseConnection.commit()
            Tips = []
            for row in DataList:
                RowList = list(row)
                DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2], "Votes" : RowList[5], "Valid" : RowList[6]}
                Tips.append(DicTip)
                cursor.execute("DELETE FROM Tips WHERE Id = ?;", (DicTip["Id"]))
                DataBaseConnection.commit()
            if not Tips:
                return json.dumps({"message" : "The User by id = {} does not has Tips".format(Id), "succes" : False}, indent = 4)
            return json.dumps({"message" : "The tips from the user with id = {} were deleted it4".format(Id), "success" : True,
                "tips": Tips}, indent=4)

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
                    DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2], "Votes" : RowList[5], "Valid" : RowList[6]}
                    Tips.append(DicTip)
                else:
                    break
            return json.dumps({"message" : "The tips from a week ago by the user id {} were deleted".format(Id), "success" : True,
                "tips": Tips}, indent=4)

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
                    DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2], "Votes" : RowList[5], "Valid" : RowList[6]}
                    Tips.append(DicTip)
                else:
                    break
            return json.dumps({"message" : "The tips from a month ago by user id {} were deleted".format(Id), "success" : True,
                "tips": Tips}, indent=4)


    



#Funcion para mostrar todas los Tips o muestra todos los tips de una ultima semana
#o de un ultimo mes y de la ultima semana 
@app.route("/api/tips", methods = ['GET'])
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
            DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2], "Votes" : RowList[5], "Valid" : RowList[6]}
            Tips.append(DicTip)
        if not Tips:
            return json.dumps({"message" : "There are not tips", "success" : False}, indent=4)
        return json.dumps({"message" : "The all Tips", "success" : True, "tips" : Tips}, indent=4)

    elif ListQuery['Querys'][0]['Time'] == "Week":
        for row in reversed(DataList):
            RowList = list(row)
            PastDay = int(RowList[2].split("-")[2])
            PastMonth = int(RowList[2].split("-")[1])
            PastYear = int(RowList[2].split("-")[0])
            Pastdate = datetime.date(int(PastYear), int(PastMonth), int(PastDay))
            Timelapse = CurrentTime - Pastdate
            if int(Timelapse.days) <= 7:
                DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2], "Votes" : RowList[5], "Valid" : RowList[6]}
                Tips.append(DicTip)
            else:
                break
        if not Tips:
            return json.dumps({"message" : "There are not tips on the last week", "success" : False}, indent=4)

        return json.dumps({"message" : "Tips from a week ago", "success" : True, "tips" : Tips}, indent=4)

    elif ListQuery['Querys'][0]['Time'] == "Month":
        for row in reversed(DataList):
            RowList = list(row)
            PastDay = int(RowList[2].split("-")[2])
            PastMonth = int(RowList[2].split("-")[1])
            PastYear = int(RowList[2].split("-")[0])
            Pastdate = datetime.date(int(PastYear), int(PastMonth), int(PastDay))
            DaysAgo = CurrentTime - Pastdate
            if int(DaysAgo.days) <= 31:
                DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2], "Votes" : RowList[5], "Valid" : RowList[6]}
                Tips.append(DicTip)
            else:
                break
        if not Tips:
            return json.dumps({"message" : "There are not tips on the last month", "success" : False}, indent=4)
        return json.dumps({"message" : "Tips from a month ago", "success" : True, "tips" : Tips}, indent=4)





#Funcion para mostrar un solo tip o muetra los tips de todos los usuarios
#O Los usuarios de un mes o de una semana
@app.route("/api/tips/<Id>", methods = ['GET'])
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
            return json.dumps({"message" : "That Id for a Tip does not exist", "success" : False}, indent=4)
        TipDic = {"Id" : TipShow[4], "OwnerId" : TipShow[3], "Title" : TipShow[0], "Content" : TipShow[1], "CreationDate" : TipShow[2], "Votes" : TipShow[5], "Valid" : TipShow[6]}
        return json.dumps({"message" : "One Tip", "success" : True, "tip" : TipDic}, indent=4)

    elif ListQuery['Querys'][0]["Type"] == "User":
        cursor.execute("SELECT * FROM Tips WHERE OwnerId = ?;", (Id))
        DataList = list(cursor)
        DataBaseConnection.commit()
        Tips = []
        if len(ListQuery['Querys']) == 1:
            for row in DataList:
                RowList = list(row)
                DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2], "Votes" : RowList[5], "Valid" : RowList[6]}
                Tips.append(DicTip)
            if not Tips:
                return json.dumps({"message" : "The user by id = {} does not has Tips".format(Id), "succes" : False}, indent=4)
            return json.dumps({"message" : "The all Tips from a user with id = {}".format(Id), "success" : True, "tips" : Tips}, indent=4)

        elif ListQuery['Querys'][1]['Time'] == "Week":
            for row in reversed(DataList):
                RowList = list(row)
                PastDay = int(RowList[2].split("-")[2])
                PastMonth = int(RowList[2].split("-")[1])
                PastYear = int(RowList[2].split("-")[0])
                Pastdate = datetime.date(int(PastYear), int(PastMonth), int(PastDay))
                Timelapse = CurrentTime - Pastdate
                if int(Timelapse.days) <= 7:
                    DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2], "Votes" : RowList[5], "Valid" : RowList[6]}
                    Tips.append(DicTip)
                else:
                    break
            if not Tips:
                return json.dumps({"message" : "There are not tips on the last week for that user with id = {}".format(Id), "succcess" : False}, indent=4)

            return json.dumps({"message" : "Tips from a week ago by the user with id = {}".format(Id), "success" : True, "tips" : Tips}, indent=4)

        elif ListQuery['Querys'][1]['Time'] == "Month":
            for row in reversed(DataList):
                RowList = list(row)
                PastDay = int(RowList[2].split("-")[2])
                PastMonth = int(RowList[2].split("-")[1])
                PastYear = int(RowList[2].split("-")[0])
                Pastdate = datetime.date(int(PastYear), int(PastMonth), int(PastDay))
                DaysAgo = CurrentTime - Pastdate
                if int(DaysAgo.days) <= 31:
                    DicTip = {"Id" : RowList[4], "OwnerId" : RowList[3], "Title" : RowList[0], "Content" : RowList[1], "CreationDate" : RowList[2], "Votes" : RowList[5], "Valid" : RowList[6]}
                    Tips.append(DicTip)
                else:
                    break

            if not Tips:
                return json.dumps({"message" : "There are not tips on the last month by user id {}".format(Id), "success" : False}, indent=4)

            return json.dumps({"message" : "Tips from a month ago by the user id = {}".format(Id), "success" : True, "tips" : Tips}, indent=4)





#Funcion para agregar un tip 
@app.route("/api/tips", methods = ['POST'])
def AddTip():
    cursor = DataBaseConnection.cursor()
    try:
        Title = request.json["Title"]
        Content = request.json["Content"]
        OwnerId = request.json["OwnerId"]
        CreationDate = str(datetime.date.today())
    except:
        return json.dumps({"message" : "Your send wrong the json or you don't send anything", "success" : False})
    Id = str(uuid.uuid4())
    cursor.execute("INSERT INTO Tips(Id, OwnerId, Title, Content, CreationDate, Votes, Valid) VALUES(?, ?, ?, ?, ?, ?, ?);",
    (Id, OwnerId, Title, Content, CreationDate, 0, False))
    DataBaseConnection.commit()
    return json.dumps({"message" : "Tip added", "sucess" : True,
        "tip" : {"Id" : Id, "OwnerId" : OwnerId, "Title" : Title, "Content" : Content, "CreationDate" : CreationDate, "Votes" : 0, "Valid" : False}}, indent=4)




if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
