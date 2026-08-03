import axios from 'axios';
import {failedQueue, promiseQueue} from './apiQueu';
import { refreshAccessToken } from '../features/auth/services/authServices';

let isRefreshing = false;

const api = axios.create({
  baseURL: "http://localhost:5001/api", // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests (in milliseconds)
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers here
  },
});

// You can add interceptors for request and response if needed
api.interceptors.request.use(
  (config) => {
    // Modify the request config before sending it
    const token = localStorage.getItem('accessToken'); // Example: Get token from local storage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Handle the response data
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if(error.response?.status === 401 && !originalRequest._retry) {
      if(isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
        .then(token => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch(err => {
          return Promise.reject(err);
        });
      }
      originalRequest._retry = true;
      try {
        const newToken = await refreshAccessToken();
       localStorage.setItem("accessToken", newToken as string);
       api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
       promiseQueue(null, newToken);
       originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        promiseQueue(err, null);
        localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      window.location.href = '/login'; // Redirect to login page
      }
      finally {
        isRefreshing = false;
      }
      
    }
    // Handle response errors
    return Promise.reject(error);
  }
);

export default api;