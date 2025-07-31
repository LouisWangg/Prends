import QnaModel from "../models/QnaModel.js";

// Get Qna datas for Home page
export const getHomePageQnas = async () => {
  return await QnaModel.findAll({
    order: [["qnaId", "ASC"]],
  });
};
