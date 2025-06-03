const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SharedDescription = sequelize.define('SharedDescription', {
    sharedDescriptionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: false
});

module.exports = SharedDescription;
