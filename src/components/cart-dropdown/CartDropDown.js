import React from 'react';
import CustomButton from '../custom-button/custom-button';
import './cart-drop-down.styles.scss';
//
function CartDropDown() {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">.</div>
      <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
  );
}

export default CartDropDown;
