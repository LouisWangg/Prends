import * as QnaService from "../services/QnaService.js";

export const getHomePageQnas = async (req, res) => {
  try {
    const qnas = await QnaService.getHomePageQnas();
    res.json(qnas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getHomePageQnas");
  }
};
