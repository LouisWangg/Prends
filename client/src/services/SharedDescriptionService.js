import axios from "axios";

const url = "http://localhost:5000/sharedDescriptions";

// Get Description and Notice datas for Detail page
export const fetchDescriptionsAndNotices = async (itemType, id, subType) => {
  try {
    const response = await axios.get(`${url}/getDescriptionsAndNotices`, {
      params: { itemType, id, subType }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch getDescriptionsAndNotices datas: `, error?.message || error);
    return null;
  }
};

// Get Title and Subtitle datas for List page
export const fetchTitlesAndSubtitles = async (itemType, subType) => {
  try {
    const response = await axios.get(`${url}/getTitlesAndSubtitles`, {
      params: { itemType, subType }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch getTitlesAndSubtitles datas: `, error?.message || error);
    return null;
  }
};
