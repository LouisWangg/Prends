const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const sharedColumn = require('./SharedColumn');
const CounselorImage = require('./CounselorImageModel');
const CounselorPrice = require('./CounselorPriceModel');
const CounselorComment = require('./CounselorCommentModel');

const Counselor = sequelize.define('Counselor', {
    counselorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ...sharedColumn,
}, {
    timestamps: true, // or true if your table has createdAt/updatedAt
});

Counselor.hasMany(CounselorPrice, { foreignKey: 'counselorId' });
CounselorPrice.belongsTo(Counselor, { foreignKey: 'counselorId' });

Counselor.hasMany(CounselorImage, { foreignKey: 'counselorId' });
CounselorImage.belongsTo(Counselor, { foreignKey: 'counselorId' });

Counselor.hasMany(CounselorComment, { foreignKey: 'counselorId' });
CounselorComment.belongsTo(Counselor, { foreignKey: 'counselorId' });

module.exports = Counselor;
