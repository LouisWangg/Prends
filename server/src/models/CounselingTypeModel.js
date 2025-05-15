const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CounselingType = sequelize.define('CounselingType', {
    counselingTypeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        alowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true, // or true if your table has createdAt/updatedAt
});

module.exports = CounselingType;
