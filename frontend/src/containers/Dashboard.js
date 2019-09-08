import React, { Component } from 'react';
import Header from '../components/Header';

import './Dashboard.css';
import {Graph} from "../components/Graph";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <div className="dashboard">
                <Header />
                        <div className="right-now-container">
                            <Graph
                                label="Data"
                            />
                        </div>
            </div>
        );
    }
}

export default Dashboard;
