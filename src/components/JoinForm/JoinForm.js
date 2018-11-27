import React, { Component } from 'react';
import ApiService from '../../shared/api-service/ApiService';
import './JoinForm.scss';

class JoinForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            instrument: '',
            joining: false,
            id: props.userId,
            failedLastId: false
        };

        console.log('JoinForm - user id', this.state.id);
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
        ApiService.submitPart(this.state.id, this.state.name, this.state.instrument, [])
            .then(result => {
                console.log('result', result);
                this.setState({ joining: false });
                this.props.onJoin({
                    id: this.state.id,
                    name: this.state.name,
                    instrument: this.state.instrument,
                    notes: []
                });
            })
            .catch(error => {
                console.error('Failed to join', error);
                this.setState({ joining: false });
            });
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
                    <img src={require(`../../assets/icons/${instrument}.png`)} alt={instrument} />
                </div>
            </div>
        );
    }

    isSelected(instrument) {
        return instrument === this.state.instrument;
    }

    getProgressView(label) {
        const style = {
            textAlign: 'center',
            margin: '20px 0',
            fontSize: '2rem'
        };

        return <div style={style}>{label}</div>;
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
        return this.state.joining ? this.getProgressView('Joining...') : this.getJoinFormView();
    }
}

export default JoinForm;
