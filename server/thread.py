# from flask import Flask, request, jsonify, render_template

# import time 
# import threading 

# from flask_cors import CORS 

# from flask_socketio import SocketIO, emit, send

# app = Flask(__name__)
# app.config['SECRET_KEY']='bruh'

# CORS(app, resources={r"/*":{"origins":"*"}})
# socketio = SocketIO(app, cors_allowed_origins="*")

# @socketio.on('connect')
# def connected():
#     print(request.sid)
#     print("Client is connected")
#     emit("connect", {
#         "data":f"id:{request.sid} is connected"
#     })

# @socketio.on("disconnect")
# def disconnected():
#     print("User disconnected")
#     emit("disconnect", f"user {request.sid} hs been disconnected", broadcast=True)

# @socketio.on("data")
# def sendMsg():
#     for i in range(10):
#         socketio.emit("data", str(i), broadcast=True)
#         time.sleep(2)

# thread1 = threading.Thread(target=sendMsg)
# thread1.start()

# if __name__ == "__main__":
#     print("Starting Python Flask Server for API Gateway Analyst")


#     socketio.run(app, debug=False)
    
    