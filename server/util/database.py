from flask_pymongo import PyMongo, ObjectId 
import pymongo
import certifi
ca= certifi.where()

class Database(): 
    __instance = None 
    def __new__(cls):
        if (cls.__instance is None):
            cls.instance = super(Database, cls).__new__(cls)
        return cls.instance
    
    def getConnection(self):
        mongo = pymongo.MongoClient("mongodb+srv://chathuranga123:chathuranga123@apigatewayanalystcluste.lz68ckp.mongodb.net/?retryWrites=true&w=majority",tlsCAFile=ca)
        return mongo['api_gateway_analyst']
    

