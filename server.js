const express = require('express');
const app = express();
const routeLogin = require('./api/routes/routeLogin');
const routeProducts = require('./api/routes/routeProducts');
const routeUsers = require('./api/routes/routeUsers');
const routeTiendas = require('./api/routes/routeTiendas');
const routeRedirect = require('./api/routes/routeRedirect');
const verifyJWT = require('./api/middelware/verifyJWT');

const db = require('./api/database/models');
require('dotenv').config();

app.use(express.json());

// Home

app.get('/', (req, res) => {
    res.status(200).json('Bienvenido al inicio');
});

// Rutas

app.use('/login', routeLogin);
app.use('/short', routeRedirect);
app.use('/productos', routeProducts);
app.use('/usuarios', routeUsers);
app.use('/tiendas', routeTiendas);

// Server open

const server = app.listen(process.env.PORT, async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
    console.log('Se abrio correctamente en el puerto ' + process.env.PORT);
});

// Redireccionamiento de pagina

app.get('*', (req, res) => {
    res.status(200).redirect('/');
});


module.exports = { app, server };
