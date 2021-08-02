import requests	



def main():
    payload = {"time" : "week"}
    #data = requests.get("http://localhost:8080/api/Tips/4b3138cd-8a82-482d-9bef-be79dea834f6", params = payload)
    data = requests.get("https://morning-peak-99108.herokuapp.com/api/tips", params = payload)
    #payload = {"Type" : "User", "Time" : "Month"}
    #data = requests.get('http://localhost:8080/api/Tips/613ec81d-33e3-40e0-9806-8aae18b4c53d', params = payload)
    #payload = {"Type" : "User"}
    #data = requests.delete("http://localhost:8080/api/Tips/613ec81d-33e3-40e0-9806-8aae18b4c53d", params = payload)
    print(data.text)
    print(data.url)




if __name__ == "__main__":
    main()
