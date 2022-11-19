from flask import jsonify
from flask_pymongo import ObjectId
from pymongo.cursor import Cursor

from datetime import datetime

from models.data import DataModel
from models.Cpu import CpuModel
from models.Memory import MemoryModel
from models.NetworkIo import NetworkIoModel
from models.DiskIo import DiskIoModel
from models.Jvm import JvmModel

from util.Helper import Helper

from tensorflow import keras

class PredictController():

    def getLatestInput(db):
        inputs = {}
        
        # need to read the latest data point
        inputCpu = CpuModel.getTestCpuData(db)

        timestamp = inputCpu["timestamp"]
        
        # timestamp for recent minute
        timestampInMin = timestamp[:-2]+"00"
        # print(f"timestampInMin:{timestampInMin}")

        # take inputs 
        inputMemory = MemoryModel.getTestMemoryData(db, {"timestamp": timestamp})
        inputNetworkIo = NetworkIoModel.getTestNetworkIoData(db, {"timestamp": timestamp})

        inputDiskIo = DiskIoModel.getTestDiskIoData(db, {"timestamp": timestampInMin})
        inputJvm = JvmModel.getTestJvmData(db, {"timestamp": timestampInMin})

        inputCpu.pop("_id")
        inputMemory.pop("_id")
        inputNetworkIo.pop("_id")
        inputDiskIo.pop("_id")
        inputJvm.pop("_id")

        # combine all inputs
        inputs.update(inputCpu)
        inputs.update(inputMemory)
        inputs.update(inputNetworkIo)
        inputs.update(inputDiskIo)
        inputs.update(inputJvm)

        # remove timestamp field
        inputs.pop("timestamp")

        inputs = Helper.orderDict(inputs)

        return timestamp, inputs

    def predict(timestamp, inputs):
        inputDataFrame = Helper.getDataFrameFromDict(inputs)

        minMaxScaler = Helper.loadMinMaxScaler()
        scaledDataFrame = minMaxScaler.transform(inputDataFrame)

        loadedModel = Helper.loadModel()

        modelOutput = loadedModel.predict(scaledDataFrame)

        predictions = Helper.getIndexOfMax(modelOutput)

        return {"timestamp": timestamp, "prediction": str(predictions[0])}

    def predictLatest(db):
        timestamp, inputs = PredictController.getLatestInput(db)

        inputDataFrame = Helper.getDataFrameFromDict(inputs)

        loadedModel = Helper.loadModel()
        
        modelOutput = loadedModel.predict(inputDataFrame) # load model and predict for dataFrame

        prediction = Helper.getIndexOfMax(modelOutput)
        print(f"prediction = {prediction}")

        return {"prediction": str(prediction)}

    def getTestCpuData(db):

        data = CpuModel.getTestCpuData(db)
        
        return data
    

    