from flask import jsonify
from flask_pymongo import ObjectId

from models.data import DataModel

class PredictController():
    def getTestCpuData(db):
        # data = DataModel.getTestAllData(db)
        data = DataModel.getSingleTestData(db)
        return jsonify(data)
    