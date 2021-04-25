import React from 'react'
import TableRow from './TableRow'
import moment from 'moment';

class Compare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apikey: this.props.apikey,
            date: this.props.date,
            brands: [],
            followers: [],
            engagement: []
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            date: nextProps.date,
            brands: [],
            engagement: [],
            followers: []
        });
        this.componentDidMount();
        if (this.state.brands.length > 0)
            this.getBrandFollowing(this.state.brands);
    }

    getBrandFollowing(brands) {
        // get secondary information for each brand => followers / engagement
        brands.map((value, index) => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            var raw = JSON.stringify({
                "apikey":this.state.apikey,
                "method":"partner_api.get_brand_data",
                "params":{
                    "projectname":"Automotive",
                    "brandname":value.brandname,
                    "date":{
                        "start": moment(this.state.date, 'YYYY-MM-DD').unix() * 1000,
                        "end": moment(this.state.date, 'YYYY-MM-DD').unix() * 1000 + 1592000000
                    }
                }
            });
            
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            
            fetch("http://localhost:3001/requests", requestOptions)
                .then(response => response.json())
                .then(json => json.result)
                .then(res => res.kpis)
                .then(res => {
                    this.setState({
                        'followers': this.state.followers.concat(res.total_fans.current_period.abbr_string_1f)
                    });
                    this.setState({
                        'engagement': this.state.engagement.concat(res.total_engagement.current_period.abbr_string_1f)
                    })
                })
                .catch(error => console.log('error', error));
        });
    }

    componentDidMount() {
        // get initial brand datea => brands
        console.log("refreshed");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"apikey":this.props.apikey,"method":"partner_api.get_brands","params":{"projectname":"Automotive"}});

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/requests", requestOptions)
            .then(response => response.json())
            .then(json => json.result)
            .then(res => this.setState({ 'brands': res }));
    }

    render() {
        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Brand Name</th>
                        <th scope="col">Total Profiles</th>
                        <th scope="col">Total Followers</th>
                        <th scope="col">Total Engagement</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.state.brands.length > 0 &&
                          this.state.followers.length > 0 &&
                          this.state.engagement.length > 0) ?
                            this.state.brands.map((value, index) => {
                                return <TableRow
                                        index={index + 1}
                                        name={value.brandname}
                                        profiles={value.profiles.length}
                                        followers={this.state.followers[index]}
                                        engagement={this.state.engagement[index]}
                                />;
                            })
                            : <TableRow
                               name="Select date..." />
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Compare;