import React,{useEffect} from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import setAuthToken from '../utils/setAuthToken';
// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";

// context
import { useUserState } from "../context/UserContext";

//Redux
import {connect} from 'react-redux';
import {LoadUser} from '../redux/User/user-actions';



if(localStorage.token){
  setAuthToken(localStorage.token);
}

const  App =(props)=>{
  // global
  var { isAuthenticated,LoadUser } = props;
  
  useEffect(()=>{
    LoadUser();
  },[]);

  return (
      
       <HashRouter>
        <Switch>
         <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
         <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
         />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <Route component={Error} />
        </Switch>
       </HashRouter>
     
     
   
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
const mapDispatchToProps = (dispatch)=>({
  LoadUser:()=>dispatch(LoadUser)
})

const mapStateToProps = (state)=>({
  isAuthenticated:state.user.isAuthenticated
})

export default connect(mapStateToProps,mapDispatchToProps)(App);