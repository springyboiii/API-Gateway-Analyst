import React from "react";
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
import Select from "react-select";
import Wrapper from "../../assets/wrappers/ChartContainer";
import DataService from '../../services/dataService.js'
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

const initialDataState = {
  min: null,
  max: null,
  avgAnomally: null,
  avgNormal: null,
  avg: null,
}

function Memory() {
  const [memory_used_pct_data, set_memory_used_pct_data] = useState({
    datasets: [],
  });
  const [memory_used_pct_options, set_memory_used_pct_options] = useState({});

  const options = [
    { value: "DEFAULT", label: "30m" },
    { value: "1h", label: "1h " },
    { value: "2h", label: "2h" },
    { value: "4h", label: "4h " },
  ];
  const [selectedOption, setSelectedOption] = useState("30m");
  const [avg_memory_used_pct, set_avg_memory_used_pct] = useState();
  const [avg_memory_used_pct_ano, set_avg_memory_used_pct_ano] = useState();

  const avg_color = "rgba(56, 231, 19, 0.8)";
  const avg_color_ano = "rgba(230, 0, 0, 0.8)";

  const handleChange = (value) => {
    axios.post("/memory_used_pct", {
      data: value
    })
      .then((response) => {
        console.log(response);
        var thresholdHighArray = new Array(response.data.system_memory_used_pct.length).fill(avg_memory_used_pct);
        var thresholdHighArrayAno = new Array(response.data.system_memory_used_pct.length).fill(avg_memory_used_pct_ano);
        const res = response.data;

        set_memory_used_pct_data({
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
              label: 'system_memory_used_pct',
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
        }
      });
    return;
  }
  useEffect(() => {
    handleChange(null)
    
    set_memory_used_pct_options({
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
          // suggestedMin: 0,
          // suggestedMax: 1,
        },
      },
    });
    async function fetchdata() {
      const { data: system_memory_used_pct } = await getAvgOfPreprocessedColNonAnomalies("system_memory_used_pct");
      set_avg_memory_used_pct(system_memory_used_pct[0]["avgValue"])

      const { data: system_memory_used_pct_ano } = await getAvgOfPreprocessedColAnomalies("system_memory_used_pct");
      set_avg_memory_used_pct_ano(system_memory_used_pct_ano[0]["avgValue"])

    }
    fetchdata()

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
        {/* <div className="column"> */}
        <Line options={memory_used_pct_options} data={memory_used_pct_data} />
        {/* </div> */}

      </div>
    </Wrapper>


  );
}

export default Memory;
