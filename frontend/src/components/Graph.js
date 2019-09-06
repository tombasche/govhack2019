import React, {Component} from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLine } from 'victory';

import './Graph.css';
import ControlSlider from "./ControlSlider";
import Button from "./Button";


export class Graph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            airData: this.props.airData,
            population: this.props.population,
            sliders: {
                sliderAir: 0
            }
        }

    }
    updateDataSet = (e, dataset, datasetName) => {
        let val = e[0]
        for (let i in dataset) {
            let set = dataset[i];
            set.y += (val * 0.00001);
            console.log(set.y)
            dataset[i].y = set.y
        }
        this.setState({
            sliders: {
                sliderAir: val
            },
            airData: this.state.airData,
            population: {
                actual: dataset,
                predicted: this.state.population.predicted
            }
        })
    };

    updateSets = (e) => {
        // this.updateDataSet(e, this.props.airData, 'airData')
        this.updateDataSet(e, this.props.population.actual, 'population.predicted')
    };

    resetData = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            sliders: {
              sliderAir: 0
            }
        })
    };

    render() {
        return (
            <div className="chart">
                <VictoryChart
                    theme={VictoryTheme.material}
                    width={1000}
                    height={600}
                >
                    <VictoryLine
                        style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid #ccc"}
                        }}
                        data={this.state.airData.actual}
                    />
                    <VictoryLine
                        style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px dotted #ccc"}
                        }}
                        data={this.state.airData.predicted}
                    />

                    <VictoryLine
                        style={{
                            data: { stroke: "blue" },
                            parent: { border: "1px solid #ccc"}
                        }}
                        data={this.state.population.actual}
                    />
                    <VictoryLine
                        style={{
                            data: { stroke: "blue" },
                            parent: { border: "1px dotted #ccc"}
                        }}
                        data={this.state.population.predicted}
                    />
                </VictoryChart>
                <ControlSlider
                    updateSlider={(e) => this.updateSets(e)}
                    value={this.state.sliders.sliderAir}
                />
                <Button
                    label={"Reset"}
                    onClick={this.resetData}
                    domain={[0, 100]}
                />
            </div>
        );
    }
}
