import React, { Component } from 'react';
import Header from '../components/Header';

import { bindActionCreators } from 'redux';
import * as dashboardActions from '../redux/actions/dashboard';
import { connect } from 'react-redux';

import './Dashboard.css';
import {Graph} from "../components/Graph";

const mapStateToProps = state => ({
    dashboard: state.dashboard,
});

const mapDispatchToProps = dispatch => {
    return {
        dashboardActions: bindActionCreators(dashboardActions, dispatch)
    };
};

let fakeAirData = {
    "actual": [
        {x: "Apr 2019", y: 25},
        {x: "May 2019", y: 26},
        {x: "Jun 2019", y: 30},
        {x: "Jul 2019", y: 34},
        {x: "Aug 2019", y: 36},
        {x: "Sept 2019", y: 40},
        {x: "Oct 2019", y: 42},
    ],
    "predicted": [
        {x: "Oct 2019", y: 42},
        {x: "Nov 2019", y: 43},
        {x: "Dec 2019", y: 44},
        {x: "Jan 2020", y: 46},
        {x: "Feb 2020", y: 47},
        {x: "March 2020", y: 50},
    ]

};

// let fakeTrafficData = {
//     "actual": [
//         {x: 1567720826, y: 0.5},
//         {x: 1567730826, y: 0.9},
//         {x: 1567740826, y: 0.2},
//         {x: 1567750826, y: 0.4},
//         {x: 1567760826, y: 0.5},
//         {x: 1567770826, y: 0.1},
//     ],
//     "predicted": [
//         {x: 1567720826, y: 0.5},
//         {x: 1567730826, y: 0.9},
//         {x: 1567740826, y: 0.2},
//         {x: 1567750826, y: 0.4},
//         {x: 1567760826, y: 0.5},
//         {x: 1567770826, y: 0.1},
//     ]
//
// };

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        // const dashboard = this.props.dashboard.data;
        return (
            <div className="dashboard">
                <Header />
                        <div className="right-now-container">
                            <Graph
                                label="Data"
                                defaultAir={40}
                                airData={fakeAirData}
                                trafficData={[]}
                            />
                        </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
