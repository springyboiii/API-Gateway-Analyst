from flask_pymongo import ObjectId

class MemoryModel():
    def getTestMemoryData(db, condition={}):
        col = db["test_memory"] 
        data = col.find_one(condition)
        data = MemoryModel.getJsonOfMemory(data)
        return data
    
    def getJsonOfMemory(data):
        if (data is None): return None

        return {
            "_id": str(ObjectId(data['_id'])),
            "timestamp": data["timestamp"],
            "system_memory_used_pct": data["system_memory_used_pct"],
            
        }
    