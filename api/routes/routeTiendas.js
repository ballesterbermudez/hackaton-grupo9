const express = require('express');
const { app } = require('../../server');
const route = express.Router();
const { create, readByName, update, deleteTienda } = require('../controllers/tiendaController');

route.get('/', (req, res) => {
    res.send('');
});
route.post('/crear-tienda', create);
route.get('/', readByName);
route.put('/:id', update);
route.delete('/:id', deleteTienda);


module.exports = route;
