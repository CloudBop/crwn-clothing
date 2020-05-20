export const addItemToCart = (cartItems, cartItemToAdd) => {
  //
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);
  if (existingCartItem) {
    // return new array, remember react is immutable
    return cartItems.map(cartItem => {
      return cartItem.id === cartItemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem;
    });
  }
  // quantity propery is set on initialise
  return [ ...cartItems, { ...cartItemToAdd, quantity: 1 } ];
};
