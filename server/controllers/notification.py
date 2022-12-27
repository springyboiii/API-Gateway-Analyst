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

            res = jsonify("Access denied.")
            res.status_code = 403 
            return res     
        
        notificationIds = User.find({
            "_id": ObjectId(currentUser["_id"])
        }, {"notifications": 1, "_id": 0})

        notificationIdObjs = notificationIds[0]["notifications"]

        result = []

        for notificationIdObj in notificationIdObjs: 
            if notificationIdObj["checked"] == False: 
                notification = Notification.findOne({"_id": notificationIdObj["notificationId"]}, {"_id": 0, "message": 1})
                # print(f"notification: {notification}")
                notificationIdObj["message"] = notification["message"]
                result.append({"notificationId": notificationIdObj["notificationId"], "message": notificationIdObj["message"], "checked": notificationIdObj["checked"]})
        
        return dumps({"unreadNotifications": result})

    def getAllNotifications(currentUser): 
        roles = Constant.getRoles()

        if currentUser["type"] != roles["user"]: 
            res = jsonify("Access denied.")

            if currentUser["type"] != roles["user"]: 
                res = jsonify("Access denied.")
                res.status_code = 403 
                return res 
        
        allNotificationIds = User.find({
            "_id": ObjectId(currentUser["_id"])
        }, {"notifications": 1, "_id": 0})

        allNotificationIdObjs = allNotificationIds[0]["notifications"]

        for notificationIdObj in allNotificationIdObjs: 

            notification = Notification.findOne({"_id": notificationIdObj["notificationId"]}, {"_id": 0, "message": 1})

            notificationIdObj["message"] = notification["message"]
        
        return dumps({"allNotifications": allNotificationIdObjs})

    def getSomeNotifications(currentUser, limit): 
        roles = Constant.getRoles()
        print("limit", limit )
        if currentUser["type"] != roles["user"]: 
            res = jsonify("Access denied.")
            res.status_code = 403 
            return res 
        
        notificationIds = User.find({
            "_id": ObjectId(currentUser["_id"])
        }, {"notifications": 1, "_id": 0}, limit=limit)

        notificationIdObjs = notificationIds[0]["notifications"]
        notificationIdObjs = notificationIdObjs[:limit]

        print(dumps(notificationIdObjs))
        for notificationIdObj in notificationIdObjs: 
            notification = Notification.findOne({"_id": notificationIdObj["notificationId"]}, {"_id": 0, "message": 1})
            notificationIdObj["message"] = notification["message"]
        print("finished")
        return dumps({"notifications": notificationIdObjs})

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

        return 1 




