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

                <div className="dashboardBody">
                    <h1 className="title">Descriptive Analysis</h1>
                    <div className="dashboard">
                        <iframe
                            title="graphs - Page 3"
                            width="1000"
                            height="700"
                            src="https://app.powerbi.com/view?r=eyJrIjoiOTk3MTJkNjYtOGEzNi00OWQzLTk0ZGYtZTk0Mjk3NGUwZjU4IiwidCI6ImFhYzBjNTY0LTZjNWUtNGIwNS04ZGMzLTQwODA4N2Y3N2Y3NiIsImMiOjEwfQ%3D%3D"
                            frameborder="0"
                            allowFullScreen="true"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DescriptiveAnalysis;
