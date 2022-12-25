import React from "react";
import { useState, useEffect } from "react"
import "./login.scss";
import {FormRow, Alert} from "../../components";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

const initialState = {
    name: '',
    email: '',
    password: '',
}

const Login = () => {
    const navigate = useNavigate()

    const [values, setValues] = useState(initialState)

    const { loginUser, isLoading, showAlert, displayAlert } = useAppContext()

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const onClick = (e) => {
        navigate('/register')
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const { email, password } = values
        if (!email || !password) {
            displayAlert()
            return
        }
        const currentUser = {email, password }
        console.log(currentUser)
        loginUser(currentUser)

    }
    return (
        <div className="full-page">
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
                <p>
                    Not a member?
                    <button type="button" onClick={onClick}
                        className='member-btn'>
                        Register
                    </button>
                </p>
            </form>
        </div>
    )
}

export default Login;
