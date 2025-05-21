const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const sharedColumn = require('./SharedColumn');
const ServiceTypeImage = require('./ServiceTypeImageModel');

const ServiceType = sequelize.define('ServiceType', {
    serviceTypeId: {
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
    type: { // services type : konseling individu, pasangan, keluarga, assessment, therapy, wawancara
        type: DataTypes.STRING,
        allowNull: false
    },
    meetingOptions: { // online call, offline tanah abang, offline pasar baru, etc
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    targetAudience: { // atau participantType / participantCategory, untuk jenis wawancara mahasiswa / umum
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    }
}, {
    timestamps: true, // or true if your table has createdAt/updatedAt
});

ServiceType.hasMany(ServiceTypeImage, { foreignKey: 'serviceTypeId' });
ServiceTypeImage.belongsTo(ServiceType, { foreignKey: 'serviceTypeId' });

module.exports = ServiceType;
