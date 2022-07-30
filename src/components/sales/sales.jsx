import React,{Component} from 'react';
import pic from './common/defpic_1.jpg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default class Sales extends Component {
    
    render () {
        const LoginComponentWithNavigation = new withNavigation(LoginComponent);
        return (

            <div className='Sales'>
                <Router>
                    <Routes>
                    <Route path='/' exact element={<LoginComponentWithNavigation/>}/>
                    <Route path='/login' element={<LoginComponentWithNavigation/>}/>
                    <Route path='/welcome' element={<Welcome/>}/>
                    <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                </Router>
                {/* <LoginComponent> </LoginComponent>
                <Welcome></Welcome> */}
            </div>
        )
    }
}

class ErrorComponent extends Component {
    render() {
        return (
            <div>
                <h1> OOPS.. Not Allowed. Go back.</h1>
            </div>
        )
    }
}
class Welcome extends Component {
    render() {
        return (
            <div className="Welcome">
                Welcome to Sale Rep App
            </div>
        )
    }
}

function withNavigation(Component) {
    return props => <Component {...props} navigate={useNavigate()} />;
  }

class LoginComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        // this.handleUserNameChange = this.handleUserNameChange.bind(this)
        // this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleDataChange = this.handleDataChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)


    }

    handleDataChange (event) {
        this.setState(
            {
                
                [event.target.name]: 
                    event.target.value
            }
        )
    }

    // handlePasswordChange (event) {
    //     this.setState(
    //         {
    //             password: event.target.value
    //         }
    //     )
    // }

    loginClicked () {

        if(this.state.username==='admin' && this.state.password==='admin')
            //this.props.history.push('/welcome')
            this.props.navigate('/welcome')
            // this.setState(
            //     {
            //         showSuccessMessage: true,
            //         hasLoginFailed: false
            //     }
            // )
        else
            this.setState(
                {
                    hasLoginFailed: true,
                    showSuccessMessage: false
                }
            )

    }
    render() {
        return (
            <div className="App-custom">
              
               <img  className='App-spacing' src={pic} alt="Digital Marketing"  width="900" height="400"/>
               <div >
               <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} showSuccessMessage={this.state.showSuccessMessage}/>
               <div>Username: <input type="text" name ="username"  value={this.state.username} onChange={this.handleDataChange}></input> </div>
               <div> Password: <input type="password" name ="password" value={this.state.password} onChange={this.handleDataChange}></input> </div>
               </div>
               <div className='App-spacing'><button className='App-button-green' onClick={this.loginClicked}> Login </button></div>
            </div>
        )
    }
}

function ShowInvalidCredentials(props) 
{
        if(props.hasLoginFailed || !props.showSuccessMessage) {
            return <div> Login incorrect </div>
            
        }
        else 
        {
            return <div> Login Successful </div>
        }
        return null
}