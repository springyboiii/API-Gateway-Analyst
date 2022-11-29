from marshmallow import Schema, fields, post_load, validate, ValidationError, validates

import jwt
import datetime 
import os

from dotenv import load_dotenv
load_dotenv()

from util.database import Database 
from util.Constant import Constant

class Admin:
    def __init__(self, adminDetails):
        self.name = adminDetails["name"]
        self.email = adminDetails["email"]
        self.password = adminDetails["password"]
        
    def __getInfoDict(self):
        return {
            'name': self.name,
            'email': self.email,
            'password': self.password,
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
    
    def find(condition={}):
        db = Database().getConnection() 
        col = db['admin']

        return col.find(condition)

    def findOneGetObj(condition):
        db = Database().getConnection() 
        col = db['admin']

        res = col.find_one(condition)

        if (res is None): return None
        assert res is not None

        return Admin({
            "name": res["name"],
            "email": res["email"],
            "password": res["password"],
        })
    
    def generateAuthToken(self):
        assert self.name is not None and self.email is not None and self.password is not None

        roles = Constant.getRoles()
        token = jwt.encode({"name": self.name, "email": self.email, "type": roles["admin"], "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60*24)}, os.getenv("SECRET_KEY"), algorithm="HS256")
        
        return token
    
class AdminSchema(Schema):
    name = fields.String(validate=validate.Length(min=3), required=True) 
    email = fields.Email(required=True) 
    password = fields.String(required=True) 
    
    @validates("password")
    def validatePassword(self, value):
        if len(value) < 4:
            raise ValidationError("Password must be at least 4 letters long")
      
