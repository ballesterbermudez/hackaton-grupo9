const express = require('express');
const route = express.Router();
const controller = require('../controllers/productsController');

// rutas products
route.post('/', controller.create);
route.put('/:id', controller.modify);
route.delete('/:id', controller.delete);
route.get('/search', controller.search);
route.get('/:id',controller.details);
route.get('/', controller.list);



module.exports = route