from marshmallow import Schema, fields, post_load, validate, ValidationError, validates

from flask_pymongo import ObjectId 

import jwt
import datetime 
import os

from bson.json_util import dumps, loads

from dotenv import load_dotenv
load_dotenv()

from util.database import Database 
from util.Constant import Constant

class Admin:
    def __init__(self, adminDetails):
        self._id = adminDetails.get("_id")
        self.name = adminDetails["name"]
        self.email = adminDetails["email"]
        self.password = adminDetails["password"]
        self.feedbacks = []
        
    def __getInfoDict(self):
        return {
            'name': self.name,
            'email': self.email,
            'password': self.password,
            'feedbacks': self.feedbacks
        }
    
    def save(self):
        db = Database().getConnection() 
        col = db["admin"]
        id = col.insert_one(self.__getInfoDict())
        return id 
    
    def findOne(condition):
        db = Database().getConnection() 
        col = db['admin']

        return col.find_one(condition)
    
    def find(condition={}, projections={}):
        db = Database().getConnection() 
        col = db['admin']

        result = col.find(condition, projections)

        return result

    def findUnreadFeedbacksOfAdmin(adminId): 
        db = Database().getConnection() 
        col = db['admin']
        print("find unread feedbacks")

        return col.find({
            "_id": adminId
        }, {
            "feedbacks": {
                "$filter": {
                    "input": "$feedbacks", 
                    "as": "feedback",
                    "cond": {"$eq": ["$$feedback.checked", False]}
                }
            }
        })



    def findOneGetObj(condition):
        db = Database().getConnection() 
        col = db['admin']

        res = col.find_one(condition)

        if (res is None): return None
        assert res is not None

        return Admin({
            "_id": str(res["_id"]),
            "name": res["name"],
            "email": res["email"],
            "password": res["password"],
        })
    
    def insertFeedback(condition, feedbackDetails): 
        # insert feedbackId for all admins 
        db = Database().getConnection() 
        col = db['admin']

        return col.update_one(condition, { "$push": {
            "feedbacks":     {
                "$each": [{
                    "feedbackId": feedbackDetails["feedbackId"],
                    "message": feedbackDetails["message"],
                    "checked": False
                }],
            }
        }})
    
    def markReadFeedback(condition):
        db = Database().getConnection() 
        col = db['admin']

        return col.update_one(condition, {
            "$set": {"feedbacks.$.checked": True}
        })
    
    def generateAuthToken(self):
        assert self.name is not None and self.email is not None and self.password is not None

        roles = Constant.getRoles()

        tokenData = {
            "_id": self._id, 
            "name": self.name, 
            "email": self.email, 
            "type": roles["admin"], 
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60*24)
        }

        token = jwt.encode(tokenData, os.getenv("SECRET_KEY"), algorithm="HS256")
        
        return token
    
class AdminSchema(Schema):
    name = fields.String(validate=validate.Length(min=3), required=True) 
    email = fields.Email(required=True) 
    password = fields.String(required=True) 
    
    @validates("password")
    def validatePassword(self, value):
        if len(value) < 4:
            raise ValidationError("Password must be at least 4 letters long")
      
