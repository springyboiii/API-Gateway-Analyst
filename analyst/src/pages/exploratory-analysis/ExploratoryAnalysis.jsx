import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./exploratory-analysis.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import React, { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExploratoryAnalysis = () => {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    setChartData({
      labels: ["John", "Kevin", "George", "Micheal", "Oreo"],
      datasets: [
        {
          label: "Whom'st let the dogs out",
          data: [12, 55, 34, 120, 720],
          borderColor: "rgb(53,162,235)",
          backgroundColor: "rgba(53,162,235,0.4)",
        },
      ],
    });
    setChartOptions({
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: {
          display: true,
          text: "Whom'st let the dogs out",
        },
      },
    });
  }, []);
  return (
    <div className="exploratoryAnalysis">
      <Sidebar />
      <div className="exploratoryAnalysisContainer">
        <Navbar />
        <p>exploratory analysis</p>
        <Bar options={chartOptions} data={chartData}/>

      </div>
    </div>
  );
};

export default ExploratoryAnalysis;
