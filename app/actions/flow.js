import types from '../constants/actions';
import { request, Token } from '../utils/common';
import _ from 'lodash';
import {fetchDetail} from './detail';
import home from '../reducers/home';

export function fetchList(params) {

    return dispatch => {
        if (!params.loadingMore) {
            params.timestamp = (new Date()).getTime();
        }
        dispatch(fetchFlowList(params.refreshing, params.loadingMore, params.flowRefreshing, params.timestamp, params.tag));

        const pageSize = 5;
        params.loadedSize = params.loadedSize ? params.loadedSize : 0;

        Token.getToken().then((token) => {
            return request('/notes?' +
                'timestamp=' + params.timestamp
                + '&pageSize=' + pageSize
                + '&loadedSize=' + params.loadedSize
                + (params.myFollowOnly? '&myFollowOnly': '')
                + '&tag=' + (params.tag !== 'all' ? params.tag : ''), 'get', '', token)
                .then((list) => {
                    if (list.resultCode === 0 && list.resultValues.length > 0) {
                        dispatch(receiveFlowList(list.resultValues, params.tag, false));
                    } else {
                        dispatch(receiveFlowList(list.resultValues, params.tag, true));
                    }

                    _.each(list.resultValues, function (v, k) {
                        dispatch(fetchDetail(v.noteId));
                    })

                }, function (error) {
                    dispatch(receiveFlowList([]));
                    console.log(error);
                })
                .catch(() => {
                    dispatch(receiveFlowList([]));
                    console.log('network error');
                });
        });

    };
}

function fetchFlowList(refreshing, loadingMore, flowRefreshing, timestamp, tag) {
    return {
        type: types.FETCH_FLOW_LIST,
        refreshing,
        loadingMore,
        flowRefreshing,
        timestamp,
        tag
    };
}

function receiveFlowList(list, tag, noMoreData) {
    return {
        type: types.RECEIVE_FLOW_LIST,
        noMoreData,
        tag,
        list
    };
}