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

  const handleChange = (value) => {
    axios.post("/diskio_iostat_await", {
      data: value
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        set_diskio_iostat_await_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: true,
              // label: '
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
        set_diskio_iostat_queue_avg_size_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: true,
              // label: 'system_diskio_iostat_queue_avg_size',
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
        set_diskio_iostat_read_per_sec_bytes_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: true,
              // label: 'system_diskio_iostat_read_per_sec_bytes',
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
        set_diskio_iostat_write_per_sec_bytes_data({
          labels: res.timestamp,
          datasets: [
            {
              fill: true,
              // label: 'system_diskio_iostat_write_per_sec_bytes',
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

  useEffect(() => {
    handleChange(null)

    // axios({
    //   method: "GET",
    //   url: "/diskio_iostat_await",
    // })
    //   .then((response) => {
    //     console.log(response);
    //     const res = response.data;
    //     set_diskio_iostat_await_data({
    //       labels: res.timestamp,
    //       datasets: [
    //         {
    //           fill: true,
    //           // label: '
    //           data: res.system_diskio_iostat_await,
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
    //     }
    //   });

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

    // axios({
    //   method: "GET",
    //   url: "/diskio_iostat_queue_avg_size",
    // })
    //   .then((response) => {
    //     console.log(response);
    //     const res = response.data;
    //     set_diskio_iostat_queue_avg_size_data({
    //       labels: res.timestamp,
    //       datasets: [
    //         {
    //           fill: true,
    //           // label: 'system_diskio_iostat_queue_avg_size',
    //           data: res.system_diskio_iostat_queue_avg_size,
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
    //     }
    //   });

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

    // axios({
    //   method: "GET",
    //   url: "/diskio_iostat_read_per_sec_bytes",
    // })
    //   .then((response) => {
    //     console.log(response);
    //     const res = response.data;
    //     set_diskio_iostat_read_per_sec_bytes_data({
    //       labels: res.timestamp,
    //       datasets: [
    //         {
    //           fill: true,
    //           // label: 'system_diskio_iostat_read_per_sec_bytes',
    //           data: res.system_diskio_iostat_read_per_sec_bytes,
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
    //     }
    //   });

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


    // axios({
    //   method: "GET",
    //   url: "/diskio_iostat_write_per_sec_bytes",
    // })
    //   .then((response) => {
    //     console.log(response);
    //     const res = response.data;
    //     set_diskio_iostat_write_per_sec_bytes_data({
    //       labels: res.timestamp,
    //       datasets: [
    //         {
    //           fill: true,
    //           // label: 'system_diskio_iostat_write_per_sec_bytes',
    //           data: res.system_diskio_iostat_write_per_sec_bytes,
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
    //     }
    //   });

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
  
  return (
    <div className="Cpu">
      {/* <Sidebar /> */}
      <div className="Cpu-container">
        {/* <Navbar /> */}
        {/* <div className="rows">
          <div className="row">
            <div className="area-container">
              <Line options={diskio_iostat_await_options} data={diskio_iostat_await_data} />
            </div>
            <div className="area-container">
              <Line options={diskio_iostat_queue_avg_size_options} data={diskio_iostat_queue_avg_size_data} />
            </div>
          </div>

          <div className="row">
            <div className="area-container">
              <Line options={diskio_iostat_read_per_sec_bytes_options} data={diskio_iostat_read_per_sec_bytes_data} />
            </div>
            <div className="area-container">
              <Line options={diskio_iostat_write_per_sec_bytes_options} data={diskio_iostat_write_per_sec_bytes_data} />
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
        <Line options={diskio_iostat_await_options} data={diskio_iostat_await_data} />
        <Line options={diskio_iostat_queue_avg_size_options} data={diskio_iostat_queue_avg_size_data} />
        <Line options={diskio_iostat_read_per_sec_bytes_options} data={diskio_iostat_read_per_sec_bytes_data} />
        <Line options={diskio_iostat_write_per_sec_bytes_options} data={diskio_iostat_write_per_sec_bytes_data} />

      </div>
    </div>
  );
}

export default Disk;
