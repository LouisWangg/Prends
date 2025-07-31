import * as ServiceTypeCommentService from "../services/ServiceTypeCommentService.js";

export const getHomePageComments = async (req, res) => {
  try {
    const result = await ServiceTypeCommentService.getHomePageComments();
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getHomePageComments");
  }
};

export const getServiceCommentsById = async (req, res) => {
  try {
    const { id } = req.params;
    const { sort } = req.query;

    const result = await ServiceTypeCommentService.getServiceCommentsById({ id, sort });
    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error on getServiceCommentsById");
  }
};
