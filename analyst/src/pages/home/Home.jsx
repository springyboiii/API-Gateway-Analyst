import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";

import io from "socket.io-client";
import { useState, useEffect } from "react";

let socket;

const Home = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    // e.preventDefault();
    socket.emit("sendMsg", { message: "hello" });
  };

  useEffect(() => {
    socket = io.connect("http://127.0.0.1:5000/");
    socket.on("connect", function () {
      socket.send("a");
    });

    socket.on("recvMsg", (data) => {
      setMessages([...messages, data]);
      console.log(messages);
    });

    return () => {
      socket.off("data", () => {
        console.log("data event was removed");
      });
    };
  }, [socket, messages]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        Main Dashboard
        <div className="test">
          <input type="text" placeholder="message" />
          <button onClick={sendMessage}>Send message</button>

          <ul>
            {messages.map((message, index) => {
              return <li key={index}>{message}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
