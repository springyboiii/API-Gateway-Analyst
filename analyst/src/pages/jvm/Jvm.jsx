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

  //   const [pss_collection_count_data, set_pss_collection_count_data] = useState({
  //     datasets: [],
  //   });
  //   const [pss_collection_count_options, set_pss_collection_count_options] = useState({});

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

  const handleChange = (value) => {
    axios.post("/psms_collection_count", {
      data: value
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        set_psms_collection_count_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: true,
              // label: 'jvm_metrics_gc_psms_collection_count',
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
        set_pss_collection_time_data({
          labels: res.timestamp,
          datasets: [
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

    return;
  }
  useEffect(() => {
    handleChange(null)

    // axios({
    //   method: "GET",
    //   url: "/psms_collection_count",
    // })
    //   .then((response) => {
    //     console.log(response);
    //     const res = response.data;
    //     set_psms_collection_count_data({
    //       labels: res.timestamp,
    //       datasets: [
    //         {
    //           fill: true,
    //           // label: 'jvm_metrics_gc_psms_collection_count',
    //           data: res.jvm_metrics_gc_psms_collection_count,
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

    // axios({
    //   method: "GET",
    //   url: "/psms_collection_time",
    // })
    //   .then((response) => {
    //     console.log(response);
    //     const res = response.data;
    //     set_psms_collection_time_data({
    //       labels: res.timestamp,
    //       datasets: [
    //         {
    //           fill: true,
    //           // label: 'jvm_metrics_gc_psms_collection_time',
    //           data: res.jvm_metrics_gc_psms_collection_time,
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

    // axios({
    //     method: "GET",
    //     url: "/pss_collection_count",
    //   })
    //     .then((response) => {
    //       console.log(response);
    //       const res = response.data;
    //       set_pss_collection_count_data({
    //         labels: res.timestamp,
    //         datasets: [
    //           {
    //             fill: true,
    //             // label: 'jvm_metric_gc_pss_collection_count',
    //             data: res.jvm_metric_gc_pss_collection_count,
    //             borderColor: "rgb(53, 162, 235)",
    //             backgroundColor: "rgba(53, 162, 235, 0.5)",
    //             tension: 0.4,
    //           },
    //         ],
    //       });
    //     })
    //     .catch((error) => {
    //       if (error.response) {
    //         console.log(error.response);
    //         console.log(error.response.status);
    //         console.log(error.response.headers);
    //       }
    //     });

    //     set_pss_collection_count_options({
    //     responsive: true,
    //     plugins: {
    //       legend: {
    //         position: "top",
    //       },
    //       title: {
    //         display: true,
    //         text: "jvm_metric_gc_pss_collection_count",
    //       },
    //     },
    //     scales: {
    //       y: {
    //         suggestedMin: 0,
    //         suggestedMax: 0.1,
    //       },
    //     },
    //   });

    // axios({
    //   method: "GET",
    //   url: "/pss_collection_time",
    // })
    //   .then((response) => {
    //     console.log(response);
    //     const res = response.data;
    //     set_pss_collection_time_data({
    //       labels: res.timestamp,
    //       datasets: [
    //         {
    //           fill: true,
    //           // label: 'jvm_metrics_gc_pss_collection_time',
    //           data: res.jvm_metrics_gc_pss_collection_time,
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


  }, []);
  return (
    <div className="Cpu">
      {/* <Sidebar /> */}
      <div className="Cpu-container">
        {/* <Navbar /> */}
        {/* <div className="rows">
          <div className="row">
            <div className="area-container">
              <Line options={psms_collection_count_options} data={psms_collection_count_data} />
            </div>
            <div className="area-container">
              <Line options={psms_collection_time_options} data={psms_collection_time_data} />
            </div>
          </div>
          <div className="row">
            <div className="area-container">
              <Line options={pss_collection_count_options} data={pss_collection_count_data} />
            </div>
            <div className="area-container">
              <Line options={pss_collection_time_options} data={pss_collection_time_data} />
            </div>
          </div>
        </div> */}
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

        <Line options={psms_collection_count_options} data={psms_collection_count_data} />
        <Line options={psms_collection_time_options} data={psms_collection_time_data} />
        <Line options={pss_collection_time_options} data={pss_collection_time_data} />

      </div>
    </div>
  );
}

export default Jvm;
