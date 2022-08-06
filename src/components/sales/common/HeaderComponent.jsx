import React,{Component} from 'react';
import Authentication from '../login/Authentication';
import { Link } from 'react-router-dom';

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = Authentication.isUserLoggedIn();
        return (
            <header>
                <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                    <div><a href="#" className='navbar-brand'>SalesApp</a></div>
                        <ul className='navbar-nav'>
                            {isUserLoggedIn && <li ><Link className='nav-link' to={"/welcome/Vijay"}>Home</Link></li>}
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

export default HeaderComponent