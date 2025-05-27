const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ServiceTypePrice = sequelize.define('ServiceTypePrice', {
  serviceTypePriceId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  serviceTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  level: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  counselingType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  targetAudience: {
    type: DataTypes.STRING,
    allowNull: true
  },
  serviceDiscountFlag: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  serviceDiscountPrice: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  timestamps: true, // or true if your table has createdAt/updatedAt
});

module.exports = ServiceTypePrice;
