from flask import Flask, request, jsonify, render_template
from flask_pymongo import PyMongo, ObjectId 
from flask_cors import CORS 
import pymongo
from flask_socketio import SocketIO, emit

# import socket 
import threading
import time

from controllers.predict import PredictController
from controllers.data import DataController

from ApiGateway import ApiGateway
from util.Helper import Helper
from util.ConversionHelper import ConversionHelper

app = Flask(__name__)
app.config['SECRET_KEY']='bruh'

CORS(app, resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app, cors_allowed_origins="*")


# don't hardcode passsword
mongo = pymongo.MongoClient("mongodb+srv://chathuranga123:chathuranga123@apigatewayanalystcluste.lz68ckp.mongodb.net/?retryWrites=true&w=majority")

# CORS(app)

db = mongo["api_gateway_analyst"]
col = db["test_cpu"]

@app.route('/', methods=["GET"])
def init():
    return "Hello"

@app.route('/predict', methods=["GET"])
def predict():
    return PredictController.predictLatest(db)

@app.route('/test', methods=["GET"])
def getTestData():
    return PredictController.getTestCpuData(db)

@app.route('/preprocessed/count', methods=["GET"])
def getPreprocessedDataCount():
    return DataController.getPreprocessedDataCount(db)

@app.route('/preprocessed', methods=["GET"])
def getPreprocessedData():
    return DataController.getPreprocessedData(db)

# socket connections 
@socketio.on('connect')
def connected():
    print(request.sid)
    print("Client is connected")
    emit("connect", {
        "data":f"id:{request.sid} is connected"
    })

@socketio.on("disconnect")
def disconnected():
    print("User disconnected")
    emit("disconnect", f"user {request.sid} hs been disconnected", broadcast=True)

@socketio.on("data")
def sendMsg():
    for i in range(10):
        socketio.emit("recvMsg", str(i), broadcast=True)
        time.sleep(2)

# make the thread, running below func a deamon. So it will stop when main thread finish
@socketio.on("prediction")
def predictAndSend():
    while True: 
        latestPrediction = PredictController.predictLatest(db)
        socketio.emit("prediction", latestPrediction["prediction"], broadcast=True)

        time.sleep(2)

@socketio.on("prediction")
def readFromGateway():
    startTimestamp = "2018-01-06 18:54:00"
    timestamp = ConversionHelper.convertStrToDatetime(startTimestamp)

    while True:
        readInput = ApiGateway.readData(timestamp)
        
        inputs = {}
        inputs.update(readInput["cpu"])
        inputs.update(readInput["memory"])
        inputs.update(readInput["network_io"])
        inputs.update(readInput["disk_io"])
        inputs.update(readInput["jvm"])

        # remove timestamp field
        inputs.pop("timestamp")

        inputs = Helper.orderDict(inputs)

        # return timestamp, inputs
        prediction = PredictController.predict(str(timestamp), inputs)

        socketio.emit("prediction", prediction, broadcast=True)

        timestamp = Helper.getNextTimestamp(timestamp)

        time.sleep(2)
    
thread1 = threading.Thread(target=readFromGateway)
thread1.start()

if __name__ == "__main__":
    print("Starting Python Flask Server for API Gateway Analyst")

    socketio.run(app)