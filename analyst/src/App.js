import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import DescriptiveAnalysis from "./pages/descriptive-analysis/DescriptiveAnalysis";
import ExploratoryAnalysis from "./pages/exploratory-analysis/ExploratoryAnalysis";
import Prediction from "./pages/prediction/Prediction";

import { io } from "socket.io-client";
import { useEffect, useState } from "react";

import Cpu from "./pages/cpu/Cpu";
import Memory from "./pages/memory/Memory";
import Disk from "./pages/disk/Disk";
import Jvm from "./pages/jvm/Jvm";
import Network from "./pages/network/Network";
function App() {
  const [socketInstance, setSocketInstance] = useState("");
  // const [loading, setLoading] = useState(true);
  // const [showPrediction, setShowPrediction] = useState(false);

  // useEffect(() => {
  //   if (showPrediction === true) {
  //     const socket = io("http://127.0.0.1:5000/", {
  //       // transports: ["websocket"],
  //       cors: {
  //         origin: "http://localhost:3000/",
  //       },
  //     });

  //     setSocketInstance(socket);

  //     socket.on("connect", (data) => {
  //       console.log(data);
  //     });

  //     setLoading(false);

  //     socket.on("disconnect", (data) => {
  //       console.log(data);
  //     });

  //     return function cleanup() {
  //       socket.disconnect();
  //     };
  //   }
  // }, [buttonStatus]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home socket={socketInstance} />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="users">
          {/* <Route index element={<List />} />
                    <Route path=":userId" element={<Single />} /> */}
                </Route>
                <Route
                    path="descriptive-analysis"
                    element={<DescriptiveAnalysis />}
                />
                <Route
                    path="exploratory-analysis"
                    element={<ExploratoryAnalysis />}
                />
                <Route
                    path="Cpu"
                    element={<Cpu />}
                />
                <Route
                    path="memory"
                    element={<Memory />}
                />
                <Route
                    path="disk"
                    element={<Disk />}
                />
                <Route
                    path="jvm"
                    element={<Jvm />}
                />
                 <Route
                    path="network"
                    element={<Network />}
                />
                <Route path="prediction" element={<Prediction />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
