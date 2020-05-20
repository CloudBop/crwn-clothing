import React from 'react';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCountQuantity } from '../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
function CartIcon({ toggleCartHidden, itemCount }) {
  return (
    <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
}
//
const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});
// - Selector function: uses state to return some aspect of state condition - causes re-render every time any cart state changes
// const mapStateToProps = ({ cart: { cartItems } }) => ({
//   // count all the items in state, including the quantities of each obj
//   itemCount: cartItems.reduce((accumaltedQuantity, cartItem) => accumaltedQuantity + cartItem.quantity, 0)
// });
//

const mapStateToProps = state => ({
  // count all the items in state, including the quantities of each obj
  itemCount: selectCartItemsCountQuantity(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
