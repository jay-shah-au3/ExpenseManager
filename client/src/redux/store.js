import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './root.reducers';

let composeEnhancer = '';

if(process.env.NODE_ENV === 'development')
    composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
else
    composeEnhancer = compose;

const middlewares = [thunk];

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(...middlewares)));

export default store;