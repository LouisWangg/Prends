const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SharedDescription = sequelize.define('SharedDescription', {
    sharedDescriptionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false, // or true if your table has createdAt/updatedAt
});

module.exports = SharedDescription;
