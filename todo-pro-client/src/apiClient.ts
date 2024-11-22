import axios from "axios";

// API Client for reusability and sending cookies for auth purposes
export const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}`,
});

// Sending auth token with each request
apiClient.interceptors.request.use((request) => {
    const token = sessionStorage.getItem("token");
    request.headers.Authorization = "Bearer " + token;
    return request;
});

// Intercepting each response for checking auth
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Redirecting to login page is user is anauthorized based on status code
            window.location.href = "/login";
        }
    }
);
