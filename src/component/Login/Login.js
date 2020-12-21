import React from 'react';
import './Login.css';
import { useAuth } from './useAuth';

const Login = () => {
  document.title ='ema-john-login'
  const auth = useAuth();
  const user = auth.user;
  //Form validation
  const inputFieldValidation = (e) => {
    let isFormValid = true;
    if(e.target.name == 'name'){
      isFormValid = e.target.value;
      console.log(isFormValid);
    }
    if(e.target.name == 'email'){
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
      console.log(isFormValid);
    }
    if(e.target.name == 'password'){
      isFormValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(e.target.value)
      console.log(isFormValid);
    }
    if(isFormValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      console.log(isFormValid);
    }
  }

  // //Redirect auth
  const handleSignIn = () => {
    auth.signInWithGoogle()
    .then(res => {
      window.location.pathname = '/review'
    })
  }
  
  return (
    <div className='login-container'>
      <div className="sign-up-form border px-4">
        <form className='form-group mb-0'>
          <input onBlur={inputFieldValidation} type="text" name='name' className="form-control" placeholder='Your name' />
          <input onBlur={inputFieldValidation} type="text" name='email' className="form-control" placeholder='Your email address' />
          <input onBlur={inputFieldValidation} type="password" name="password" id="password" className='form-control' placeholder="Password" />
          <input onBlur={inputFieldValidation} type="password" name="password" id='confirmPass' className='form-control' placeholder="Confirm Password" />
          <label id='passIsMatch'></label>
          <input type="submit" value="Create an account" className='create-account' />
        </form>
        <p>Already have an account? <span className='btn btn-link'>Sign In</span></p>
      </div>
      <button onClick={handleSignIn} className="btn btn-warning d-block w-75 mx-auto my-2">Sign in with google</button>
      <button onClick={auth.signInWithFb} className="btn btn-warning d-block w-75 mx-auto my-2">Sign in with facebook</button>
    </div>
  );
};

export default Login;

