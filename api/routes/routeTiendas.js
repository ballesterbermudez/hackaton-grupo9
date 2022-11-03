const express = require('express');
const { app } = require('../../server');
const route = express.Router();

route.get('/', (req, res) => {
    res.send('');
});

module.exports = route;
