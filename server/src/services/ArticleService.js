const { Op } = require("sequelize");
const sequelize = require("../config/database");

const ArticleModel = require("../models/ArticleModel");
const ArticleImageModel = require("../models/ArticleImageModel");

// Get 3 newest Article datas for Home page
const getHomePageArticles = async () => {
    const articles = await ArticleModel.findAll({
        attributes: ["articleId", "title", "subTitle"],
        include: [{ model: ArticleImageModel, attributes: ["image"] }],
        order: [["createdAt", "DESC"]],
        limit: 3
    });

    return convertArticleImages(articles);
};

// Get Articles for Article page
const getArticles = async () => {
    const articles = await ArticleModel.findAll({
        attributes: ["articleId", "title",
            [sequelize.literal(`TO_CHAR("Article"."createdAt", 'DD MONTH YYYY')`), 'createdAt'], "subTitle"],
        include: [{ model: ArticleImageModel, attributes: ["image"] }],
        order: [["createdAt", "DESC"]],
    });

    return convertArticleImages(articles);
};

module.exports = {
    getHomePageArticles,
    getArticles
};
