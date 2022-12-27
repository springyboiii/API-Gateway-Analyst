import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
} from "chart.js";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,

  Filler
);
function Memory() {
  const [user_pct_data, set_user_pct_data] = useState({
    datasets: [],
  });
  const [user_pct_options, set_user_pct_options] = useState({});
  

  useEffect(() => {
    axios({
      method: "GET",
      url: "/memory_used_pct",
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        set_user_pct_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: true,
              // label: 'system_memory_used_pct',
              data: res.system_memory_used_pct,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
              tension: 0.4,
            },
          ],
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

    set_user_pct_options({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "system_memory_used_pct",
        },
      },
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 1,
        },
      },
    });



  }, []);
  return (
    <div className="Cpu">
      {/* <Sidebar /> */}
      <div className="Cpu-container">
        {/* <Navbar /> */}
        <div className="rows">
          <div className="row">
            <div className="area-container">
              <Line options={user_pct_options} data={user_pct_data} />
            </div>
            
          </div>

        </div>
      </div>
    </div>
  );
}

export default Memory;
