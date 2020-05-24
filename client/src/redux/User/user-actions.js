import {userActionTypes} from './action-types';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';




//LOAD USER
export const LoadUser = ()=>async dispatch=>{
   
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try{
        const res = await axios.get('http://localhost:4000/api/auth');

        dispatch({
            type:userActionTypes.USER_LOADED_SUCCESS,
            payload:res.data
        });
    }catch(err){
        dispatch({
            type:userActionTypes.USER_LOADED_FAILED
        })
    }
}

//REGISTER USER

export const register = (formData) =>async dispatch =>{
    
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({...formData});
    console.log(body);
    try{
      const res = await axios.post('http://localhost:4000/api/usersLogin',body,config);
      dispatch({
          type:userActionTypes.REGISTRATION_SUCCESS,
          payload:res.data
      });
      dispatch(LoadUser());
    }catch(err){
       
        
      console.log(err);
       
      dispatch({
          type:userActionTypes.REGISTRATION_FAIL
      });
    }
}


//LOGIN USER

export const login = (email,password) =>async dispatch =>{
    
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({email,password});
    console.log(body);
    try{
      const res = await axios.post('http://localhost:4000/api/auth',body,config);
      dispatch({
          type:userActionTypes.LOGIN_SUCCESS,
          payload:res.data
      });
      dispatch(LoadUser());
    }catch(err){
       
        
      console.log(err);
       
      dispatch({
          type:userActionTypes.LOGIN_FAIL
      });
    }
}

