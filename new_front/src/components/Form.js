import React from "react"
import DatePicker from './DatePicker'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', show: true};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        alert('Apikey was submitted: ' + this.state.value);
        event.preventDefault();
    }
    render() {
        return(
            <Router>
                <div className="container">
                    {this.state.show ?
                        <div className="row pt-5">
                        <div className="col-3">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group pl-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter api-key"
                                        onChange={this.handleChange}
                                        onSubmit={this.handleSubmit}></input>
                                </div>
                                <Link to="/date"><button
                                    type="submit"
                                    className="btn btn-primary"
                                    value={this.state.value}
                                    onSubmit={this.handleChange}>Submit</button></Link>
                            </form>
                        </div>
                        <div className="col-9"></div>
                    </div> : null }
                    
                    <Switch>
                        <Route path="/date" >
                            <DatePicker apikey={this.state.value}/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Form;