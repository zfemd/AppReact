'use strict';

import { combineReducers } from 'redux';
import home from './home';
import prefetchedImages from './prefetchedImages';
import draftNote from './draftNote';
import flow from './flow';
import channel from './channel';
import detail from './detail';
import comments from './comments';

const rootReducer = combineReducers({
    home,
    prefetchedImages,
    draftNote,
    flow,
    channel,
    detail,
    comments
});

export default rootReducer;