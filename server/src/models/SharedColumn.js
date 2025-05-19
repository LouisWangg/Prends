const { DataTypes } = require('sequelize');

const sharedColumns = {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    itemType: { // for kleexpert, kleedemy, etc
        type: DataTypes.STRING,
        allowNull: false
    },
    discountFlag: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    discountPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
};

module.exports = sharedColumns;