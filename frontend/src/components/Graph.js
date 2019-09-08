import React, {Component} from 'react';
import { VictoryChart, VictoryTheme, VictoryLine, VictoryAxis, VictoryTooltip } from 'victory';
import CanvasDraw from 'react-canvas-draw';

import './Graph.css';

const axios = require('axios');

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
                    drawing: data,
                    air: response.data["Air Quality"],
                    employment: response.data["Employment"],
                    birth: response.data["Birth"],
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
