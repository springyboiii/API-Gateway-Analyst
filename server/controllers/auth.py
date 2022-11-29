from flask import jsonify, request
from marshmallow import Schema, fields
from werkzeug.security import generate_password_hash, check_password_hash 

from models.User import User 

from functools import wraps

import jwt 
import os

from dotenv import load_dotenv
load_dotenv()

def tokenRequired(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None 
        if "x-access-token" in request.headers:
            token = request.headers["x-access-token"]
        if not token:
            res = jsonify("Access denied. No token provided.")
            res.status_code = 401 
            return res 
        
        try: 
            # data = jwt.decode(token, os.getenv("SECRET_KEY"))
            # print(f"token: {token}")
            data = jwt.decode(token, os.getenv("SECRET_KEY"), algorithms=["HS256"])
            # print(f"data: {data}")
        except: 
            res = jsonify("Invalid token.")
            res.status_code = 400
            return res 
        
        return f(data, *args, **kwargs)
    
    return decorated


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
        userObj = User({"name": user["name"], "email": user["email"], "password": user["password"]})
        token = userObj.generateAuthToken()
        # print(f"token: {token}")

        res = jsonify(token)
        res.status_code = 200         
         
        return res
        

class AuthSchema(Schema): 
    email = fields.Email(required=True) 
    password = fields.String(required=True) 

