import React from "react";
// import "./Cpu.scss";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import Select from "react-select";
import Wrapper from "../../assets/wrappers/ChartContainer";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { getMinOfPreprocessedCol,getMaxOfPreprocessedCol } from "../../services/dataService";

import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  BarElement,
  Filler
);
function Cpu() {
  const [user_pct_data, set_user_pct_data] = useState({ datasets: [], });
  const [user_pct_options, set_user_pct_options] = useState({});

  const [system_pct_data, set_system_pct_data] = useState({ datasets: [], });
  const [system_pct_options, set_system_pct_options] = useState({});

  const [idle_pct_data, set_idle_pct_data] = useState({ datasets: [], });
  const [idle_pct_options, set_idle_pct_options] = useState({});

  const [iowait_pct_data, set_iowait_pct_data] = useState({ datasets: [], });
  const [iowait_pct_options, set_iowait_pct_options] = useState({});

  const [softirq_pct_data, set_softirq_pct_data] = useState({ datasets: [], });
  const [softirq_pct_options, set_softirq_pct_options] = useState({});

  const [total_pct_data, set_total_pct_data] = useState({ datasets: [], });
  const [total_pct_options, set_total_pct_options] = useState({});

  const options = [
    { value: "DEFAULT", label: "30m" },
    { value: "1h", label: "1h " },
    { value: "2h", label: "2h" },
    { value: "4h", label: "4h " },
  ];

  const [selectedOption, setSelectedOption] = useState("30m");

  const handleChange = (value) => {
    axios.post("/user_pct_data", {
      data: value,
    }).then((response) => {
      console.log(response.data)
      set_user_pct_data({
        labels: response.data.timestamp,
        datasets: [
          {
            fill: true,
            // label: 'system_cpu_user_pct',
            data: response.data.system_cpu_user_pct,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            tension: 0.4,
          },
        ],
      });
    });
    axios.post("/system_pct_data", {
      data: value,
    }
    ).then((response) => {
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
        }
      });

    axios.post("/idle_pct_data", {
      data: value
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
        }
      });
    axios.post("/idle_pct_data", {
      data: value
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
        }
      });
    axios.post("/iowait_pct_data", {
      data: value
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
        }
      });

    axios.post("/softirq_pct_data", {
      data: value
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
        }
      });

    axios.post("/total_pct_data", {
      data: value
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        // console.log(res.system_cpu_total_pct)
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
          console.log(error.response)
        }
      });
    return;

  }
  const [min_user_pct, set_min_user_pct] = useState();

  useEffect(() => {
    handleChange(null)
    async function fetchdata() {
      const {data: allNotifications} = await getMaxOfPreprocessedCol("system_cpu_user_pct");
      console.log("inaisws")
      console.log(allNotifications[0]);
      set_min_user_pct(allNotifications[0]["maxValue"])

    
  }
  fetchdata()
    set_user_pct_options({
      annotation: {
        annotations: [{
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: 2.5,
            borderColor: 'tomato',
            borderWidth: 1
        }],
        drawTime: "afterDraw" // (default)
    },
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
    <Wrapper>
      <div className="row dropdown-container">
        <div className="dropdown">
          <Select
            options={options}
            defaultValue={options}
            onChange={(e) => {
              setSelectedOption(e.value);
              // console.log(selectedOption)

              handleChange(e.value);
              console.log("e.value")
              console.log(e.value)

              console.log("selectedOption")
              console.log(selectedOption)

              // console.log("select")
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <Line options={user_pct_options} data={user_pct_data} />
          <Line options={idle_pct_options} data={idle_pct_data} />
          <Line options={iowait_pct_options} data={iowait_pct_data} />
        </div>
        <div className="column">
          <Line options={system_pct_options} data={system_pct_data} />
          <Line options={softirq_pct_options} data={softirq_pct_data} />
          <Line options={total_pct_options} data={total_pct_data} />
        </div>

      </div>
    </Wrapper>
  )
}

export default Cpu;