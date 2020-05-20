import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import CustomButton from '../custom-button/custom-button';
import './cart-drop-down.styles.scss';
import CartItem from '../cart-item/CartItem';
//
function CartDropDown({ cartItems, history, dispatch }) {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push('/checkout');
          dispatch(toggleCartHidden());
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
}
// const mapStateToProps = ({ cart: { cartItems } }) => ({ cartItems });
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});
// important that withRouter is outtermose fn call. Remember: HOC take component as arg and return component.
export default withRouter(connect(mapStateToProps, null)(CartDropDown));
