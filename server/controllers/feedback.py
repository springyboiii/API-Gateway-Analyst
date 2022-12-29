from flask import jsonify, request
from flask_pymongo import ObjectId
from util.Constant import Constant 


from models.Feedback import Feedback, FeedbackSchema
from models.Admin import Admin

from bson.json_util import dumps 

class FeedbackController:
    
    def markReadFeedback(currentUser, feedbackId):
        roles = Constant.getRoles()

        if currentUser["type"] != roles["admin"]: 
            res = jsonify("Access denied.")
            res.status_code = 403 
            return res 
        
        result = Admin.markReadFeedback({"_id": ObjectId(currentUser["_id"]), "feedbacks.feedbackId": ObjectId(feedbackId)})
        if (result):
            res = jsonify("Feedback marked read successfully.")
            res.status_code = 200
            return res 
        else:
            res = jsonify("Feedback marked read failed.")
            res.status_code = 500
            return res 

    def getAllFeedbacks(currentUser): 
        roles = Constant.getRoles()

        if currentUser["type"] != roles["admin"]: 
            res = jsonify("Access denied.")
            res.status_code = 403 
            return res 

        feedbackIds = Admin.find({
            "_id": ObjectId(currentUser["_id"]),
        }, {"feedbacks": 1, "_id": 0})

        feedbackIdObjs = feedbackIds[0]["feedbacks"]
        
        for feedbackIdObj in feedbackIdObjs: 

            feedback = Feedback.findOne({"_id": feedbackIdObj["feedbackId"]}, {"_id":0, "message": 1})

            feedbackIdObj["message"] = feedback["message"]
        
        return dumps({"feedbacks": feedbackIdObjs})

    def getUnreadFeedbacks(currentUser): 
        # output : {"feedbacks": [{...}]}
        roles = Constant.getRoles()

        if currentUser["type"] != roles["admin"]: 
            res = jsonify("Access denied.")
            res.status_code = 403 
            return res 

        # unreadFeedbackIds = Admin.find({
        #     "_id": ObjectId(currentUser["_id"]),
        # }, {"feedbacks": 1, "_id": 0})
                
        # listUnreadFeedbackIds = list(unreadFeedbackIds)

        # result = []

        # if len(listUnreadFeedbackIds) > 0: 

        #     unreadFeedbackIdObjs = listUnreadFeedbackIds[0]["feedbacks"]

        #     for unreadFeedbackIdObj in unreadFeedbackIdObjs: 
        #         if unreadFeedbackIdObj["checked"] == False: 
        #             feedback = Feedback.findOne({"_id": unreadFeedbackIdObj["feedbackId"]}, {"_id":0, "message": 1})

        #             unreadFeedbackIdObj["message"] = feedback["message"]
        #             result.append({"feedbackId": unreadFeedbackIdObj["feedbackId"], "message": feedback["message"], "checked":  unreadFeedbackIdObj["checked"]})
            
        #     return dumps({"unreadFeedbacks": result})
        # else:
        #     return jsonify({"unreadFeedbacks": []})

        result = Admin.findUnreadFeedbacksOfAdmin(ObjectId(currentUser["_id"]))

        return dumps(result)

    def insertFeedback(currentUser, request):
        roles = Constant.getRoles()

        if currentUser["type"] != roles["user"]:
            res = jsonify("Access denied.")
            res.status_code = 403 
            return res 
        
        # validate request
        data = request.json
        
        data["userId"] = currentUser["_id"]
        errors = FeedbackSchema().validate(data)
        if errors:
            print(errors)
            res = jsonify(list(errors.values())[0][0])
            res.status_code = 400  
            return res 
        
        # convert userId into ObjectId 
        data["userId"] = ObjectId(data["userId"])

        # store feedback
        feedbackObj = Feedback(data)
        feedbackId = feedbackObj.save().inserted_id 

        feedbackDetails = {
            "feedbackId": feedbackId,
            "message": feedbackObj.message
        }

        # store to feedbackAdmin as well
        admins = Admin.find(projections={})
        for admin in admins: 
            # print(admin)
            Admin.insertFeedback({"_id":admin.get("_id")}, feedbackDetails)

        res = jsonify("feedback added successfully")
        res.status_code = 200         
         
        return res


        
