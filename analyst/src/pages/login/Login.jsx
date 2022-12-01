import React from "react";
import { useState, useEffect } from "react";
import "./login.scss";
import FormRow from "../../components/FormRow/FormRow";
import Alert from "../../components/Alert";
// import {useAppContext} from "../../context/appContext";
import axios from 'axios';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const Login = () => {

  const [values, setValues] = useState(initialState)
  // golbal state and useNavigate

  // const { showAlert, registerUser, loginUser } = useAppContext()

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const registerUser = async (currentUser) => {
    try {
      const response = await axios.post('/admins', currentUser)
      console.log(response)
      //     const { user, token } = response.data
      //     dispatch({
      //         type: REGISTER_USER_SUCCESS,
      //         payload: {user, token}
      // })
      // local storage
    } catch (error) {
      console.log(error.response)

    }
  }
  const loginUser = async (currentUser) => {
    console.log(currentUser);
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const { name, email, password, isMember } = values
    if (!email || !password || (!name && !isMember)) {
      return
    }
    const currentUser = { name, email, password }
    if (isMember) {
      loginUser(currentUser)

    }
    else {
      registerUser(currentUser)

    }
    console.log(values)

  }
  // useEffect(() => {
  //   if (user) {
  //     setTimeout(() => {
  //       navigate('/')
  //     }, 3000)
  //   }
  // }, [user, navigate])

  return (
    <form className="form" onSubmit={onSubmit}>
      <h3>{values.isMember ? "Login" : "Register"}</h3>
      {/* name input */}
      {/* {showAlert && <Alert />} */}
      {!values.isMember && (
        <FormRow
          type="text"
          name="name"
          value={values.name}
          handleChange={handleChange}
        />
      )}
      {/* email input */}
      <FormRow
        type="email"
        name="email"
        value={values.email}
        handleChange={handleChange}

      />
      {/* password input */}
      <FormRow
        type="password"
        name="password"
        value={values.password}
        handleChange={handleChange}

      />
      <button type="submit" className="btn btn-block">
        submit
      </button>
      <p>
        {values.isMember ? "Not a member yet" : "Already a member?"}
        <button type="button" onClick={toggleMember}
          className='member-btn'>
          {values.isMember ? 'Register' : 'Login'}
        </button>
      </p>
    </form>
  )
}
export default Login;
