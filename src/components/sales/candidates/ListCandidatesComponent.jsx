import React,{Component} from 'react';
import CandidatesDataService from '../../../api/sales/CandidatesDataService.js'


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
            ]
        }
    }

    componentDidMount () {
        CandidatesDataService.executeAllCandidatesDS().then(
            response => {
                console.log(response.data)
            this.setState( {
                candidates : response.data
            }) }
        )
    }
    render() {
        return (
            <div className="container">
                <h1> Current Available Candidates </h1>
                <table className="table">
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
                                <tr key={candidate.id}>
                                <td>{candidate.id} </td>
                                <td>{candidate.name} </td>
                                <td>{candidate.primarySkill} </td>
                                <td>{candidate.secondarySkill} </td>
                                </tr>
                             )
                        }                   
                        {/* {
                        this.state.candidates.map (
                            candidate => 
                            <tr key={candidate.Id}>
                            {/* //<td>{candidate.ID}</td> 
                            <td>{candidate.Name}</td>
                            <td>{candidate.PrimarySkill}</td>
                            <td>{candidate.SecondarySkill}</td>
                        </tr>
                        )
                        
                        } */}
                    </tbody>
                </table>
            </div>
            // <div>
            //     {this.state.candidates.map(
            //         //x => console.log(x.id)
            //         x => x.name
            //     )}
            // </div>
        )
    }
}

export default ListCandidatesComponent;