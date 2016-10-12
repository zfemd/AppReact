
import types from '../constants/actions';
import { request } from '../utils/common';

export function fetchList(refreshing = false, loadingMore = false) {
    return dispatch => {
        dispatch(fetchFlowList(refreshing, loadingMore));
        const timestamp = (new Date()).getTime();
        const pageSize = 0;
        let loadedSize = 0;
        return request('/notes?timestamp='+ timestamp + '&pageSize='+ pageSize + '&loadedSize='+ loadedSize, 'get')
            .then((list) => {
                dispatch(receiveFlowList(list.resultValues));
            }, function(error){
                dispatch(receiveTypeList([]));
                console.log(error);
            })
            .catch(() => {
                dispatch(receiveTypeList([]));
                console.log('network error');
            });
    };
}

function fetchFlowList(refreshing, loadingMore) {
    return {
        type: types.FETCH_FLOW_LIST,
        refreshing,
        loadingMore
    };
}

function receiveFlowList(list) {
    return {
        type: types.RECEIVE_FLOW_LIST,
        list
    };
}