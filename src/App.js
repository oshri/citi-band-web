import React, { Component } from 'react';
import './App.scss';
import JoinForm from './components/JoinForm/JoinForm';
import ApiService from './shared/api-service/ApiService';
import Users from './components/Users/Users';
import Instrument from './components/Instrument/Instrument';

const userKey = 'user';
const presetKey = 'preset';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: JSON.parse(localStorage.getItem(userKey)),
            allUsers: {},
            loading: true,
            hasError: false
        };

        console.log('Loaded user', this.state.user);

        ApiService.getParts()
            .then(parts => {
                if (this.state.user && !this.isUserInParts(parts)) {
                    this.removeUser();
                }

                this.setState({ allUsers: parts, loading: false });
            })
            .catch(error => {
                console.log('failed to get other users', error);
                this.setState({ loading: false, hasError: true });
            });
    }

    removeUser() {
        localStorage.removeItem(userKey);
        this.setState({ user: null });
    }

    isUserInParts(parts) {
        return Object.keys(parts)
            .filter(id => !!parts[id])
            .map(id => parts[id].name)
            .some(name => name === this.state.user.name);
    }

    getProgressView(label) {
        const style = {
            textAlign: 'center',
            margin: '20px 0',
            fontSize: '2rem'
        };

        return <div style={style}>{label}</div>;
    }

    saveUser(user) {
        console.log('saveUser', user);
        localStorage.setItem(userKey, JSON.stringify(user));
        this.setState({ user, allUsers: { ...this.state.allUsers, [user.id]: user } });
    }

    getNewUserId() {
        const ids = Object.keys(this.state.allUsers).map(id => parseInt(id, 10));

        if (ids.length === 0) {
            return 0;
        }

        return ids.sort()[ids.length - 1] + 1;
    }

    displayJoinForm() {
        return <JoinForm onJoin={this.saveUser.bind(this)} userId={this.getNewUserId()} />;
    }

    resetAllParts() {
        ApiService.reset()
            .then(result => {
                console.log('reset result', result);
                this.removeUser();
            })
            .catch(error => console.error('reset error', error));
    }

    loadPreset() {
        if (!localStorage.getItem(presetKey)) {
            return alert('No preset found');
        }

        const preset = JSON.parse(localStorage.getItem(presetKey));
        this.saveUser({ ...this.state.user, notes: preset });
        window.location.reload();
    }

    savePreset() {
        localStorage.setItem(presetKey, JSON.stringify(this.state.user.notes));
    }

    displayInstrument() {
        return (
            <div>
                <Instrument
                    instrument={this.state.user.instrument}
                    notes={this.state.user.notes}
                    onChange={this.handleInstrumentChange.bind(this)}
                />
                <div className="App__buttons">
                    <button onClick={this.loadPreset.bind(this)} type="button">
                        Load Preset
                    </button>
                    <button onClick={this.savePreset.bind(this)} type="button">
                        Save Preset
                    </button>
                </div>
            </div>
        );
    }

    handleInstrumentChange(notes) {
        const { id, name, instrument } = this.state.user;
        ApiService.submitPart(id, name, instrument, notes)
            .then(result => {
                console.log('Updated notes', result);
                // localStorage.setItem(notesKey, JSON.stringify(notes));
                this.saveUser({ ...this.state.user, notes });
            })
            .catch(error => {
                console.error('Failed to update notes', error);
            });
    }

    displayUsers() {
        const users = Object.keys(this.state.allUsers).map(id => ({
            id: parseInt(id, 10),
            ...this.state.allUsers[id]
        }));
        return (
            <div>
                {users.length > 0 ? <Users currentUser={this.state.user} users={users} /> : <div>No Users Found</div>}
                {this.displayResetButton()}
            </div>
        );
    }

    displayResetButton() {
        return (
            <div className="App__reset-btn">
                <button type="button" onClick={this.resetAllParts.bind(this)}>
                    Remove All Participants
                </button>
            </div>
        );
    }

    render() {
        if (this.state.loading) {
            return this.getProgressView('Loading...');
        }

        if (this.state.hasError) {
            return (
                <div>
                    {this.getProgressView('ERROR: Failed to load CitiBand Player')}
                    {/*{this.displayResetButton()}*/}
                </div>
            );
        }

        return <div>{this.state.user ? this.displayInstrument() : this.displayJoinForm()}</div>;
    }
}

export default App;
