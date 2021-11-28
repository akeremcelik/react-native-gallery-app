import { createStore } from "redux";
import imageReducer from "./imageReducer";

const store = createStore(imageReducer)
export default store;