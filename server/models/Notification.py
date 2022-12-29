from marshmallow import Schema, fields, validate

from util.database import Database

class Notification: 
    collection = "notification"

    def __init__(self, notificationDetails):
        self.timestamp = notificationDetails["timestamp"]
        self.message = notificationDetails["message"]
    
    def __getInfoDict(self): 
        return {
            "timestamp": self.timestamp,
            "message": self.message
        }
    
    def save(self): 
        db = Database().getConnection()
        col = db[Notification.collection]
        print(self.__getInfoDict())
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
    timestamp = fields.String(validate=validate.Length(min=3), required=True)
    message = fields.String(validate=validate.Length(min=3), required=True)
    
        