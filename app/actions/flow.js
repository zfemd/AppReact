
import types from '../constants/actions';
import { tools } from '../utils/common';

export function fetchList() {
    return dispatch => {
        dispatch(fetchFlowList());
        return request('/accounts/pushed/notes', 'get')
            .then((list) => {
                dispatch(receiveFlowList(list));
            }, function(error){
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