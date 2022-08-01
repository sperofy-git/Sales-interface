import React, {Component} from "react"
import { Link } from 'react-router-dom';
import MyBean from "../../../api/sales/MyBean";


class WelcomeRep extends Component {
    constructor () {
        super();

        this.executeMyBean = this.executeMyBean.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this)

        this.state = {
            welcomeMessage: ""
        }

    }
    render() {
        return (
            <>
            <h1>Welcome!</h1>
            <div className="container">
                Welcome to Sale Rep App.  <Link to='/listCandidates'>Click here</Link> to view candidates list.
            </div>

            <div>
                <button className="btn btn-success" onClick={this.executeMyBean}>Click Me</button>
            </div>
            <div className="container">
                {this.state.welcomeMessage}
            </div>
            </>
        )
    }

    executeMyBean () {
        MyBean.executeMyBean().then(response => this.handleSuccessfulResponse(response))
        .catch(error => this.handleError(error))

        // MyBean.executeHello().then(response => this.handleSuccessfulResponse(response))
        // .catch(error => console.log(error))
    }

    handleSuccessfulResponse(response) {

        this.setState (
            {
                welcomeMessage : response.data.message
            }
        )

    }

    handleError(error) {

        this.setState (
            {
                welcomeMessage : error.response.data.message
            }
        )

    }
}

export default WelcomeRep