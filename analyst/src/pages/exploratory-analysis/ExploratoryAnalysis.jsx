// import Navbar from "../../components/navbar/Navbar";
// import Sidebar from "../../components/sidebar/Sidebar";
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

import { getPredictionNormalAnomalyDoughnutData, getPredictionAnomalyTypeDoughnutData, getPredictionScenarioDoughnutData } from "../../services/predictionService";

import Select from "react-select";

import io from "socket.io-client";

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

const ExploratoryAnalysis = ({socket}) => {
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

  const [prediction_normal_anomaly_doughnut_data, set_prediction_normal_anomaly_doughnut_data] =
  useState({ datasets: [] });
  const [prediction_prediction_normal_anomaly_doughnut_options, set_prediction_normal_anomaly_doughnut_options] =
    useState({});
  const [prediction_anomaly_type_doughnut_data, set_prediction_anomaly_type_doughnut_data] = useState(
    { datasets: [] }
  );
  const [prediction_anomaly_type_doughnut_options, set_prediction_anomaly_type_doughnut_options] =
    useState({});
  const [prediction_scenario_doughnut_data, set_prediction_scenario_doughnut_data] = useState({
    datasets: [],
  });
  const [prediction_scenario_doughnut_options, set_prediction_scenario_doughnut_options] = useState(
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
  const [messages, setMessages] = useState([]);

  const options = [
    { value: "DEFAULT", label: "30m" },
    // { value: "30m", label: "30m" },
    { value: "1h", label: "1h " },
    { value: "2h", label: "2h" },
    { value: "4h", label: "4h " },
  ];
  const [selectedOption, setSelectedOption] = useState("1h");
  const handleChange = (value) => {
    axios.post("/anomaly_time_area_data", {
      
        data: value,
        // option:selectedOption,
        
      }).then((response)=>{
        // res=response.data;
        console.log(response.data)
        set_anomaly_time_area_data({
                labels: response.data.timestamp,
                datasets: [
                  {
                    fill: true,
                    label: 'Count',
                    data: response.data.total_anomalies,
                    borderColor: "rgb(53, 162, 235)",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                    tension: 0.4,
                  },
                ],
              });
        // setName(response.data[0].name);
        // setContact(response.data[0].contact_no);
        // setUsername(response.data[0].username);
        // setEmail(response.data[0].email);
        // setLocation(response.data[0].address);
        // setDescription(response.data[0].about);
        
        // alert("succesful insert");
        
      });
    return ;
  }

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value as string);
  // };
  // const [prediction_bar_options, set_prediction_bar_options] = useState({});

  // const [bgcolor_bar_data, set_bgcolor_bar_data] = useState([]

  // );

  useEffect(() => {
    // http://127.0.0.1:5000/
    socket = io.connect("http://127.0.0.1:5000/");

    socket.on("connect", (data) => {
      console.log(data);
    });

    socket.on("disconnect", (data) => {
      console.log(data);
    });

    socket.on("recvMsg", (data) => {
      setMessages((messages) => [...messages, data]);
      console.log(data)
    });

    socket.on("prediction", (data) => {
      setMessages((messages) => [...messages, data['prediction']]);
      console.log(data['timestamp'] + " -" + data['prediction'])
    });

    return () => {
      socket.off("data", () => {
        console.log("data event was removed");
      });
    };
  }, []);

  useEffect(() => {
    // {console.log(selectedOption)}
    //   Normal and Anomaly Doughnut chart setup using useeffect
    const position = "left"; // CSS for graphs
    // {console.log(selectedOption)}
    handleChange(null)
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

    getPredictionNormalAnomalyDoughnutData()
      .then((response) => {
        const res = response.data;
        set_prediction_normal_anomaly_doughnut_data({
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
    
    set_prediction_normal_anomaly_doughnut_options({
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

    getPredictionAnomalyTypeDoughnutData()
      .then((response) => {
        const res = response.data;
        set_prediction_anomaly_type_doughnut_data({
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
      })
    
    set_prediction_anomaly_type_doughnut_options({
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
            "1 - High CPU usage due to mediation",
            "2 - High Memory usage due to mediation",
            "3 - High disk I/O due to mediation",
            "4 - Increased load (numbers of users)",
            "5 - Increased load (throughput)",
            "6 - Long response time in back-end services",
            "7 - Increased message size",
            "8 - Failure in back-end services",
            "9 - Increased load (throughput)",
            "10 - Increased message size",
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

    getPredictionScenarioDoughnutData()
      .then((response) => {
        const res = response.data;
        set_prediction_scenario_doughnut_data({
          labels: [
            "1 - High CPU usage due to mediation",
            "2 - High Memory usage due to mediation",
            "3 - High disk I/O due to mediation",
            "4 - Increased load (numbers of users)",
            "5 - Increased load (throughput)",
            "6 - Long response time in back-end services",
            "7 - Increased message size",
            "8 - Failure in back-end services",
            "9 - Increased load (throughput)",
            "10 - Increased message size",
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
      })
    
    set_prediction_scenario_doughnut_options({
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
    })

    // axios({
    //   method: "GET",
    //   url: "/prediction_normal_anomaly_doughnut_data",
    // })
    //   .then((response) => {
    //     const res = response.data;
    //     set_normal_anomaly_doughnut_data({
    //       labels: ["Normal", "Anomaly"],
    //       datasets: [
    //         {
    //           // label: "# of Votes",
    //           data: [res.normal, res.anomaly],
    //           backgroundColor: [
    //             "rgba(54, 162, 235, 1)",
    //             "rgba(255, 99, 132, 1)",
    //           ],
    //           //   borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
    //           borderWidth: 1,
    //         },
    //       ],
    //     });
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       console.log(error.response);
    //       console.log(error.response.status);
    //       console.log(error.response.headers);
    //     }
    //   });



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
    // axios({
    //   method: "GET",
    //   url: "/anomaly_time_area_data",
    //   data:selectedOption,
    
    // })
    //   .then((response) => {
    //     {console.log(selectedOption)}
    //     const res = response.data;
    //     set_anomaly_time_area_data({
    //       labels: res.timestamp,
    //       datasets: [
    //         {
    //           fill: true,
    //           // label: 'system_cpu_user_pct',
    //           data: res.total_anomalies,
    //           borderColor: "rgb(53, 162, 235)",
    //           backgroundColor: "rgba(53, 162, 235, 0.5)",
    //           tension: 0.4,
    //         },
    //       ],
    //     });
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       console.log(error.response);
    //       console.log(error.response.status);
    //       console.log(error.response.headers);
    //     }
    //   });

    // axios.post("/anomaly_time_area_data", {
      
    //   data: selectedOption,
      
    // }).then((response)=>{
    //   console.log(response.data)
    //   // setName(response.data[0].name);
    //   // setContact(response.data[0].contact_no);
    //   // setUsername(response.data[0].username);
    //   // setEmail(response.data[0].email);
    //   // setLocation(response.data[0].address);
    //   // setDescription(response.data[0].about);
      
    //   // alert("succesful insert");
      
    // });

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
        console.log(res)
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
          labels: res.timestamp.reverse(),
          datasets: [
            {
              barPercentage: 1,
              categoryPercentage: 1,
              // axis:"y",
              label: "Real time prediction",
              data: res.dummy.reverse(),
              // data:[0,1,1,0,1,0],
              backgroundColor: res.bgcolor.reverse(),
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
  }, [messages]);

  return (
    <div className="exploratoryAnalysis">
      {/* <Sidebar /> */}
      <div className="exploratoryAnalysisContainer">
        {/* <Navbar /> */}
        <div className="rows">
          <div className="row">
            <div className="prediction_bar">
            {/* <ul>
            {messages.map((message, index) => {
              return <li key={index}>{message}</li>;
            })}
          </ul> */}
              <Bar
                data={prediction_bar_data}
                options={
                  {
                  // tooltips: {
                  //   // callbacks: {
                  //   //   title: function(tooltipItem, data) {
                  //   //     return data['labels'][tooltipItem[0]['index']];
                  //   //   },
                  //   //   label: function(tooltipItem, data) {
                  //   //     return data['datasets'][0]['data'][tooltipItem['index']];
                  //   //   },
                  //   //   afterLabel: function(tooltipItem, data) {
                  //   //     var dataset = data['datasets'][0];
                  //   //     var percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100)
                  //   //     return '(' + percent + '%)';
                  //   //   }
                  //   // },
                  //   backgroundColor: '#000000',
                  //   titleFontSize: 16,
                  //   titleFontColor: '#0066ff',
                  //   bodyFontColor: '#000',
                  //   bodyFontSize: 14,
                  //   enabled:false
                  //   // displayColors: false
                  // },
                  maintainAspectRatio: false,
                      plugins:{
                      tooltips: {
                        // enabled: false
                        backgroundColor:"#fff"
                   },},
                  responsive: true,
                  plugins:{
                  tooltips: {
                    // enabled: false
                    backgroundColor:"#fff"
               },},
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
                  }
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="text">Past</div>
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
          <div className="text">Predicted</div>

            <div className="doughnut-container predicted-doughnut">
              <Doughnut
                data={prediction_normal_anomaly_doughnut_data}
                options={prediction_prediction_normal_anomaly_doughnut_options}
              />
            </div>
            <div className="type_doughnut-container doughnut-container">
              <Doughnut
                data={prediction_anomaly_type_doughnut_data}
                options={prediction_anomaly_type_doughnut_options}
              />
            </div>
            <div className="doughnut-container">
              <Doughnut
                data={prediction_scenario_doughnut_data}
                options={prediction_scenario_doughnut_options}
              />
            </div>
            {/* <div className="doughnut-container">
              <Doughnut
                data={jvm_metrics_memory_heap_memory_usage_used_data}
                options={jvm_metrics_memory_heap_memory_usage_used_options}
              />
            </div> */}
          </div>

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
            /></div>
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
