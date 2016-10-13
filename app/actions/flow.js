import types from '../constants/actions';
import { request } from '../utils/common';

export function fetchList(refreshing = false, loadingMore = false, flowRefreshing = false, loadedSize = 0, timestamp = 0) {
    return dispatch => {
        if (!loadingMore) {
            timestamp = (new Date()).getTime();
        }
        dispatch(fetchFlowList(refreshing, loadingMore, flowRefreshing, timestamp));

        const pageSize = 5;
        loadedSize = loadedSize ? loadedSize : 0;
        return request('/notes?timestamp=' + timestamp + '&pageSize=' + pageSize + '&loadedSize=' + loadedSize, 'get')
            .then((list) => {
                if(list.resultValues.length > 0){
                    dispatch(receiveFlowList(list.resultValues, false));
                } else {
                    dispatch(receiveFlowList(list.resultValues, true));
                }

            }, function (error) {
                dispatch(receiveFlowList([]));
                console.log(error);
            })
            .catch(() => {
                dispatch(receiveFlowList([]));
                console.log('network error');
            });
    };
}

function fetchFlowList(refreshing, loadingMore, flowRefreshing, timestamp) {
    return {
        type: types.FETCH_FLOW_LIST,
        refreshing,
        loadingMore,
        flowRefreshing,
        timestamp
    };
}

function receiveFlowList(list, noMoreData) {
    return {
        type: types.RECEIVE_FLOW_LIST,
        noMoreData,
        list
    };
}