import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./exploratory-analysis.scss";

const ExploratoryAnalysis = () => {
    return (
        <div className="exploratoryAnalysis">
            <Sidebar />
            <div className="exploratoryAnalysisContainer">
                <Navbar />
                <p>exploratory analysis</p>
            </div>
        </div>
    );
};

export default ExploratoryAnalysis;
