import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Replace with your API base URL
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
    const token = localStorage.getItem('token'); // Example: Get token from local storage
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
    return response.data;
  },
  (error) => {
    if(error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login'; // Redirect to login page
    }
    // Handle response errors
    return Promise.reject(error);
  }
);

export default api;