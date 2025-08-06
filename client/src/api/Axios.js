import axios from "axios";

// Create axios instance
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // or your production backend URL
  withCredentials: true,            // crucial for sending/receiving cookies
});

// Store current accessToken in memory not local storage
let accessToken = null; 

// Function to set accessToken from Login response
export const setAccessToken = (token) => {
  accessToken = token;
};

// Request interceptor: attach accessToken
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 and try refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Try refreshing access token using cookie
        const res = await api.post("/users/refreshToken");
        const newAccessToken = res.data.accessToken;

        setAccessToken(newAccessToken); // Update memory token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest); // Retry original request
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
