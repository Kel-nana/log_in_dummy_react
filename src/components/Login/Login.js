import React, { useState, useEffect, useReducer, useRef } from 'react';

import Input from '../UI/Input/Input';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (preState, action) => {
if (action.type === 'USER_INPUT'){
  return {value:action.val, isValid: action.val.includes('@')};
}
if(action.type === 'INPUT_BLUR') {
  return {value:preState.value, isValid: preState.value.includes('@')};
}
  return {value:' ', isValid: null}
}

const passwordReducer = (preState, action) => {
  if (action.type === 'USER_INPUT'){
    return {value:action.val, isValid: action.val.trim().length > 6};
  }
  if(action.type === 'INPUT_BLUR') {
    return {value:preState.value, isValid: preState.value.trim().length > 6};
  }
    return {value:'', isValid: null}
  }
 
const Login = (props) => { 
  // same
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsVa lid, setEmailIsValid] = useState();
  // same 
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const emailInpputRef = useRef();
  const passwordInpputRef = useRef();
  // initial state for isValid can be false or null 
  const[emailState, dispatchEmail] = useReducer(emailReducer, {value:'', isValid: null});
  
  const [passwordState , dispatchPassword] = useReducer(passwordReducer,{value:'', isValid: null} )
  
  const [formIsValid, setFormIsValid] = useState(false);
  
console.log(emailState.value, 'email reducer state')
console.log(passwordState.value, 'password reducer state')
const {isValid: emailIsValid} = emailState
const {isValid :passwordIsValid} = passwordState
  useEffect(()=>{ 
    const identifier = setTimeout(()=>{
      console.log('check form validity');
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    },800);
    return () => {
      console.log('clean out call');
    clearTimeout(identifier)};
  },[emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type: 'USER_INPUT', val: event.target.value})
    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid
    // );
  };  

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type: 'USER_INPUT', val: event.target.value})
    // setFormIsValid(
    //   emailState.isValid && passwordState.isValid
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: 'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      props.onLogin(emailState.value, passwordState.value);
    }else if(!emailIsValid){
      emailInpputRef.current.focus();
    }else{
      passwordInpputRef.current.focus();
    }
    // props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>

        <Input 
        id= "email" 
        ref={emailInpputRef}
        value={emailState.value} 
        label="E-Mail" 
        type="email" 
        isValid={emailIsValid} 
        onChange={emailChangeHandler} 
        onBlur={validateEmailHandler} 
        />
        <Input 
        id= "password"
        ref={passwordInpputRef} 
        value={passwordState.value} 
        label="Password" 
        type="password" 
        isValid={passwordIsValid} 
        onChange={passwordChangeHandler} 
        onBlur={validatePasswordHandler} 
        />
      
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
