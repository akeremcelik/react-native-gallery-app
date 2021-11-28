import { SET_IMAGE } from "./imageTypes";

const initialState = {
   image: null
}

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IMAGE:
            return {
                ...state,
                image: action.payload
            }

        default:
            return state;
    }
}

export default imageReducer