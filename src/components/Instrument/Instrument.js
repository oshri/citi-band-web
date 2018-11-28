import React, { Component } from 'react';
import Slider from './Slider/Slider';
import './Instrument.scss';

export class Instrument extends Component {
    constructor(props) {
        super(props);

        this.state = {
            instrument: props.instrument,
            notes: this.props.notes
        };
    }

    handleSliderChange(index, value) {
        console.log('Change', index, value);
        const newNotes = this.state.notes.slice();
        newNotes.splice(index, 1, value);

        this.props.onChange(newNotes);
        this.setState({ notes: newNotes });
    }

    renderSliders() {
        return this.state.notes.map((note, i) => (
            <div key={i} className="Instrument__slider">
                <Slider index={i} value={this.state.notes[i]} onChange={this.handleSliderChange.bind(this)} />
            </div>
        ));
    }

    render() {
        return (
            <div className="Instrument__container">
                <h2>Instrument: {this.state.instrument}</h2>
                <div className="Instrument__sliders-container">{this.renderSliders()}</div>
            </div>
        );
    }
}

export default Instrument;
