const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const sharedColumn = require('./SharedColumn');

const CounselingType = sequelize.define('CounselingType', {
    counselingTypeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ...sharedColumn,
    duration: {
        type: DataTypes.INTEGER,
        alowNull: false,
        defaultValue: 0
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true, // or true if your table has createdAt/updatedAt
});

module.exports = CounselingType;
