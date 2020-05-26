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
//
export const removeItemToCart = (cartItems, cartItemToRemove) => {
  //
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);
  //
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(
      cartItem =>
        // remove item if expression === false
        cartItem.id !== cartItemToRemove.id
    );
  }
  return cartItems.map(
    cartItem => (cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
  );
  // quantity propery is set on initialise
  // return [ ...cartItems, { ...cartItemToRemove, quantity: cartItemToRemove.quantity-- } ];
};
