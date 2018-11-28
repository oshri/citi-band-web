import React, { Component } from 'react';
import RangeSlider from './Rangeslider';
import './Slider.scss';
import './Rangeslider/index.css';
import * as debounce from 'lodash.debounce';

class Slider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value || -1,
            index: this.props.index
        };

        this.propagateChange = debounce(this.propagateChange, 100);
    }

    handleChange(value) {
        this.setState({
            value: value
        });
        this.propagateChange(value);
    }

    propagateChange(value) {
        this.props.onChange(this.state.index, value);
    }

    render() {
        return (
            <div className="slider-vertical">
                <RangeSlider
                    min={-1}
                    max={88}
                    tooltip={false}
                    value={this.state.value}
                    handleLabel={this.state.value + ''}
                    orientation="vertical"
                    onChange={this.handleChange.bind(this)}
                />
            </div>
        );
    }
}

export default Slider;
