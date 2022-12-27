import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    TOGGLE_SIDEBAR,
} from "./actions"

import { initialState } from './appContext'

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: 'Please provide all values !',
        }
    }
    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: '',
        }
    }
    if (action.type === REGISTER_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }
    if (action.type === REGISTER_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'User Created !',
            user: action.payload.user
        }
    }
    if (action.type === REGISTER_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg.data,
        }
    }
    if (action.type === LOGIN_USER_BEGIN) {
        return{
            ...state,
            isLoading: true
        }
    }
    if (action.type === LOGIN_USER_ERROR) {
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg.data,

        }
    }
    if (action.type === LOGIN_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'User Logined !',
            user: action.payload.user,
            token: action.payload.token,
        }
    }
    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            token: null,
        }
    }
    if (action.type === TOGGLE_SIDEBAR) {
        return {
          ...state,
          showSidebar: !state.showSidebar,
        }
      }
    throw new Error(`no such action : ${action.type}`)
}
export default reducer