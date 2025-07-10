const qnaModel = require("../models/QnaModel");

// Get Qna datas for Home page
const getHomePageQnas = async () => {
    
    return await qnaModel.findAll({
        order: [["qnaId", "ASC"]]
    });

};

module.exports = {
    getHomePageQnas
};
