import axios from "axios";

const url = "http://localhost:5000/sharedDescriptions";

// Get Description and Notice datas for Detail page
export const fetchDescriptionsAndNotices = async (type, id, itemType) => {
  try {
    const response = await axios.get(`${url}/getDescriptionsAndNotices`, {
      params: { type, id, itemType }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Shared Description datas: `, error?.message || error);
    return null;
  }
};
