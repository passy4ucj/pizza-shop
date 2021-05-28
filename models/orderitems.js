'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OrderItems.init({
    pizzaType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subTotal: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order_uuid: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'orderItems',
    modelName: 'OrderItems',
  });
  return OrderItems;
};