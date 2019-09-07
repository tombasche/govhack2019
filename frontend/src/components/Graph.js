import React, {Component} from 'react';
import { VictoryChart, VictoryTheme, VictoryLine } from 'victory';

import './Graph.css';
import ControlSlider from "./ControlSlider";
import Button from "./Button";


export class Graph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            airData: this.props.airData,
            trafficData: this.props.trafficData,
            sliders: {
                sliderAir: this.props.defaultAir
            }
        }
    }

    updatePrediction = (e, dataset) => {
        let val = e[0];
        for (let i in dataset) {
            let set = dataset[i];
            set.y *= val;
            dataset[i].y = set.y
        }
        this.setState({
            ...this.state,
            sliders: {
                sliderAir: val
            },
            airData: {
                predicted: dataset,
            },
        })
    };

    updateSets = (e) => {
        // this.updateDataSet(e, this.props.airData, 'airData')
        this.updatePrediction(e, this.props.airData.predicted)
    };

    resetData = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            sliders: {
              sliderAir: this.props.defaultAir
            }
        })
    };

    render() {
        return (
            <div className="chart">
                <div className="sliders">

                    <ControlSlider
                        updateSlider={(e) => this.updateSets(e)}
                        value={this.state.sliders.sliderAir}
                    />
                    <ControlSlider
                        // updateSlider={(e) => this.updateSets(e)}
                        value={25}
                    />
                    <ControlSlider
                        // updateSlider={(e) => this.updateSets(e)}
                        value={50}
                    />
                </div>
                <VictoryChart
                    theme={VictoryTheme.material}
                    width={1000}
                    height={600}
                    animate={{duration: 2000}}
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
                            data: { strokeDasharray: "3, 2", stroke: "#c43a31" },
                            parent: { border: "1px dotted #ccc"}
                        }}
                        data={this.state.airData.predicted}
                    />

                    {/*<VictoryLine*/}
                    {/*    style={{*/}
                    {/*        data: { stroke: "blue" },*/}
                    {/*        parent: { border: "1px solid #ccc"}*/}
                    {/*    }}*/}
                    {/*    data={this.state.trafficData.actual}*/}
                    {/*/>*/}
                    {/*<VictoryLine*/}
                    {/*    style={{*/}
                    {/*        data: { stroke: "blue" },*/}
                    {/*        parent: { border: "1px dotted #ccc"}*/}
                    {/*    }}*/}
                    {/*    data={this.state.trafficData.predicted}*/}
                    {/*/>*/}
                </VictoryChart>

                <Button
                    label={"Reset"}
                    onClick={this.resetData}
                    domain={[0, 100]}
                />
            </div>
        );
    }
}
