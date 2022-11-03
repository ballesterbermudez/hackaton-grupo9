const express = require('express');
const route = express.Router();
<<<<<<< HEAD
const controller = require('../controllers/productsController');

// rutas products
route.post('/', controller.create);
route.put('/:id', controller.modify);
route.delete('/:id', controller.delete);
route.get('/search', controller.search);
route.get('/:id',controller.details);
route.get('/', controller.list);
=======
const productCotroller = require('../controllers/productsController');
//const verifiers = require('../middelware/verifys');

// rutas products
route.get('/', productCotroller.list);
route.get('/:id', productCotroller.details);
route.post('/', productCotroller.create);
route.put('/:id', productCotroller.modify);
route.delete(':id', productCotroller.delete);
>>>>>>> 494abe78e01e3a4d349db417930311767d70b95c

module.exports = route;
