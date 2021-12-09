const express = require('express');
const routes = express.Router();

// default route to test stuff I guess?
routes.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/pokemon.html');
});

module.exports = routes;