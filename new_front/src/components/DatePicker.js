import React from "react"
import Compare from "./Compare"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  } from "react-router-dom";

class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apikey: this.props.apikey,
            value: '',
            refresh: false,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        console.log("refreshed date picker");
        this.setState({refresh: true});
    }

    render() {
        return(
            <Router>
                <div className="row pt-5">
                    <div className="col-3">
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="date"
                                id="date1"
                                onChange={this.handleChange}></input>
                            <Link to="/compare"><button
                                type="submit"
                                className="btn btn-primary"
                                value={this.state.value}
                                onSubmit={this.handleChange}>Submit</button></Link>
                        </div>
                    </div>
                    <div className="col-9"></div>
                </div>
                <Switch>
                    <Route path="/compare">
                        <Compare apikey={this.props.apikey} date={this.state.value} />
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default DatePicker;