from flask import Flask, request, jsonify 
from flask_pymongo import PyMongo, ObjectId 
from flask_cors import CORS 
import pymongo

from controllers.predict import PredictController
from controllers.data import DataController

app = Flask(__name__)
# don't hardcode passsword
mongo = pymongo.MongoClient("mongodb+srv://chathuranga123:chathuranga123@apigatewayanalystcluste.lz68ckp.mongodb.net/?retryWrites=true&w=majority")

CORS(app)

db = mongo["api_gateway_analyst"]
col = db["test_cpu"]

@app.route('/', methods=["GET"])
def init():
    print(col.find_one())
    # print(col.find_one())
    print("ASDasdasdasdas")
    return "hi"

@app.route('/predict', methods=["GET"])
def predict():
    pass

# @app.route('/test', methods=["GET"])
# def getTestData():
#     return PredictController.getTestCpuData(db)

# @app.route('/preprocessed', methods=["GET"])
# def getPreprocessedData():
#     return DataController.getPreprocessedData(db)

if __name__ == "__main__":
    print("Starting Python Flask Server for API Gateway Analyst")
    app.run(debug=True)