import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
function StripeButton({ price }) {
  //
  const priceInCentsForStripe = price * 100;
  const publishableKey = `pk_test_btA0iXQXT27QcxcwTSwSk3FS00MhHYIc1s`;
  const onToken = token => {
    //
    // fires request to endpoint, returns promise
    axios({
      // append to current page url
      url: 'payment',
      method: 'post',
      data: {
        amount: priceInCentsForStripe,
        token
      }
    })
      .then(response => {
        alert('Payment successful!');
      })
      .catch(err => {
        //
        console.log('Payment Error:', err);
        alert('There was a problem with the payment. Are you sure your details were correct?');
      });
  };
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
