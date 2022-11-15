from flask import Flask, request, jsonify 
from flask_pymongo import PyMongo, ObjectId 
from flask_cors import CORS 
import pymongo

from controllers.predict import PredictController
from controllers.data import DataController
import certifi
ca= certifi.where()
app = Flask(__name__)
# don't hardcode passsword

mongo = pymongo.MongoClient("mongodb+srv://chathuranga123:chathuranga123@apigatewayanalystcluste.lz68ckp.mongodb.net/?retryWrites=true&w=majority",tlsCAFile=ca)
CORS(app)

db = mongo["api_gateway_analyst"]
col = db["test_cpu"]

@app.route('/', methods=["GET"])
def init():
    return "HI"

@app.route('/predict', methods=["GET"])
def predict():
    return PredictController.predictLatest(db)

@app.route('/test', methods=["GET"])
def getTestData():
    return PredictController.getTestCpuData(db)

@app.route('/preprocessed/count', methods=["GET"])
def getPreprocessedDataCount():
    return DataController.getPreprocessedDataCount(db)

@app.route('/preprocessed', methods=["GET"])
def getPreprocessedData():
    return DataController.getPreprocessedData(db)

@app.route('/profile', methods=["GET"])
def my_profile():
    # print("backend profileeeeeeeeeeeeeeeeeeeeeeee")
    # response_body = {
    #     "name": "Nagato",
    #     "about" :"Hello! I'm a full stack developer that loves python and javascript"
    # }
    # result=col.find_one({})
    count=0
    for x in col.find({},{ "type": 0 }):
        # print(x)
        count+=1
    result={"count":count}
    print(result,"Counttttttttttttttttttttttttttt")
    return result

if __name__ == "__main__":
    print("Starting Python Flask Server for API Gateway Analyst")
    app.run(debug=True)