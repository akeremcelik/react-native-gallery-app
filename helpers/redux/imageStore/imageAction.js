import { SET_IMAGE } from "./imageTypes"

export const setImage = (image) => ({
    type: SET_IMAGE,
    payload: image
})