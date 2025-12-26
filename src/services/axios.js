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

    return {
      ...config,
      headers: {
        ...config.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };
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

        localStorage.setItem('authToken', res.token);

        return axiosInstance({
          ...originalRequest,
          headers: {
            ...originalRequest.headers,
            Authorization: `Bearer ${res.token}`,
          },
        });
      } catch {
        localStorage.clear();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
