import axios from "axios";

const url = "http://localhost:5000/sharedDescriptions/";

// Get Description datas by Ids for Detail page
export const fetchDescriptionsByIds = async (ids) => {
  try {
    const response = await axios.get(`${url}/getDescriptionsByIds`, {
        params: { ids: ids.join(',') }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Shared Description datas: `, error);
    return null;
  }
};

// Get Description datas for Detail page
export const fetchDescriptions = async (type, id) => {
  try {
    const response = await axios.get(`${url}/getDescriptions/${type}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch Shared Description datas: `, error);
    return null;
  }
};
