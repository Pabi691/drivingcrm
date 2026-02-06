import axios from 'axios';
import { ENV } from '../config/env';

const axiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* 🔐 REQUEST INTERCEPTOR */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* 🚨 RESPONSE INTERCEPTOR */
axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest.isRetry) {
      originalRequest.isRetry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        const res = await axios.post(
          `${ENV.API_BASE_URL}/refresh-token`,
          { refreshToken }
        );

        const newToken = res.data.token;

        localStorage.setItem('authToken', newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
