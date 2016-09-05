/**
 * Created by lyan2 on 16/9/3.
 */
const initialState = {
    notePhotos: []
};

import Actions from '../constants/actions';

const draftNote = function (state = initialState, action) {
    console.log(state);
    switch (action.type) {
        case Actions.ADD_NOTE_PHOTO:
            if (action.photo) {
                state.notePhotos.push(action.photo);
            }
            return state;
        default:
            return state;
    }
};

export default draftNote;
