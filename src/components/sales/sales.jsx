import React,{Component} from 'react';
import pic from './common/defpic_1.jpg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Authentication from './Authentication';

export default class Sales extends Component {
    
    render () {
        const LoginComponentWithNavigation = new withNavigation(LoginComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        return (

            <div className='Sales'>
                
                <Router>
                    <HeaderComponentWithNavigation/>
                    <Routes>
                    <Route path='/' exact element={<LoginComponentWithNavigation/>}/>
                    <Route path='/login' element={<LoginComponentWithNavigation/>}/>
                    <Route path='/welcome' element={<Welcome/>}/>
                    <Route path='/listCandidates' element={<ListCandidatesComponent/>}/>
                    <Route path='/logout' element={<LogoutComponent/>}/>
                    <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                    <FooterComponent/>
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

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = Authentication.isUserLoggedIn();
        console.log(isUserLoggedIn);
        return (
            <header>
                <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                    <div><a href="#" className='navbar-brand'>SalesApp</a></div>
                        <ul className='navbar-nav'>
                            {isUserLoggedIn && <li ><Link className='nav-link' to={"/welcome"}>Home</Link></li>}
                            {isUserLoggedIn && <li ><Link className='nav-link' to={"/listCandidates"}>Candidates</Link></li>}
                        </ul>
                        <ul className='navbar-nav navbar-collapse justify-content-end'>
                            {!isUserLoggedIn && <li ><Link className='nav-link' to={"/login"}>Login</Link></li>}
                            {isUserLoggedIn && <li ><Link className='nav-link' to={"/logout"} onClick={Authentication.unRegisterSuccessful}>Logout</Link></li>}
                        </ul>
                    
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component {
    render() {
        return (
            <footer className='footer'>
                 <span className='text-muted'>© 2022 - SSL. All rights reserved</span>
            </footer>
        )
    }
}

class LogoutComponent extends Component {
    render() {
        return (
            <div>
                <h1> You are Logged Out</h1>
                <div className='container'> Click <Link to={"/login"}>here</Link> to login back</div>
            </div>
        )
    }
}

class ListCandidatesComponent extends Component {

    constructor (props) {
        super(props)
        this.state = {
            candidates: [
             { ID: 1001 , Name: "Vijay Karjala", PrimarySkill: "Java", SecondarySkill: "Devops"},
             { ID: 1002 , Name: "Chaitanya Mutupuru", PrimarySkill: "Java", SecondarySkill: "DB2"},
             { ID: 1003 , Name: "Prakash Miriyala", PrimarySkill: "Linux", SecondarySkill: "Middleware"},
             { ID: 1004 , Name: "Srini Kodi", PrimarySkill: ".Net", SecondarySkill: "PHP"},
             { ID: 1005 , Name: "Pedro", PrimarySkill: "React", SecondarySkill: "Angular"}
            ]
        }
    }

    render() {
        return (
            <div className="container">
                <h1> Current Available Candidates </h1>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Primary Skill</th>
                            <th>Secondary Skill</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                        this.state.candidates.map (
                            candidate => 
                            <tr>
                            <td>{candidate.ID}</td>
                            <td>{candidate.Name}</td>
                            <td>{candidate.PrimarySkill}</td>
                            <td>{candidate.SecondarySkill}</td>
                        </tr>
                        )
                        
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

class Welcome extends Component {
    render() {
        return (
            <>
            <h1>Welcome!</h1>
            <div className="container">
                Welcome to Sale Rep App.  <Link to='/listCandidates'>Click here</Link> to view candidates list.
            </div>
            </>
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
            hasLoginFailed: true,
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
        {
            //this.props.history.push('/welcome')
            Authentication.registerSuccessful(this.state.username, this.state.password)
            this.props.navigate('/welcome')
            // this.setState(
            //     {
            //         showSuccessMessage: true,
            //         hasLoginFailed: false
            //     }
            // )
        }
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
            <div className="App-custom" >
              
               <img  className='App-spacing' src={pic} alt="Digital Marketing"  width="900" height="400"/>
               <div >
               <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} showSuccessMessage={this.state.showSuccessMessage}/>
               <div>Username: <input type="text" name ="username"  value={this.state.username} onChange={this.handleDataChange}></input> </div>
               <div>Password: <input type="password" name ="password" value={this.state.password} onChange={this.handleDataChange}></input> </div>
               </div>
               <div ><button className='btn btn-success' onClick={this.loginClicked}> Login </button></div>
            </div>
        )
    }
}

function ShowInvalidCredentials(props) 
{
        if(props.hasLoginFailed || !props.showSuccessMessage) {
            // return <div > Login incorrect </div>
            
        }
        else 
        {
            return <div> Login Successful </div>
        }
        return null
}