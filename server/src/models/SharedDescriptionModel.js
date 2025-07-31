import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SharedDescription = sequelize.define('SharedDescription', {
  sharedDescriptionId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: false,
});

export default SharedDescription;
