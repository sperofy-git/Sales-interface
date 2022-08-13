import axios from "axios";
import { API_URL } from '../common/Constants';

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class Authentication {

    executeBasicAuth(username, password) {
       return axios.get(`${API_URL}/basicauth`, {
            headers: {authorization: this.createBasicAuthToken(username,password)}
        })
    }

    executeJWTAuth(username, password) {
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
         })
     }

     
    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ':' + password)  
    }

    registerSuccessful(username, password)
    {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME,username);
        
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    registerSuccessfulForJWT(username, token) 
    {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME,username);
        this.setupAxiosInterceptors(this.createJWTToken(token));
    }

    createJWTToken(token) {
        return 'Bearer ' + token  
    }

    unRegisterSuccessful(user, pass)
    {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user===null)
            return false
        else
            return true
    }

    getLoggedUser() {
        let user =  sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user===null)
            return 'default user'
        else
            return user
    }

    logoutUser() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    setupAxiosInterceptors(token) {
              
        //console.log("************ " + basicAuthHeader)
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()){
                config.headers.authorization = token
                 }
                 return config
            }
        )
    }
}

export default new Authentication();