import axios from "axios";

export const API_URL = 'http://localhost:5000/api';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;

    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && error.isRetry !== true) {
        originalRequest.isRetry = true;
        try {
            const response = await axios.get(`${API_URL}/users/refresh`, { withCredentials: true });
            localStorage.setItem('accessToken', response.data.accessToken);

            return $api.request(originalRequest);
        } catch (error) {
            console.log(error);
        }
    }
    throw error;
});

export default $api;