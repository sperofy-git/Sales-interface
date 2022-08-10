import axios from "axios";

class Authentication {

    executeBasicAuth(username, password) {
       return axios.get('http://localhost:8080/basicauth', {
            headers: {authorization: this.createBasicAuthToken(username,password)}
        })
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ':' + password)  
    }

    registerSuccessful(username, password)
    {
        sessionStorage.setItem('authenticatedUser',username);
        
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
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