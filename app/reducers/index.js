'use strict';

import { combineReducers } from 'redux';
import home from './home';
import prefetchedImages from './prefetchedImages';
import draftNote from './draftNote';
import flow from './flow';
import channel from './channel';

const rootReducer = combineReducers({
    home,
    prefetchedImages,
    draftNote,
    flow,
    channel
});

export default rootReducer;