import React, { Component } from 'react';
import RangeSlider from './Rangeslider';
import './Slider.scss';
import './Rangeslider/index.css';

class Slider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 25
        };
    }

    handleChange = value => {
        this.setState({
            value: value
        });
    };

    render() {
        return (
            <div className="slider-vertical">
                <RangeSlider
                    min={0}
                    max={100}
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
