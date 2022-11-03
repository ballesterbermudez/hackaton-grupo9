const db = require('../database/models');

const persistence = {
    searchBYEmail: async (email, password) => {
        try {
            const user = await db.Usuarios.findOne({
                attributes: ['id', 'email'],
                where: { email: email, pass: password },
            });
            return user;
        } catch (error) {
            throw error;
        }
    },

    searchAll: async (modelName) => {
        try {
            const info = await db[modelName].findAll();
            return info;
        } catch (error) {
            throw error;
        }
    },

    searchById: async (modelName, id) => {
        try {
            const info = await db[modelName].findByPk(id);
            return info;
        } catch (error) {
            throw error;
        }
    },

    updateData: async (modelName, id, datos, transaction = null) => {
        try {
            await db[modelName].update(datos, {
                where: { id: id },
                transaction: transaction,
            });
        } catch (error) {
            throw error;
        }
    },

    delete: async (modelName, id) => {
        try {
            await db[modelName].destroy({ where: { id: id } });
        } catch (error) {
            throw error;
        }
    },

    deleteOneProduct: async (userId, productId, transaction = null) => {
        try {
            await db.Cart.destroy({
                where: { id_product: productId, id_usuario: userId },
                transaction: transaction,
            });
        } catch (error) {
            throw error;
        }
    },
    
    //Criteria es un objeto con las propiedades dentro del findAll

    searchByCriteria: async (modelName, criteria) => {
        try {
            const respuesta = await db[modelName].findAll(criteria);
            return respuesta;
        } catch (error) {
            throw error;
        }
    },
    searchAll: async (modelName) => {
        try {
            const info = await db[modelName].findAll();
            return info;
        } catch (error) {
            throw error;
        }
    },

    searchById: async (modelName, id) => {
        try {
            const info = await db[modelName].findByPk(id);
            return info;
        } catch (error) {
            throw error;
        }
    },

    updateData: async (modelName, id, datos) => {
        try {
            await db[modelName].update(datos, {
                where: { id: id }
            });
        } catch (error) {
            throw error;
        }
    },

    delete: async (modelName, id) => {
        try {
            await db[modelName].destroy({ where: { id: id } });
        } catch (error) {
            throw error;
        }
    },

    deleteOneProduct: async (userId, productId, transaction = null) => {
        try {
            await db.Cart.destroy({
                where: { id_product: productId, id_usuario: userId },
                transaction: transaction,
            });
        } catch (error) {
            throw error;
        }
    },

    insert: async (modelName, datos) => {
        try {
            const newData = await db[modelName].create(datos);
            return newData;
        } catch (error) {
            throw error;
        }
    },

    //Criteria es un objeto con las propiedades dentro del findAll

    searchByCriteria: async (modelName, criteria) => {
        try {
            const respuesta = await db[modelName].findAll(criteria);
            return respuesta;
        } catch (error) {
            throw error;
        }
    },

    searchByKeyword: async (keyWord) => {
        try {
            const respuesta = await db.Product.findAll({
                include: [
                    {
                        association: 'category_product',
                        attributes: ['title'],
                    },
                    {
                        association: 'galery',
                        limit: 1,
                    },
                ],
                where: {
                    [db.Sequelize.Op.or]: [
                        {
                            description: {
                                [db.Sequelize.Op.like]: '%' + keyWord + '%',
                            },
                        },
                        {
                            title: {
                                [db.Sequelize.Op.like]: '%' + keyWord + '%',
                            },
                        },
                        db.Sequelize.where(
                            db.Sequelize.col('category_product.title'),
                            {
                                [db.Sequelize.Op.like]: '%' + keyWord + '%',
                            }
                        ),
                    ],
                },
            });
            return respuesta;
        } catch (error) {
            throw error;
        }
    },

    getCartByUserID: async (id) => {
        try {
            const cart = await db.User.findByPk(id, {
                include: {
                    model: db.Product,
                    as: 'cart',
                    through: { attributes: ['id_product', 'quantity', 'date'] },
                    attributes: ['title'],
                },
                //attributes: [db.Sequelize.col('cart')]
                attributes: {
                    exclude: [
                        'email',
                        'password',
                        'username',
                        'first_name',
                        'last_name',
                        'profilepic',
                        'id_role',
                    ],
                },
            });

            return cart;
        } catch (Error) {
            throw Error;
        }
    },

    //Obtener fotos de un producto

    searchPictureByProduct: async (id) => {
        try {
            const respuesta = await db.Product.findByPk(id, {
                include: {
                    association: 'galery',
                },
                attributes: [],
            });
            return respuesta;
        } catch (error) {
            throw error;
        }
    },
};

module.exports = persistence;
