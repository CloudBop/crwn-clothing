import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input';
import Button from '../../components/custom-button/custom-button';
import { signInWithGoogle, auth } from '../../firebase/firebase.utils';
import { googleSignInStart } from '../../redux/user/user.actions';
import './sign-in.styles.scss';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = async evt => {
    evt.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });
    } catch (error) {
      // console.log('error', error);
    }
  };

  handleChange = evt => {
    const { value, name } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  render() {
    const { googleSignInStart } = this.props;
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={this.state.email}
            // id=""
            required
            handleChange={this.handleChange}
            label={'Email'}
          />
          <FormInput
            type="password"
            name="password"
            value={this.state.password}
            // id=""
            required
            onChange={this.handleChange}
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
  }
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart())
});

export default connect(null, mapDispatchToProps)(SignIn);
