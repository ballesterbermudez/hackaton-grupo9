var DataTypes = require('sequelize').DataTypes;
var _Productos = require('./Productos');
var _Tiendas = require('./Tiendas');
var _Tiendas_productos = require('./Tiendas_productos');
var _Usuarios = require('./Usuarios');

function initModels(sequelize) {
    var Productos = _Productos(sequelize, DataTypes);
    var Tiendas = _Tiendas(sequelize, DataTypes);
    var Tiendas_productos = _Tiendas_productos(sequelize, DataTypes);
    var Usuarios = _Usuarios(sequelize, DataTypes);

    Tiendas_productos.belongsTo(Productos, {
        as: 'id_producto_Producto',
        foreignKey: 'id_producto',
    });
    Productos.hasMany(Tiendas_productos, {
        as: 'tiendas_productos',
        foreignKey: 'id_producto',
    });
    Tiendas_productos.belongsTo(Tiendas, {
        as: 'id_tienda_Tienda',
        foreignKey: 'id_tienda',
    });
    Tiendas.hasMany(Tiendas_productos, {
        as: 'tiendas_productos',
        foreignKey: 'id_tienda',
    });

    return {
        Productos,
        Tiendas,
        Tiendas_productos,
        Usuarios,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
