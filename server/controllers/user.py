from flask import jsonify 
from flask_pymongo import ObjectId
# from flask import request
from marshmallow import Schema, fields

from bson.json_util import dumps 

from werkzeug.security import generate_password_hash, check_password_hash 

from models.User import User, UserSchema, validateUser
from models.Admin import Admin

class UserController:

    def insertUser(request):
        data = request.json

        # validate request
        res = validateUser(data) 

        if res != {}:
            res = jsonify(list(res.values())[0][0])
            res.status = 400 
            return res 
        
        # check email is already in use
        # as a user
        user = User.findOne({'email': data['email']})
        if user:
            res = jsonify("Email already registered")
            res.status = 400
            return res 
        
        # as an admin
        admin = Admin.findOne({"email": data["email"]})
        if admin: 
            res = jsonify("Email already registered")
            res.status = 400
            return res  
        
        # hash password 
        data['password'] = generate_password_hash(data['password'])

        # create a user
        user = User(data) 
        user.save() 

        res = jsonify("User added successfully")
        res.status_code = 200         
         
        return res

    def getUsers():
        users = User.find()
        resp = dumps(users)

        return resp 

    def getUser(id):
        user = User.findOne({"_id": ObjectId(id)})
        resp = dumps(user)
        return resp 
    
    def updateUser(request, id):
        # without changing username and password
        data = request.json

        # validate request
        errors = UpdateSchema().validate(data) 
        
        if errors:
            res = jsonify(list(errors.values())[0][0])
            res.status = 400 
            return res 
                
        result = User.updateOne({"_id": ObjectId(id)}, data).raw_result
        if (result):
            res = jsonify("User updated successfully")
            res.status_code = 200
            return res 
        else:
            res = jsonify("User updated failed")
            res.status_code = 500
            return res 

class UpdateSchema(Schema):  
    name = fields.String(required=True) 
    
    