import React, { Component } from 'react';
import FormInput from '../form-input/form-input';
import Button from '../../components/custom-button/custom-button';
import './sign-in.styles.scss';
export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = evt => {
    evt.preventDefault();

    this.setState({ email: '', password: '' });
  };

  handleChange = evt => {
    const { value, name } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={this.state.email}
            id=""
            required
            handleChange={this.handleChange}
            label={'Email'}
          />
          <FormInput
            type="password"
            name="password"
            value={this.state.password}
            id=""
            required
            onChange={this.handleChange}
            label={'Password'}
          />

          <Button type="submit" value="Submit-Form">
            {' '}
            Sign In{' '}
          </Button>
        </form>
      </div>
    );
  }
}
