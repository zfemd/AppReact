'use strict';

import img from '../constants/images';


function prefetchImage(imageUrl) {
    return {
        type: img.IMAGE_PREFETCHED,
        imageUrl
    };
}

export default prefetchImage;