const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'Tiendas_productos',
        {
            id_producto: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Productos',
                    key: 'id',
                },
            },
            id_tienda: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Tiendas',
                    key: 'id',
                },
            },
            precio: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: { msg: 'El precio es requerido' },
                    min: {
                        args: [0],
                        msg: 'El precio no puede ser negativo',
                    },
                    isDecimal: {
                        args: true,
                        msg: 'El precio debe ser numerico',
                    },
                },
            },
            descripcion: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'Tiendas_productos',
            timestamps: false,
            indexes: [
                {
                    name: 'Tiendas_productos_fk0',
                    using: 'BTREE',
                    fields: [{ name: 'id_producto' }],
                },
                {
                    name: 'Tiendas_productos_fk1',
                    using: 'BTREE',
                    fields: [{ name: 'id_tienda' }],
                },
            ],
        }
    );
};
