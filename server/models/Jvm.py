from flask_pymongo import ObjectId

class JvmModel():
    def getTestJvmData(db, condition={}):
        col = db["test_jvm"] 
        data = col.find_one(condition)
        data = JvmModel.getJsonOfJvm(data)
        return data
    
    def getJsonOfJvm(data):
        if (data is None): return None

        return {
            "_id": str(ObjectId(data['_id'])),
            "timestamp": data["timestamp"],
            "jvm_metrics_memory_heap_memory_usage_committed": data["jvm_metrics_memory_heap_memory_usage_committed"],
            "jvm_metrics_memory_heap_memory_usage_max": data["jvm_metrics_memory_heap_memory_usage_max"],
            "jvm_metrics_memory_heap_memory_usage_used": data["jvm_metrics_memory_heap_memory_usage_used"],
            "jvm_metrics_threading_thread_count": data["jvm_metrics_threading_thread_count"],
            "jvm_metrics_gc_psms_collection_count": data["jvm_metrics_gc_psms_collection_count"],
            "jvm_metrics_gc_psms_collection_time": data["jvm_metrics_gc_psms_collection_time"],
            "jvm_metrics_gc_pss_collection_count": data["jvm_metrics_gc_pss_collection_count"],
            "jvm_metrics_gc_pss_collection_time": data["jvm_metrics_gc_pss_collection_time"],
        }
    