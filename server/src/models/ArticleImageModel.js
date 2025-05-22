const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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
    timestamps: true, // or true if your table has createdAt/updatedAt
});

module.exports = ArticleImage;
