const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const sharedColumn = require('./SharedColumn');
const CounselorImage = require('./CounselorImageModel');
const CounselorPrice = require('./CounselorPriceModel');
const CounselorFeedback = require('./CounselorFeedbackModel');

const Counselor = sequelize.define('Counselor', {
    counselorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ...sharedColumn,
    level: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: true, // or true if your table has createdAt/updatedAt
});

Counselor.hasMany(CounselorPrice, { foreignKey: 'counselorId' });
CounselorPrice.belongsTo(Counselor, { foreignKey: 'counselorId' });

Counselor.hasMany(CounselorImage, { foreignKey: 'counselorId' });
CounselorImage.belongsTo(Counselor, { foreignKey: 'counselorId' });

Counselor.hasMany(CounselorFeedback, { foreignKey: 'counselorId' });
CounselorFeedback.belongsTo(Counselor, { foreignKey: 'counselorId' });

module.exports = Counselor;
