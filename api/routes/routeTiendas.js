const express = require('express');
const { app } = require('../../server');
const route = express.Router();
const { create, readAll, readByName, update, deleteTienda } = require('../controllers/tiendaController');

route.post('/crear-tienda', create);
route.get('/', readAll);
route.get('/por-nombre', readByName);
route.put('/:id', update);
route.delete('/:id', deleteTienda);


module.exports = route;
