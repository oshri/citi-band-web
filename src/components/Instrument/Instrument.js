import React, { Component } from 'react';
import Slider from './Slider/Slider';

export class Instrument extends Component {
    constructor(props) {
        super(props);

        this.state = {
            instrument: props.instrument
        };
    }

    render() {
        return (
            <div>
                <div>Instrument: {this.state.instrument}</div>
                <Slider />
            </div>
        );
    }
}

export default Instrument;
