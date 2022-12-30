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
function Disk() {
  const [diskio_iostat_await_data, set_diskio_iostat_await_data] = useState({
    datasets: [],
  });
  const [diskio_iostat_await_options, set_diskio_iostat_await_options] = useState({});

  const [diskio_iostat_queue_avg_size_data, set_diskio_iostat_queue_avg_size_data] = useState({
    datasets: [],
  });
  const [diskio_iostat_queue_avg_size_options, set_diskio_iostat_queue_avg_size_options] = useState({});

  const [diskio_iostat_read_per_sec_bytes_data, set_diskio_iostat_read_per_sec_bytes_data] = useState({
    datasets: [],
  });
  const [diskio_iostat_read_per_sec_bytes_options, set_diskio_iostat_read_per_sec_bytes_options] = useState({});


  const [diskio_iostat_write_per_sec_bytes_data, set_diskio_iostat_write_per_sec_bytes_data] = useState({
    datasets: [],
  });
  const [diskio_iostat_write_per_sec_bytes_options, set_diskio_iostat_write_per_sec_bytes_data_options] = useState({});

  const options = [
    { value: "DEFAULT", label: "30m" },
    { value: "1h", label: "1h " },
    { value: "2h", label: "2h" },
    { value: "4h", label: "4h " },
  ];

  const [selectedOption, setSelectedOption] = useState("30m");
  const [avg_diskio_iostat_wait_data, set_avg_diskio_iostat_wait_data] = useState();
  const [avg_diskio_iostat_queue_avg_size_data, set_avg_diskio_iostat_queue_avg_size_data] = useState();
  const [avg_diskio_iostat_read_per_sec_bytes_data, set_avg_diskio_iostat_read_per_sec_bytes_data] = useState();
  const [avg_diskio_iostat_write_per_sec_bytes_data, set_avg_diskio_iostat_write_per_sec_bytes_data] = useState();

  const [avg_diskio_iostat_wait_data_ano, set_avg_diskio_iostat_wait_data_ano] = useState();
  const [avg_diskio_iostat_queue_avg_size_data_ano, set_avg_diskio_iostat_queue_avg_size_data_ano] = useState();
  const [avg_diskio_iostat_read_per_sec_bytes_data_ano, set_avg_diskio_iostat_read_per_sec_bytes_data_ano] = useState();
  const [avg_diskio_iostat_write_per_sec_bytes_data_ano, set_avg_diskio_iostat_write_per_sec_bytes_data_ano] = useState();
 
  const avg_color="rgba(56, 231, 19, 0.8)";
  const avg_color_ano="rgba(230, 0, 0, 0.8)";
  useEffect(() => {
    async function fetchdata() {

    const {data: system_diskio_iostat_wait} = await getAvgOfPreprocessedColNonAnomalies("system_diskio_iostat_await");
      set_avg_diskio_iostat_wait_data(system_diskio_iostat_wait[0]["avgValue"])
      const {data: system_diskio_iostat_queue_avg_size} = await getAvgOfPreprocessedColNonAnomalies("system_diskio_iostat_queue_avg_size");
      set_avg_diskio_iostat_queue_avg_size_data(system_diskio_iostat_queue_avg_size[0]["avgValue"])
      const {data: system_diskio_iostat_read_per_sec_bytes} = await getAvgOfPreprocessedColNonAnomalies("system_diskio_iostat_read_per_sec_bytes");
      set_avg_diskio_iostat_read_per_sec_bytes_data(system_diskio_iostat_read_per_sec_bytes[0]["avgValue"])
      const {data: system_diskio_iostat_write_per_sec_bytes} = await getAvgOfPreprocessedColNonAnomalies("system_diskio_iostat_write_per_sec_bytes");
      set_avg_diskio_iostat_write_per_sec_bytes_data(system_diskio_iostat_write_per_sec_bytes[0]["avgValue"])
      
      const {data: system_diskio_iostat_wait_ano} = await getAvgOfPreprocessedColAnomalies("system_diskio_iostat_await");
      set_avg_diskio_iostat_wait_data_ano(system_diskio_iostat_wait_ano[0]["avgValue"])
      const {data: system_diskio_iostat_queue_avg_size_ano} = await getAvgOfPreprocessedColAnomalies("system_diskio_iostat_queue_avg_size");
      set_avg_diskio_iostat_queue_avg_size_data_ano(system_diskio_iostat_queue_avg_size_ano[0]["avgValue"])
      const {data: system_diskio_iostat_read_per_sec_bytes_ano} = await getAvgOfPreprocessedColAnomalies("system_diskio_iostat_read_per_sec_bytes");
      set_avg_diskio_iostat_read_per_sec_bytes_data_ano(system_diskio_iostat_read_per_sec_bytes_ano[0]["avgValue"])
      const {data: system_diskio_iostat_write_per_sec_bytes_ano} = await getAvgOfPreprocessedColAnomalies("system_diskio_iostat_write_per_sec_bytes");
      set_avg_diskio_iostat_write_per_sec_bytes_data_ano(system_diskio_iostat_write_per_sec_bytes_ano[0]["avgValue"])
      
    }
    fetchdata()
    handleChange(null)

    

    set_diskio_iostat_await_options({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          display: "flase"
        },
        title: {
          display: true,
          text: "system_diskio_iostat_await",
        },
      },
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 1,
        },
      },
    });

    set_diskio_iostat_queue_avg_size_options({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "system_diskio_iostat_queue_avg_size",
        },
      },
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 0.1,
        },
      },
    });

    

    set_diskio_iostat_read_per_sec_bytes_options({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "system_diskio_iostat_read_per_sec_bytes",
        },
      },
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 0.1,
        },
      },
    });


  

    set_diskio_iostat_write_per_sec_bytes_data_options({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "system_diskio_iostat_write_per_sec_bytes",
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
  const handleChange = (value) => {
    axios.post("/diskio_iostat_await", {
      data: value
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        var thresholdHighArray = new Array(response.data.system_diskio_iostat_await.length).fill(avg_diskio_iostat_wait_data);
        var thresholdHighArrayAno = new Array(response.data.system_diskio_iostat_await.length).fill(avg_diskio_iostat_wait_data_ano);
        set_diskio_iostat_await_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: false,
              label: 'Average normal',
              data: thresholdHighArray,
              borderColor: avg_color,
              backgroundColor: avg_color,
              pointRadius: 1,
              pointHoverRadius:5,
  
              tension: 0.4,
            },
            {
              fill: false,
              label: 'Average anomaly',
              data: thresholdHighArrayAno,
              borderColor: avg_color_ano,
              backgroundColor: avg_color_ano,
              pointRadius: 2,
              pointHoverRadius:5,
              tension: 0.4,
            },
            {
              fill: true,
              label: 'iostat_await',
              data: res.system_diskio_iostat_await,
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

    axios.post("/diskio_iostat_queue_avg_size", {
      data: value
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        var thresholdHighArray = new Array(response.data.system_diskio_iostat_queue_avg_size.length).fill(avg_diskio_iostat_queue_avg_size_data);
        var thresholdHighArrayAno = new Array(response.data.system_diskio_iostat_queue_avg_size.length).fill(avg_diskio_iostat_queue_avg_size_data_ano);
        set_diskio_iostat_queue_avg_size_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: false,
              label: 'Average normal',
              data: thresholdHighArray,
              borderColor: avg_color,
              backgroundColor: avg_color,
              pointRadius: 1,
              pointHoverRadius:5,
  
              tension: 0.4,
            },
            {
              fill: false,
              label: 'Average anomaly',
              data: thresholdHighArrayAno,
              borderColor: avg_color_ano,
              backgroundColor: avg_color_ano,
              pointRadius: 2,
              pointHoverRadius:5,
              tension: 0.4,
            },
            {
              fill: true,
              label: 'iostat_queue_avg_size',
              data: res.system_diskio_iostat_queue_avg_size,
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

    axios.post("/diskio_iostat_read_per_sec_bytes", {
      data: value
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        var thresholdHighArray = new Array(response.data.system_diskio_iostat_read_per_sec_bytes.length).fill(avg_diskio_iostat_read_per_sec_bytes_data);
        var thresholdHighArrayAno = new Array(response.data.system_diskio_iostat_read_per_sec_bytes.length).fill(avg_diskio_iostat_read_per_sec_bytes_data_ano);
        set_diskio_iostat_read_per_sec_bytes_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: false,
              label: 'Average normal',
              data: thresholdHighArray,
              borderColor: avg_color,
              backgroundColor: avg_color,
              pointRadius: 1,
              pointHoverRadius:5,
  
              tension: 0.4,
            },
            {
              fill: false,
              label: 'Average anomaly',
              data: thresholdHighArrayAno,
              borderColor: avg_color_ano,
              backgroundColor: avg_color_ano,
              pointRadius: 2,
              pointHoverRadius:5,
              tension: 0.4,
            },
            {
              fill: true,
              label: 'read_per_sec_bytes',
              data: res.system_diskio_iostat_read_per_sec_bytes,
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

    axios.post("/diskio_iostat_write_per_sec_bytes", {
      data: value
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        var thresholdHighArray = new Array(response.data.system_diskio_iostat_write_per_sec_bytes.length).fill(avg_diskio_iostat_write_per_sec_bytes_data);
        var thresholdHighArrayAno = new Array(response.data.system_diskio_iostat_write_per_sec_bytes.length).fill(avg_diskio_iostat_write_per_sec_bytes_data_ano);
        set_diskio_iostat_write_per_sec_bytes_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: false,
              label: 'Average normal',
              data: thresholdHighArray,
              borderColor: avg_color,
              backgroundColor: avg_color,
              pointRadius: 1,
              pointHoverRadius:5,
  
              tension: 0.4,
            },
            {
              fill: false,
              label: 'Average anomaly',
              data: thresholdHighArrayAno,
              borderColor: avg_color_ano,
              backgroundColor: avg_color_ano,
              pointRadius: 1,
              pointHoverRadius:5,
              tension: 0.4,
            },
            {
              fill: true,
              label: 'write_per_sec_bytes',
              data: res.system_diskio_iostat_write_per_sec_bytes,
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
    return;

  }

  

  return (<Wrapper>
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
        <Line options={diskio_iostat_await_options} data={diskio_iostat_await_data} />
        <Line options={diskio_iostat_queue_avg_size_options} data={diskio_iostat_queue_avg_size_data} />
      </div>
      <div className="column">
        <Line options={diskio_iostat_read_per_sec_bytes_options} data={diskio_iostat_read_per_sec_bytes_data} />
        <Line options={diskio_iostat_write_per_sec_bytes_options} data={diskio_iostat_write_per_sec_bytes_data} />
      </div>

    </div>
  </Wrapper>





  );
}

export default Disk;
