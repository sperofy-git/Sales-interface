class Authentication {

    registerSuccessful(user, pass)
    {
        sessionStorage.setItem('authenticatedUser',user);
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
}

export default new Authentication();