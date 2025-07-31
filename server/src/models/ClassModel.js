import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import sharedColumn from "./SharedColumn.js";

const Class = sequelize.define("Class", {
  classId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ...sharedColumn,
  image: {
    type: DataTypes.BLOB("long"),
    allowNull: true,
  },
}, {
  timestamps: true,
});

export default Class;
