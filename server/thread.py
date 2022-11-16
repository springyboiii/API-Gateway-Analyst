from flask import Flask, request, jsonify, render_template

import time 
import threading 
from threading import Semaphore, current_thread

from random import random 
from flask_cors import CORS 

from flask_socketio import SocketIO, emit, send

# import socket 
# import threading
# import time

app = Flask(__name__)
app.config['SECRET_KEY']='bruh'
# app.config['DEBUG']=False
socketio = SocketIO(app, cors_allowed_origins="*")

CORS(app)

# socket connections 
connections = 0

print(f"active threads start = {threading.active_count()}")
@socketio.on("connect")
def testConnect():
    global connections
    print("Connected")
    connections += 1
    # handleMessage("hi")


# @socketio.on("disconnect")
# def testDisconnect():
#     global connections
#     print("Client disconnected")
#     connections -=1

# i=0
somelist = ["hello","u","there","I","love","you"]

@socketio.on("sendMsg")
def sendMsg(msg):
    global i 
    global connections
    global socketio
    global somelist

    print("before")
    # for thread in threading.enumerate(): 
    #     print(thread.name)
    for i in range(10):
        # print("inside thread ....")
        if (connections > 0):
            socketio.emit("recvMsg", str(i), broadcast=True)
            time.sleep(2)
    print("after")
    for thread in threading.enumerate(): 
        print(thread.name)

thread1 = threading.Thread(target=sendMsg, args=("I",))
thread1.start()

if __name__ == "__main__":
    print("Starting Python Flask Server for API Gateway Analyst")


    socketio.run(app, debug=False)
    
    