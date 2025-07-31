import { DataTypes } from 'sequelize';

const sharedColumn = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  type: { // for kleexpert, kleedemy, etc
    type: DataTypes.STRING,
    allowNull: true,
  },
  subType: { // for each item
    type: DataTypes.STRING,
    allowNull: true,
  },
  discountFlag: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  discountPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
};

export default sharedColumn;
