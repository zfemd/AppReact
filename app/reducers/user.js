
import types from '../constants/actions';

const initialState = {
    userInfo: {},
};


const user = function (state = initialState, action = {}) {
    switch (action.type) {
        case types.RECEIVE_USER_INFO:
            return Object.assign({}, state, {
                userInfo: action.info
            });
        default:
            return state;
    }
};

export default user;
