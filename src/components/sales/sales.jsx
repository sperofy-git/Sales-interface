import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import AuthenticatedRoute from './login/AuthenticatedRoute';
import HeaderComponent from './common/HeaderComponent';
import FooterComponent from './common/FooterComponent'
import LoginComponent from './login/LoginComponent';
import LogoutComponent from './login/LogoutComponent';
import ErrorComponent from './common/ErrorComponent';
import WelcomeRep from './rep/WelcomeRep';
import ListCandidatesComponent from './candidates/ListCandidatesComponent';
import CandidateComponent from './candidates/CandidateComponent';

export default class Sales extends Component {
    
    render () {
        const LoginComponentWithNavigation = new withNavigation(LoginComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        const WelcomeComponentWithParams = withParams(WelcomeRep);
        const ListCandidatesComponentWithNavigation = withNavigation(ListCandidatesComponent) 
        const CandidateComponentWithParamsAndNavigation = withParams(withNavigation(CandidateComponent));


        return (

            <div className='Sales'>
                
                <Router>
                    <HeaderComponentWithNavigation/>
                    <Routes>
                    <Route path='/' exact element={<LoginComponentWithNavigation/>}/>
                    <Route path='/login' element={<LoginComponentWithNavigation/>}/>
                    <Route path='/welcome/:candidateName' element={
                    <AuthenticatedRoute>
                    <WelcomeComponentWithParams/> 
                    </AuthenticatedRoute>
                    }/>
                    <Route path="/candidates/:id" element={ 
			            	<AuthenticatedRoute>
			            		<CandidateComponentWithParamsAndNavigation />
			            	</AuthenticatedRoute>
			            } />
                    <Route path='/listCandidates' element={
                    <AuthenticatedRoute>
                    <ListCandidatesComponentWithNavigation/>
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

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

function withNavigation(Component) {
    return props => <Component {...props} navigate={useNavigate()} />;
  }
