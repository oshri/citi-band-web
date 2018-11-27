import React, { Component } from 'react';
import ApiService from '../../shared/api-service/ApiService';
import './JoinForm.scss';

class JoinForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            instrument: '',
            joining: false
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

        this.setState({ joining: true });
        ApiService.joinRoom(this.state.name, this.state.instrument)
            .then(result => {
                console.log('result', result);
            })
            .catch(error => console.error('error', error))
            .finally(() => this.setState({ joining: false }));
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
                <div className="JoinForm__instrument__button" onClick={() => this.selectInstrument(instrument)}>
                    <img src={require(`../../assets/icons/${instrument}.svg`)} alt={instrument} />
                </div>
            </div>
        );
    }

    isSelected(instrument) {
        return instrument === this.state.instrument;
    }

    getJoiningView() {
        const style = {
            textAlign: 'center',
            margin: '20px 0',
            fontSize: '2rem'
        };

        return <div style={style}>Joining...</div>;
    }

    getJoinFormView() {
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
                <input type="submit" value="Join" />
            </form>
        );
    }

    render() {
        return this.state.joining ? this.getJoiningView() : this.getJoinFormView();
    }
}

export default JoinForm;
