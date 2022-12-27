import { useState, useEffect } from "react"
import { FormRow, Alert } from "../../components"
import Wrapper from '../../assets/wrappers/RegisterPage'
import  {useAppContext } from "../../context/appContext"
import { useNavigate } from 'react-router-dom'
// import './login.scss'

const initialState = {
    name: '',
    email: '',
    password: '',
}

const UserRegister = () => {
    const navigate = useNavigate()

    const [values, setValues] = useState(initialState)
    // golbal state and useNavigate
    const { user, registerUser, isLoading, showAlert, displayAlert } = useAppContext()

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    // const onClick = (e) => {
    //     navigate('/login')
    // }
    const onSubmit = (e) => {
        e.preventDefault()

        const { name, email, password } = values
        if (!email || !password || !name) {
            displayAlert()
            return
        }
        const currentUser = { name, email, password }
        console.log(currentUser)
        registerUser(currentUser)
        
        // console.log(values)

    }
    // useEffect(() => {
    //     if (user) {
    //       setTimeout(() => {
    //         navigate('/login')
    //       }, 3000)
    //     }
    //   }, [user, navigate])

    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                {/* <Logo /> */}
                <h3>Register User</h3>
                {showAlert && <Alert />}
                {/* name input */}

                <FormRow
                    type="text"
                    name="name"
                    value={values.name}
                    handleChange={handleChange}
                />
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
                <button type="submit" className="btn btn-block" disabled={isLoading} >
                    Register
                </button>
                {/* <p>
                    Already a member?
                    <button type="button" onClick={onClick}
                        className='member-btn'>
                        Login
                    </button>
                </p> */}
            </form>
        </Wrapper>
    )
}

export default UserRegister;