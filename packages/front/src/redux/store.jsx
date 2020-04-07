import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './reducers';
import apiMiddleware from './middleware/api';

const store = createStore(rootReducer, applyMiddleware(logger, apiMiddleware));
// window.store = store;
export default store;
