from flask import jsonify
from flask_pymongo import ObjectId

from models.data import DataModel

class DataController():

    

    def getPreprocessedData(db):
        # data = DataModel.getPreprocessedAllData(db)
        data = DataModel.getSinglePreprocessedData(db)

        return jsonify(data)
    
    def getPreprocessedDataCount(db):
        return jsonify(DataModel.getPreprocessedDataCount(db))