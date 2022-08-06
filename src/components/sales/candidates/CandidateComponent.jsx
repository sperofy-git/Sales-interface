import React, {Component} from "react";
import { Formik , Form, Field} from 'formik';
import Authentication from "../login/Authentication";
import CandidatesDataService from "../../../api/sales/CandidatesDataService";
import moment from "moment";

class CandidateComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.params.id, 
            name: this.props.params.name,
            primarySkill: '',
            secondarySkill: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)

    }

    componentDidMount() {

        if (this.state.id === -1) {
            return
        }

        let username = Authentication.getLoggedUser()

        CandidatesDataService.executeAllCandidatesDS(username, this.state.id)
            .then(response => this.setState({
                primarySkill: response.data.primarySkill,
                secondarySkill: response.data.secondarySkill

            }))
    }

    validate(values) {
        let errors = {}
        if (!values.primarySkill) {
            errors.primarySkill = 'Enter a Description'
        } else if (values.primarySkill.length < 5) {
            errors.primarySkill = 'Enter atleast 5 Characters in Description'
        }

        if (!moment(values.secondarySkill).isValid()) {
            errors.secondarySkill = 'Enter a valid Target Date'
        }

        return errors

    }

    onSubmit(values) {
        let username = Authentication.getLoggedUser()

        let candidate = {
            id: this.state.id,
            primarySkill: values.primarySkill,
            secondarySkill: values.secondarySkill
        }

        // if (this.state.id === -1) {
        //     CandidatesDataService.createTodo(username, todo)
        //         .then(() => this.props.navigate('/todos')) //REACT-6
        //     //this.props.history.push('/todos')
        // } else {
        //     CandidatesDataService.updateTodo(username, this.state.id, todo)
        //         .then(() => this.props.navigate('/todos'))//REACT-6
        //     //this.props.history.push('/todos')
        // }

        console.log(values);
    }

    render() {
        let {primarySkill,secondarySkill} = this.state
        return(
            <div>
                <h1>Candidate - {this.props.params.id} </h1>
                <div className='container'>
                    <Formik
                        initialValues={{primarySkill,secondarySkill}}
                        onSubmit={this.onSubmit}
                    >
                        {                            
                            (props) => (
                                <Form>
                                    <fieldset className="form-group">
                                        <label>Primary Skill</label>
                                        <Field className='form-control' type='text' name='primarySkill' />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Secondary Skill</label>
                                        <Field className='form-control' type='text' name='secondarySkill' />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )                            
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default CandidateComponent;