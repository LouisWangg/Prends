const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CounselorLevel = sequelize.define('CounselorLevel', {
    counselorLevelId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    counselorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true, // or true if your table has createdAt/updatedAt
});

module.exports = CounselorLevel;
