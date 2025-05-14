const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Feedback = sequelize.define('Feedback', {
    feedbackId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ratingZero: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    ratingOne: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    ratingTwo: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    ratingThree: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    ratingFour: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    ratingFive: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: true, // or true if your table has createdAt/updatedAt
});

module.exports = Feedback;
