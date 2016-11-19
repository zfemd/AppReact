import types from '../constants/actions';
import { request } from '../utils/common';

export function fetchUserInfo(params) {
    return dispatch => {

        return request('/user/profile', 'get', '', params.token)
            .then((list) => {
                if(list.resultCode == 0){
                    dispatch(receiveInfo(list.resultValues));
                } else {
                    dispatch(receiveInfo({}));
                }

            }, function (error) {
                dispatch(receiveInfo({}));
                console.log(error);
            })
            .catch(() => {
                dispatch(receiveInfo({}));
                console.log('network error');
            });
    };
}

function receiveInfo(info) {
    return {
        type: types.RECEIVE_USER_INFO,
        info
    };
}