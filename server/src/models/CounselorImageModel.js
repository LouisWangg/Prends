import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CounselorImage = sequelize.define("CounselorImage", {
  counselorImageId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  counselorId: {
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

export default CounselorImage;
