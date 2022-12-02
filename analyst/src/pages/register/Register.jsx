import React, { useState } from "react";
import axios from "axios";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [name, setName] = useState('');

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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            return
        }
        const currentUser = { name, email , password }
        // console.log(currentUser)
        registerUser(currentUser)
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full name</label>
                <input value={name} name="name" id="name" placeholder="full Name" onChange={(e) => setName(e.target.value)} />
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </div>
    )
}