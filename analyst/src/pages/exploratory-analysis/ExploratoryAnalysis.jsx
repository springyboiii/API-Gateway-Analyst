import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./exploratory-analysis.scss";

import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
// import faker from 'faker';
import axios from "axios";
// import * as React from 'react';
// import Select from '@mui/material/Select';
import Select from "react-select";

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

const ExploratoryAnalysis = () => {
  const [normal_anomaly_doughnut_data, set_normal_anomaly_doughnut_data] =
    useState({ datasets: [] });
  const [normal_anomaly_doughnut_options, set_normal_anomaly_doughnut_options] =
    useState({});
  const [anomaly_type_doughnut_data, set_anomaly_type_doughnut_data] = useState(
    { datasets: [] }
  );
  const [anomaly_type_doughnut_options, set_anomaly_type_doughnut_options] =
    useState({});
  const [scenario_doughnut_data, set_scenario_doughnut_data] = useState({
    datasets: [],
  });
  const [scenario_doughnut_options, set_scenario_doughnut_options] = useState(
    {}
  );
  const [
    jvm_metrics_memory_heap_memory_usage_used_data,
    set_jvm_metrics_memory_heap_memory_usage_used_data,
  ] = useState({
    datasets: [],
  });
  const [
    jvm_metrics_memory_heap_memory_usage_used_options,
    set_jvm_metrics_memory_heap_memory_usage_used_options,
  ] = useState({});

  const [anomaly_time_area_data, set_anomaly_time_area_data] = useState({
    datasets: [],
  });
  const [anomaly_time_area_options, set_anomaly_time_area_options] = useState(
    {}
  );
  const [prediction_bar_data, set_prediction_bar_data] = useState({
    datasets: [],
  });
  const options = [
    { value: "30m", label: "30m" },
    { value: "1h", label: "1h " },
    { value: "2h", label: "2h" },
    { value: "4h", label: "4h " },
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value as string);
  // };
  // const [prediction_bar_options, set_prediction_bar_options] = useState({});

  // const [bgcolor_bar_data, set_bgcolor_bar_data] = useState([]

  // );

  useEffect(() => {
    //   Normal and Anomaly Doughnut chart setup using useeffect
    const position = "left"; // CSS for graphs
    {console.log(selectedOption)}
    axios({
      method: "GET",
      url: "/normal_anomaly_doughnut_data",
    })
      .then((response) => {
        const res = response.data;
        set_normal_anomaly_doughnut_data({
          labels: ["Normal", "Anomaly"],
          datasets: [
            {
              // label: "# of Votes",
              data: [res.normal, res.anomaly],
              backgroundColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(255, 99, 132, 1)",
              ],
              //   borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
              borderWidth: 1,
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

    set_normal_anomaly_doughnut_options({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false, position: position },

        title: {
          display: true,
          text: "Anomaly vs Normal",
          position: "bottom",
        },
      },
    });

    //  Anomaly Types Doughnut chart setup using useeffect
    axios({
      method: "GET",
      url: "/anomaly_type_doughnut_data",
    })
      .then((response) => {
        const res = response.data;
        set_anomaly_type_doughnut_data({
          labels: [
            "Type 1",
            "Type 2",
            "Type 3",
            "Type 4",
            "Type 5",
            "Type 6",
            "Type 7",
          ],
          datasets: [
            {
              // label: "# of Votes",
              data: [
                res.type1,
                res.type2,
                res.type3,
                res.type4,
                res.type5,
                res.type6,
                res.type7,
              ],
              backgroundColor: [
                "rgba(32, 133, 236)",
                "rgba(114, 180, 235)",
                "rgba(10, 65, 122)",
                "rgba(132, 100, 160)",
                "rgba(206, 169, 188)",
                "rgba(186, 199, 193)",
                "rgba(238, 130, 238, 1)",
              ],
              // borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
              borderWidth: 1,
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

    set_anomaly_type_doughnut_options({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false, position: position },

        title: {
          display: true,
          text: "Anomaly types",
          position: "bottom",
        },
      },
    });

    //  Scenario Doughnut chart setup using useeffect
    axios({
      method: "GET",
      url: "/scenario_doughnut_data",
    })
      .then((response) => {
        const res = response.data;
        set_scenario_doughnut_data({
          labels: [
            "Scenario 1",
            "Scenario 2",
            "Scenario 3",
            "Scenario 4",
            "Scenario 5",
            "Scenario 6",
            "Scenario 7",
            "Scenario 8",
            "Scenario 9",
            "Scenario 10",
          ],
          datasets: [
            {
              // label: "# of Votes",
              data: [
                res.scenario1,
                res.scenario2,
                res.scenario3,
                res.scenario4,
                res.scenario5,
                res.scenario6,
                res.scenario7,
                res.scenario8,
                res.scenario9,
                res.scenario10,
              ],
              backgroundColor: [
                "rgba(32, 133, 236)",
                "rgba(114, 180, 235)",
                "rgba(10, 65, 122)",
                "rgba(132, 100, 160)",
                "rgba(206, 169, 188)",
                "rgba(186, 199, 193)",
                "rgba(238, 130, 238, 1)",
                "rgba(190, 97, 202)",
                "rgba(55, 123, 43)",
                "rgba(244, 122, 31)",
              ],
              // borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
              borderWidth: 1,
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

    set_scenario_doughnut_options({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false, position: position },

        title: {
          display: true,
          text: "Scenarios",
          position: "bottom",
        },
      },
    });
    //jvm_memory_used
    axios({
      method: "GET",
      url: "/jvm_metrics_memory_heap_memory_usage_used_data",
    })
      .then((response) => {
        const res = response.data;
        set_jvm_metrics_memory_heap_memory_usage_used_data({
          labels: ["Normal", "JVM memory anomaly"],
          datasets: [
            {
              // label: "# of Votes",
              data: [res.normal, res.jvm_memory],
              backgroundColor: [
                "rgba(54, 162, 235, 1)",
                "rgba(255, 99, 132, 1)",
              ],
              //   borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
              borderWidth: 1,
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

    set_jvm_metrics_memory_heap_memory_usage_used_options({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false, position: position },

        title: {
          display: true,
          text: "JVM Memory Anomaly vs Normal",
          position: "bottom",
        },
      },
    });
    axios({
      method: "GET",
      url: "/anomaly_time_area_data",
    })
      .then((response) => {
        const res = response.data;
        set_anomaly_time_area_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: true,
              // label: 'system_cpu_user_pct',
              data: res.total_anomalies,
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

    set_anomaly_time_area_options({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "No of Anomalies",
        },
      },
      // scales: {
      //   y: {
      //     suggestedMin: 0,
      //     suggestedMax: 1,
      //   },
      // },
    });

    axios({
      method: "GET",
      url: "/prediction_bar_data",
    })
      .then((response) => {
        const res = response.data;
        // set_bgcolor_bar_data(res.bgcolor)
        // console.log(res.bgcolor)
        //   console.log(res.prediction[2]);
        //   // var index=0;
        //   for(let index=0;index<res.prediction.length;index++){
        //     console.log(1)
        //     var green="rgba(54, 162, 235, 1)";
        //     var red="rgba(255, 99, 132, 1)"
        //     console.log(res.prediciton[index])
        //     res.prediction[index]==0? set_bgcolor_bar_data([...bgcolor_bar_data,green]): set_bgcolor_bar_data([...bgcolor_bar_data,red])
        //     //You can check for bars[i].value and put your conditions here

        //  }
        //  console.log(bgcolor_bar_data)
        set_prediction_bar_data({
          labels: res.timestamp,
          datasets: [
            {
              barPercentage: 1,
              categoryPercentage: 1,
              // axis:"y",
              label: "Real time prediction",
              data: res.dummy,
              // data:[0,1,1,0,1,0],
              backgroundColor: res.bgcolor,
              // [
              //   "rgba(54, 162, 235, 1)",
              //   "rgba(255, 99, 132, 1)",
              //   // "rgba(255, 206, 86, 0.2)",
              //   // "rgba(75, 192, 192, 0.2)",
              //   // "rgba(153, 102, 255, 0.2)",
              //   // "rgba(255, 159, 64, 0.2)",
              // ],
              // res.bgcolor,
              borderColor: [
                // "rgba(255, 99, 132, 1)",
                // "rgba(54, 162, 235, 1)",
                // "rgba(255, 206, 86, 1)",
                // "rgba(75, 192, 192, 1)",
                // "rgba(153, 102, 255, 1)",
                // "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
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
  }, []);

  return (
    <div className="exploratoryAnalysis">
      <Sidebar />
      <div className="exploratoryAnalysisContainer">
        <Navbar />
        <div className="rows">
          <div className="row">
            <div className="prediction_bar">
              <Bar
                data={prediction_bar_data}
                options={{
                  maintainAspectRatio: false,
                  //     plugins:{
                  //     tooltips: {
                  //       enabled: false
                  //  },},
                  responsive: true,
                  // indexAxis: 'y' ,
                  title: { text: "THICCNESS SCALE", display: true },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false, //this will remove only the label
                      },
                    },
                    y: {
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false, //this will remove only the label
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="doughnut-container">
              <Doughnut
                data={normal_anomaly_doughnut_data}
                options={normal_anomaly_doughnut_options}
              />
            </div>
            <div className="type_doughnut-container doughnut-container">
              <Doughnut
                data={anomaly_type_doughnut_data}
                options={anomaly_type_doughnut_options}
              />
            </div>
            <div className="doughnut-container">
              <Doughnut
                data={scenario_doughnut_data}
                options={scenario_doughnut_options}
              />
            </div>
            {/* <div className="doughnut-container">
              <Doughnut
                data={jvm_metrics_memory_heap_memory_usage_used_data}
                options={jvm_metrics_memory_heap_memory_usage_used_options}
              />
            </div> */}
          </div>

          <div className="row">
            <Select
              options={options}
              defaultValue={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.value);
                // console.log(e.value)
                // console.log("select")
              }}
            />
          </div>
          <div className="row">
            <div className="anomaly_time_area-container">
              <Line
                options={anomaly_time_area_options}
                data={anomaly_time_area_data}
              />
            </div>
          </div>
          {/* <div className='row'><button onClick={getData}>Click me</button></div> */}
        </div>
      </div>
      {/* //   <div className="App">
     

    //     {/* new line start*/}
      {/* //     <p>To get your profile details: </p><button onClick={getData}>Click me</button>
    //     {profileData && <div>
    //           <p>Count: {profileData.profile_name}</p> */}
      {/* //         </div> */}
      {/* //     } */}
      {/* end of new line */}
      {/* // </div> */}
    </div>
  );
};

export default ExploratoryAnalysis;
