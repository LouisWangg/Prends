const { Op } = require("sequelize");

const sequelize = require("../config/database");
const articleModel = require("../models/ArticleModel");
const articleImageModel = require("../models/ArticleImageModel");

// Get 3 newest Article datas for Home page
const getHomePageArticles = async () => {
    const articles = await articleModel.findAll({
        attributes: ["articleId", "title", "subTitle"],
        include: [{ model: articleImageModel, attributes: ["image"] }],
        order: [["createdAt", "DESC"]],
        limit: 3
    });

    return formatImages(articles);
};

// Get Articles for Article page
const getArticles = async () => {
    const articles = await articleModel.findAll({
        attributes: ["articleId", "title",
            [sequelize.literal(`TO_CHAR("Article"."createdAt", 'DD MONTH YYYY')`), 'createdAt'], "subTitle"],
        include: [{ model: articleImageModel, attributes: ["image"] }],
        order: [["createdAt", "DESC"]],
    });

    return formatImages(articles);
};

// Helper function to convert image to base64
const formatImages = (articles) => {
    return articles.map((article) => {
        const plain = article.get({ plain: true });

        if (plain.ArticleImage) {
            plain.ArticleImage.image = plain.ArticleImage.image
                ? plain.ArticleImage.image.toString("base64")
                : null;
        }

        return plain;
    });
};

module.exports = {
    getHomePageArticles,
    getArticles
};
