import axios from "axios";
import { toast } from "react-toastify";

// Set config defaults when creating the instance
const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000',
});

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN 123123';  

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error && error.response && error.response.status || 500;
    console.log(">>>status", status);

    switch (status) {
        case 401: {
            toast.error("Unauthorized the user. Please login...");
            // window.location.href = '/login';
            return Promise.reject(error);
        }
        case 403: {
            toast.error("You don't permission to access this resource...");
            return Promise.reject(error);
        }
        case 400: {
            return Promise.reject(error);
        }
        case 404: {
            return Promise.reject(error);
        }
        case 409: {
            return Promise.reject(error);
        }
        case 422: {
            return Promise.reject(error);
        }
        default: {
            return Promise.reject(error);
        }
    }

    // return Promise.reject(error);
});

export default instance;