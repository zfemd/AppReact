
import types from '../constants/actions';

const initialState = {
    userInfo: {},
    userNotes: []
};


const user = function (state = initialState, action = {}) {
    switch (action.type) {
        case types.RECEIVE_USER_INFO:
            return Object.assign({}, state, {
                userInfo: action.info
            });
        case types.RECEIVE_USER_NOTES:
            return Object.assign({}, state, {
                userNotes: action.list
            });
        default:
            return state;
    }
};

export default user;
