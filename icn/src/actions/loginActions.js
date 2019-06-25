import axiosWithAuth, {axiosInstance} from "../utils/axiosWithAuth"

export const IS_LOGGING_IN="IS_LOGGING_IN"
export const LOGIN_SUCCESS="LOGIN_SUCCESS"
export const LOGIN_ERROR="LOGIN_ERROR"
export const LOGGED_OUT="LOGGED_OUT"

export const IS_SIGNING_UP="IS_SIGNING_UP"
export const SIGNUP_SUCCESS="SIGNUP_SUCCESS"
export const SIGNUP_ERROR="SIGNUP_ERROR"


export const attemptLogin = (creds) => dispatch => {
    dispatch({type: IS_LOGGING_IN})
    return axiosInstance().post("/user/login", creds)
        .then(res=> {
            console.log(res)
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("username", creds.username)
            localStorage.setItem("isAdmin", res.data.isAdmin)
            localStorage.setItem("country_id", res.data.countryId)
            dispatch({type: LOGIN_SUCCESS})
            return true
        })
        .catch(err => {
            dispatch({type: LOGIN_ERROR, payload: err}) 
        })
}

export const attemptSignUp = (creds, isAdmin) => dispatch => {
    let neededCreds = {}
    if(!isAdmin){
        neededCreds = {
            username: creds.username,
            password: creds.password,
            country_id: creds.region
        }
    }
    else{
        neededCreds = {
            username: creds.username,
            password: creds.password,
            isAdmin: isAdmin,
        }
    }
    dispatch({type: IS_SIGNING_UP})
    return axiosInstance().post("/user/register", neededCreds) 
        .then(res => {
            console.log(res)
            dispatch({type: SIGNUP_SUCCESS})
            return true
        })
        .catch(err => {
            console.log('error log', err)
            dispatch({type: SIGNUP_ERROR, payload: err}) 
        })
}