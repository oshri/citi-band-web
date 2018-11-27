import React, { Component } from 'react';
import './JoinForm.scss';

class JoinForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            instrument: ''
        };
    }

    handleName(event) {
        this.setState({ name: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.state.name.trim()) {
            return alert('Please type your name');
        }

        if (!this.state.instrument) {
            return alert('Please select instrument');
        }

        //TODO Send API request
    }

    selectInstrument(instrument) {
        console.log('selectInstrument', instrument);
        this.setState({ instrument });
    }

    getInstrumentButton(instrument) {
        return (
            <div
                className={`JoinForm__instrument ${
                    this.isSelected(instrument) ? 'JoinForm__instrument--selected' : ''
                }`}
            >
                <button type="button" onClick={() => this.selectInstrument(instrument)}>
                    <img src={require(`../../assets/icons/${instrument}.svg`)} alt={instrument} />
                </button>
            </div>
        );
    }

    isSelected(instrument) {
        return instrument === this.state.instrument;
    }

    render() {
        return (
            <form className="JoinForm" onSubmit={this.handleSubmit.bind(this)}>
                <h2>Join Room</h2>
                <div className="JoinForm__input-container">
                    <label>Name</label>
                    <input type="text" value={this.state.name} onChange={this.handleName.bind(this)} />
                </div>
                <div className="JoinForm__instruments-container">
                    {this.getInstrumentButton('guitar')}
                    {this.getInstrumentButton('piano')}
                    {this.getInstrumentButton('drums')}
                </div>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default JoinForm;
