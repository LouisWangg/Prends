const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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
  },
  {
    timestamps: true, // or true if your table has createdAt/updatedAt
  }
);

module.exports = ServiceTypeImage;
