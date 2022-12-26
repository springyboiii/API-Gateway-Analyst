from flask import jsonify, request
from flask_pymongo import ObjectId
from util.Constant import Constant

from models.Notification import NotificationSchema, Notification
from models.User import User 

class NotificationController: 

    def getUnreadNotifications(currentUser): 
        roles = Constant.getRoles()

        if currentUser["type"] != roles["user"]: 
            res = jsonify("Access denied.")

            if currentUser["type"] != roles["user"]: 
                res = jsonify("Access denied.")
                res.status_code = 403 
                return res 
    
    def insertNotification(anomalyType):
        anomalyTypes = Constant.getAnomalyTypes()

        notificationMessage = { "message": anomalyTypes[anomalyType]}

        # store notification 
        notificationObj = Notification(notificationMessage)
        notificationId = notificationObj.save().inserted_id
        
        # store notification in all users
        users = User.find(projections = {"_id": 1})

        for user in users: 
            # print(user)
            User.insertNotification({"_id": user.get("_id")}, notificationId)

        res = jsonify("notification added successfully")
        res.status_code = 200 

        return res 




