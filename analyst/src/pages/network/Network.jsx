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
import Select from "react-select";
import Wrapper from "../../assets/wrappers/ChartContainer";
import { getMinOfPreprocessedCol, getMaxOfPreprocessedCol, getAvgOfPreprocessedCol, getAvgOfPreprocessedColAnomalies, getAvgOfPreprocessedColNonAnomalies } from "../../services/dataService";

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

  const options = [
    { value: "DEFAULT", label: "30m" },
    { value: "1h", label: "1h " },
    { value: "2h", label: "2h" },
    { value: "4h", label: "4h " },
  ];

  const [selectedOption, setSelectedOption] = useState("30m");
  const [avg_network_in_bytes_data, set_avg_network_in_bytes_data] = useState();
  const [avg_network_in_packets_data, set_avg_network_in_packets_data] = useState();
  const [avg_network_in_dropped_data, set_avg_network_in_dropped_data] = useState();
  const [avg_network_out_bytes_data, set_avg_network_out_bytes_data] = useState();
  const [avg_network_out_packets_data, set_avg_network_out_packets_data] = useState();
  const [avg_network_out_errors_data, set_avg_network_out_errors_data] = useState();

  const [avg_network_in_bytes_data_ano, set_avg_network_in_bytes_data_ano] = useState();
  const [avg_network_in_packets_data_ano, set_avg_network_in_packets_data_ano] = useState();
  const [avg_network_in_dropped_data_ano, set_avg_network_in_dropped_data_ano] = useState();
  const [avg_network_out_bytes_data_ano, set_avg_network_out_bytes_data_ano] = useState();
  const [avg_network_out_packets_data_ano, set_avg_network_out_packets_data_ano] = useState();
  const [avg_network_out_errors_data_ano, set_avg_network_out_errors_data_ano] = useState();

  const avg_color = "rgba(56, 231, 19, 0.8)";
  const avg_color_ano = "rgba(230, 0, 0, 0.8)";
  const handleChange = (value) => {
    axios.post("/network_in_bytes", {
      data: value
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        var thresholdHighArray = new Array(response.data.system_network_in_bytes.length).fill(avg_network_in_bytes_data);
        var thresholdHighArrayAno = new Array(response.data.system_network_in_bytes.length).fill(avg_network_in_bytes_data_ano);
        set_network_in_bytes_data({
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
              label: 'system_network_in_bytes',
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

    axios.post("/network_in_packets", {
      data: value
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        var thresholdHighArray = new Array(response.data.system_network_in_packets.length).fill(avg_network_in_packets_data);
        var thresholdHighArrayAno = new Array(response.data.system_network_in_packets.length).fill(avg_network_in_packets_data_ano);
        set_network_in_packets_data({
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
              label: 'system_network_in_packets',
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

    axios.post("/network_in_dropped", {
      data: value
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        var thresholdHighArray = new Array(response.data.system_network_in_dropped.length).fill(avg_network_in_dropped_data);
        var thresholdHighArrayAno = new Array(response.data.system_network_in_dropped.length).fill(avg_network_in_dropped_data_ano);
        set_network_in_dropped_data({
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
              label: 'system_network_in_dropped',
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
    axios.post("/network_out_bytes", {
      data: value
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        var thresholdHighArray = new Array(response.data.system_network_out_bytes.length).fill(avg_network_out_bytes_data);
        var thresholdHighArrayAno = new Array(response.data.system_network_out_bytes.length).fill(avg_network_out_bytes_data_ano);
        set_network_out_bytes_data({
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
              label: 'system_network_out_bytes',
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

    axios.post("/network_out_packets", {
      data: value
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        var thresholdHighArray = new Array(response.data.system_network_out_packets.length).fill(avg_network_out_packets_data);
        var thresholdHighArrayAno = new Array(response.data.system_network_out_packets.length).fill(avg_network_out_packets_data_ano);
        set_network_out_packets_data({
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
              label: 'system_network_out_packets',
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

    axios.post("/network_out_errors", {
      data: value
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        var thresholdHighArray = new Array(response.data.system_network_out_errors.length).fill(avg_network_out_errors_data);
        var thresholdHighArrayAno = new Array(response.data.system_network_out_errors.length).fill(avg_network_out_errors_data_ano); set_network_out_errors_data({
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
              label: 'system_network_out_errors',
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
    return;
  }

  useEffect(() => {
    handleChange(null)
    async function fetchdata() {

      const { data: allNotifications } = await getAvgOfPreprocessedColNonAnomalies("system_network_in_bytes");
      set_avg_network_in_bytes_data(allNotifications[0]["avgValue"])
      const { data: system_pct } = await getAvgOfPreprocessedColNonAnomalies("system_network_in_packets");
      set_avg_network_in_packets_data(system_pct[0]["avgValue"])
      const { data: idle_pct } = await getAvgOfPreprocessedColNonAnomalies("system_network_in_dropped");
      set_avg_network_in_dropped_data(idle_pct[0]["avgValue"])
      const { data: softirq_pct } = await getAvgOfPreprocessedColNonAnomalies("system_network_out_bytes");
      set_avg_network_out_bytes_data(softirq_pct[0]["avgValue"])
      const { data: total_pct } = await getAvgOfPreprocessedColNonAnomalies("system_network_out_packets");
      set_avg_network_out_packets_data(total_pct[0]["avgValue"])
      const { data: iowait_pct } = await getAvgOfPreprocessedColNonAnomalies("system_network_out_errors");
      set_avg_network_out_errors_data(iowait_pct[0]["avgValue"])

      const { data: allNotificationsAno } = await getAvgOfPreprocessedColAnomalies("system_network_in_bytes");
      set_avg_network_in_bytes_data_ano(allNotificationsAno[0]["avgValue"])
      const { data: system_pct_ano } = await getAvgOfPreprocessedColAnomalies("system_network_in_packets");
      set_avg_network_in_packets_data_ano(system_pct_ano[0]["avgValue"])
      const { data: idle_pct_ano } = await getAvgOfPreprocessedColAnomalies("system_network_in_dropped");
      set_avg_network_in_dropped_data_ano(idle_pct_ano[0]["avgValue"])
      const { data: softirq_pctidle_pct_ano } = await getAvgOfPreprocessedColAnomalies("system_network_out_bytes");
      set_avg_network_out_bytes_data_ano(softirq_pctidle_pct_ano[0]["avgValue"])
      const { data: total_pctidle_pct_ano } = await getAvgOfPreprocessedColAnomalies("system_network_out_packets");
      set_avg_network_out_packets_data_ano(total_pctidle_pct_ano[0]["avgValue"])
      const { data: iowait_pct_ano } = await getAvgOfPreprocessedColAnomalies("system_network_out_errors");
      set_avg_network_out_errors_data_ano(iowait_pct_ano[0]["avgValue"])

    }

    fetchdata()

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
        // y: {
        //   // suggestedMin: 0,
        //   // suggestedMax: 1,
        // },
      },
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
        // y: {
        //   // suggestedMin: 0,
        //   // suggestedMax: 0.1,
        // },
      },
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
        // y: {
        //   // suggestedMin: 0,
        //   // suggestedMax: 0.1,
        // },
      },
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
        // y: {
        //   // suggestedMin: 0,
        //   // suggestedMax: 0.1,
        // },
      },
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
        // y: {
        //   // suggestedMin: 0,
        //   // suggestedMax: 0.1,
        // },
      },
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
      // scales: {
      //   // y: {
      //   //   // suggestedMin: 0,
      //   //   // suggestedMax: 0.1,
      //   // },
      // },
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
          <Line options={network_in_bytes_options} data={network_in_bytes_data} />
          <Line options={network_in_packets_options} data={network_in_packets_data} />
          <Line options={network_in_dropped_options} data={network_in_dropped_data} />
        </div>
        <div className="column">
          <Line options={network_out_bytes_options} data={network_out_bytes_data} />
          <Line options={network_out_packets_options} data={network_out_packets_data} />
          <Line options={network_out_errors_options} data={network_out_errors_data} />
        </div>

      </div>
    </Wrapper>


  );
}

export default Network;