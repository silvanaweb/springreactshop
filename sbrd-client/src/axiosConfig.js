import axios from "axios";
import browserCookie from 'browser-cookies'

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = browserCookie.get('token') || '';

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.baseURL = process.env.REACT_APP_API_URL;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
