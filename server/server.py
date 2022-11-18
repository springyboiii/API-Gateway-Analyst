from flask import Flask, request, jsonify 
from flask_pymongo import PyMongo, ObjectId 
from flask_cors import CORS 
import pymongo

from controllers.predict import PredictController
from controllers.data import DataController
from controllers.dashboard import DashboardController
import certifi
ca= certifi.where()
app = Flask(__name__)
# don't hardcode passsword

mongo = pymongo.MongoClient("mongodb+srv://chathuranga123:chathuranga123@apigatewayanalystcluste.lz68ckp.mongodb.net/?retryWrites=true&w=majority",tlsCAFile=ca)
CORS(app)

db = mongo["api_gateway_analyst"]
col = db["preprocessed_10_sec"]

@app.route('/', methods=["GET"])
def init():
    return "HI"

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

if __name__ == "__main__":
    print("Starting Python Flask Server for API Gateway Analyst")
    app.run(debug=True)