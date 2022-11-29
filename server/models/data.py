from flask_pymongo import ObjectId

class DataModel():
    def instertData(db, data):
        col = db["predictions"]

        res = col.insert_one(data)

        return res
    def getPreprocessedAllData(db):
        col = db["preprocessed_10_sec"]

        data = []
        for doc in col.find():
            data.append({
                "_id": str(ObjectId(doc['_id'])),
                "timestamp": doc["timestamp"],
                "system_cpu_user_pct": doc["system_cpu_user_pct"],
            })
        return data
    
    def getPreprocessedDataCount(db):
        col = db["preprocessed_10_sec"]
        return col.count_documents({})

    def getSinglePreprocessedData(db):
        col = db["preprocessed_10_sec"] 
        data = col.find_one()

        doc = {
            "_id": str(ObjectId(data['_id'])),
            "timestamp": data["timestamp"],
            "system_cpu_user_pct": data["system_cpu_user_pct"],
        }
        
        return doc
        
    def getSingleTestData(db):
        col = db["test_cpu"] 
        data = col.find_one()

        doc = {
            "_id": str(ObjectId(data['_id'])),
            "timestamp": data["timestamp"],
            "system_cpu_user_pct": data["system_cpu_user_pct"],
        }
        
        return doc

    def getTestAllData(db):
        col = db["preprocessed_10_sec"] 
        data = []
        # for doc in col.find():
        #     data.append({
        #         "_id": str(ObjectId(doc['_id'])),
        #         "timestamp": doc["timestamp"],
        #         "system_cpu_user_pct": doc["system_cpu_user_pct"],
        #     })
        return col.find_one()
    
    def getTestCpuData(db, condition={}):
        col = db["test_cpu"] 
        data = col.find_one(condition)
        # data = col.find().sort("timestamp", 1).limit(6)
        return data
    
    def getTestDiskIoData(db, condition={}):
        col = db["test_disk_io"] 
        data = col.find_one(condition)
        return data
    
    def getTestJvmData(db, condition={}):
        col = db["test_jvm"] 
        data = col.find_one(condition)
        return data
    
    def getTestMemoryData(db, condition={}):
        col = db["test_memory"] 
        data = col.find_one(condition)
        return data
    
    def getTestNetowrkIoData(db, condition={}):
        col = db["test_network_io"] 
        data = col.find_one(condition)
        return data

