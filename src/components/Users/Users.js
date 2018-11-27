import React, { Component } from 'react';

export class Users extends Component {
    render() {
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
                    {this.props.users.map((user, index) => (
                        <tr key={index} className={user.id === this.props.currentUser.id ? 'App__isUserRow' : ''}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.instrument}</td>
                            <td>{user.notes.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default Users;
