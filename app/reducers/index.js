'use strict';

import { combineReducers } from 'redux';
import home from './home';
import prefetchedImages from './prefetchedImages';
import draftNote from './draftNote';

const rootReducer = combineReducers({
    home,
    prefetchedImages,
    draftNote
});

export default rootReducer;