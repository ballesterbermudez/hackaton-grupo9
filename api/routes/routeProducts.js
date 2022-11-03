const express = require('express');
const route = express.Router();
const productCotroller = require('../controllers/productsController');
//const verifiers = require('../middelware/verifys');

// rutas products
route.get('/', productCotroller.list);
route.get('/:id', productCotroller.details);
route.post('/', productCotroller.create);
route.put('/:id', productCotroller.modify);
route.delete(':id', productCotroller.delete);

module.exports = route;
