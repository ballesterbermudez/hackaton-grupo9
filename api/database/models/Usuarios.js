const { validate } = require('@babel/types');
const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'Usuarios',
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: {
                    args: true,
                    msg: 'El email ya esta registrado en la base de datos',
                },
                validate: {
                    isEmail: { msg: 'Ingrese un email correcto' },
                },
            },
            pass: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            nombre: {
                type: DataTypes.STRING(255),
                allowNull: false,
                validate: {
                    isAlpha: true,
                },
            },
            apellido: {
                type: DataTypes.STRING(255),
                allowNull: false,
                validate: {
                    isAlpha: true,
                },
            },
        },
        {
            sequelize,
            tableName: 'Usuarios',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'id' }],
                },
            ],
        }
    );
};
