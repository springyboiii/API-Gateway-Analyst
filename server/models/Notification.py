from marshmallow import Schema, fields, validate

from util.database import Database

class Notification: 
    collection = "notification"

    def __init__(self, notificationDetails):
        self.message = notificationDetails["message"]
    
    def __getInfoDict(self): 
        return {
            "message": self.message
        }
    
    def save(self): 
        db = Database().getConnection()
        col = db[Notification.collection]

        id = col.insert_one(self.__getInfoDict())
        return id 
    
    def findOne(condition, projections = {}): 
        db = Database().getConnection()
        col = db[Notification.collection]

        return col.find_one(condition, projections)

    def find(condition={}, projections={}): 
        db = Database().getConnection()
        col = db[Notification.collection]

        return col.find(condition, projections)

class NotificationSchema(Schema): 
    message = fields.String(validate=validate.Length(min=3), required=True)
    
        