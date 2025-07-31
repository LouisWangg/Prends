import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import sharedColumn from './SharedColumn.js';

const Product = sequelize.define('Product', {
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ...sharedColumn,
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  timestamps: true,
});

export default Product;
