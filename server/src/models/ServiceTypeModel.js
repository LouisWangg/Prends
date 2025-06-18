const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const sharedColumn = require('./SharedColumn');
const ServiceTypePrice = require('./ServiceTypePriceModel');
const ServiceTypeImage = require('./ServiceTypeImageModel');
const ServiceTypeComment = require('./ServiceTypeCommentModel');

const ServiceType = sequelize.define('ServiceType', {
    serviceTypeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ...sharedColumn,
    type: { // services type : konseling individu, pasangan, keluarga, assessment, therapy, wawancara
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true, // or true if your table has createdAt/updatedAt
});

ServiceType.hasMany(ServiceTypePrice, { foreignKey: 'serviceTypeId' });
ServiceTypePrice.belongsTo(ServiceType, { foreignKey: 'serviceTypeId' });

ServiceType.hasMany(ServiceTypeImage, { foreignKey: 'serviceTypeId' });
ServiceTypeImage.belongsTo(ServiceType, { foreignKey: 'serviceTypeId' });

ServiceType.hasMany(ServiceTypeComment, { foreignKey: 'serviceTypeId' });
ServiceTypeComment.belongsTo(ServiceType, { foreignKey: 'serviceTypeId' });

module.exports = ServiceType;
