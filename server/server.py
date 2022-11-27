from flask import Flask, request, jsonify, render_template
from flask_pymongo import PyMongo, ObjectId 
from flask_cors import CORS 
import pymongo
from flask_socketio import SocketIO, emit

from bson.json_util import dumps 
from werkzeug.security import generate_password_hash, check_password_hash 

# import socket 
import threading
import time

from controllers.predict import PredictController
from controllers.data import DataController
from controllers.dashboard import DashboardController
from controllers.user import UserController
from controllers.auth import AuthController

from ApiGateway import ApiGateway
from util.Helper import Helper
from util.ConversionHelper import ConversionHelper

import certifi
ca= certifi.where()
app = Flask(__name__)
app.config['SECRET_KEY']='bruh'

CORS(app, resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app, cors_allowed_origins="*")


# don't hardcode passsword
mongo = pymongo.MongoClient("mongodb+srv://chathuranga123:chathuranga123@apigatewayanalystcluste.lz68ckp.mongodb.net/?retryWrites=true&w=majority",tlsCAFile=ca)
# CORS(app)

db = mongo["api_gateway_analyst"]
col = db["preprocessed_10_sec"]

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

@app.route('/normal_anomaly_doughnut_data', methods=["GET"])
def normal_anomaly_doughnut():
    return DashboardController.normal_anomaly_doughnut(col)

@app.route('/anomaly_type_doughnut_data', methods=["GET"])
def anomaly_type_doughnut():
    return DashboardController.anomaly_type_doughnut(col)

@app.route('/scenario_doughnut_data', methods=["GET"])
def scenario_doughnut():
    return DashboardController.scenario_doughnut(col)
#need to change graph
@app.route('/jvm_metrics_memory_heap_memory_usage_used_data', methods=["GET"])
def jvm_metrics_memory_heap_memory_usage_used():
    return DashboardController.jvm_metrics_memory_heap_memory_usage_used(col)

@app.route('/anomaly_time_area_data', methods=["GET"])
def anomaly_time_area_data():
    return DashboardController.get_recent_line_graph(col,"system_cpu_user_pct",1000)

@app.route('/user_pct_data', methods=["GET"])
def user_pct_data():
    return DashboardController.get_recent_line_graph(col,"system_cpu_user_pct",1000)

@app.route('/system_pct_data', methods=["GET"])
def system_pct_data():
    return DashboardController.get_recent_line_graph(col,"system_cpu_system_pct",1000)

@app.route('/idle_pct_data', methods=["GET"])
def idle_pct_data():
    return DashboardController.get_recent_line_graph(col,"system_cpu_idle_pct",1000)

@app.route('/iowait_pct_data', methods=["GET"])
def iowait_pct_data():
    return DashboardController.get_recent_line_graph(col,"system_cpu_iowait_pct",1000)

@app.route('/softirq_pct_data', methods=["GET"])
def softirq_pct_data():
    return DashboardController.get_recent_line_graph(col,"system_cpu_softirq_pct",1000)

@app.route('/total_pct_data', methods=["GET"])
def total_pct_data():
    return DashboardController.get_recent_line_graph(col,"system_cpu_total_pct",1000)

@app.route('/prediction_bar_data', methods=["GET"])
def prediction_bar_data():
    return DashboardController.get_prediction_bar_graph(col,50)

@app.route('/users', methods=["GET", "POST"])
def insertUser():
    if request.method == "POST":
        return UserController.insertUser(request)
    elif request.method == "GET": 
        return UserController.getUsers()
    else:
        pass 

@app.route("/users/<id>", methods=["GET"])
def getUser(id):
    return UserController.getUser(id)

@app.route("/users/<id>", methods=["PUT"])
def updateUser(id):
    return UserController.updateUser(request, id)

@app.route("/auth", methods=["POST"])
def login():
    return AuthController.login(request)

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
    # for i in range (1):
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
        
        # predict 
        prediction = PredictController.predict(str(timestamp), inputs)

        socketio.emit("prediction", prediction, broadcast=True)

        # prepare input to be stored
        storeData = {}
        for key in inputs:
            storeData[key] = inputs[key][0]
        
        # add scenario and type for input 
        storeData['scenario'] = int(prediction["prediction"])
        storeData['type'] = ConversionHelper.getTypeOfScenario(storeData['scenario'])

        # store inputs
        # uncomment below to store data
        # PredictController.insertData(db, str(timestamp), storeData)

        timestamp = Helper.getNextTimestamp(timestamp)

        time.sleep(2)

# uncomment below prediction sending thread to start
# thread1 = threading.Thread(target=readFromGateway)
# thread1.start()

if __name__ == "__main__":
    print("Starting Python Flask Server for API Gateway Analyst")

    socketio.run(app)