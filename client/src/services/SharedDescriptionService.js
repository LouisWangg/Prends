import { axiosInstance } from "./AxiosInstance.js";

const url = "/sharedDescriptions";

// Get Description and Notice datas for Detail page
export const fetchDescriptionsAndNotices = async (type, id, subType) => {
  try {
    const response = await axiosInstance.get(`${url}/getDescriptionsAndNotices`, {
      params: { type, id, subType }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch getDescriptionsAndNotices datas: `, error?.message || error);
    return null;
  }
};

// Get Title and Subtitle datas for List page
export const fetchTitlesAndSubtitles = async (type, subType) => {
  try {
    const response = await axiosInstance.get(`${url}/getTitlesAndSubtitles`, {
      params: { type, subType }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch getTitlesAndSubtitles datas: `, error?.message || error);
    return null;
  }
};
