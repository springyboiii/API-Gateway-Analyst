from flask import jsonify, request

from util.Constant import Constant 

from bson import ObjectId

from models.Feedback import Feedback, FeedbackSchema

class FeedbackController:

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
        
        # store feedback
        feedbackObj = Feedback(data)
        feedbackObj.save() 

        # store to feedbackAdmin as well
        
        res = jsonify("feedback added successfully")
        res.status_code = 200         
         
        return res


        
