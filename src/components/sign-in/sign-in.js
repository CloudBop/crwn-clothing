import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input';
import Button from '../../components/custom-button/custom-button';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
import './sign-in.styles.scss';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [ userCredentials, setUserCredentials ] = useState({ email: '', password: '' });

  const { email, password } = userCredentials;
  //
  handleSubmit = async evt => {
    evt.preventDefault();
    //
    emailSignInStart(email, password);
  };
  handleChange = evt => {
    const { value, name } = evt.currentTarget;
    //
    setUserCredentials({ ...userCredentials, [name]: value });
  };
  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
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

        <div className="buttons">
          <Button type="submit" value="Submit-Form">
            Sign In
          </Button>

          <Button onClick={googleSignInStart} type="button" value="Submit-Form" isGoogleSignIn={true}>
            {/*type=button or conflicts with the other form inputs - required attribute*/}
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
};
//
const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  // notice how emailSignInStart is invoked
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);

// -- left for posterity
// class OldSignIn extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: '',
//       password: ''
//     };
//   }

//   handleSubmit = async evt => {
//     evt.preventDefault();
//     const { emailSignInStart } = this.props;
//     const { email, password } = this.state;
//     //
//     emailSignInStart(email, password);
//   };

//   handleChange = evt => {
//     const { value, name } = evt.currentTarget;
//     this.setState({ [name]: value });
//   };

//   render() {
//     const { googleSignInStart, emailSignInStart } = this.props;
//     return (
//       <div className="sign-in">
//         <h2>I already have an account</h2>
//         <span>Sign in with your email and password</span>

//         <form onSubmit={this.handleSubmit}>
//           <FormInput
//             type="email"
//             name="email"
//             value={this.state.email}
//             // id=""
//             required
//             handleChange={this.handleChange}
//             label={'Email'}
//           />
//           <FormInput
//             type="password"
//             name="password"
//             value={this.state.password}
//             // id=""
//             required
//             onChange={this.handleChange}
//             label={'Password'}
//           />

//           <div className="buttons">
//             <Button type="submit" value="Submit-Form">
//               Sign In
//             </Button>

//             <Button onClick={googleSignInStart} type="button" value="Submit-Form" isGoogleSignIn={true}>
//               {/*type=button or conflicts with the other form inputs - required attribute*/}
//               Sign In With Google
//             </Button>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }
