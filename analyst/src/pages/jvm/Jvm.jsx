import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { getMinOfPreprocessedCol,getMaxOfPreprocessedCol ,getAvgOfPreprocessedCol, getAvgOfPreprocessedColAnomalies, getAvgOfPreprocessedColNonAnomalies} from "../../services/dataService";

import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
} from "chart.js";
import Select from "react-select";
import '../cpu/Cpu'
import Wrapper from "../../assets/wrappers/ChartContainer";
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
function Jvm() {
  const [psms_collection_count_data, set_psms_collection_count_data] = useState({
    datasets: [],
  });
  const [psms_collection_count_options, set_psms_collection_count_options] = useState({});

  const [psms_collection_time_data, set_psms_collection_time_data] = useState({
    datasets: [],
  });
  const [psms_collection_time_options, set_psms_collection_time_options] = useState({});

  const [pss_collection_count_data, set_pss_collection_count_data] = useState({
    datasets: [],
  });
  const [pss_collection_count_options, set_pss_collection_count_options] = useState({});

  const [pss_collection_time_data, set_pss_collection_time_data] = useState({
    datasets: [],
  });
  const [pss_collection_time_options, set_pss_collection_time_options] = useState({});

  const options = [
    { value: "DEFAULT", label: "30m" },
    { value: "1h", label: "1h " },
    { value: "2h", label: "2h" },
    { value: "4h", label: "4h " },
  ];

  const [selectedOption, setSelectedOption] = useState("30m");
  const [avg_psms_collection_count, set_avg_psms_collection_count] = useState();
  const [avg_psms_collection_time, set_avg_psms_collection_time] = useState();
  const [avg_pss_collection_time, set_avg_pss_collection_time] = useState();

  const [avg_psms_collection_count_ano, set_avg_psms_collection_count_ano] = useState();
  const [avg_psms_collection_time_ano, set_avg_psms_collection_time_ano] = useState();
  const [avg_pss_collection_time_ano, set_avg_pss_collection_time_ano] = useState();

  const avg_color = "rgba(56, 231, 19, 0.8)";
  const avg_color_ano = "rgba(230, 0, 0, 0.8)";

  const handleChange = (value) => {
    axios.post("/psms_collection_count", {
      data: value
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        var thresholdHighArray = new Array(response.data.system_cpu_user_pct.length).fill(avg_psms_collection_count);
        var thresholdHighArrayAno = new Array(response.data.system_cpu_user_pct.length).fill(avg_psms_collection_count_ano);
        set_psms_collection_count_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: false,
              label: 'Average normal',
              data: thresholdHighArray,
              borderColor: avg_color,
              backgroundColor: avg_color,
              pointRadius: 1,
              pointHoverRadius: 5,
              tension: 0.4,
            },
            {
              fill: false,
              label: 'Average anomaly',
              data: thresholdHighArrayAno,
              borderColor: avg_color_ano,
              backgroundColor: avg_color_ano,
              pointRadius: 1,
              pointHoverRadius: 5,
              tension: 0.4,
            },
            {
              fill: true,
              label: 'jvm_metrics_gc_psms_collection_count',
              data: res.jvm_metrics_gc_psms_collection_count,
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

    axios.post("/psms_collection_time", {
      data: value
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        var thresholdHighArray = new Array(response.data.system_cpu_user_pct.length).fill(avg_psms_collection_time);
        var thresholdHighArrayAno = new Array(response.data.system_cpu_user_pct.length).fill(avg_psms_collection_time_ano);
        set_psms_collection_time_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: true,
              // label: 'jvm_metrics_gc_psms_collection_time',
              data: res.jvm_metrics_gc_psms_collection_time,
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


    axios.post("/pss_collection_time", {
      data: value
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        var thresholdHighArray = new Array(response.data.system_cpu_user_pct.length).fill(avg_pss_collection_time);
        var thresholdHighArrayAno = new Array(response.data.system_cpu_user_pct.length).fill(avg_pss_collection_time_ano);
        set_pss_collection_time_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: false,
              label: 'Average normal',
              data: thresholdHighArray,
              borderColor: avg_color,
              backgroundColor: avg_color,
              pointRadius: 1,
              pointHoverRadius: 5,
              tension: 0.4,
            },
            {
              fill: false,
              label: 'Average anomaly',
              data: thresholdHighArrayAno,
              borderColor: avg_color_ano,
              backgroundColor: avg_color_ano,
              pointRadius: 1,
              pointHoverRadius: 5,
              tension: 0.4,
            },
            {
              fill: true,
              // label: 'jvm_metrics_gc_pss_collection_time',
              data: res.jvm_metrics_gc_pss_collection_time,
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


    axios.post("/pss_collection_count", {
      data: value
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        set_pss_collection_count_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: true,
              // label: 'jvm_metric_gc_pss_collection_count',
              data: res.jvm_metric_gc_pss_collection_count,
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


    return;
  }
  useEffect(() => {
    async function fetchdata() {
      const { data: allNotifications } = await getAvgOfPreprocessedColNonAnomalies("system_cpu_user_pct");
      set_avg_psms_collection_count(allNotifications[0]["avgValue"])
      // console.log(allNotifications[0]["avgValue"])

      const { data: system_pct } = await getAvgOfPreprocessedColNonAnomalies("system_cpu_system_pct");
      set_avg_psms_collection_time(system_pct[0]["avgValue"])
      const { data: idle_pct } = await getAvgOfPreprocessedColNonAnomalies("system_cpu_idle_pct");
      set_avg_pss_collection_time(idle_pct[0]["avgValue"])
      const { data: softirq_pct } = await getAvgOfPreprocessedColNonAnomalies("system_cpu_softirq_pct");
      

      const { data: allNotificationsAno } = await getAvgOfPreprocessedColAnomalies("system_cpu_user_pct");
      set_avg_psms_collection_count_ano(allNotificationsAno[0]["avgValue"])
      // console.log(allNotificationsAno[0]["avgValue"])
      const { data: system_pct_ano } = await getAvgOfPreprocessedColAnomalies("system_cpu_system_pct");
      set_avg_psms_collection_time_ano(system_pct_ano[0]["avgValue"])
      const { data: idle_pct_ano } = await getAvgOfPreprocessedColAnomalies("system_cpu_idle_pct");
      set_avg_pss_collection_time_ano(idle_pct_ano[0]["avgValue"])
      const { data: softirq_pctidle_pct_ano } = await getAvgOfPreprocessedColAnomalies("system_cpu_softirq_pct");
    
    }

    fetchdata()

    set_psms_collection_count_options({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "jvm_metrics_gc_psms_collection_count",
        },
      },
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 1,
        },
      },
    });


    set_psms_collection_time_options({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "jvm_metrics_gc_psms_collection_time",
        },
      },
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 0.1,
        },
      },
    });


    set_pss_collection_count_options({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "jvm_metric_gc_pss_collection_count",
        },
      },
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 0.1,
        },
      },
    });



    set_pss_collection_time_options({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "jvm_metrics_gc_pss_collection_time",
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
              handleChange(e.value);
              console.log("e.value")
              console.log(e.value)

              console.log("selectedOption")
              console.log(selectedOption)
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="column">
          <Line options={psms_collection_count_options} data={psms_collection_count_data} />
          <Line options={psms_collection_time_options} data={psms_collection_time_data} />
        </div>
        <div className="column">
          {/* <Line options={pss_collection_count_options} data={pss_collection_count_data} /> */}
          <Line options={pss_collection_time_options} data={pss_collection_time_data} />
        </div>

      </div>
    </Wrapper>
  );
}

export default Jvm;
