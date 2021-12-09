const express = require('express');
const app = express();
const routes = require('./routes');

// importing the settings
const settings = require('./settings');

// testing static return stuff
app.use(express.static(__dirname + '/public'));

// using the routes file
app.use(routes);

// initializing the application
app.listen(settings.PORT, settings.HOST, () => {
  console.log(`Server is listening on ${settings.HOST}:${settings.PORT}`);
});