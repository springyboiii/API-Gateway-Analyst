import React, { useReducer, useContext } from 'react';
import {
    CLEAR_ALERT, DISPLAY_ALERT, REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_BEGIN,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS
} from './actions';
import axios from 'axios';
import reducer from './reducer';

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
// const userLocation = localStorage.getItem('location')

export const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user? JSON.parse(user): null,
    token: token,
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

    const addUserToLocalStorage = (user, token ,location) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }

    const removeUserToLocalStorage = (user, token ,location) => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })
        try {
            const response = await axios.post('/admins', currentUser)
            console.log(response)
        //     const { user, token } = response.data
        //     dispatch({
        //         type: REGISTER_USER_SUCCESS,
        //         payload: {user, token}
        // })
        // local storage
        addUserToLocalStorage(user, token)
        } catch (error) {
            // console.log(error.response)
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: {msg: error.response.data.msg},
            })
        }
        clearAlert()
    }

    const loginUser = async (currentUser) => {
        console.log(currentUser);
    }
    return (
        <AppContext.Provider
            value={{
                ...state, displayAlert,
                registerUser,
                loginUser
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