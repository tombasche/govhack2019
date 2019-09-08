import React, {Component} from 'react';
import { VictoryChart, VictoryTheme, VictoryLine } from 'victory';
import CanvasDraw from 'react-canvas-draw';

import './Graph.css';

const axios = require('axios');

export class Graph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    resetData = (e, canvas) => {
        e.preventDefault();
        canvas.clear();
        this.setState({
            data: []
        })
    };

    sendData = (data) => {

        let yValues = [];
        for (let i in data) {
            yValues.push(Math.abs(parseInt(data[i].y)));
            data[i].y *= -1
        }
        let maxValue = Math.max(...yValues)
        for (let i in data) {
            data[i].y += maxValue
        }
        this.setState({
            data
        })
        // axios.post('/user', {
        //     firstName: 'Fred',
        //     lastName: 'Flintstone'
        // })
        // .then(function (response) {
        //     this.setState({
        //
        //     })
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
    };

    render() {
        console.log(this.state.data)
        return (
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
                    animate={{duration: 500}}
                >
                    <VictoryLine
                        style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid #ccc"}
                        }}
                        data={this.state.data}
                    />
                </VictoryChart>
            </div>
        );
    }
}
