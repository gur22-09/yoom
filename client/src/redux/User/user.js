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
          localStorage.setItem('token',payload.token);
          return{
              ...state,
              ...payload,
              isAuthenticated:true,
              loading:false
          }
      case userActionTypes.REGISTRATION_FAIL:
          localStorage.removeItem('token');
          return{
              ...state,
              token:null,
              isAuthenticated:false,
              loading:false
          }
      
      default:
          return state;
  }
}