import { createStore, applyMiddleware } from "redux";
import appReducer from "reducers/AppReducer";
import thunk from "redux-thunk";
import logger from 'redux-logger';

//Create the store and apply thunk for function instead of objects in dispatch method
//logger in order to console.log all action with previous and updated states
const store = createStore(appReducer, applyMiddleware(thunk, logger));

export default store;
