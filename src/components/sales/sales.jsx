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



function withNavigation(Component) {
    return props => <Component {...props} navigate={useNavigate()} />;
  }
