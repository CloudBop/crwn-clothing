import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartItemsTotalPrice } from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/CheckoutItem';
import StripeCheckoutBtn from '../../components/Stripe-Button/StripeButton';
import './checkout.styles.scss';
function CheckoutPage({ cartItems, total }) {
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} />)}
      <div className="total">
        <span>Total: ${total}</span>
      </div>
      <div className="test-warning">
        *Please use the following test credit card to test payments*
        <br />
        4242 4242 4242 4242 - exp any future date - cvv: any 3 digits
      </div>
      <StripeCheckoutBtn price={total} />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartItemsTotalPrice
});

export default connect(mapStateToProps)(CheckoutPage);
