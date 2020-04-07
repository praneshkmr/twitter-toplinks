import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './reducers';
import apiMiddleware from './middleware/api';

const store = createStore(rootReducer, applyMiddleware(apiMiddleware, logger));
// window.store = store;
export default store;
