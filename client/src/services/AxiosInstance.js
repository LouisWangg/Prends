import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // or your production backend URL
  withCredentials: true,            // crucial for sending/receiving cookies
});
