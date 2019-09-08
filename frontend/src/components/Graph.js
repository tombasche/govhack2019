import React, {Component} from 'react';
import { VictoryChart, VictoryTheme, VictoryLine, VictoryAxis, VictoryTooltip } from 'victory';
import CanvasDraw from 'react-canvas-draw';

import './Graph.css';

const axios = require('axios');

const fakeAir = [
    {"x": 0, "y": 0},
    {"x": 1, "y": 0.5},
    {"x": 2, "y": 0.6},
    {"x": 3, "y": 0.8},
    {"x": 4, "y": 0.9},
    {"x": 5, "y": 1.1},
    {"x": 6, "y": 1.5},
    {"x": 7, "y": 1.7},
    {"x": 8, "y": 2},
    {"x": 9, "y": 2.2},
    {"x": 10, "y": 2.2},
    {"x": 11, "y": 2.2},
    {"x": 12, "y": 2.2},
    {"x": 13, "y": 2.4},
    {"x": 14, "y": 2.5},
    {"x": 15, "y": 2.7},
    {"x": 16, "y": 2.7},
    {"x": 17, "y": 3.0},
    {"x": 18, "y": 3.2},
    {"x": 19, "y": 3.3},
    {"x": 20, "y": 3.4},
    {"x": 21, "y": 3.5},
];

const fakeBirth = [
    {"x": 0, "y": 0.1},
    {"x": 1, "y": 0.6},
    {"x": 2, "y": 0.64},
    {"x": 3, "y": 0.87},
    {"x": 4, "y": 1.1},
    {"x": 5, "y": 1.15},
    {"x": 6, "y": 1.56},
    {"x": 7, "y": 1.78},
    {"x": 8, "y": 2.1},
    {"x": 9, "y": 2.3},
    {"x": 10, "y": 2.4},
    {"x": 11, "y": 2.5},
    {"x": 12, "y": 2.6},
    {"x": 13, "y": 2.6},
    {"x": 14, "y": 2.65},
    {"x": 15, "y": 2.77},
    {"x": 16, "y": 2.77},
    {"x": 17, "y": 3.07},
    {"x": 18, "y": 3.27},
    {"x": 19, "y": 3.37},
    {"x": 20, "y": 3.47},
    {"x": 21, "y": 3.57},
];


const fakeTraffic = [
    {"x": 0, "y": 0.1},
    {"x": 1, "y": 0.6},
    {"x": 2, "y": 0.7},
    {"x": 3, "y": 0.9},
    {"x": 4, "y": 1.0},
    {"x": 5, "y": 1.0},
    {"x": 6, "y": 1.2},
    {"x": 7, "y": 1.3},
    {"x": 8, "y": 1.4},
    {"x": 9, "y": 1.8},
    {"x": 10, "y": 2.0},
    {"x": 11, "y": 2.0},
    {"x": 12, "y": 2.0},
    {"x": 13, "y": 2.2},
    {"x": 14, "y": 2.3},
    {"x": 15, "y": 2.4},
    {"x": 16, "y": 2.5},
    {"x": 17, "y": 2.6},
    {"x": 18, "y": 2.7},
    {"x": 19, "y": 2.8},
    {"x": 20, "y": 2.9},
    {"x": 21, "y": 3.0},
];





export class Graph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                drawing: [],
                air: [],
                employment: [],
                birth: []
            },
            metric: 'air'
        }
    }

    resetData = (e, canvas) => {
        e.preventDefault();
        canvas.clear();
        this.setState({
            data: {
                drawing: [],
                air: [],
                employment: [],
                birth: []
            },
            metric: 'air'
        })
    };

    sendData = (data) => {

        let yValues = [];
        for (let i in data) {
            yValues.push(Math.abs(parseInt(data[i].y)));
            data[i].y *= -1
        }
        let maxValue = Math.max(...yValues);
        for (let i in data) {
            data[i].y += maxValue;
        }
        axios.post('http://localhost:5000/getprediction', {
            data: data,
            metric: this.state.metric
        })
        .then((response) => {
            this.setState({
                data: {
                    air: fakeAir,
                    employment: fakeTraffic,
                    birth: fakeBirth
                    // air: response.data["Air Quality"],
                    // employment: response.data["Employment"],
                    // birth: response.data["Birth"],
                }
            })
        })
        .catch((error) => {
            alert("Something went wrong :( ")
        });
    };

    updateSelect = (e) => {
        this.setState({
            metric: e.target.value
        })
    };

    render() {
        console.log(this.state)
        return (
            <div>
                <select className="custom-select" value={this.state.metric} onChange={(e => this.updateSelect(e))}>
                    <option value="air">Air Quality</option>
                    <option value="electricty">Electricity Demand</option>
                    <option value="birth">Birth Rate</option>
                    <option value="employment">Employment Rate</option>
                </select>
                <div className="chart">
                    <div className="canvas-container">

                        <CanvasDraw
                            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                            brushColor={'black'}
                            brushRadius={5}
                            canvasWidth={400}
                            canvasHeight={400}
                        />
                        <div className="button-container">
                            <button className="savebutton"
                                    onClick={() => {
                                        this.sendData(JSON.parse(this.saveableCanvas.getSaveData()).lines[0].points)
                                    }}
                            >
                                Save
                            </button>
                            <button className="clearbutton" onClick={(e) => {this.resetData(e, this.saveableCanvas)}}>
                                Clear
                            </button>
                        </div>
                    </div>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        width={600}
                        height={600}
                        animate={{duration: 1000}}
                    >
                        <VictoryAxis tickFormat={() => ''} />
                        <VictoryLine
                            style={{
                                data: { stroke: "blue" },
                                parent: { border: "1px solid #ccc"}
                            }}
                            data={this.state.data.air}
                        />
                        <VictoryLine
                            style={{
                                data: { stroke: "red" },
                                parent: { border: "1px solid #ccc"}
                            }}
                            data={this.state.data.birth}
                        />
                        <VictoryLine
                            style={{
                                data: { stroke: "orange" },
                                parent: { border: "1px solid #ccc"}
                            }}
                            data={this.state.data.employment}
                        />
                    </VictoryChart>

                </div>
                <div className="legend-container">
                    <span className="key-legend" style={{color: "blue"}}>Air Quality</span>
                    <span className="key-legend" style={{color: "red"}}>Birth Rate</span>
                    <span className="key-legend"  style={{color: "orange"}}>Employment</span>
                </div>
            </div>

        );
    }
}
