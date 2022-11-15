import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import DescriptiveAnalysis from "./pages/descriptive-analysis/DescriptiveAnalysis";
import ExploratoryAnalysis from "./pages/exploratory-analysis/ExploratoryAnalysis";
import Prediction from "./pages/prediction/Prediction";

import io from "socket.io-client";
import { useEffect } from "react";

function App() {
    // socket.on("connect", function () {
    //     console.log("connecting");
    //     socket.send("a");
    // });

    // socket.on("message", (data) => {
    //     // console.log("sending ");
    //     console.log(data);
    //     socket.send("a");
    // });

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
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
                <Route path="prediction" element={<Prediction />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
