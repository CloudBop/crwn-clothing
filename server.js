const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// native node module
const path = require('path');
//
// KEEP KEYS SECRET
if (process.env.NODE_ENV === 'production') require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// launch express
const app = express();
// Heroku (and other services) setup port for us. - not localhost:3000
const port = process.env.PORT || 5000;
// SETUP MIDDLEWARE
// - jsonify all requests
app.use(bodyParser.json());
// make url safe for web
app.use(bodyParser.urlencoded({ extended: true }));
// allow cross-origin requests. Frontend:3000 && backend:5000
app.use(cors());
//
if (process.env.NODE_ENV === 'production') {
  // point app to all the static files in build folder
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function(req, res) {
    // for all endpoints
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
} else {
}
// start listening for requests
app.listen(port, error => {
  if (error) throw error;
  console.log('server running on port' + port);
});

// connect to stripe to veryify secret from token identifyier
app.post('/payment', (req, res) => {
  // prepare info from request
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  };
  //
  stripe.charges.create(body, (stripeErr, stripeRes) => {
    // what to respond with
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ error: stripeRes });
    }
  });
});
