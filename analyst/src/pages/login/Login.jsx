import React from "react";
import { useState, useEffect } from "react"
import "./login.scss";
import FormRow from "../../components/FormRow/FormRow";

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}

const Login = () => {
    const [values, setValues] = useState(initialState)

    const hangleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const { name, email, password, isMember } = values
        if (!email || !password || (!name && !isMember)) {
            console.log('email or password incorrect')
            return
        }
        console.log(values)

    }
    return (
        <div className="full-page">
            <form className="form" onSubmit={onSubmit}>
                {/* <Logo /> */}
                {/* <h3>{values.isMember ? "Login" : "Register"}</h3>
                {showAlert && <Alert />} */}
                {/* name input */}

                <FormRow
                    type="text"
                    name="name"
                    value={values.name}
                    hangleChange={hangleChange}
                />

                {/* email input */}
                <FormRow
                    type="email"
                    name="email"
                    value={values.email}
                    hangleChange={hangleChange}
                />
                {/* password input */}
                <FormRow
                    type="password"
                    name="password"
                    value={values.password}
                    hangleChange={hangleChange}
                />
                <button type="sumbit" className="btn btn-block">
                    sumbit
                </button>
            </form>
        </div>
    )
}

export default Login;
