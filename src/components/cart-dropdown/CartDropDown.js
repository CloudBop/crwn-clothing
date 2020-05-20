import React from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button';
import './cart-drop-down.styles.scss';
import CartItem from '../cart-item/CartItem';
//
function CartDropDown({ cartItems }) {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">{cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)}</div>
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  );
}
const mapStateToProps = ({ cart: { cartItems } }) => ({ cartItems });

export default connect(mapStateToProps, null)(CartDropDown);
