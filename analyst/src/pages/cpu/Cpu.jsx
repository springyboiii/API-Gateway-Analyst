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
import { getMinOfPreprocessedCol,getMaxOfPreprocessedCol ,getAvgOfPreprocessedCol, getAvgOfPreprocessedColAnomalies, getAvgOfPreprocessedColNonAnomalies} from "../../services/dataService";

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
  const [avg_user_pct, set_avg_user_pct] = useState();
  const [avg_system_pct, set_avg_system_pct] = useState();
  const [avg_idle_pct, set_avg_idle_pct] = useState();
  const [avg_softirq_pct, set_avg_softirq_pct] = useState();
  const [avg_iowait_pct, set_avg_iowait_pct] = useState();
  const [avg_total_pct, set_avg_total_pct] = useState();

  const [avg_user_pct_ano, set_avg_user_pct_ano] = useState();
  const [avg_system_pct_ano, set_avg_system_pct_ano] = useState();
  const [avg_idle_pct_ano, set_avg_idle_pct_ano] = useState();
  const [avg_softirq_pct_ano, set_avg_softirq_pct_ano] = useState();
  const [avg_iowait_pct_ano, set_avg_iowait_pct_ano] = useState();
  const [avg_total_pct_ano, set_avg_total_pct_ano] = useState();

 const avg_color="rgba(56, 231, 19, 0.8)";
 const avg_color_ano="rgba(230, 0, 0, 0.8)";
 
  const handleChange = (value) => {
    axios.post("/user_pct_data", {
      data: value,
    }).then((response) => {
      console.log(response.data)
      var thresholdHighArray = new Array(response.data.system_cpu_user_pct.length).fill(avg_user_pct);
      var thresholdHighArrayAno = new Array(response.data.system_cpu_user_pct.length).fill(avg_user_pct_ano);
      console.log(thresholdHighArrayAno)
      set_user_pct_data({
        labels: response.data.timestamp,
        datasets: [
          {
            fill: false,
            label: 'Average',
            data: thresholdHighArray,
            borderColor: avg_color,
            backgroundColor: avg_color,
            pointRadius: 1,
            pointHoverRadius:5,
            tension: 0.4,
          },
          {
            fill: false,
            label: 'Average',
            data: thresholdHighArrayAno,
            borderColor: avg_color_ano,
            backgroundColor: avg_color_ano,
            pointRadius: 1,
            pointHoverRadius:5,
            tension: 0.4,
          },
          {
            fill: true,
            label: 'user_pct',
            data: response.data.system_cpu_user_pct,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            pointRadius: 1,
            pointHoverRadius:5,
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
      var thresholdHighArray = new Array(response.data.system_cpu_system_pct.length).fill(avg_system_pct);

      set_system_pct_data({
        labels: res.timestamp,
        datasets: [
          {
            fill: false,
            label: 'Average',
            data: thresholdHighArray,
            borderColor: avg_color,
            backgroundColor: avg_color,
            pointRadius: 1,
            pointHoverRadius:5,

            tension: 0.4,
          },
          {
            fill: true,
            label: 'system_pct',
            data: res.system_cpu_system_pct,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            pointRadius: 1,
            pointHoverRadius:5,
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
        var thresholdHighArray = new Array(response.data.system_cpu_idle_pct.length).fill(avg_idle_pct);
        console.log(thresholdHighArray)
        set_idle_pct_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: false,
              label: 'Average',
              data: thresholdHighArray,
              borderColor: avg_color,
              backgroundColor: avg_color,
              pointRadius: 1,
              pointHoverRadius:5,
  
              tension: 0.4,
            },
            {
              fill: true,
              label: 'idle_pct',
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
        var thresholdHighArray = new Array(response.data.system_cpu_iowait_pct.length).fill(avg_iowait_pct);

        set_iowait_pct_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: false,
              label: 'Average',
              data: thresholdHighArray,
              borderColor: avg_color,
              backgroundColor: avg_color,
              pointRadius: 1,
              pointHoverRadius:5,
  
              tension: 0.4,
            },
            {
              fill: true,
              label: 'iowait_pct',
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
        var thresholdHighArray = new Array(response.data.system_cpu_softirq_pct.length).fill(avg_softirq_pct);

        set_softirq_pct_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: false,
              label: 'Average',
              data: thresholdHighArray,
              borderColor: avg_color,
              backgroundColor:avg_color,
              pointRadius: 1,
              pointHoverRadius:5,
  
              tension: 0.4,
            },
            {
              fill: true,
              label: 'softirq_pct',
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
        var thresholdHighArray = new Array(response.data.system_cpu_total_pct.length).fill(avg_total_pct);
        set_total_pct_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: false,
              label: 'Average',
              data: thresholdHighArray,
              borderColor: avg_color,
              backgroundColor: avg_color,
              pointRadius: 1,
              pointHoverRadius:5,
  
              tension: 0.4,
            },
            {
              fill: true,
              label: 'total_pct',
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



  useEffect(() => {
    async function fetchdata() {
      // const {data: allNotifications} = await getAvgOfPreprocessedCol("system_cpu_user_pct");
      // set_avg_user_pct(allNotifications[0]["avgValue"])
      // const {data: system_pct} = await getAvgOfPreprocessedCol("system_cpu_system_pct");
      // set_avg_system_pct(system_pct[0]["avgValue"])
      // const {data: idle_pct} = await getAvgOfPreprocessedCol("system_cpu_idle_pct");
      // set_avg_idle_pct(idle_pct[0]["avgValue"])
      // const {data: softirq_pct} = await getAvgOfPreprocessedCol("system_cpu_softirq_pct");
      // set_avg_softirq_pct(softirq_pct[0]["avgValue"])
      // const {data: total_pct} = await getAvgOfPreprocessedCol("system_cpu_total_pct");
      // set_avg_total_pct(total_pct[0]["avgValue"])
      // const {data: iowait_pct} = await getAvgOfPreprocessedCol("system_cpu_iowait_pct");
      // set_avg_iowait_pct(iowait_pct[0]["avgValue"])

      const {data: normal_value} = await getAvgOfPreprocessedCol("system_cpu_user_pct");
      console.log("result", normal_value[0]["avgValue"])
      const {data: anomaly_value} = await getAvgOfPreprocessedColAnomalies("system_cpu_user_pct");
      console.log("result", anomaly_value[0]["avgValue"])
      const {data: non_anomaly_value} = await getAvgOfPreprocessedColNonAnomalies("system_cpu_user_pct");
      console.log("result", non_anomaly_value[0]["avgValue"])
  }

  fetchdata()

  
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
        tooltips: {
          mode: 'index',
          intersect: true
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

    handleChange(null)


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
          <Line options={total_pct_options} data={total_pct_data} />

        </div>
        <div className="column">
          <Line options={system_pct_options} data={system_pct_data} />
          <Line options={softirq_pct_options} data={softirq_pct_data} />
          <Line options={iowait_pct_options} data={iowait_pct_data} />

        </div>

      </div>
    </Wrapper>
  )
}

export default Cpu;