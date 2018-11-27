import axios from 'axios';
const baseUrl = 'http://18.191.23.1:5000';

function getParts() {
    return axios.get(`${baseUrl}/part`).then(result => result.data);
}

function submitPart(id, name, instrument, notes) {
    return axios.post(`${baseUrl}/part/${id}`, { name, instrument, notes }).then(result => result.data);
}

function getLastId() {
    return getParts().then(result => {
        const ids = Object.keys(result).map(id => parseInt(id, 10));

        return ids.sort()[ids.length - 1];
    });
}

export default {
    getParts,
    submitPart,
    getLastId
};
