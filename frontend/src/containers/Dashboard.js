import React, { Component } from 'react';
import Header from '../components/Header';

import { bindActionCreators } from 'redux';
import * as dashboardActions from '../redux/actions/dashboard';
import { connect } from 'react-redux';

import './Dashboard.css';
import Loading from "../components/Loading";
import {Graph} from "../components/Graph";

const mapStateToProps = state => ({
    dashboard: state.dashboard,
});

const mapDispatchToProps = dispatch => {
    return {
        dashboardActions: bindActionCreators(dashboardActions, dispatch)
    };
};

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
                            <Graph />
                        </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
