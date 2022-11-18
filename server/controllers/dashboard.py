from flask import jsonify
from flask_pymongo import PyMongo, ObjectId
import pymongo


class DashboardController():
    def normal_anomaly_doughnut(col):
        normal_count = col.count_documents({"type": 0})

        total_count = col.estimated_document_count()

        result = {"normal": normal_count, "anomaly": total_count-normal_count}
        return result

    def anomaly_type_doughnut(col):
        result = dict()
        for type in range(1, 8):
            result["type"+str(type)] = col.count_documents({"type": type})
        return result

    def scenario_doughnut(col):

        result = dict()
        for scenario in range(1, 11):
            result["scenario" +
                   str(scenario)] = col.count_documents({"scenario": scenario})

        return result

    def jvm_metrics_memory_heap_memory_usage_used(col):

        jvm_metrics_memory_heap_memory_usage_used_count = col.count_documents(
            {"jvm_metrics_memory_heap_memory_usage_used": {"$gt": 1.2}})
        total_count = col.estimated_document_count()

        result = {"jvm_memory": jvm_metrics_memory_heap_memory_usage_used_count,
                  "normal": total_count-jvm_metrics_memory_heap_memory_usage_used_count}
        return result

    def get_recent_line_graph(col, feature, limit):
        result = dict()
        result["timestamp"] = []
        result[feature] = []
        result["type"] = []
        for x in col.find().limit(limit).sort("timestamp", pymongo.DESCENDING):
            result["timestamp"].append(x["timestamp"][11:])
            result[feature].append(x[feature])
            result["type"].append(x["type"])
        return result
