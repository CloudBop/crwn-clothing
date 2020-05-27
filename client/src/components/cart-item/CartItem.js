import React from 'react';
import './cart-item.styles.scss';
function CartItem({ item: { imageUrl, price, name, quantity } }) {
  return (
    <div className="cart-item">
      <img src={imageUrl} alt="pic of cart item" />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {' '}
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
}
// this is rendered in an array
// stop rerenders of items in dropdown when other components are added to the cart
export default React.memo(CartItem);
