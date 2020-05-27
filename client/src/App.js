import React, { useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
// import { selectCollectionsForPreview } from './redux/shop/shop.selector';
import { checkUserSession } from './redux/user/user.actions';
import { Switch, Route, Redirect } from 'react-router-dom';
import { GlobalStyle } from './global.styles';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import Header from './components/header/header';
import Spinner from './components/spinner/Spinner';
// on route load - homepage is main/entrance pagem so it benefits less from lazy loading than other pages
const Homepage = lazy(() => import('./pages/Homepage/Homepage'));
const ShopPage = lazy(() => import('./pages/shop/shop'));
const SignInAndSignUp = lazy(() => import('./pages/sign-in-and-sign-up/SignInAndSignUp'));
const CheckoutPage = lazy(() => import('./pages/Checkout/Checkout'));
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
  //
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          {/** lazy load everythig with suspense. */}
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={Homepage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/signin" render={() => (currentUser ? <Redirect to="/" /> : <SignInAndSignUp />)} />
            <Route exact path="/checkout" component={CheckoutPage} />
          </Suspense>
        </ErrorBoundary>
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
