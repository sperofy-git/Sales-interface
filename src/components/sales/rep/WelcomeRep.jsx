import React, {Component} from "react"
import { Link } from 'react-router-dom';


class WelcomeRep extends Component {
    render() {
        return (
            <>
            <h1>Welcome!</h1>
            <div className="container">
                Welcome to Sale Rep App.  <Link to='/listCandidates'>Click here</Link> to view candidates list.
            </div>
            </>
        )
    }
}

export default WelcomeRep