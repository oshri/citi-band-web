const numOfSliders = 16;

function buildNotesArray() {
    const notes = [];
    for (let i = 0; i < numOfSliders; i++) {
        notes.push(null);
    }

    return notes;
}

export default {
    buildNotesArray
};
