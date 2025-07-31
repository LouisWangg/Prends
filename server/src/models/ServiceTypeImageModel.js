import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ServiceTypeImage = sequelize.define("ServiceTypeImage", {
  serviceTypeImageId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  serviceTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.BLOB("long"),
    allowNull: true,
  },
}, {
  timestamps: true,
});

export default ServiceTypeImage;
