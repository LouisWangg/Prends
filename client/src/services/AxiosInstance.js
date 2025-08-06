import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // or your production backend URL
  withCredentials: true,            // crucial for sending/receiving cookies
});

// // =====================
// // Placeholder function to get accessToken (replace with your logic)
// let accessToken = null;
// export const setAccessToken = (token) => {
//   accessToken = token;
// };
// const getAccessToken = () => accessToken;
// // =====================

// // Request interceptor to attach access token
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = getAccessToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor to handle 401 and try refresh
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Only retry once
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const res = await axios.post(
//           "http://localhost:5000/refreshToken",
//           {},
//           { withCredentials: true }
//         );
//         const newAccessToken = res.data.accessToken;

//         setAccessToken(newAccessToken);
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axiosInstance(originalRequest); // retry original request
//       } catch (refreshError) {
//         console.error("Refresh token failed:", refreshError.message);
//         // Optionally redirect to login
//       }
//     }

//     return Promise.reject(error);
//   }
// );

