import requests	



def main():
	data = requests.get("http://localhost:8080/api/Tips/4b3138cd-8a82-482d-9bef-be79dea834f6")
	print(data.text)




if __name__ == "__main__":
	main()