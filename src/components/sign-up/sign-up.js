import React from 'react';
import { auth, createUserProfileDocumentInFirestore } from '../../firebase/firebase.utils';
import FormInput from '../form-input/form-input';
import Button from '../../components/custom-button/custom-button';
import './sign-up.styles.scss';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  handleSubmit = async evt => {
    evt.preventDefault();
    //
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      //
      await createUserProfileDocumentInFirestore(user, { displayName });
      // clear form
      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      //
    } catch (error) {}
  };

  handleChange = evt => {
    const { value, name } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className={'title'}>I do not have an account</h2>
        <span>Sign up with your email and password</span>

        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            // id=""
            required
            handleChange={this.handleChange}
            label={'Display Name'}
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            // id=""
            required
            handleChange={this.handleChange}
            label={'Email'}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            // id=""
            required
            onChange={this.handleChange}
            label={'Password'}
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            // id=""
            required
            onChange={this.handleChange}
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
}
