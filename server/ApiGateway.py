from flask import Flask, request, jsonify, render_template
from flask_pymongo import PyMongo, ObjectId 
from flask_cors import CORS 
import pymongo
from flask_socketio import SocketIO, emit

# import socket 
import threading
import time

from util.Helper import Helper

mongo = pymongo.MongoClient("mongodb+srv://chathuranga123:chathuranga123@apigatewayanalystcluste.lz68ckp.mongodb.net/?retryWrites=true&w=majority")

db = mongo["api_gateway"]

class ApiGateway():

    def getCpuData(condition={}):
        col = db['cpu']
        return col.find_one(condition)

    def getMemoryData(condition={}):
        col = db['memory']
        return col.find_one(condition)

    def getNetworkIoData(condition={}):
        col = db["network_io"]
        return col.find_one(condition)

    def getDiskIoData(condition={}):
        col = db["disk_io"]
        return col.find_one(condition)

    def getJvmData(condition={}):
        col = db["jvm"]
        return col.find_one(condition)

    def readData(timestamp):
        # timestamp should be in datetime format
        res = {
            "cpu": None,
            "disk_io": None,
            "jvm": None,
            "memory": None,
            "network_io": None,
        }
        
        # timestamp = Helper.convertStrToDatetime(timestamp)

        timestampStr = str(timestamp)

        # read data
        res["cpu"] = ApiGateway.getCpuData({'timestamp': timestampStr})
        res["memory"] = ApiGateway.getMemoryData({'timestamp': timestampStr})
        res["network_io"] = ApiGateway.getNetworkIoData({'timestamp': timestampStr})

        res["disk_io"] = ApiGateway.getDiskIoData({'timestamp': timestampStr[:-2]+"00"})
        res["jvm"] = ApiGateway.getJvmData({'timestamp': timestampStr[:-2]+"00"})
        
        # remove _id
        for key in res:
            res[key].pop("_id")

        return res


if __name__ == "__main__":
    print(ApiGateway.readData())

  