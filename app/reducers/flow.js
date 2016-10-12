
import types from '../constants/actions';

const initialState = {
    loading: false,
    refreshing: false,
    loadingMore: false,
    flowList: []
};


const flow = function (state = initialState, action = {}) {
    switch (action.type) {
        case types.FETCH_FLOW_LIST:
            return Object.assign({}, state, {
                loading: true,
                refreshing: action.refreshing,
                loadingMore: action.loadingMore
            });
        case types.RECEIVE_FLOW_LIST:
            return Object.assign({}, state, {
                loading: false,
                refreshing: false,
                loadingMore: false,
                flowList: action.list
            });
        default:
            return state;
    }
};

export default flow;
