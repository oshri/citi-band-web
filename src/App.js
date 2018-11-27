import React, { Component } from 'react';
import './App.scss';
import JoinForm from './components/JoinForm/JoinForm';
import ApiService from './shared/api-service/ApiService';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            otherUsers: {}
        };

        ApiService.getParts()
            .then(parts => {
                this.setState({ otherUsers: parts });
            })
            .catch(error => console.log('failed to get other users', error));
    }

    onJoin(user) {
        console.log('onJoin', user);
        this.setState({ user });
    }

    displayUsers() {
        const users = Object.keys(this.state.otherUsers)
            .map(id => ({ id, ...this.state.otherUsers[id] }))
            .concat([this.state.user]);
        return (
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
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.instrument}</td>
                            <td>{user.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    render() {
        return <div>{this.state.user ? this.displayUsers() : <JoinForm onJoin={this.onJoin.bind(this)} />}</div>;
    }
}

export default App;
