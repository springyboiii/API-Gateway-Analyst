from marshmallow import Schema, fields, post_load, validate, ValidationError, validates
from util.database import Database  
import jwt 
import datetime
import os

from dotenv import load_dotenv
load_dotenv()


class User:
    def __init__(self, userDetails):
        self.name = userDetails['name'] 
        self.email = userDetails['email'] 
        self.password = userDetails['password'] 
    
    def __getInfoDict(self):
        return {
            'name': self.name,
            'email': self.email,
            'password': self.password,
        }

    def save(self):
        db = Database().getConnection() 
        col = db["user"]
        id = col.insert_one(self.__getInfoDict())
        return id

    def findOne(condition):
        db = Database().getConnection() 
        col = db['user']

        return col.find_one(condition)

    def find(condition={}):
        db = Database().getConnection() 
        col = db['user']

        return col.find(condition)
    
    def updateOne(condition, data):
        db = Database().getConnection() 
        col = db['user']
        
        return col.update_one(condition, {"$set":{
            "name": data["name"]
        }})
    
    def generateAuthToken(self):
        assert self.name is not None and self.email is not None and self.password is not None

        token = jwt.encode({"email": self.email, "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60*24)}, os.getenv("SECRET_KEY"), algorithm="HS256")
        
        return token




class UserSchema(Schema):

    name = fields.String(validate=validate.Length(min=3), required=True)
    password = fields.String(required=True)
    email = fields.Email(required=True)
    
    @validates("password")
    def validatePassword(self, value):
        if len(value) < 4:
            raise ValidationError("Password must be at least 4 letters long")
        
    @post_load 
    def createUser(self, data, **kwargs):
        return User(data)

def validateUser(userDetails): 
    # userDetails json type 

    schema = UserSchema()
    print(f"==================={userDetails}")

    try:
        schema.load(userDetails) 
        return {}
    except ValidationError as err: 
        return err.messages


if __name__ == "__main__":
    inputs = {
        "name": "chathuranga",
        "email": "chathu@gmail.com",
        "password": "1234"
    }

    schema = UserSchema()

    try:
        person = schema.load(inputs)
        print("finish")
    except ValidationError as err:

        print(list(err.messages.values())[0])
        # print(err.valid_data)


