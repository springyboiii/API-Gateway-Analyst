import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./descriptive-analysis.scss";

const DescriptiveAnalysis = () => {
    return (
        <div className="descriptiveAnalysis">
            <Sidebar />
            <div className="descriptiveAnalysisContainer">
                <Navbar />
                <p>descriptive analysis</p>
            </div>
        </div>
    );
};

export default DescriptiveAnalysis;
