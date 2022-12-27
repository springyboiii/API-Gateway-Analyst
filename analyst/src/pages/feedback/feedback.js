import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
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
function Feedback() {
//   const [user_pct_options, set_user_pct_options] = useState({});
const {user, token ,loginUser, isLoading, showAlert, displayAlert } = useAppContext()
const INITIAL_STATE = [
  { id: 1, notification:'hello' },
  { id: 2, notification:"helasdasdasdasssdsdsadasdasdasdasdasdasdloasdasdlo" },

  
] ;
 const [users, setUsers] = useState(INITIAL_STATE);
 const renderUsers = () => {
  return users.map(({ id, notification }) => {
    return <tr key={id} >
    <td  style={{ padding: '10px', borderRight: '1px solid black ',textAlign:'center',width:"10%" }}>{id}</td>
    <td style={{ padding: '10px', alignContent:'center',width:"70%",textAlign:'left' }}>{notification}</td>
    
  </tr>
  })
};
const capitalize = (word) => {
  return word[0].toUpperCase() + word.slice(1)
}
const renderHeader = () => {
  return <tr>
    {Object.keys(INITIAL_STATE[0]).map(key => <th>{capitalize(key)}</th>)}
  </tr>
};
const renderTable = () => {
  return (
    <table>
      {renderHeader()}
      <tbody>
        {renderUsers()}
      </tbody>
    </table>
  )
};




  useEffect(() => {
    
    axios.defaults.headers.common["x-access-token"]=token;
    axios({
      method: "GET",
      url: "/notifications",
    })
      .then((response) => {
        console.log(response);
        const res = response.data;
        
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
    // <div className="notification">
    //   {/* <Sidebar /> */}
    //   <div className="notification-container">
    //     {/* <Navbar /> */}
    //     <div className="rows">
    //       <div className="row">
    //         <div className="area-container">
    //           {/* <Line options={user_pct_options} data={user_pct_data} />
    //            */}
    //            {console.log}
    //         </div>
            
    //       </div>

    //     </div>
    //   </div>
    // </div>
    <div className="table">
      {/* <h1>Users Table</h1> */}
      {renderTable()}
    </div>
  );
}

export default Feedback;
