import initialState from './initialState'
import { createStore } from "redux";
import reducers from "../reducers";

const store = createStore(
    reducers,
    initialState,
);

export default store;