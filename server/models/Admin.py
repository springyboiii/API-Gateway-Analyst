from marshmallow import Schema, fields, post_load, validate, ValidationError, validates

from util.database import Database 

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
    
class AdminSchema(Schema):
    name = fields.String(validate=validate.Length(min=3), required=True) 
    email = fields.Email(required=True) 
    password = fields.String(required=True) 
    
    @validates("password")
    def validatePassword(self, value):
        if len(value) < 4:
            raise ValidationError("Password must be at least 4 letters long")
      
