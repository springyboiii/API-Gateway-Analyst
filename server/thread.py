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
    
    for i in range(10):
        # print("inside thread ....")
        # if (1 > 0):
        print("connections are there")
        socketio.emit("recvMsg",somelist[i % len(somelist)], broadcast=True)
        time.sleep(2)

# @socketio.on("message")
# def handleMessage(msg):
#     global sema 

#     # sema.acquire()
#     for i in range(10):
#         # print("inside thread ....")
#         # if (1 > 0):
#         print(f"i = {i}...")
#         # print(f"active threads = {threading.active_count()}")
#         print(f"thread name = {current_thread().name}")
#         send(somelist[i % len(somelist)], broadcast=True)
#         time.sleep(2)
    # sema.release()

thread1 = threading.Thread(target=sendMsg, args=("I",))
thread1.start()

# def printline(msg):
#     for i in range(5):
#         print("thread working")
#         time.sleep(2)

# thread2 = threading.Thread(target=printline, args=("I",))
# thread2.start()

if __name__ == "__main__":
    print("Starting Python Flask Server for API Gateway Analyst")

    socketio.run(app)
    
    