import axios from "axios";

const url = "http://localhost:5000/serviceTypeFeedbacks/";

// Get Feedback datas for Home page
export const fetchHomePageFeedbacks = async () => {
  try {
    const response = await axios.get(`${url}/getHomePageFeedbacks`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch fetchHomePageFeedbacks datas: `, error);
    return null;
  }
};

// Get Feedback datas for each Service
export const fetchServiceFeedbacksById = async (id) => {
  try {
    const response = await axios.get(`${url}/getServiceFeedbacksById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch fetchServiceFeedbacksById datas by id: ${id}`, error);
    return null;
  }
};
