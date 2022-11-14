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

# from tensorflow import keras

class PredictController():

    def getLatestInput(db):
        inputs = {}
        
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

        return timestamp, inputs

    def predictLatest(db):
        timestamp, inputs = PredictController.getLatestInput(db)

        # colsOrder = ['system.cpu.user.pct', 'system.cpu.system.pct', 'system.cpu.idle.pct',
        #     'system.cpu.iowait.pct', 'system.cpu.softirq.pct',
        #     'system.cpu.total.pct', 'system.memory.used.pct',
        #     'system.network.in.bytes', 'system.network.in.packets',
        #     'system.network.in.dropped', 'system.network.out.bytes',
        #     'system.network.out.packets', 'system.network.out.errors',
        #     'jvm.metrics.memory.heap_memory_usage.committed',
        #     'jvm.metrics.memory.heap_memory_usage.max',
        #     'jvm.metrics.memory.heap_memory_usage.used',
        #     'jvm.metrics.threading.thread_count',
        #     'jvm.metrics.gc.psms.collection_count',
        #     'jvm.metrics.gc.psms.collection_time',
        #     'jvm.metrics.gc.pss.collection_count',
        #     'jvm.metrics.gc.pss.collection_time', 'system.diskio.iostat.await',
        #     'system.diskio.iostat.queue.avg_size',
        #     'system.diskio.iostat.read.per_sec.bytes',
        #     'system.diskio.iostat.write.per_sec.bytes']
        
        # inputArr = []
        # for col in colsOrder: 
        #     inputArr.append(inputs[col])
        
        inputDataFrame = Helper.getDataFrameFromDict(inputs)

        modelOutput = None # load model and predict for dataFrame

        prediction = Helper.getIndexOfMax(modelOutput)

        return {"reslut": 1}

    def getTestCpuData(db):
        # data = DataModel.getTestAllData(db)
        # data = DataModel.getTestCpuData(db)
        data = CpuModel.getTestCpuData(db)
        
        # if (type(data) == Cursor):
        #     # print("its a cursor")
        #     res=[]
        #     for doc in data:
        #         res.append(PredictController.getJsonOfCpu(doc))
        #     res = jsonify(res)
        # else:
        #     # print("else")
        #     res = PredictController.getJsonOfCpu(data)
        return data
    
    # def getJsonOfCpu(data):
    #     if (data is None): return None

    #     return {
    #         "_id": str(ObjectId(data['_id'])),
    #         "timestamp": data["timestamp"],
    #         "system_cpu_user_pct": data["system_cpu_user_pct"],
    #         "system_cpu_system_pct": data["system_cpu_system_pct"],
    #         "system_cpu_idle_pct": data["system_cpu_idle_pct"],
    #         "system_cpu_iowait_pct": data["system_cpu_iowait_pct"],
    #         "system_cpu_softirq_pct": data["system_cpu_softirq_pct"],
    #         "system_cpu_total_pct": data["system_cpu_total_pct"],
    #     }
    

    