import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import sharedColumn from './SharedColumn.js';
import CounselorImage from './CounselorImageModel.js';
import CounselorPrice from './CounselorPriceModel.js';
import CounselorComment from './CounselorCommentModel.js';

const Counselor = sequelize.define('Counselor', {
  counselorId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ...sharedColumn,
}, {
  timestamps: true
});

Counselor.hasMany(CounselorPrice, { foreignKey: 'counselorId' });
CounselorPrice.belongsTo(Counselor, { foreignKey: 'counselorId' });

Counselor.hasMany(CounselorImage, { foreignKey: 'counselorId' });
CounselorImage.belongsTo(Counselor, { foreignKey: 'counselorId' });

Counselor.hasMany(CounselorComment, { foreignKey: 'counselorId' });
CounselorComment.belongsTo(Counselor, { foreignKey: 'counselorId' });

export default Counselor;
