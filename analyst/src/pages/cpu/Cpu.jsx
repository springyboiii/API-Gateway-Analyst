import React from "react";
import "./Cpu.scss";
// import Sidebar from "../../components/sidebar/Sidebar";
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
function Cpu() {
  const [user_pct_data, set_user_pct_data] = useState({datasets: [],});
  const [user_pct_options, set_user_pct_options] = useState({});

  const [system_pct_data, set_system_pct_data] = useState({datasets: [],});
  const [system_pct_options, set_system_pct_options] = useState({});

  const [idle_pct_data, set_idle_pct_data] = useState({datasets: [],});
  const [idle_pct_options, set_idle_pct_options] = useState({});

  const [iowait_pct_data, set_iowait_pct_data] = useState({datasets: [],});
  const [iowait_pct_options, set_iowait_pct_options] = useState({});

  const [softirq_pct_data, set_softirq_pct_data] = useState({datasets: [],});
  const [softirq_pct_options, set_softirq_pct_options] = useState({});

  const [total_pct_data, set_total_pct_data] = useState({datasets: [],});
  const [total_pct_options, set_total_pct_options] = useState({});

  useEffect(() => {
    axios({
      method: "GET",
      url: "/user_pct_data",
    })
      .then((response) => {
        // console.log(response);
        const res = response.data;
        set_user_pct_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: false,
              // label: 'system_cpu_user_pct',
              data: res.system_cpu_user_pct,
              borderColor: "rgb(53, 162, 235)",
              // backgroundColor: "rgba(53, 162, 235, 0.5)",
              // tension: 0.4,
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
          text: "system_cpu_user_pct",
        },
      },
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 1,
        },
      },
    });

    axios({
      method: "GET",
      url: "/system_pct_data",
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        set_system_pct_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: true,
              // label: 'system_cpu_user_pct',
              data: res.system_cpu_system_pct,
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

    set_system_pct_options({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "System_cpu_system_pct",
        },
      },
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 0.1,
        },
      },
    });

    axios({
      method: "GET",
      url: "/idle_pct_data",
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        set_idle_pct_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: true,
              // label: 'system_cpu_user_pct',
              data: res.system_cpu_idle_pct,
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

    set_idle_pct_options({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "System_cpu_idle_pct",
        },
      },
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 0.1,
        },
      },
    });

    axios({
      method: "GET",
      url: "/iowait_pct_data",
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        set_iowait_pct_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: true,
              // label: 'system_cpu_user_pct',
              data: res.system_cpu_iowait_pct,
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

    set_iowait_pct_options({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "System_cpu_iowait_pct",
        },
      },
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 0.1,
        },
      },
    });

    axios({
      method: "GET",
      url: "/softirq_pct_data",
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        set_softirq_pct_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: true,
              // label: 'system_cpu_user_pct',
              data: res.system_cpu_softirq_pct,
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

    set_softirq_pct_options({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "System_cpu_softirq_pct",
        },
      },
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 0.1,
        },
      },
    });

    axios({
      method: "GET",
      url: "/total_pct_data",
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        console.log(res.system_cpu_total_pct)
        set_total_pct_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: true,
              // label: 'system_cpu_user_pct',
              data: res.system_cpu_total_pct,
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

    set_total_pct_options({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "System_cpu_total_pct",
        },
      },
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 0.1,
        },
      },
    });



  }, []);
  return (
    <div className="Cpu">
      {/* <Sidebar /> */}
      <div className="Cpu-container">
        {/* <Navbar />
        <div className="rows">
          <div className="row">
            <div className="area-container">
              <Line options={user_pct_options} data={user_pct_data} />
            </div>
            <div className="area-container">
              <Line options={idle_pct_options} data={idle_pct_data} />
            </div>
            <div className="area-container">
              <Line options={iowait_pct_options} data={iowait_pct_data} />
            </div>
          </div>
          <div className="row">
            <div className="area-container">
              <Line options={system_pct_options} data={system_pct_data} />
            </div>
            <div className="area-container">
              <Line options={softirq_pct_options} data={softirq_pct_data} />
            </div>
            <div className="area-container">
              <Line options={total_pct_options} data={total_pct_data} />
            </div>
          </div>
        </div> */}
        <Line options={user_pct_options} data={user_pct_data} />
        <Line options={idle_pct_options} data={idle_pct_data} />
        <Line options={iowait_pct_options} data={iowait_pct_data} />
        <Line options={system_pct_options} data={system_pct_data} />
        <Line options={softirq_pct_options} data={softirq_pct_data} />

        <Line options={total_pct_options} data={total_pct_data} />

      </div>
    </div>
  );
}

export default Cpu;