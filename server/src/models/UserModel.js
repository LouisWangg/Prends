const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CounselorFeedback = require('./CounselorFeedbackModel');
const ServiceTypeFeedback = require('./ServiceTypeFeedbackModel');

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true // Ensures the value is a valid email
        }
        // unique: true
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

User.hasMany(CounselorFeedback, { foreignKey: 'userId' });
CounselorFeedback.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(ServiceTypeFeedback, { foreignKey: 'userId' });
ServiceTypeFeedback.belongsTo(User, { foreignKey: 'userId' });

module.exports = User;
