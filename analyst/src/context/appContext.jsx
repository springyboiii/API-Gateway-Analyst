import React, { useReducer, useContext } from 'react'
import {
    CLEAR_ALERT, DISPLAY_ALERT, REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_BEGIN,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    TOGGLE_SIDEBAR,
} from './actions'

import axios from 'axios'
import reducer from './reducer'
import jwtDecode from 'jwt-decode'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

export const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    showSidebar:false,
    showLogout:false,
}
const AppContext = React.createContext()
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    }

    const addUserToLocalStorage = (user, token) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }

    const removeUserToLocalStorage = (user, token ) => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }
    const getCurrentUser = (token) => {
        try {
            const jwt = token;
            return jwtDecode(jwt);
        }catch(error){
            return null
        }
    }

    const registerAdmin = async (currentUser) => {
        // console.log(currentUser)

        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const response = await axios.post('/admins', currentUser)
            console.log(response)
            const { name, email } = currentUser
            const user = { name, email }
            // const { user, token, location } = response.data
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: { user }

            })
            // local storage
            // addUserToLocalStorage(user, token, location)
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: { msg: error.response },
            })
        }
        clearAlert()

    }
    const registerUser = async (currentUser) => {
        // console.log(currentUser)

        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const response = await axios.post('/users', currentUser)
            console.log(response)
            const { name, email } = currentUser
            const user = { name, email }
            // const { user, token, location } = response.data
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: { user }

            })
            // local storage
            // addUserToLocalStorage(user, token, location)
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: { msg: error.response },
            })
        }
        clearAlert()

    }

    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
            const { data } = await axios.post('/auth', currentUser)
            // console.log("data", data)
            const { token } = data
            // console.log(user)
            // console.log(data)
            const {name, email, type} = getCurrentUser(data)
            const user = {
                name: name,
                email: email,
                type: type,
            }
            // console.log(user)
            // console.log(token)
            dispatch(
                {
                    type: LOGIN_USER_SUCCESS,
                    payload: { user, token },
                }
            )
            addUserToLocalStorage(user, data)
        }
        catch (error) {
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: { msg: error.response }
            })
            console.log(error)
        }
    }
    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserToLocalStorage()
    }
    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR })
      }
    
    return (
        <AppContext.Provider
            value={{
                ...state, displayAlert,
                registerUser,
                registerAdmin,
                loginUser,
                logoutUser,
                toggleSidebar,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
// make sure use
export const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider }