const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CounselorPrice = sequelize.define("CounselorPrice", {
    counselorPriceId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    counselorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    counselingType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    counselingDiscountFlag: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    counselingDiscountPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},
    {
        timestamps: true, // or true if your table has createdAt/updatedAt
    }
);

module.exports = CounselorPrice;
