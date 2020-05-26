import React, { useState } from 'react';
import FormInput from '../form-input/form-input';
import Button from '../../components/custom-button/custom-button';
import './sign-up.styles.scss';
import { connect } from 'react-redux';
import { signUpStart } from '../../redux/user/user.actions';

function SignUp({ signUpNewUser }) {
  const [ newUserCredentials, setNewUserCredentials ] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { displayName, email, password, confirmPassword } = newUserCredentials;

  const handleSubmit = async evt => {
    evt.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    // on success will redirect to '/'
    signUpNewUser({ displayName, email, password });
  };

  const handleChange = evt => {
    const { value, name } = evt.currentTarget;
    setNewUserCredentials({ ...newUserCredentials, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2 className={'title'}>I do not have an account</h2>
      <span>Sign up with your email and password</span>

      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          // id=""
          required
          handleChange={handleChange}
          label={'Display Name'}
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          // id=""
          required
          handleChange={handleChange}
          label={'Email'}
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          // id=""
          required
          onChange={handleChange}
          label={'Password'}
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          // id=""
          required
          onChange={handleChange}
          label={'Confirm Password'}
        />

        <div className="buttons">
          <Button type="submit" value="Submit-Form">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
//
const mapDispatchToProps = dispatch => ({
  signUpNewUser: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);

// -- old class component kept for posterity
//
// class OldSignUp extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       displayName: '',
//       email: '',
//       password: '',
//       confirmPassword: ''
//     };
//   }

//   handleSubmit = async evt => {
//     evt.preventDefault();
//     const { signUpNewUser } = this.props;
//     //
//     const { displayName, email, password, confirmPassword } = this.state;
//     if (password !== confirmPassword) {
//       alert("passwords don't match");
//       return;
//     }
//     // will redirect to '/'
//     signUpNewUser({ displayName, email, password });
//   };

//   handleChange = evt => {
//     const { value, name } = evt.currentTarget;
//     this.setState({ [name]: value });
//   };

//   render() {
//     const { displayName, email, password, confirmPassword } = this.state;
//     return (
//       <div className="sign-up">
//         <h2 className={'title'}>I do not have an account</h2>
//         <span>Sign up with your email and password</span>

//         <form className="sign-up-form" onSubmit={this.handleSubmit}>
//           <FormInput
//             type="text"
//             name="displayName"
//             value={displayName}
//             // id=""
//             required
//             handleChange={this.handleChange}
//             label={'Display Name'}
//           />
//           <FormInput
//             type="email"
//             name="email"
//             value={email}
//             // id=""
//             required
//             handleChange={this.handleChange}
//             label={'Email'}
//           />
//           <FormInput
//             type="password"
//             name="password"
//             value={password}
//             // id=""
//             required
//             onChange={this.handleChange}
//             label={'Password'}
//           />
//           <FormInput
//             type="password"
//             name="confirmPassword"
//             value={confirmPassword}
//             // id=""
//             required
//             onChange={this.handleChange}
//             label={'Confirm Password'}
//           />

//           <div className="buttons">
//             <Button type="submit" value="Submit-Form">
//               Sign Up
//             </Button>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }
