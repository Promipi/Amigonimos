import json
class QuerysFlask():
	def __init__(self, query):
		self.query = query.decode("utf-8")

	def QueryDics(self):
		if self.query == "":
			return None
		QueryList = self.query.split("&")
		Dics = []
		for Q in QueryList:
			QueryS = Q.split("=")
			Dics.append({QueryS[0] : QueryS[1]})
		return {"Querys" : Dics}

	def QueryJson(self):
		if self.query == "":
			return None
		QueryList = self.query.split("&")
		Dics = []
		for Q in QueryList:
			QueryS = Q.split("=")
			Dics.append({QueryS[0] : QueryS[1]})
		return json.dumps({"Querys" : Dics}, indent=4)



		