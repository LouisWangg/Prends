const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const sharedColumn = require('./SharedColumn');

const Class = sequelize.define('Class', {
    classId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ...sharedColumn,
    image: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
}, {
    timestamps: true, // or true if your table has createdAt/updatedAt
});

module.exports = Class;
