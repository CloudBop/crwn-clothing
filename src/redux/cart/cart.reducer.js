import { CartActionTypes } from './cart.types';
import { addItemToCart, removeItemToCart } from './cart.utils';
const initialState = {
  hidden: true,
  cartItems: []
};
const cartReducer = (state = initialState, action) => {
  //
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };

    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      };

    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemToCart(state.cartItems, action.payload)
      };

    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem =>
            // return cartItem if expreesion true
            cartItem.id !== action.payload.id
        )
      };

    case CartActionTypes.ClEAR_CART:
      return {
        ...state,
        cartItems: []
      };

    default:
      return state;
  }
  // should never invoked
  // return state;
};

export default cartReducer;
