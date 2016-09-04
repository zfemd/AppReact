'use strict';

import StoreActions from '../constants/actions';

const initialState = {
    showToolbar: true,
    showFilter: false,
    filterMounted: false,
};

const home = function (state = initialState, action ={}) {
    switch (action.type) {
        case StoreActions.SHOW_HOME_TOOLBAR:
            state.showToolbar = true; break;
        case StoreActions.HIDE_HOME_TOOLBAR:
            state.showToolbar = false; break;
        default:
            return state;
    }

    return state;
};

export default home;
