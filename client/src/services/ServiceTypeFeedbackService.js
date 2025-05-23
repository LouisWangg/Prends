import axios from "axios";

const url = "http://localhost:5000/serviceTypeFeedbacks/";

// Get Feedback datas for Home page
export const fetchHomePageFeedbacks = async () => {
  try {
    const response = await axios.get(`${url}/getHomePageFeedbacks`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Feedback datas: `, error);
    return null;
  }
};
