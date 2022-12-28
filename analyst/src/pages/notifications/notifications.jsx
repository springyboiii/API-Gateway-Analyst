import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { getAllFeedbacks,getSomeFeedbacks, getUnreadFeedbacks, postFeedback, markFeedbackRead } from "../../services/notificationService";
import "./notifications.scss"
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
} from "chart.js";
import { getAllNotification } from "../../services/notificationService";
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


function Notifications() {
  

  const [notifications, set_notifications] = useState([]);


//   const [user_pct_options, set_user_pct_options] = useState({});
  // const {user, token ,loginUser, isLoading, showAlert, displayAlert } = useAppContext()
  const renderFeedbacks = () => {
    return notifications.map((notification,i) => {
      return <tr >
        {/* key={feedbackId["$oid"]}  */}
        {/* feedback["iod"]["kdsf"] */}
      <td  >{i}</td>
      <td >{notification["message"]}</td>
      
    </tr>
    })
  };
  const renderHeader = () => {
    return <tr>
      <th>ID</th>
      <th>Notification</th>
    </tr>
  };
  const renderTable = () => {
    return (
      <table>
        <tbody>
        {renderHeader()}

          {renderFeedbacks()}
        </tbody>
      </table>
    )
  };

  useEffect(() => {
    
      async function fetchdata() {
        const {data: allNotifications} = await getSomeFeedbacks(10);
        console.log("inaisws")
        console.log(allNotifications);
        set_notifications((notifications) => [...notifications, ...allNotifications["notifications"]])

      // }

      // async function postData() {
      //   const data = {"message": "nice app"}
      //   await postFeedback(data);
      // }
      // postData()

    //   async function readFeedback() {
    //     const feedbackId = "63aae10a5035ea5637d35f28"
    //     await markFeedbackRead(feedbackId)
    //   }
    //   readFeedback()
    }
    fetchdata()

  }, []);

  useEffect(() => {
    console.log("notificationssss")

    // console.log(feedbacks[0])
  }, [notifications])


  return (
    <div className="notification">
      {/* <Sidebar /> */}
      <div className="notification-container">
        {/* <Navbar /> */}
        
          <div className="table">
      {renderTable()}
     </div>
        </div>
      </div>
  );
}

export default Notifications;
