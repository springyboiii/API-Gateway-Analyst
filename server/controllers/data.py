from flask import jsonify
from flask_pymongo import ObjectId

from models.data import DataModel

from bson.json_util import dumps 
class DataController():

    

    def getPreprocessedData(db):
        # data = DataModel.getPreprocessedAllData(db)
        data = DataModel.getSinglePreprocessedData(db)

        return jsonify(data)
    
    def getPreprocessedDataCount(db):
        return jsonify(DataModel.getPreprocessedDataCount(db))

    def getPreprocessedDataMaxOfCol(colName):
        outputs = DataModel.getPreprocessedDataMaxOfCol(colName)
        return dumps(outputs)
    
    def getPreprocessedDataMinOfCol(colName):
        print("inside controller")
        outputs = DataModel.getPreprocessedDataMinOfCol(colName)
        return dumps(outputs)
    
    def getPreprocessedDataAvgOfCol(colName):
        outputs = DataModel.getPreprocessedDataAvgOfCol(colName)
        return dumps(outputs)
    
    def getPreprocessedDataAvgOf(colName, type): 
        outputs = DataModel.getPreprocessedDataAvgOf(colName, type)
        return dumps(outputs)
