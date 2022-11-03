const express = require('express');
const route = express.Router();
const controller = require('../controllers/productsController');


// rutas products
route.get('/search', controller.search);
route.get('/mostwanted',controller.mostwanted);
route.get('/:id',controller.details);
route.get('/', controller.list);



module.exports = route