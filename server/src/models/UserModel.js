import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import CounselorComment from './CounselorCommentModel.js';
import ServiceTypeComment from './ServiceTypeCommentModel.js';

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

// Associations
User.hasMany(CounselorComment, { foreignKey: 'userId' });
CounselorComment.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(ServiceTypeComment, { foreignKey: 'userId' });
ServiceTypeComment.belongsTo(User, { foreignKey: 'userId' });

export default User;
