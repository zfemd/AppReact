
import types from '../constants/actions';

const initialState = {
    loading: false,
    list: {}
};


const flow = function (state = initialState, action = {}) {
    switch (action.type) {
        case types.FETCH_FLOW_LIST:
            return Object.assign({}, state, {
                loading: true
            });
        case types.RECEIVE_FLOW_LIST:
            return Object.assign({}, state, {
                loading: false,
                typeList: action.typeList
            });
        default:
            return state;
    }
};

export default flow;
