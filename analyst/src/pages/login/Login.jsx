import React, { useState } from "react";
import axios from "axios";

export const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');

    const loginUser = async (currentUser) => {
        // console.log(currentUser)
        const response = await axios.post('/auth', currentUser)
        console.log(response)

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email || !password) {
            return
        }
        // console.log(email)
        const currentUser = { email, password }
        console.log(currentUser)
        loginUser(currentUser)
    }

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}