from flask import jsonify 
from flask_pymongo import ObjectId

from bson.json_util import dumps 

from werkzeug.security import generate_password_hash, check_password_hash 

from models.Admin import Admin, AdminSchema
from models.User import User
from models.Feedback import Feedback, FeedbackAdmin

class AdminController:

    def insertAdmin(request):
        data = request.json 

        # validate request
        errors = AdminSchema().validate(data) 
        if errors:
            print(errors)
            res = jsonify(list(errors.values())[0][0])
            res.status_code = 400  
            return res 

        # check email is already in use
        # as an admin 
        admin = Admin.findOne({"email": data["email"]})
        if admin: 
            res = jsonify("Email already registered")
            res.status = 400
            return res 
        
        # as a user
        user = User.findOne({'email': data['email']})
        if user:
            res = jsonify("Email already registered")
            res.status = 400
            return res 

        # hash password 
        data['password'] = generate_password_hash(data['password'])

        # create a admin
        adminObj = Admin(data) 
        adminObj.save() 

        res = jsonify("Admin added successfully")
        res.status_code = 200         
         
        return res
    
    def getAdmins(): 
        admins = Admin.find()
        res = dumps(admins)
        return res 
    
    def getAdmin(id): 
        admin = Admin.findOne({"_id": ObjectId(id)})
        res = dumps(admin)
        return res 
    
    def getUnreadFeedbacks(id): 
        feedbackAdmins = FeedbackAdmin.find({"adminId": ObjectId(id)})

        # feedbacks

