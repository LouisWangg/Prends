import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CounselorPrice = sequelize.define("CounselorPrice", {
  counselorPriceId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  counselorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  counselingType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  counselingDiscountFlag: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  counselingDiscountPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

export default CounselorPrice;
