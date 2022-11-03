const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Tiendas_productos', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Productos',
        key: 'id'
      }
    },
    id_tienda: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tiendas',
        key: 'id'
      }
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "url"
    }
  }, {
    sequelize,
    tableName: 'Tiendas_productos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "url",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "url" },
        ]
      },
      {
        name: "Tiendas_productos_fk0",
        using: "BTREE",
        fields: [
          { name: "id_producto" },
        ]
      },
      {
        name: "Tiendas_productos_fk1",
        using: "BTREE",
        fields: [
          { name: "id_tienda" },
        ]
      },
    ]
  });
};
