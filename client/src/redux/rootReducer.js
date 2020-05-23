import {combineReducers} from 'redux';
import {userReducer} from './User/user';

export default combineReducers({
user:userReducer
});