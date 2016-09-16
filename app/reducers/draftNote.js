/**
 * Created by lyan2 on 16/9/3.
 */
const initialState = {
    notePhotos: [],
    currentPhotoIndex: -1
};

import Actions from '../constants/actions';

const draftNote = function (state = initialState, action = {}) {
    switch (action.type) {
        case Actions.ADD_NOTE_PHOTO:
            if (action.photo) {
                state.notePhotos.push(action.photo);
                state.currentPhotoIndex = state.notePhotos.length - 1;
            }
            break;
        case Actions.EDIT_NOTE_PHOTO:
            if (action.index >= 0) {
                state.currentPhotoIndex = action.index;
            }
            break;
        case Actions.REMOVE_NOTE_PHOTO:
            state.notePhotos.splice(action.index, 1);
            break;
        case Actions.ADD_TAGS:
            state.notePhotos[state.currentPhotoIndex].tags = action.tags;
            break;
        case Actions.RESET_DRAFT_NOTE:
            state.notePhotos = []; // empty photos
            state.currentPhotoIndex = -1;
            break;
        default:
            return state;
    }

    console.log(state);
    return state;
};

export default draftNote;
