import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
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
function Network() {
  const [network_in_bytes_data, set_network_in_bytes_data] = useState({
    datasets: [],
  });
  const [network_in_bytes_options, set_network_in_bytes_options] = useState({});
  
  const [network_in_packets_data, set_network_in_packets_data] = useState({
    datasets: [],
  });
  const [network_in_packets_options, set_network_in_packets_options] = useState({});
  
  const [network_in_dropped_data, set_network_in_dropped_data] = useState({
    datasets: [],
  });
  const [network_in_dropped_options, set_network_in_dropped_options] = useState({});
  
  const [network_out_bytes_data, set_network_out_bytes_data] = useState({
    datasets: [],
  });
  const [network_out_bytes_options, set_network_out_bytes_options] = useState({});

  const [network_out_packets_data, set_network_out_packets_data] = useState({
    datasets: [],
  });
  const [network_out_packets_options, set_network_out_packets_options] = useState({});
  
  const [network_out_errors_data, set_network_out_errors_data] = useState({
    datasets: [],
  });
  const [network_out_errors_options, set_network_out_errors_options] = useState({});
  
  useEffect(() => {
    axios({
      method: "GET",
      url: "/network_in_bytes",
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        set_network_in_bytes_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: true,
              // label: 'system_network_in_bytes',
              data: res.system_network_in_bytes,
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

      set_network_in_bytes_options({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "system_network_in_bytes",
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
      url: "/network_in_packets",
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        set_network_in_packets_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: true,
              // label: 'system_network_in_packets',
              data: res.system_network_in_packets,
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

      set_network_in_packets_options({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "system_network_in_packets",
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
        url: "/network_in_dropped",
      })
        .then((response) => {
          console.log(response);
          const res = response.data;
          set_network_in_dropped_data({
            labels: res.timestamp,
            datasets: [
              {
                fill: true,
                // label: 'system_network_in_dropped',
                data: res.system_network_in_dropped,
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
  
        set_network_in_dropped_options({
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "system_network_in_dropped",
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
        url: "/network_out_bytes",
      })
        .then((response) => {
          console.log(response);
          const res = response.data;
          set_network_out_bytes_data({
            labels: res.timestamp,
            datasets: [
              {
                fill: true,
                // label: 'system_network_out_bytes',
                data: res.system_network_out_bytes,
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
  
        set_network_out_bytes_options({
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "system_network_out_bytes",
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
        url: "/network_out_packets",
      })
        .then((response) => {
          console.log(response);
          const res = response.data;
          set_network_out_packets_data({
            labels: res.timestamp,
            datasets: [
              {
                fill: true,
                // label: 'system_network_out_packets',
                data: res.system_network_out_packets,
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
  
        set_network_out_packets_options({
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "system_network_out_packets",
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
        url: "/network_out_errors",
      })
        .then((response) => {
          console.log(response);
          const res = response.data;
          console.log(res.system_cpu_total_pct)
          set_network_out_errors_data({
            labels: res.timestamp,
            datasets: [
              {
                fill: true,
                // label: 'system_network_out_errors',
                data: res.system_network_out_errors,
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
  
        set_network_out_errors_options({
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "system_network_out_errors",
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
      <Sidebar />
      <div className="Cpu-container">
        {/* <Navbar /> */}
        <div className="rows">
          <div className="row">
            <div className="area-container">
              <Line options={network_in_bytes_options} data={network_in_bytes_data} />
            </div>
            <div className="area-container">
              <Line options={network_in_packets_options} data={network_in_packets_data} />
            </div>
            <div className="area-container">
              <Line options={network_in_dropped_options} data={network_in_dropped_data} />
            </div>
          </div>
          <div className="row">
            <div className="area-container">
              <Line options={network_out_bytes_options} data={network_out_bytes_data} />
            </div>
            <div className="area-container">
              <Line options={network_out_packets_options} data={network_out_packets_data} />
            </div>
            <div className="area-container">
              <Line options={network_out_errors_options} data={network_out_errors_data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Network;