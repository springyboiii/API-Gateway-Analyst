from flask_pymongo import ObjectId

from util.database import Database

class PredictionModel():
    
    def countDocuments(condition):
        db = Database().getConnection()
        col = db["predictions"]

        return col.count_documents(condition)
    
    def countDocumentsEstimated():
        db = Database().getConnection()
        col = db["predictions"]

        return col.estimated_document_count()