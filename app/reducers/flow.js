
import types from '../constants/actions';

const initialState = {
    loading: false,
    refreshing: false,
    loadingMore: false,
    flowRefreshing: false,
    flowList: [],
    timestamp: null,
    noMoreData: false
};


const flow = function (state = initialState, action = {}) {
    switch (action.type) {
        case types.FETCH_FLOW_LIST:
            return Object.assign({}, state, {
                loading: true,
                refreshing: action.refreshing,
                loadingMore: action.loadingMore,
                flowRefreshing: action.flowRefreshing,
                timestamp: action.timestamp
            });
        case types.RECEIVE_FLOW_LIST:
            return Object.assign({}, state, {
                loading: false,
                refreshing: false,
                loadingMore: false,
                flowRefreshing: false,
                noMoreData: action.noMoreData,
                flowList: !state.loadingMore ?  action.list: state.flowList.concat(action.list)
            });
        default:
            return state;
    }
};

export default flow;
