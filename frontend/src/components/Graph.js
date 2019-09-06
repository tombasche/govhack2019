import React, {Component} from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

import './Graph.css';

const fakeAirData = [

];

const fakeTrafficData = [

];


export class Graph extends Component {

    render() {
        let domain = {};
        if(this.props.myData > 0) {
            domain = {
                y: [this.props.myData, 0]
            }
        } else {
            domain = {
                y: [0, this.props.myData]
            }
        }

        return (
            <div className="chart">
                <VictoryChart
                    domainPadding={{x: [40, 40]}}
                    theme={VictoryTheme.material}
                    padding={{top: 50, right: 50, left: 100, bottom: 50}}
                    width={240}
                    height={250}
                    labels={['', '']}
                >
                    <VictoryAxis
                        tickFormat={() => ''}

                    />
                    <VictoryAxis
                        dependentAxis
                        tickValues={this.props.range}
                    />
                    <VictoryBar
                        data={[{label: '1', value: this.props.myData}]}
                        labels={['', '']}
                        domain={myDomain}
                        x="label"
                        y="value"
                        labelComponent={<g/>}
                        style={{
                            data: {
                                fill: '#9de3a7'
                            }
                        }}
                        animate={{
                            duration: 1000,
                            onLoad: { duration: 1000 }
                        }}
                        barWidth={30}
                    />
                    <VictoryBar
                        data={[{label: '2', value: this.props.theirData}]}
                        labels={['', '']}
                        domain={theirDomain}
                        x="label"
                        y="value"
                        labelComponent={<g/>}
                        style={{
                            data: {
                                fill: '#cfdde3'
                            }
                        }}
                        animate={{
                            duration: 1000,
                            onLoad: { duration: 1000 }
                        }}
                        barWidth={30}
                    />
                </VictoryChart>
                <span className="chart-label">{this.props.label} ({this.props.unit})</span>
            </div>
        );
    }
}
