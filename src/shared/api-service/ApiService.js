import axios from 'axios';
const baseUrl = 'http://18.191.23.1:5000';

function getParts() {
    return axios.get(`${baseUrl}/part`).then(result => result.data);
}

function submitPart(id, instrument, notes) {
    return axios.post(`${baseUrl}/part/${id}`, { instrument, notes }).then(result => result.data);
}

function joinRoom(name, instrument) {
    return new Promise(resolve => setTimeout(() => resolve({ name, instrument }), 1000));
}

export default {
    getParts,
    submitPart,
    joinRoom
};
