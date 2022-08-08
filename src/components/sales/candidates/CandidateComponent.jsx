import React, {Component} from "react";
import { Formik , Form, Field, ErrorMessage} from 'formik';
import Authentication from "../login/Authentication";
import CandidatesDataService from "../../../api/sales/CandidatesDataService";
//import {moment} from "moment";


class CandidateComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.params.id, 
            candidateName: this.props.params.candidateName,
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

        CandidatesDataService.getCandidateService(username, this.state.id)
            .then(response => this.setState({
                candidateName: response.data.candidateName,
                primarySkill: response.data.primarySkill,
                secondarySkill: response.data.secondarySkill

            }))
    }

    validate(values) {
        let errors = {}
        if (!values.primarySkill) {
            errors.primarySkill = 'Enter a primary skill'
        } else if (values.primarySkill.length < 2) {
            errors.primarySkill = 'Enter atleast 5 Characters in primary skill'
        }

        if (!values.secondarySkill) {
            errors.secondarySkill = 'Enter a valid secondary skill'
        }

        return errors

    }

    onSubmit(values) {
        let username = Authentication.getLoggedUser()

        let candidate = {
            id: this.state.id,
            candidateName: values.candidateName,
            primarySkill: values.primarySkill,
            secondarySkill: values.secondarySkill
        }

        if (this.state.id === -1) {
             CandidatesDataService.createCandidate(username,candidate)
                .then(() => this.props.navigate('/listCandidates')) //REACT-6
        //     //this.props.history.push('/listCandidates')
        } else {
             CandidatesDataService.updateCandidate(username, this.state.id, candidate)
                .then(() => this.props.navigate('/listCandidates'))//REACT-6
             //this.props.history.push('/listCandidates')
         }

        console.log(values);
    }

    render() {
        let {candidateName, primarySkill,secondarySkill} = this.state
        return(
            <div>
                <h1>Candidate - {this.state.candidateName} </h1>
                <div className='container'>
                    <Formik
                        initialValues={{candidateName,primarySkill,secondarySkill}}
                        onSubmit={this.onSubmit}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {                            
                            (props) => (
                                <Form>
                                    <ErrorMessage name="primarySkill" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="secondarySkill" component="div"
                                        className="alert alert-warning" />
                                    <label>{this.state.id}</label>
                                    <fieldset className="form-group">
                                        <label>Candidate Name</label>
                                        <Field className='form-control' type='text' name='candidateName' />
                                    </fieldset>
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