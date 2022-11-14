from flask_pymongo import ObjectId

class DiskIoModel():
    def getTestDiskIoData(db, condition={}):
        col = db["test_disk_io"] 
        data = col.find_one(condition)
        data = DiskIoModel.getJsonOfDiskIo(data)
        return data
    
    def getJsonOfDiskIo(data):
        if (data is None): return None

        return {
            "_id": str(ObjectId(data['_id'])),
            "timestamp": data["timestamp"],
            "system_diskio_iostat_await": data["system_diskio_iostat_await"],
            "system_diskio_iostat_queue_avg_size": data["system_diskio_iostat_queue_avg_size"],
            "system_diskio_iostat_read_per_sec_bytes": data["system_diskio_iostat_read_per_sec_bytes"],
            "system_diskio_iostat_write_per_sec_bytes": data["system_diskio_iostat_write_per_sec_bytes"],
        }
    