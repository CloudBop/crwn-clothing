import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
// import './App.css';
import Homepage from './pages/Homepage/Homepage';
import ShopPage from './pages/shop/shop';
import SignInAndSignUp from './pages/sign-in-and-sign-up/SignInAndSignUp';
import CheckoutPage from './pages/Checkout/Checkout';
import Header from './components/header/header';
import { Switch, Route, Redirect } from 'react-router-dom';
import { GlobalStyle } from './global.styles';
// import { selectCollectionsForPreview } from './redux/shop/shop.selector';
//
const App = ({ checkUserSession, currentUser }) => {
  //
  useEffect(
    () => {
      checkUserSession();
      //
      // return () => {
      //   cleanup, componentDidUnmount
      // };
    },
    [ checkUserSession ]
  );

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/signin" render={() => (currentUser ? <Redirect to="/" /> : <SignInAndSignUp />)} />
        <Route exact path="/checkout" component={CheckoutPage} />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  // collectionsArray: selectCollectionsForPreview
});
const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

//  as class component - when using sagas to confirm auth doesn't need unsubscribe from auth
//
// class App extends React.Component {
//   //
//   unsubscribeFromAuth = null;
//   componentDidMount() {
//     const { checkUserSession } = this.props;
//     checkUserSession();
//   }
//   componentWillUnmount() {
//     // updates user credentials when app is unmounted from DOM/closed
//     this.unsubscribeFromAuth();
//     /**
//      * It's possible you may encounter a google Authorization error that says 403:restricted_client. If you do, here are the instructions to fix it!
//      * There should be a Learn More link in the popup, clicking that should take you to the Google APIs console that has three tabs under the header named Credentials, OAuth Consent Screen, and Domain Verification. Go to the OAuth Consent Screen tab and update the Application Name to "crwn-clothing" or any other name you're comfortable with (i.e. the name of your project). Click on save at the bottom, then try logging into your verified Google account thereafter.
//      */
//   }

//   render() {
//     return (
//       <div>
//         <Header />
//         <Switch>
//           <Route exact path="/" component={Homepage} />
//           <Route path="/shop" component={ShopPage} />
//           <Route
//             exact
//             path="/signin"
//             render={() => (this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />)}
//           />
//           <Route exact path="/checkout" component={CheckoutPage} />
//         </Switch>
//       </div>
//     );
//   }
// }
