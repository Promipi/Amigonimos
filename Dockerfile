FROM ubuntu:20.04


RUN apt-get update && apt-get upgrade -y
RUN apt-get install python3 -y && apt-get install python3-pip -y

WORKDIR /TipsApp
COPY . /TipsApp

RUN apt-get install curl -y 
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list > /etc/apt/sources.list.d/mssql-release.list
RUN apt-get update
RUN ACCEPT_EULA=Y apt-get install -y msodbcsql17
RUN ACCEPT_EULA=Y apt-get install -y mssql-tools
RUN apt-get install -y unixodbc-dev



RUN pip3 --no-cache-dir install -r requirements.txt

CMD ["python3", "App.py"]
