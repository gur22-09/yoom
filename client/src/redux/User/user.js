import {userActionTypes} from './action-types';

const initialState = {
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null
};


export const userReducer = (state=initialState,action)=>{
  const {type,payload} = action;
    
  switch (type) {
      case userActionTypes.REGISTRATION_SUCCESS:
      case userActionTypes.LOGIN_SUCCESS:
          localStorage.setItem('token',payload.token);
          return{
              ...state,
              ...payload,
              isAuthenticated:true,
              loading:false
          }
      case userActionTypes.REGISTRATION_FAIL:
      case userActionTypes.USER_LOADED_FAILED:
      case userActionTypes.LOGIN_FAIL:        
          localStorage.removeItem('token');
          return{
              ...state,
              token:null,
              isAuthenticated:false,
              loading:false
          }
      case userActionTypes.USER_LOADED_SUCCESS:
          return{
              ...state,
              isAuthenticated:true,
              loading:false,
              user:payload
          }
      default:
          return state;
    }
}