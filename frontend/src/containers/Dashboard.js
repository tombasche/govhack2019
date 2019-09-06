import React, { Component } from 'react';
import Header from '../components/Header';

import { bindActionCreators } from 'redux';
import * as dashboardActions from '../redux/actions/dashboard';
import { connect } from 'react-redux';

import './Dashboard.css';
import Loading from "../components/Loading";
import {Graph} from "../components/Graph";
import ControlSlider from "../components/ControlSlider";

const mapStateToProps = state => ({
    dashboard: state.dashboard,
});

const mapDispatchToProps = dispatch => {
    return {
        dashboardActions: bindActionCreators(dashboardActions, dispatch)
    };
};

let fakeAirData = [
    {x: 1567720826, y: 0.5},
    {x: 1567730826, y: 0.9},
    {x: 1567740826, y: 0.2},
    {x: 1567750826, y: 0.4},
    {x: 1567760826, y: 0.5},
    {x: 1567770826, y: 0.1},
];
let resetAirData = fakeAirData;


let fakeTrafficData = [
    {x: 1567720826, y: 4},
    {x: 1567730826, y: 5},
    {x: 1567740826, y: 2},
    {x: 1567750826, y: 1},
    {x: 1567760826, y: 2.5},
    {x: 1567770826, y: 3.4},
];
let resetTrafficData = fakeTrafficData;

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    // fetchNow = () => {
    //     this.props.dashboardActions.fetchNowData(userKey);
    // };
    //
    // fetchToday = () => {
    //     this.props.dashboardActions.fetchDailyData(userKey);
    // };

    componentDidMount() {
        // fetch the users, and default them to sort by solar generation
        // this.props.dashboardActions.fetchData(userKey);
        // this.props.dashboardActions.fetchDailyData(userKey);
        // this.fetchNow();
        // this.refreshInterval = setInterval(this.fetchNow, 20000);
        // this.refreshInterval = setInterval(this.fetchToday, 120000);
    }

    render() {
        // const dashboard = this.props.dashboard.data;
        return (
            <div className="dashboard">
                <Header />
                        <div className="right-now-container">
                            <Graph
                                label="Data"
                                airData={fakeAirData}
                                trafficData={fakeTrafficData}
                            />
                        </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
