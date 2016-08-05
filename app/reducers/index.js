'use strict';

import { combineReducers } from 'redux';
import home from './home';
import prefetchedImages from './prefetchedImages';

const rootReducer = combineReducers({
    home,
    prefetchedImages
});

export default rootReducer;