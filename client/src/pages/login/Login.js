import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import MuiPhoneNumber from 'material-ui-phone-number';
import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";
import google from "../../images/google.svg";

// context

//Redux
import {connect} from 'react-redux';
import {compose} from 'redux';
import {register} from '../../redux/User/user-actions';
import {login} from '../../redux/User/user-actions';

function Login({history,register,login}) {
  var classes = useStyles();

 
  

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTabId, setActiveTabId] = useState(0);
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue,setPasswordValue]=useState("");
  const [formData,setFormData] = useState({
    fname:'',
    lname:'',
    phoneNumber:'',
    email:'',
    address:'',
    password:''
  });
  const {fname,lname,phoneNumber,address,password,email} = formData;
  const onChange = (e)=>{
    const {name,value} = e.target
    setFormData({...formData,[name]:value});
  }
  const onSubmit =  (e)=>{
    e.preventDefault();
    console.log(formData)
    register(formData);
    
  }
  const onLogin = (e)=>{
    e.preventDefault();
    login(loginValue,passwordValue);
  }
  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>GPS Tracking</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="New User" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.greeting}>
                Welcome Back!!
              </Typography>
              <Button size="large" className={classes.googleButton}>
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              {
                error?
                <Fade in={error}>
                 <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                 </Typography>
                </Fade>
                :
                null
              }
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={
                      loginValue.length === 0 || passwordValue.length === 0
                    }
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={onLogin}
                  >
                    Login
                  </Button>
                )}
                <Button
                  color="primary"
                  size="large"
                  className={classes.forgetButton}
                >
                  Forget Password
                </Button>
              </div>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <Typography variant="h1" className={classes.subGreeting}>
               Create your account
              </Typography>
              {
                error?
                <Fade in={error}>
                 <Typography color="secondary" className={classes.errorMessage}>
                   Something is wrong with your login or password :(
                 </Typography>
                </Fade>
              :
              null
              }
              
              <TextField
                name="fname"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={fname}
                onChange={e => onChange(e)}
                margin="normal"
                placeholder="First Name"
                type="text"
                fullWidth
              />
              <TextField
                name="lname"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={lname}
                onChange={e => onChange(e)}
                margin="normal"
                placeholder="Last Name"
                type="text"
                fullWidth
              />
              <TextField
                name="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={email}
                onChange={e => onChange(e)}
                margin="normal"
                placeholder="Email Adress"
                type="email"
                fullWidth
              />
              <MuiPhoneNumber 
               defaultCountry={'in'} 
               value={phoneNumber} 
               regions={'asia'}
               name='phoneNumber' 
               onKeyDown={e=>onChange(e)}/>
              <TextField
                name='address'
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={address}
                onChange={e => onChange(e)}
                margin="normal"
                placeholder="Your Address"
                multiline
                type="text"
                fullWidth
              />
              <TextField
                name="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={password}
                onChange={e => onChange(e)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={(e) =>
                      onSubmit(e)
                    }
                    disabled={
                      
                      password.length === 0 ||
                      fname.length === 0 ||
                      lname.length === 0  ||
                      phoneNumber.length === 0 ||
                      email.length === 0 ||
                      address.length === 0 
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
              <div className={classes.formDividerContainer} style={{marginBottom:'0',marginTop:'5px'}}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              <Button
                size="large"
                className={classnames(
                  classes.googleButton,
                  classes.googleButtonCreating,
                )}
                
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
            </React.Fragment>
          )}
        </div>
        
        <Typography color="primary" className={classes.copyright}>
          © 2014-2020 Yoomcare, LLC. All rights reserved.
        </Typography>
      </div>
     
    </Grid>
  );
}

const mapDispatchToProps = dispatch=>({
  register:(formData)=>dispatch(register(formData)),
  login:(email,password)=>dispatch(login(email,password))
});

export default compose(
  withRouter,
  connect(null,mapDispatchToProps)
)(Login);


/*
loginUser(
                        userDispatch,
                        loginValue,
                        passwordValue,
                        props.history,
                        setIsLoading,
                        setError,
                      ) 
*/