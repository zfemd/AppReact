
import types from '../constants/actions';

const initialState = {
    note: null,
};


const detail = function (state = initialState, action = {}) {
    switch (action.type) {
        case types.RECEIVE_NOTE_DETAIL:
            return Object.assign({}, state, {
                note: action.note
            });
        default:
            return state;
    }
};

export default detail;
