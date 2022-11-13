from flask_pymongo import ObjectId

class DataModel():
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