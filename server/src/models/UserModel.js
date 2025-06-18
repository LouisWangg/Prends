const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CounselorComment = require('./CounselorCommentModel');
const ServiceTypeComment = require('./ServiceTypeCommentModel');

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    timestamps: true, // or true if your table has createdAt/updatedAt
});

User.hasMany(CounselorComment, { foreignKey: 'userId' });
CounselorComment.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(ServiceTypeComment, { foreignKey: 'userId' });
ServiceTypeComment.belongsTo(User, { foreignKey: 'userId' });

module.exports = User;
