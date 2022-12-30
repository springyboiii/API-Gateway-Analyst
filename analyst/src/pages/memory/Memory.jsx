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
  const [dataValues, setDataValues] = useState(initialDataState);

  const handleChange = (value) => {
    axios.post("/memory_used_pct", {
      data: value
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        set_memory_used_pct_data({
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
