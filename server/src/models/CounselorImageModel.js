const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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
  },
  {
    timestamps: true, // or true if your table has createdAt/updatedAt
  }
);

module.exports = CounselorImage;
