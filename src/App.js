import React, { Component } from 'react';
import './App.scss';
import JoinForm from './components/JoinForm/JoinForm';
import ApiService from './shared/api-service/ApiService';

const userKey = 'user';

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
                this.setState({ allUsers: parts, loading: false });
            })
            .catch(error => {
                console.log('failed to get other users', error);
                this.setState({ loading: false, hasError: true });
            });
    }

    getProgressView(label) {
        const style = {
            textAlign: 'center',
            margin: '20px 0',
            fontSize: '2rem'
        };

        return <div style={style}>{label}</div>;
    }

    onJoin(user) {
        console.log('onJoin', user);
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
        return <JoinForm onJoin={this.onJoin.bind(this)} userId={this.getNewUserId()} />;
    }

    resetAllParts() {
        ApiService.reset()
            .then(result => {
                console.log('reset result', result);
                this.setState({ user: null });
            })
            .catch(error => console.error('reset error', error));
    }

    displayUsers() {
        const users = Object.keys(this.state.allUsers).map(id => ({
            id: parseInt(id, 10),
            ...this.state.allUsers[id]
        }));
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Instrument</td>
                            <td>Notes</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} className={user.id === this.state.user.id ? 'App__isUserRow' : ''}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.instrument}</td>
                                <td>{user.notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="App__reset-btn">
                    <button type="button" onClick={this.resetAllParts.bind(this)}>
                        Remove All Participants
                    </button>
                </div>
            </div>
        );
    }

    render() {
        if (this.state.loading) {
            return this.getProgressView('Loading...');
        }

        if (this.state.hasError) {
            return this.getProgressView('ERROR: Failed to load app');
        }

        return <div>{this.state.user ? this.displayUsers() : this.displayJoinForm()}</div>;
    }
}

export default App;
