import React,{Component} from 'react';
import CandidatesDataService from '../../../api/sales/CandidatesDataService.js'
import Authentication from '../login/Authentication.jsx';
import CandidateComponent from './CandidateComponent.jsx';


class ListCandidatesComponent extends Component {

    constructor (props) {
        super(props)
        this.state = {
            candidates: [
            //  { ID: 1001 , Name: "Vijay Karjala", PrimarySkill: "Java", SecondarySkill: "Devops"},
            //  { ID: 1002 , Name: "Chaitanya Mutupuru", PrimarySkill: "Java", SecondarySkill: "DB2"},
            //  { ID: 1003 , Name: "Prakash Miriyala", PrimarySkill: "Linux", SecondarySkill: "Middleware"},
            //  { ID: 1004 , Name: "Srini Kodi", PrimarySkill: ".Net", SecondarySkill: "PHP"},
            //  { ID: 1005 , Name: "Pedro", PrimarySkill: "React", SecondarySkill: "Angular"}
            ],
            message: null

        }

        this.deleteClicked = this.deleteClicked.bind(this)
        this.updateClicked = this.updateClicked.bind(this)
        this.refreshCandidateList = this.refreshCandidateList.bind(this)
        this.addCandidateClicked = this.addCandidateClicked.bind(this)

    }

    componentDidMount () {
        this.refreshCandidateList()
    }

    refreshCandidateList () {
        let username = Authentication.getLoggedUser()

        CandidatesDataService.executeAllCandidatesDS(username).then(
            response => {
               // console.log(response.data)
            this.setState( {
                candidates : response.data
            }) }
        )
    }

    deleteClicked(id) {
        let username = Authentication.getLoggedUser()

       // console.log('Delete Button Clicked ' + id +" "+username) 
       CandidatesDataService.removeCandidate(username,id).then(
           reponse => {
               this.setState({
                   message : `Candidate ${id} successfully deleted`
                   
               })
               this.refreshCandidateList()
           }
       )

    }

    updateClicked(id) {
        let username = Authentication.getLoggedUser()

        this.props.navigate(`/candidates/${id}`)
       // console.log('Update Button Clicked ' + id + " " + username)

    }

    addCandidateClicked() {
        this.props.navigate(`/candidates/-1`)

    }

    render() {
        return (
            <div className="container">
                <h1> Current Available Candidates </h1>
                {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Primary Skill</th>
                            <th>Secondary Skill</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>     
                        {
                             this.state.candidates.map (
                                candidate =>  
                                <tr key={candidate.id}>
                                <td>{candidate.id} </td>
                                <td>{candidate.candidateName} </td>
                                <td>{candidate.primarySkill} </td>
                                <td>{candidate.secondarySkill} </td>
                                <td><button className='btn btn-warning' onClick={() => this.deleteClicked(candidate.id)}>Delete</button></td>
                                <td><button className='btn btn-success' onClick={() => this.updateClicked(candidate.id)}>Update</button></td>
                                </tr>
                             )
                        }                   
                        {/* {
                        this.state.candidates.map (
                            candidate => 
                            <tr key={candidate.Id}>
                            {/* //<td>{candidate.ID}</td> 
                            <td>{candidate.candidateName}</td>
                            <td>{candidate.PrimarySkill}</td>
                            <td>{candidate.SecondarySkill}</td>
                        </tr>
                        )
                        
                        } */}
                    </tbody>
                </table>
                <div>
                    <button className='btn btn-success' onClick={this.addCandidateClicked}>Add Candidate</button>
                </div>
            </div>
        )
    }
}

export default ListCandidatesComponent;