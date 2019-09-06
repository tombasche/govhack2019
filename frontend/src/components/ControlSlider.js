import React, {Component} from 'react';
import { Slider, Handles } from 'react-compound-slider'

const sliderStyle = {  // Give the slider some width
    position: 'relative',
    width: '100%',
    height: 80,
    border: '1px solid steelblue',
};

const railStyle = {
    position: 'absolute',
    width: '100%',
    height: 10,
    marginTop: 35,
    borderRadius: 5,
    backgroundColor: '#8B9CB6',
};

export function Handle({ // your handle component
                           handle: { id, value, percent },
                           getHandleProps
                       }) {
    return (
        <div
            style={{
                left: `${percent}%`,
                position: 'absolute',
                marginLeft: -15,
                marginTop: 25,
                zIndex: 2,
                width: 30,
                height: 30,
                border: 0,
                textAlign: 'center',
                cursor: 'pointer',
                borderRadius: '50%',
                backgroundColor: '#2C4870',
                color: '#333',
            }}
            {...getHandleProps(id)}
        >
            <div style={{ fontFamily: 'Roboto', fontSize: 11, marginTop: -35 }}>
                {value}
            </div>
        </div>
    )
}

export default class ControlSlider extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Slider
                rootStyle={sliderStyle}
                domain={[-1, 1]}
                step={0.01}
                mode={2}
                values={[this.props.value]}
                onUpdate={this.props.updateSlider}
            >
                <div style={railStyle}/>
                <Handles>
                    {({ handles, getHandleProps }) => (
                        <div className="slider-handles">
                            {handles.map(handle => (
                                <Handle
                                    key={handle.id}
                                    handle={handle}
                                    getHandleProps={getHandleProps}
                                />
                            ))}
                        </div>
                    )}
                </Handles>
            </Slider>
        );
    }
}
