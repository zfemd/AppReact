
import types from '../constants/actions';
import { request } from '../utils/common';

export function fetchList() {
    return dispatch => {
        dispatch(fetchFlowList());
        const timestamp = (new Date()).getTime();
        const pageSize = 2;
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

function fetchFlowList() {
    return {
        type: types.FETCH_FLOW_LIST
    };
}

function receiveFlowList(list) {
    return {
        type: types.RECEIVE_FLOW_LIST,
        list
    };
}