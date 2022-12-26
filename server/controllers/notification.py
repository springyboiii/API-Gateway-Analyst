from flask import jsonify, request
from flask_pymongo import ObjectId
from util.Constant import Constant

from models.Notification import NotificationSchema, Notification
from models.User import User 

from bson.json_util import dumps 

class NotificationController: 

    def markReadNotification(currentUser, notificationId): 
        roles = Constant.getRoles()

        if currentUser["type"] != roles["user"]: 
            res = jsonify("Access denied.")
            res.status_code = 403 
            return res 
        
        result = User.markReadNotification({"_id": ObjectId(currentUser["_id"]), "notifications.notificationId": ObjectId(notificationId)})
        if (result): 
            res = jsonify("Notification marked read successfully.")
            res.status_code = 200
            return res 
        else:
            res = jsonify("Notification marked read failed.")
            res.status_code = 500
            return res 

    def getUnreadNotifications(currentUser): 
        roles = Constant.getRoles()

        if currentUser["type"] != roles["user"]: 
            res = jsonify("Access denied.")

            if currentUser["type"] != roles["user"]: 
                res = jsonify("Access denied.")
                res.status_code = 403 
                return res 
        
        unreadNotificationIds = User.find({
            "_id": ObjectId(currentUser["_id"]),
            "notifications.checked": False
        }, {"notifications": 1, "_id": 0})

        unreadNotificationIdObjs = unreadNotificationIds[0]["notifications"]

        # print(unreadNotificationIdObjs)
        for unreadNotificationIdObj in unreadNotificationIdObjs: 
            del unreadNotificationIdObj["checked"]
            notification = Notification.findOne({"_id": unreadNotificationIdObj["notificationId"]}, {"_id": 0, "message": 1})
            # print(f"notification: {notification}")
            unreadNotificationIdObj["message"] = notification["message"]
        
        # print(unreadNotificationIdObjs)
        return dumps({"unreadNotifications": unreadNotificationIdObjs})

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




