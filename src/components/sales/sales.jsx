import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthenticatedRoute from './login/AuthenticatedRoute';
import HeaderComponent from './common/HeaderComponent';
import FooterComponent from './common/FooterComponent'
import LoginComponent from './login/LoginComponent';
import LogoutComponent from './login/LogoutComponent';
import ErrorComponent from './common/ErrorComponent';
import WelcomeRep from './rep/WelcomeRep';
import ListCandidatesComponent from './candidates/ListCandidatesComponent';

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
                    <Route path='/welcome' element={
                    <AuthenticatedRoute>
                    <WelcomeRep/> 
                    </AuthenticatedRoute>
                    }/>
                    <Route path='/listCandidates' element={
                    <AuthenticatedRoute>
                    <ListCandidatesComponent/>
                    </AuthenticatedRoute>
                    }/>
                    <Route path='/logout' element={
                    <AuthenticatedRoute>
                    <LogoutComponent/>
                    </AuthenticatedRoute>
                    }/>
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






function withNavigation(Component) {
    return props => <Component {...props} navigate={useNavigate()} />;
  }
