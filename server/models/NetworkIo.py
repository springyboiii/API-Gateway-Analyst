from flask_pymongo import ObjectId

class NetworkIoModel():
    def getTestNetworkIoData(db, condition={}):
        col = db["test_network_io"] 
        data = col.find_one(condition)
        data = NetworkIoModel.getJsonOfNetworkIo(data)
        return data
    
    def getJsonOfNetworkIo(data):
        if (data is None): return None

        return {
            "_id": str(ObjectId(data['_id'])),
            "timestamp": data["timestamp"],
            "system_network_in_bytes": data["system_network_in_bytes"],
            "system_network_in_packets": data["system_network_in_packets"],
            "system_network_in_dropped": data["system_network_in_dropped"],
            "system_network_out_bytes": data["system_network_out_bytes"],
            "system_network_out_packets": data["system_network_out_packets"],
            "system_network_out_errors": data["system_network_out_errors"],
        }
    