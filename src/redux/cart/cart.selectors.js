import { createSelector } from 'reselect';
// - memoisation + functional JS
//
const selectCart = state => state.cart;
//
export const selectCartItems = createSelector([ selectCart ], cart => cart.cartItems);
//
export const selectCartHidden = createSelector([ select ], cart => cart.hidden);
//
export const selectCartItemsCountQuantity = createSelector([ selectCartItems ], cartItems =>
  cartItems.reduce((accumaltedQuantity, cartItem) => accumaltedQuantity + cartItem.quantity, 0)
);
