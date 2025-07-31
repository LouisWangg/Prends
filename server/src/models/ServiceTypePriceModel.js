import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ServiceTypePrice = sequelize.define("ServiceTypePrice", {
  serviceTypePriceId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  serviceTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  counselingType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  targetAudience: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  audienceQuantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  serviceDiscountFlag: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  serviceDiscountPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default ServiceTypePrice;
