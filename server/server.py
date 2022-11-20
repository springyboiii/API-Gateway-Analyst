from flask import Flask, request, jsonify 
from flask_pymongo import PyMongo, ObjectId 
from flask_cors import CORS 
import pymongo

from controllers.predict import PredictController
from controllers.data import DataController
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
    # total_count=col.count_documents(filter={})
    normal_count=col.count_documents({"type":0})

    total_count=col.estimated_document_count()

    # anomaly_count=0
    # for type in range(1,8):
    #     anomaly_count+=len(list(col.find({"type":type})))
    
    result={"normal":normal_count,"anomaly":total_count-normal_count}
    return result

@app.route('/anomaly_type_doughnut_data', methods=["GET"])
def anomaly_type_doughnut():
    result=dict()
    for type in range(1,8):
        result["type"+str(type)]=col.count_documents({"type":type})
    # print(result)
    return result

@app.route('/scenario_doughnut_data', methods=["GET"])
def scenario_doughnut():

    result=dict()
    for scenario in range(1,11):
        result["scenario"+str(scenario)]=col.count_documents({"scenario":scenario})
    # result={"normal":normal_count,"anomaly":total_count-normal_count}
    # print(result)
    return result

@app.route('/jvm_metrics_memory_heap_memory_usage_used_data', methods=["GET"])
def jvm_metrics_memory_heap_memory_usage_used():

    
    jvm_metrics_memory_heap_memory_usage_used_count=col.count_documents({"jvm_metrics_memory_heap_memory_usage_used":{"$gt": 1.2}})
    total_count=col.estimated_document_count()

    result={"jvm_memory":jvm_metrics_memory_heap_memory_usage_used_count,"normal":total_count-jvm_metrics_memory_heap_memory_usage_used_count}
    return result

@app.route('/anomaly_time_area_data', methods=["GET"])
def anomaly_time_area_data():
    result=dict()
    result["timestamp"]=[]
    result["system_cpu_user_pct"]=[]
    result["type"]=[]
    for x in col.find().limit(1000).sort("timestamp",pymongo.DESCENDING):
        # print(x["timestamp"])
        result["timestamp"].append(x["timestamp"])
        result["system_cpu_user_pct"].append(x["system_cpu_user_pct"])
        result["type"].append(x["type"])
    # print(result["type"])

    
    return result

# cpu
@app.route('/user_pct_data', methods=["GET"])
def user_pct_data():
    result=dict()
    result["timestamp"]=[]
    result["system_cpu_user_pct"]=[]
    result["type"]=[]
    for x in col.find().limit(1000).sort("timestamp",pymongo.DESCENDING):
        # print(x["timestamp"])
        result["timestamp"].append(x["timestamp"][11:])
        result["system_cpu_user_pct"].append(x["system_cpu_user_pct"])
        result["type"].append(x["type"])
    # print(result["type"])
    return result


@app.route('/system_pct_data', methods=["GET"])
def system_pct_data():
    result=dict()
    result["timestamp"]=[]
    result["system_cpu_system_pct"]=[]
    result["type"]=[]
    for x in col.find().limit(1000).sort("timestamp",pymongo.DESCENDING):
        # print(x["timestamp"])
        result["timestamp"].append(x["timestamp"][11:])
        result["system_cpu_system_pct"].append(x["system_cpu_system_pct"])
        result["type"].append(x["type"])
    # print(result["type"])
    return result


@app.route('/idle_pct_data', methods=["GET"])
def idle_pct_data():
    result=dict()
    result["timestamp"]=[]
    result["system_cpu_idle_pct"]=[]
    result["type"]=[]
    for x in col.find().limit(1000).sort("timestamp",pymongo.DESCENDING):
        # print(x["timestamp"])
        result["timestamp"].append(x["timestamp"][11:])
        result["system_cpu_idle_pct"].append(x["system_cpu_idle_pct"])
        result["type"].append(x["type"])
    # print(result["type"])
    return result


@app.route('/iowait_pct_data', methods=["GET"])
def iowait_pct_data():
    result=dict()
    result["timestamp"]=[]
    result["system_cpu_iowait_pct"]=[]
    result["type"]=[]
    for x in col.find().limit(1000).sort("timestamp",pymongo.DESCENDING):
        # print(x["timestamp"])
        result["timestamp"].append(x["timestamp"][11:])
        result["system_cpu_iowait_pct"].append(x["system_cpu_iowait_pct"])
        result["type"].append(x["type"])
    # print(result["type"])
    return result


