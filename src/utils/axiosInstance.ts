// Axios import (the only one)
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com',
  withCredentials: true, // Include credentials (cookies) with requests
});

export default axiosInstance;
