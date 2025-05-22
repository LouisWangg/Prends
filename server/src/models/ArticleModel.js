const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ArticleImage = require('./ArticleImageModel');

const Article = sequelize.define('Article', {
    articleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    articleImageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: true, // or true if your table has createdAt/updatedAt
});

ArticleImage.hasMany(Article, { foreignKey: 'articleImageId' });
Article.belongsTo(ArticleImage, { foreignKey: 'articleImageId' });

module.exports = Article;
