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
}

export default new Authentication();