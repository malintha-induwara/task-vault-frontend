
import axios from 'axios';
import store from '../store';
import { logout, setRefreshedToken } from '../store/slices/authSlice';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check specifically for 401 Unauthorized or it's not a retry already
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark as retried

      try {
        console.log('Access token expired. Attempting refresh...');
        // Attempt to refresh the token
        const response = await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });
        const newToken = response.data.accessToken;
        console.log('Token refreshed successfully.');

        localStorage.setItem('accessToken', newToken);

        store.dispatch(setRefreshedToken(newToken));

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        //Retry the original request with the new token
        return api(originalRequest);

      } catch (refreshError: any) {
        console.error('Unable to refresh token:', refreshError);
        // If refresh fails, logout the user
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default api;
