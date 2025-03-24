import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7028',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status == 401) {
            localStorage.removeItem("user");
            window.location.href = "/login"
        }
        return Promise.reject(error);
    }
)
export default axiosInstance;
