import React from "react";
// import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";

import { getAllFeedbacks } from "../../services/feedbackService";

import io from "socket.io-client";
import { useState, useEffect } from "react";

// const Home = ({ socket }) => {
function Home({ socket }) {
  const [messages, setMessages] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  //   const [showPrediction, setShowPrediction] = useState(false);

  //   const sendMessage = (e) => {
  //     // e.preventDefault();
  //     socket.emit("sendMsg", { message: "hello" });
  //   };
  // console.log("run from begininng")
  console.log(messages);

  useEffect(async () => {
    const { data: allFeedbacks } = await getAllFeedbacks();
    setFeedbacks((feedbacks) => [...feedbacks, allFeedbacks])
  })

  useEffect(() => {
    // http://127.0.0.1:5000/
    socket = io.connect("http://127.0.0.1:5000/");

    socket.on("connect", (data) => {
      console.log(data);
    });

    socket.on("disconnect", (data) => {
      console.log(data);
    });

    socket.on("recvMsg", (data) => {
      setMessages((messages) => [...messages, data]);
      console.log(data)
    });

    socket.on("prediction", (data) => {
      setMessages((messages) => [...messages, data['prediction']]);
      console.log(data['timestamp'])
    });

    return () => {
      socket.off("data", () => {
        console.log("data event was removed");
      });
    };
  }, []);

  return (
    <div className="home">
      {/* <Sidebar /> */}
      <div className="homeContainer">
        {/* <Navbar /> */}
        Main Dashboard
        <div className="test">
          <input type="text" placeholder="message" />
          <button>Send message</button>

          <ul>
            {messages.map((message, index) => {
              return <li key={index}>{message}</li>;
            })}
          </ul>
          <ul>
            {feedbacks.map((feedback, index) => {
              return <li key={index}>{feedback}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
