const path = require('path');
const persistence = require('../persistence/persistence');
const { ValidationError } = require('sequelize');
const tiendaController = require('./tiendaController');
const modelName = 'Productos';

const directory = path.resolve(__dirname, '..', 'data');

const controller = {
    //retorna la lista de los productos
    list: async (req, resp) => {
        try {
            const criteria = {
                associations: { all: true, nested: true },
            };
            let productos = await persistence.searchAll('Tiendas_productos');
            let productosTienda = [];
            for (let i = 0; i < productos.length; i++) {
                let tienda = await persistence.searchById(
                    'Tiendas',
                    productos[i].id_tienda
                );
                let producto = await persistence.searchById(
                    'Productos',
                    productos[i].id_producto
                );
                let productoTienda = {
                    id : producto.id,
                    nombreProd: producto.nombre,
                    precio: productos[i].precio,
                    imagen: 'url.com',
                    nombreTienda: tienda.nombre,
                };
                productosTienda.push(productoTienda);
            }
            resp.status(200).json(productosTienda);
        } catch (error) {
            console.log(error);
            resp.status(500).json({
                msg: 'No se pudo acceder a la informacion',
            });
        }
    },

    //retorna los detalles de un producto
    details: async (req, resp) => {
        try {
            const criteria = {
                where: { id: req.params.id },
            };
            const prod = await persistence.searchByCriteria(
                modelName,
                criteria
            );

            if (prod.length > 0) {
                resp.status(200).json(prod);
            } else {
                resp.status(404).json({ message: 'Producto no encontrado' });
            }
        } catch (error) {
            console.log(error);
            resp.status(500).json({
                msg: 'No se pudo acceder a la informacion',
            });
        }
    },
    //crea un producto
    create: async (req, resp) => {
        const { nombre, precio, descripcion, id_tienda } = req.body;
        const product = {
            nombre,
        };
        try {
            const tienda = await persistence.searchById('Tiendas', id_tienda);
            if (tienda) {
                const newProd = await persistence.insert(modelName, product);
                await persistence.insert('Tiendas_productos', {
                    id_producto: newProd.id,
                    id_tienda: tienda.id,
                    precio,
                    descripcion,
                    url: `http://localhost:8080/productos/${newProd.id}`,
                });
                resp.status(200).json(newProd);
            } else {
                resp.status(404).json({
                    msg: 'no se encontro la tienda',
                });
            }
        } catch (error) {
            console.log(error);
            if (error instanceof ValidationError) {
                let errorArray = [];
                error.errors.forEach((el, i) => {
                    errorArray[i] = el.message;
                });
                resp.status(401).json(errorArray);
            } else {
                resp.status(500).json({
                    msg: 'No fue posible insertar el producto',
                });
            }
        }
    },
    //modifica un producto existente
    modify: async (req, resp) => {
        try {
            let product = await persistence.searchById(
                modelName,
                req.params.id
            );
            if (product != null) {
                let { ...parametorsModificados } = req.body;
                const newProd = {
                    nombre: parametorsModificados.nombre,
                    // precio: parametorsModificados.precio,
                    // descripcion: parametorsModificados.descripcion,
                    // id_tienda: parametorsModificados.id_tienda,
                };

                await persistence.updateData(modelName, req.params.id, newProd);

                product = await persistence.searchById(
                    modelName,
                    req.params.id
                );

                resp.status(200).json(product);
            } else {
                resp.status(404).json({ msg: 'Producto no encontrado' });
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                let errorArray = [];
                error.errors.forEach((el, i) => {
                    errorArray[i] = el.message;
                });
                resp.status(401).json(errorArray);
            } else {
                resp.status(500).json({
                    msg: 'No fue posible modificar el producto',
                });
            }
        }
    },

    //borra el producto con id pasado por parametro
    delete: async (req, resp) => {
        try {
            const product = await persistence.searchById(
                modelName,
                req.params.id
            );

            if (product != null) {
                await persistence.delete(modelName, req.params.id);
                resp.status(200).json(product);
            } else {
                resp.status(404).json({ msg: 'no existe el articulo' });
            }
        } catch (error) {
            resp.status(500).json({ msg: 'Error interno' });
        }
    },
};

module.exports = controller;
