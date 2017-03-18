import types from '../constants/actions';
import { request } from '../utils/common';
import configs from '../constants/configs';

export function fetchItemSearchList(keyWord) {
    return dispatch => {
        let url = {
            host: configs.itemSearchUrl,
            route:  'duoshouji/search/' + keyWord
        };
        return request(url, 'get')
            .then((list) => {
                if (list.length > 0) {
                    dispatch(receiveItemSearchList(list));
                } else {
                    dispatch(receiveItemSearchList([]));
                }

            }, function (error) {
                dispatch(receiveItemSearchList([]));
                console.log(error);
            })
            .catch(() => {
                dispatch(receiveItemSearchList([]));
                console.log('network error');
            });
    };
}
function receiveItemSearchList(list) {
    return {
        type: types.RECEIVE_ITEM_SEARCH_LIST,
        list
    };
}