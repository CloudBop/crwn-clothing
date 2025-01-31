import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { signOutStart } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/CartIcon';
import CartDropDown from '../cart-dropdown/CartDropDown';

// import './header.styles.scss';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';
function Header({ currentUser, isHidden, signOutStart }) {
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionLink to="/shop">CONTACT</OptionLink>
        {currentUser ? (
          <OptionLink as="div" onClick={signOutStart}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to="/signin">SIGN IN</OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {!isHidden && <CartDropDown />}
    </HeaderContainer>
  );
}
//
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isHidden: selectCartHidden
});
//
const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

// connects state to component via props
export default connect(mapStateToProps, mapDispatchToProps)(Header);
