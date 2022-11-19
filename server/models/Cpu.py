from flask_pymongo import ObjectId

class CpuModel():
    def getTestCpuData(db, condition={}):
        col = db["test_cpu"] 
        data = col.find_one(condition)
        # data = col.find().sort("timestamp", 1).limit(6)

        data = CpuModel.getJsonOfCpu(data)
        return data
    
    def insertCpuData(db, data):
        """
            data: is a dictionary containing field names : value
        """
        col = db["test_cpu"] 
        res = col.insert_one(data)
        return res 

    def getJsonOfCpu(data):
        if (data is None): return None

        return {
            "_id": str(ObjectId(data['_id'])),
            "timestamp": data["timestamp"],
            "system_cpu_user_pct": data["system_cpu_user_pct"],
            "system_cpu_system_pct": data["system_cpu_system_pct"],
            "system_cpu_idle_pct": data["system_cpu_idle_pct"],
            "system_cpu_iowait_pct": data["system_cpu_iowait_pct"],
            "system_cpu_softirq_pct": data["system_cpu_softirq_pct"],
            "system_cpu_total_pct": data["system_cpu_total_pct"],
        }
    