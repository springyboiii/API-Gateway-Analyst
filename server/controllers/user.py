from flask import jsonify 
# from flask import request

from bson.json_util import dumps 

from werkzeug.security import generate_password_hash, check_password_hash 

from models.User import User, UserSchema, validateUser

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
        user = User.findOne({'email': data['email']})
        if user:
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
