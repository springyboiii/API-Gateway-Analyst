import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

  Filler
);
function Notification() {
  const [notification, set_notification] = useState({
    datasets: [],
  });
//   const [user_pct_options, set_user_pct_options] = useState({});
const {user, token ,loginUser, isLoading, showAlert, displayAlert } = useAppContext()


  useEffect(() => {
    // axios({
    //   method: "POST",
    //   url: "/notifications",
    //   data:token,
    // })
    //   .then((response) => {
    //     console.log(response);
    //     const res = response.data;
        
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       console.log(error.response);
    //       console.log(error.response.status);
    //       console.log(error.response.headers);
    //     }
    //   });
    axios.post("/notifications", {
        data: token,
        // option:selectedOption,
        
      }).then((response)=>{
        // res=response.data;
        console.log(response.data)
           });


   



  }, []);
  return (
    <div className="notification">
      <Sidebar />
      <div className="notification-container">
        {/* <Navbar /> */}
        <div className="rows">
          <div className="row">
            <div className="area-container">
              {/* <Line options={user_pct_options} data={user_pct_data} />
               */}
               {console.log}
            </div>
            
          </div>

        </div>
      </div>
    </div>
  );
}

export default Notification;
