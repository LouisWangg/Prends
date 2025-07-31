import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import sharedColumn from './SharedColumn.js';
import ServiceTypePrice from './ServiceTypePriceModel.js';
import ServiceTypeImage from './ServiceTypeImageModel.js';
import ServiceTypeComment from './ServiceTypeCommentModel.js';

const ServiceType = sequelize.define('ServiceType', {
  serviceTypeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ...sharedColumn,
}, {
  timestamps: true,
});

ServiceType.hasMany(ServiceTypePrice, { foreignKey: 'serviceTypeId' });
ServiceTypePrice.belongsTo(ServiceType, { foreignKey: 'serviceTypeId' });

ServiceType.hasMany(ServiceTypeImage, { foreignKey: 'serviceTypeId' });
ServiceTypeImage.belongsTo(ServiceType, { foreignKey: 'serviceTypeId' });

ServiceType.hasMany(ServiceTypeComment, { foreignKey: 'serviceTypeId' });
ServiceTypeComment.belongsTo(ServiceType, { foreignKey: 'serviceTypeId' });

export default ServiceType;
