import React from "react";
import { useState, useEffect } from "react"
// import "./login.scss";
import Wrapper from '../../assets/wrappers/RegisterPage'
import {FormRow, Alert} from "../../components";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import auth from "../../services/authService"

const initialState = {
    name: '',
    email: '',
    password: '',
}

const Login = () => {
    const navigate = useNavigate()

    const [values, setValues] = useState(initialState)

    const {user, token ,loginUser, isLoading, showAlert, displayAlert } = useAppContext()

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const onClick = (e) => {
        navigate('/register')
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = values
        if (!email || !password) {
            displayAlert()
            return
        }
        await auth.loginCustomer(email, password);
        const currentUser = {email, password }
        console.log(currentUser)
        loginUser(currentUser)

    }
    useEffect(() => {
        if (user) {
          setTimeout(() => {
            navigate('/')
          }, 500)
        }
      }, [user, navigate])
    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                {/* <Logo /> */}
                <h3>Login</h3>
                {showAlert && <Alert />}
                {/* name input */}

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
               <button type="submit" className="btn btn-block" disabled={isLoading}>
                    submit
                </button>
                {/* <p>
                    Not a member?
                    <button type="button" onClick={onClick}
                        className='member-btn'>
                        Register
                    </button>
                </p> */}
            </form>
        </Wrapper>
    )
}

export default Login;
