import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Axios instance
const api = axios.create({
  baseURL: 'https://dummyjson.com', 
});

// Add the access token to the Authorization header
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration and refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is related to token expiration
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Try to refresh the token using the refresh token
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post('https://dummyjson.com/auth/refresh', {
            refreshToken: refreshToken,
          });

          // Save the new access token
          await AsyncStorage.setItem('accessToken', response.data.accessToken);

          // Retry the original request with the new token
          originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // If refresh fails, logout the user and redirect to the login screen
          Alert.alert('Session expired', 'Please log in again');
          // You can navigate to the login screen here (e.g., navigation.navigate('Login'))
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token available, redirect to login
        Alert.alert('Session expired', 'Please log in again');
        // You can navigate to the login screen here
      }
    }

    return Promise.reject(error);
  }
);

export default api;
