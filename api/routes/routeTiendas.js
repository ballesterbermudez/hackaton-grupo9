const express = require('express');
const { app } = require('../../server');
const route = express.Router();
<<<<<<< HEAD
const { create, readByName, update, deleteTienda } = require('../controllers/tiendaController');
=======
>>>>>>> 494abe78e01e3a4d349db417930311767d70b95c

route.get('/', (req, res) => {
    res.send('');
});
route.post('/crear-tienda', create);
route.get('/', readByName);
route.put('/:id', update);
route.delete('/:id', deleteTienda);


module.exports = route;
