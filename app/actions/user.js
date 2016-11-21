import types from '../constants/actions';
import { request } from '../utils/common';
import StorageKeys from '../constants/StorageKeys';
import { AsyncStorage } from 'react-native';
export function fetchUserInfo(params) {
    // my info
    if(!params.userId){
        return request('/user/profile', 'get', '', params.token)
            .then((list) => {
                if(list.resultCode == 0){
                    let userInfo = list.resultValues;
                    const source = {
                        name: userInfo.nickname,
                        gender: userInfo.gender == 'FEMALE'? 'women' : 'man',
                        income: userInfo.totalRevenue,
                        thumbUri: userInfo.portraitUrl,
                        summary: {
                            noteNum: userInfo.publishedNoteCount,
                            transNum: userInfo.transactionCount,
                            watcherNum: userInfo.watchCount,
                            fansNum: userInfo.fanCount
                        }
                    };
                    return AsyncStorage.setItem(StorageKeys.ME_STORAGE_KEY, JSON.stringify(source));
                }

            }, function (error) {
                console.log(error);
                return false;
            })
            .catch(() => {
                console.log('network error');
                return false;
            });
    }

    return dispatch => {
        return request('/user/profile?userId='+params.userId, 'get', '', params.token)
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