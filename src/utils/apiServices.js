import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL, // Adjust the base URL to your API
});

// Request interceptor
axiosInstance.interceptors.request.use(
    async config => {
        // Get the token from local storage
        const authToken = localStorage.getItem('token');
        
        // Set the Authorization header if the token exists
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }
        
        return config;
    },
    error => {
        // Handle request error here
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    response => {
        // Return the response as it is for successful requests
        return response;
    },
    error => {
        // Handle 401 Unauthorized error by redirecting to login
        if (error.response && error.response.status === 401) {
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
