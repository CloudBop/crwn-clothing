import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

function StripeButton({ price }) {
  //
  const priceInCentsForStripe = price * 100;
  const publishableKey = `pk_test_btA0iXQXT27QcxcwTSwSk3FS00MhHYIc1s`;
  const onToken = token => console.log('token', token);
  return (
    <div>
      <StripeCheckout
        label="Pay Now"
        name="CRWN Clothing Ltd."
        billingAddress
        shippingAddress
        image="https://svgshare.com/i/CUz.svg"
        description={`Your total is $${price}`}
        amount={priceInCentsForStripe}
        panelLabel="Pay Now"
        token={onToken}
        stripeKey={publishableKey}
      />
    </div>
  );
}

export default StripeButton;
