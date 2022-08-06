import React,{Component} from 'react';
import pic from '../common/defpic_1.jpg'
import Authentication from '../login/Authentication';



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
            this.props.navigate('/welcome/admin')
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

export default LoginComponent