import {userActionTypes} from './action-types';
import axios from 'axios';


//REGISTER USER

export const register = ({fname,lname,phoneNumber,email,password,address}) =>async dispatch =>{
    
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({fname,lname,phoneNumber,email,password,address});

    try{
      const res = await axios.post('http://localhost:4000/api/usersLogin',body,config);
      dispatch({
          type:userActionTypes.REGISTRATION_SUCCESS,
          payload:res.data
      });
    }catch(err){
       const errors = err.response.data.errors;

       if(errors){
           errors.forEach(error=>console.log(error));
       }
        
      dispatch({
          type:userActionTypes.REGISTRATION_FAIL
      });
    }
}
