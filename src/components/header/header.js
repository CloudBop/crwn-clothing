import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/CartIcon';
function Header({ currentUser }) {
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          Shop
        </Link>
        <Link className="option" to="/shop">
          Contact
        </Link>
        {currentUser ? (
          <div
            className="option"
            onClick={() => {
              auth.signOut();
            }}
          >
            Sign Out
          </div>
        ) : (
          <Link className="option" to="/signin">
            Sign In
          </Link>
        )}
        <CartIcon />
      </div>
    </div>
  );
}
// could be named anything but this is standard
// state=== top level root reducer
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});
// connects state to component via props
export default connect(mapStateToProps)(Header);
