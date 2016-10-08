
import types from '../constants/actions';

const initialState = {
    loading: false,
    flowList: []
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
                flowList: action.list
            });
        default:
            return state;
    }
};

export default flow;
