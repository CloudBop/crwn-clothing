import React from 'react';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import ShopPage from './pages/shop/shop';
import SignInAndSignUp from './pages/sign-in-and-sign-up/SignInAndSignUp';

import Header from './components/header/header';
import { Switch, Route } from 'react-router-dom';
import { auth } from './firebase/firebase.utils';
//
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }
  //
  unsubscribeFromAuth = null;
  componentDidMount() {
    // this is an 'open subscription'. IE it is unobstructive to end user. They can refresh and sessions are maintained
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
    //... it does need to be close though
  }
  componentWillUnmount() {
    // updates user credentials when app is unmounted from DOM/closed
    this.unsubscribeFromAuth();
    /**
     * It's possible you may encounter a google Authorization error that says 403:restricted_client. If you do, here are the instructions to fix it!
     * There should be a Learn More link in the popup, clicking that should take you to the Google APIs console that has three tabs under the header named Credentials, OAuth Consent Screen, and Domain Verification. Go to the OAuth Consent Screen tab and update the Application Name to "crwn-clothing" or any other name you're comfortable with (i.e. the name of your project). Click on save at the bottom, then try logging into your verified Google account thereafter.
     */
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
