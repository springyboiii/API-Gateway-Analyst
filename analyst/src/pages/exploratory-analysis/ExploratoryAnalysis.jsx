import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./exploratory-analysis.scss";

import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
// import faker from 'faker';
import axios from "axios";

import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    
    Filler,
  } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    
    Filler,
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

    const [anomaly_time_area_data, set_anomaly_time_area_data] = useState(
        { datasets: [] }
      );
      const [anomaly_time_area_options, set_anomaly_time_area_options] =
        useState({});

  useEffect(() => {
    //   Normal and Anomaly Doughnut chart setup using useeffect
    const position="left";
    set_normal_anomaly_doughnut_data({
      labels: ["Normal", "Anomaly"],
      datasets: [
        {
        //   label: "# of Votes",
          data: [150, 50],
          backgroundColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        //   borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    });
    set_normal_anomaly_doughnut_options({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        // legend: { position: position },

        title: {
          display: true,
          //   text: "Whom'st let the dogs out",
        },
      },
    });
    //  Anomaly Types Doughnut chart setup using useeffect

    set_anomaly_type_doughnut_data({
        labels: ["1","2","3","4","5","6","7"],
        datasets: [
          {
            // label: "# of Votes",
            data: [150, 50,200,25,100,120,40],
            backgroundColor: ["rgba(32, 133, 236)", "rgba(114, 180, 235)", "rgba(10, 65, 122)", "rgba(132, 100, 160)", "rgba(206, 169, 188)", "rgba(186, 199, 193)", "rgba(238, 130, 238, 1)"],
            // borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      });
      set_anomaly_type_doughnut_options({
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
        //   legend: { position: position },
  
          title: {
            display: true,
            //   text: "Whom'st let the dogs out",
          },
        },
      });
    //   Anomaly-time area chart initialization
    //   const labels=['January', 'February', 'March', 'April', 'May', 'June', 'July']
    // set_anomaly_time_area_data({
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //     datasets: [
    //       {
    //         fill: true,
    //         label: 'Dataset 2',
    //         data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    //         borderColor: 'rgb(53, 162, 235)',
    //         backgroundColor: 'rgba(53, 162, 235, 0.5)',
          
    //       },
    //     ],
    //   });
      set_anomaly_time_area_options({
        responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
   
          },
        },
      });
  }, []);

   // new line start
   const [profileData, setProfileData] = useState(null)

   function getData() {
     axios({
       method: "GET",
       url:"/profile",
     })
     .then((response) => {
       console.log(response)
       const res =response.data
       setProfileData(({
         profile_name: res.name,
         about_me: res.about}))
     }).catch((error) => {
       if (error.response) {
         console.log(error.response)
         console.log(error.response.status)
         console.log(error.response.headers)
         }
     })}
     //end of new line 
  return (
//     <div className="exploratoryAnalysis">
//       <Sidebar />
//       <div className="exploratoryAnalysisContainer">
//         <Navbar />
//         <div className='rows'>
//      <div className='row'> <div className="doughnut-container">
//           <Doughnut
//             data={normal_anomaly_doughnut_data}
//             options={normal_anomaly_doughnut_options}
//           />
//         </div>
//         <div className="type_doughnut-container doughnut-container">
//           <Doughnut
//             data={anomaly_type_doughnut_data}
//             options={anomaly_type_doughnut_options}
//           />
//         </div>
//         <div className="doughnut-container">
//           <Doughnut
//             data={anomaly_type_doughnut_data}
//             options={anomaly_type_doughnut_options}
//           />
//         </div>
//         <div className="doughnut-container">
//           <Doughnut
//             data={anomaly_type_doughnut_data}
//             options={anomaly_type_doughnut_options}
//           />
//         </div>
//         </div>
        
        
        
//      <div className='row'><div className="anomaly_time_area-container"><Line options={anomaly_time_area_options} data={anomaly_time_area_data} /></div></div>
//      <div className='row'>row3</div>
//  </div>
       
        
        
//       </div>
      <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {/* new line start*/}
        <p>To get your profile details: </p><button onClick={getData}>Click me</button>
        {profileData && <div>
              <p>Profile name: {profileData.profile_name}</p>
              <p>About me: {profileData.about_me}</p>
            </div>
        }
         {/* end of new line */}
      </header>
    </div>
    // </div>
  );
};

export default ExploratoryAnalysis;
