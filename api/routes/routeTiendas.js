const express = require('express');
const { app } = require('../../server');
const route = express.Router();
//const controller = require('../controllers/tiendaController');
const verifiers = require('../middelware/verifys');

route.get('/', (req, res) => {
    res.send('');
});

module.exports = route;
