const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const sharedColumn = require('./SharedColumn');
const CounselorLevel = require('./CounselorLevelModel');
const CounselorImage = require('./CounselorImageModel');
const CounselorFeedback = require('./CounselorFeedbackModel');

const Counselor = sequelize.define('Counselor', {
    counselorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ...sharedColumn,
    duration: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: []
    },
    counselingType: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: []
    }
}, {
    timestamps: true, // or true if your table has createdAt/updatedAt
});

Counselor.hasOne(CounselorLevel, { foreignKey: 'counselorId' });
CounselorLevel.belongsTo(Counselor, { foreignKey: 'counselorId' });

Counselor.hasMany(CounselorImage, { foreignKey: 'counselorId' });
CounselorImage.belongsTo(Counselor, { foreignKey: 'counselorId' });

Counselor.hasMany(CounselorFeedback, { foreignKey: 'counselorId' });
CounselorFeedback.belongsTo(Counselor, { foreignKey: 'counselorId' });

module.exports = Counselor;
