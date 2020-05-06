import React from 'react';
import SignIn from '../../components/sign-in/sign-in';
import SignUp from '../../components/sign-up/sign-up';

import './sign-in-and-sign-up.styles.scss';
//
function SignInAndSignUp() {
  return (
    <div>
      <SignIn />
      <SignUp />
    </div>
  );
}

export default SignInAndSignUp;
