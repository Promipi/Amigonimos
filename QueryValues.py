class QuerysFlask():
	import json
	def __init__(self, query):
		self.query = query.decode("utf-8")

	def QueryDics(self):
		QueryStr = self.query.split("%22")
		Dics = []
		num = 0
		for i in QueryStr:
			if i == "":
				QueryStr.remove(i)
			elif i == "=":
				DicValues = {QueryStr[num - 1] : QueryStr[num + 1]}
				Dics.append(DicValues)
			num += 1
		return {"Querys" : Dics}

	def QueryJson(self):
		QueryStr = self.query.split("%22")
		Dics = []
		num = 0
		for i in QueryStr:
			if i == "":
				QueryStr.remove(i)
			elif i == "=":
				DicValues = {QueryStr[num - 1] : QueryStr[num + 1]}
				Dics.append(DicValues)
			num += 1
		return json.dumps({"Querys" : Dics}, indent=4)



		