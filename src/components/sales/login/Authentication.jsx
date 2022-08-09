import axios from "axios";

class Authentication {

    registerSuccessful(username, password)
    {

        let basicAuthHeader = 'Basic ' + window.btoa(username + ':' + password) 
        sessionStorage.setItem('authenticatedUser',username);
        
        this.setupAxiosInterceptors(basicAuthHeader);
    }

    unRegisterSuccessful(user, pass)
    {
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if(user===null)
            return false
        else
            return true
    }

    getLoggedUser() {
        let user =  sessionStorage.getItem('authenticatedUser')
        if (user===null)
            return 'default user'
        else
            return user
    }

    setupAxiosInterceptors(basicAuthHeader) {
              
        //console.log("************ " + basicAuthHeader)
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()){
                config.headers.authorization = basicAuthHeader
                 }
                 return config
            }
        )
    }
}

export default new Authentication();