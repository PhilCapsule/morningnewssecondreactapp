import React, { useState } from 'react';
import './App.css';
import {Input,Button} from 'antd';
import {Redirect} from 'react-router-dom';

function ScreenHome() {

  const [signUpUserName, setSignUpUserName] = useState();
  const [signUpUserMail, setSignUpUserMail] = useState();
  const [signUpUserPsw, setSignUpUserPsw] = useState();
  const [signInUserMail, setSignInUserMail] = useState();
  const [signInUserPsw, setSignInUserPsw] = useState();


  const [isLogged, setIsLogged] = useState();
  const [signUpWarning, setSignUpWarning] = useState();
  const [signInWarning, setSignInWarning] = useState();

  const handleSubmitSignUp = async (username, mail, password) => {
    console.log('username', username);
    var rawResponse = await fetch('/sign-up',
    {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `usernameFromFront=${username}&emailFromFront=${mail}&passwordFromFront=${password}`
    })
    var response = await rawResponse.json();
    console.log('response.result', response.result);
    if(response.result === false){
      setSignUpWarning(<span style={{marginTop:15, backgroundColor:'grey', color:'white', textAlign:'center', fontWeight:'bold'}}>
                        Sign-up failed : All fields are mandatory. 
                        Otherwise, an account may already exist with this email.
                        </span>);
    } else {
      setSignUpWarning(null);
    }
  }

  const handleSubmitSignIn = async (mail, password) => {
    var rawResponse = await fetch('/sign-in',
    {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `emailFromFront=${mail}&passwordFromFront=${password}`
    })
    var response = await rawResponse.json();
    console.log('response.result', response.result);
    if(response.result === false){
      setSignInWarning(<span style={{marginTop:15, backgroundColor:'grey', color:'white', textAlign:'center', fontWeight:'bold'}}>
                        Sign-in failed : All fields are mandatory. 
                        Otherwise, bad credentials.
                        </span>);
    } else {
      setSignInWarning(null);
    }
    if (response.result === true){
      setIsLogged(<Redirect to='/screensource' />);
    }
  }

  return (
    <div className="Login-page" >

      {isLogged}

      {/* SIGN-IN */}
      <div className="Sign">
        
        {signInWarning}

        <Input className="Login-input" placeholder="user@mail.com"
          onChange={(event) => setSignInUserMail(event.target.value)}
          value={signInUserMail}
        />
        <Input.Password className="Login-input" placeholder="Password"
          onChange={(event) => setSignInUserPsw(event.target.value)}
          value={signInUserPsw}
        />
        <Button style={{width:'80px'}} type="primary" onClick={ ()=> handleSubmitSignIn(signInUserMail, signInUserPsw)}
        >Sign-in</Button>
      </div>

      {/* SIGN-UP */}
      <div className="Sign">

        {signUpWarning}

        <Input className="Login-input" placeholder="Username"
          onChange={(event) => setSignUpUserName(event.target.value)}
          value={signUpUserName}
        />
        <Input className="Login-input" placeholder="user@mail.com"
          onChange={(event) => setSignUpUserMail(event.target.value)}
          value={signUpUserMail}
        />
        <Input.Password className="Login-input" placeholder="Password"
          onChange={(event) => setSignUpUserPsw(event.target.value)}
          value={signUpUserPsw}
        />
        <Button style={{width:'80px'}} type="primary" onClick={ ()=> handleSubmitSignUp(signUpUserName, signUpUserMail, signUpUserPsw)}
        >Sign-up</Button>
      </div>

    </div>
  );
}

export default ScreenHome;
