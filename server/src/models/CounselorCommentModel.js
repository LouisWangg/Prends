const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CounselorComment = sequelize.define('CounselorComment', {
    counselorCommentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    counselorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
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

module.exports = CounselorComment;
