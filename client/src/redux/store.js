import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import combineReducers from './rootReducer';

const middlware = [thunk];

if(process.env.NODE_ENV === 'development'){
    middlware.push(logger);
};


export const store = createStore(combineReducers,applyMiddleware(...middlware));
