from marshmallow import Schema, fields, validate

from models.Admin import Admin

from util.database import Database

class Feedback:
    def __init__(self, feedbackDetails):
        self.userId = feedbackDetails["userId"]
        self.message = feedbackDetails["message"]
    
    def __getInfoDict(self):    
        return {
            "userId": self.userId,
            "message": self.message
        }
    
    def save(self):
        db = Database().getConnection()
        col = db["feedback"]

        id = col.insert_one(self.__getInfoDict())
        return id 

    def findOne(condition): 
        db = Database().getConnection()
        col = db["feedback"]

        return col.find_one(condition)
    
    def findOneGetObj(condition):
        db = Database().getConnection()
        col = db["feedback"]

        res = col.find_one(condition)

        if (res is None): return None 
        assert res is not None 

        return Feedback({
            "userId": res["userId"],
            "message": res["message"]
        })
    
    def find(condition={}):
        db = Database().getConnection()
        col = db["feedback"]

        return col.find(condition)

class FeedbackAdmin:
    col_name = "feedback_admin"

    def insert(feedbackId):
        db = Database().getConnection()
        col = db[FeedbackAdmin.col_name]

        # get only the admin ids 
        adminIds = Admin.find({})

        insertedCount = 0
        for adminId in adminIds:
            
            col.insert_one({
                "feedbackId": feedbackId,
                "adminId": adminId,
                "checked": False
            })
            insertedCount += 1
        
        return insertedCount 

    def updateOneChecked(condition):
        db = Database().getConnection()
        col = db[FeedbackAdmin.col_name] 

        return col.update_one(condition, {"$set": {
            "checked": True
        }})
    
    def find(condition={}):
        db = Database().getConnection() 
        col = db[FeedbackAdmin.col_name]

        return col.find(condition)

class FeedbackSchema(Schema): 
    userId = fields.String(validate=validate.Length(min=3), required=True)
    message = fields.String(validate=validate.Length(min=3), required=True)