import React,{Component} from 'react';
import { Link } from 'react-router-dom';


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

export default LogoutComponent