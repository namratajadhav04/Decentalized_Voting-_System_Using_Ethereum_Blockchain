import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Backend server URL
  withCredentials: true, // Include cookies if required
});

export default axiosInstance;