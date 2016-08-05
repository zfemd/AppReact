'use strict';
import img from '../constants/images'


const initialState = {
    images: []
};

function prefetchedImages(state = initialState, action) {

    switch(action.type) {

        case img.IMAGE_PREFETCHED:
            state.images.push(action.imageUrl);
            return state;

        default:
            return state;
    }

    return state;
}

module.exports = prefetchedImages;