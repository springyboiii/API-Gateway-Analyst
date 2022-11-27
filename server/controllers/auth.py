from flask import jsonify 
from marshmallow import Schema, fields
from werkzeug.security import generate_password_hash, check_password_hash 

from models.User import User 

class AuthController:
    def login(request):
        data = request.json 

        errors = AuthSchema().validate(data) 
        if errors:
            print(errors)
            res = jsonify(list(errors.values())[0][0])
            res.status_code = 400  
            return res 

        email = data["email"]

        user = User.findOne({"email": email})
        print(f"user: {user}")
        if (not user):
            res = jsonify("Invalid email or password")
            res.status_code = 400 
            return res 

        validlPassword = check_password_hash(user["password"], data["password"])
        print(f"validlPassword: {validlPassword}")
        if (not validlPassword):
            res = jsonify("Invalid email or password")
            res.status_code = 400 
            return res 
        
        # generate token 

        res = jsonify("User logged in")
        res.status_code = 200         
         
        return res
        

class AuthSchema(Schema): 
    email = fields.Email(required=True) 
    password = fields.String(required=True) 

