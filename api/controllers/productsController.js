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
                include: {
                    association: 'tiendas_productos',
                },
                attributes: {
                    exclude: ['descripcion'],
                },
            };
            let productos = persistence.searchByCriteria(modelName, criteria);
            resp.status(200).json(productos);
        } catch (error) {
            resp.status(500).json({
                msg: 'No se pudo acceder a la informacion',
            });
        }
    },

    //retorna los detalles de un producto
    details: async (req, resp) => {
        try {
            const criteria = {
                include: {
                    association: 'tiendas_productos',
                },
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
            console.log('hola1');
            const tienda = await persistence.searchById('Tiendas', id_tienda);
            console.log('hola2');
            if (tienda) {
                const newProd = await persistence.insert(modelName, product);
                const tiendas_producto = await persistence.insert(
                    'Tiendas_productos',
                    {
                        id_producto: newProd.id,
                        id_tienda: tienda.id,
                        precio,
                        descripcion,
                    }
                );
                resp.status(200).json(newProd);
            } else {
                resp.status(404).json({
                    msg: 'no se encontro la tienda',
                });
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
