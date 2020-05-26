const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// native node module
const path = require('path');
//
// KEEP KEYS SECRET
if (process.env.NODE_ENV === 'production') require('dotenv').config();
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
