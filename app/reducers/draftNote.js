/**
 * Created by lyan2 on 16/9/3.
 */
const initialState = {
    notePhotos: []
};

import Actions from '../constants/actions';

const draftNote = function (state = initialState, action) {
    switch (action.type) {
        case Actions.ADD_NOTE_PHOTO:
            if (action.photo) {
                state.notePhotos.push(action.photo);
            }
            break;
        case Actions.REMOVE_NOTE_PHOTO:
            state.notePhotos.splice(action.index, 1);
            break;
        default:
            return state;
    }

    return state;
};

export default draftNote;
