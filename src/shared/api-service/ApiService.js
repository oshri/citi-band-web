function joinRoom(name, instrument) {
    return new Promise(resolve => setTimeout(() => resolve({ name, instrument }), 1000));
}

export default {
    joinRoom
};