@app.route('/softirq_pct_data', methods=["GET"])
def softirq_pct_data():
    result=dict()
    result["timestamp"]=[]
    result["system_cpu_softirq_pct"]=[]
    result["type"]=[]
    for x in col.find().limit(1000).sort("timestamp",pymongo.DESCENDING):
        # print(x["timestamp"])
        result["timestamp"].append(x["timestamp"][11:])
        result["system_cpu_softirq_pct"].append(x["system_cpu_softirq_pct"])
        result["type"].append(x["type"])
    # print(result["type"])
    return result


@app.route('/total_pct_data', methods=["GET"])
def total_pct_data():
    result=dict()
    result["timestamp"]=[]
    result["system_cpu_total_pct"]=[]
    result["type"]=[]
    for x in col.find().limit(1000).sort("timestamp",pymongo.DESCENDING):
        # print(x["timestamp"])
        result["timestamp"].append(x["timestamp"][11:])
        result["system_cpu_total_pct"].append(x["system_cpu_total_pct"])
        result["type"].append(x["type"])
    # print(result["type"])
    return result   


# memory
@app.route('/memory_used_pct', methods=["GET"])
def memory_used_pct_data():
    result=dict()
    result["timestamp"]=[]
    result["system_memory_used_pct"]=[]
    result["type"]=[]
    for x in col.find().limit(1000).sort("timestamp",pymongo.DESCENDING):
        # print(x["timestamp"])
        result["timestamp"].append(x["timestamp"][11:])
        result["system_memory_used_pct"].append(x["system_memory_used_pct"])
        result["type"].append(x["type"])
    # print(result["type"])
    return result 


# disk
# system_diskio_iostat_await
@app.route('/diskio_iostat_await', methods=["GET"])
def diskio_iostat_await_data():
    result=dict()
    result["timestamp"]=[]
    result["system_diskio_iostat_await"]=[]
    result["type"]=[]
    for x in col.find().limit(1000).sort("timestamp",pymongo.DESCENDING):
        # print(x["timestamp"])
        result["timestamp"].append(x["timestamp"][11:])
        result["system_diskio_iostat_await"].append(x["system_diskio_iostat_await"])
        result["type"].append(x["type"])
    # print(result["type"])
    return result 

# system_diskio_iostat_queue_avg_size
@app.route('/diskio_iostat_queue_avg_size', methods=["GET"])
def diskio_iostat_queue_avg_size_data():
    result=dict()
    result["timestamp"]=[]
    result["system_diskio_iostat_queue_avg_size"]=[]
    result["type"]=[]
    for x in col.find().limit(1000).sort("timestamp",pymongo.DESCENDING):
        # print(x["timestamp"])
        result["timestamp"].append(x["timestamp"][11:])
        result["system_diskio_iostat_queue_avg_size"].append(x["system_diskio_iostat_queue_avg_size"])
        result["type"].append(x["type"])
    # print(result["type"])
    return result 


# system_diskio_iostat_read_per_sec_bytes
@app.route('/diskio_iostat_read_per_sec_bytes', methods=["GET"])
def diskio_iostat_read_per_sec_bytes_data():
    result=dict()
    result["timestamp"]=[]
    result["system_diskio_iostat_read_per_sec_bytes"]=[]
    result["type"]=[]
    for x in col.find().limit(1000).sort("timestamp",pymongo.DESCENDING):
        # print(x["timestamp"])
        result["timestamp"].append(x["timestamp"][11:])
        result["system_diskio_iostat_read_per_sec_bytes"].append(x["system_diskio_iostat_read_per_sec_bytes"])
        result["type"].append(x["type"])
    # print(result["type"])
    return result 


# system_diskio_iostat_write_per_sec_bytes
@app.route('/diskio_iostat_write_per_sec_bytes', methods=["GET"])
def diskio_iostat_write_per_sec_bytes_data():
    result=dict()
    result["timestamp"]=[]
    result["system_diskio_iostat_write_per_sec_bytes"]=[]
    result["type"]=[]
    for x in col.find().limit(1000).sort("timestamp",pymongo.DESCENDING):
        # print(x["timestamp"])
        result["timestamp"].append(x["timestamp"][11:])
        result["system_diskio_iostat_write_per_sec_bytes"].append(x["system_diskio_iostat_write_per_sec_bytes"])
        result["type"].append(x["type"])
    # print(result["type"])
    return result 


if __name__ == "__main__":
    print("Starting Python Flask Server for API Gateway Analyst")
    app.run(debug=True)