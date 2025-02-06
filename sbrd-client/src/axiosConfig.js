import axios from "axios";


const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = process.env.REACT_APP_API_TOKEN;
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // if ( username && password ) {
    //   config.auth = {
    //     username,
    //     password
    //   };
    // }
    config.baseURL = process.env.REACT_APP_API_URL;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
