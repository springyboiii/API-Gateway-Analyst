import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { getAllFeedbacks, getUnreadFeedbacks, postFeedback, markFeedbackRead } from "../../services/feedbackService";
import "./feedback.scss";
import FormRow from '../../components/FormRow/FormRow'
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


function Feedback() {
  const { user } = useAppContext();
  const [notification, set_notification] = useState({
    datasets: [],
  });

  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");

  //   const [user_pct_options, set_user_pct_options] = useState({});
  // const {user, token ,loginUser, isLoading, showAlert, displayAlert } = useAppContext()
  const renderFeedbacks = () => {
    return feedbacks.map((feedback, i) => {
      return <tr key={i} >
        {/* key={feedbackId["$oid"]}  */}
        {/* feedback["iod"]["kdsf"] */}
        {/* <td  style={{ padding: '10px', borderRight: '1px solid black ',textAlign:'center',width:"10%" }}>{i}</td>
      <td style={{ padding: '10px', alignContent:'center',width:"70%",textAlign:'left' }}>{feedback["message"]}</td> */}
        <td  >{i}</td>
        <td >{feedback["message"]}</td>
      </tr>
    })
  };
  const renderHeader = () => {
    return <tr>
      <th>ID</th>
      <th>Feedback</th>
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
  const handleChange = (e) => {
    setNewFeedback(e.target.value)
  };
  const onSubmit = async (e) => {
    e.preventDefault()

    const feedbackmessage = { 'message': newFeedback }
    console.log()
    await postFeedback(feedbackmessage)
    setNewFeedback("")
  }

  useEffect(() => {

    async function fetchdata() {
      const { data: allFeedbacks } = await getAllFeedbacks();
      console.log(allFeedbacks);
      setFeedbacks((feedbacks) => [...feedbacks, ...allFeedbacks["feedbacks"]])

      // }
      // fetchdata()

      // async function postData() {
      //   const data = {"message": "nice app"}
      //   await postFeedback(data);
      // }
      // postData()

      // async function readFeedback() {
      //   const feedbackId = "63aae10a5035ea5637d35f28"
      //   await markFeedbackRead(feedbackId)
      // }
      // readFeedback()
    }
    fetchdata()

  }, []);

  useEffect(() => {
    console.log("feedbackssss")

    console.log(feedbacks[0])
  }, [feedbacks])


  return (
    <div>
      <div className={user.type === "ADMIN" ? 'show-feedbacks' : 'feedbacks'}>
        <div className="notification">
          {/* <Sidebar /> */}
          <div className="notification-container">
            {/* <Navbar /> */}

            <div className="container">
              {renderTable()}
            </div>
          </div>
        </div>

      </div>
      <div className={user.type === "ADMIN" ? 'feedback-form' : 'show-feedback-form'} >
        <form className='form' onSubmit={onSubmit}>
          <FormRow
            type='text'
            name='FeedBack'
            value={newFeedback}
            handleChange={handleChange}
          />
          <button type='submit' className='btn btn-block' >submit</button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
