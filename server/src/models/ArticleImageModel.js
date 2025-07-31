import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ArticleImage = sequelize.define("ArticleImage", {
  articleImageId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  image: {
    type: DataTypes.BLOB("long"),
    allowNull: true,
  },
}, {
  timestamps: true, // Set to false if you don't want createdAt/updatedAt
});

export default ArticleImage;
