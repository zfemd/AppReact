
import types from '../constants/actions';
import { request } from '../utils/common';

export function fetchList(refreshing = false, loadingMore = false, flowRefreshing = false) {
    return dispatch => {
        dispatch(fetchFlowList(refreshing, loadingMore, flowRefreshing));
        const timestamp = (new Date()).getTime();
        const pageSize = 10;
        let loadedSize = 0;
        return request('/notes?timestamp='+ timestamp + '&pageSize='+ pageSize + '&loadedSize='+ loadedSize, 'get')
            .then((list) => {
                dispatch(receiveFlowList(list.resultValues));
            }, function(error){
                dispatch(receiveFlowList([]));
                console.log(error);
            })
            .catch(() => {
                dispatch(receiveFlowList([]));
                console.log('network error');
            });
    };
}

function fetchFlowList(refreshing, loadingMore, flowRefreshing) {
    return {
        type: types.FETCH_FLOW_LIST,
        refreshing,
        loadingMore,
        flowRefreshing
    };
}

function receiveFlowList(list) {
    return {
        type: types.RECEIVE_FLOW_LIST,
        list
    };
}