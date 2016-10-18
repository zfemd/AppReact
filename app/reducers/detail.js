
import types from '../constants/actions';

const initialState = {
    note: {},
};


const detail = function (state = initialState, action = {}) {
    switch (action.type) {
        case types.RECEIVE_NOTE_DETAIL:
            return Object.assign({}, state, {
                note:  load(state, action)
            });
        default:
            return state;
    }
};

function load(state, action) {
    state.note[action.noteId] = state.note[action.noteId].concat(action.note);
    return state.note;
}
export default detail;
