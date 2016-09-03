'use strict';

import { combineReducers } from 'redux';
import home from './home';
import prefetchedImages from './prefetchedImages';
import notePhotos from './notePhotos';

const rootReducer = combineReducers({
    home,
    prefetchedImages,
    notePhotos
});

export default rootReducer;