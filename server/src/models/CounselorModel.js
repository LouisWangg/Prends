const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const sharedColumn = require('./SharedColumn');

const Counselor = sequelize.define('Counselor', {
    counselorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ...sharedColumn,
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    counselingType: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true, // or true if your table has createdAt/updatedAt
});

module.exports = Counselor;
