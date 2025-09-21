// Axios instance with interceptors for token handling
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { store } from '../store'
import type { RootState } from '../types'


// Base URL - configurable via environment variable or config file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

// Create axios instance with base URL
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
})

// Request interceptor to add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    // Get access token from localStorage or Redux store if available
    const accessToken = localStorage.getItem('accessToken') || 
                      (store.getState() as RootState).counter.value.toString()
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token refresh logic
apiClient.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const originalRequest = error.config
    
    // If the error is a 401 Unauthorized and it's not a refresh token request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        // Attempt to refresh the token using localStorage or Redux store values
        const refreshToken = localStorage.getItem('refreshToken') || 
                            (store.getState() as RootState).counter.value.toString()
        
        if (!refreshToken) {
          // No refresh token available - redirect to login page
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          window.location.href = '/login'
          return Promise.reject(error)
        }
        
        // Make a request to refresh the access token
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken
        })
        
        const { accessToken, refreshToken: newRefreshToken } = response.data
        
        // Store the new tokens
        localStorage.setItem('accessToken', accessToken)
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken)
        }
        
        // Update the request with the new token and retry
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        
        return apiClient(originalRequest)
      } catch (refreshError) {
        // If refresh fails, redirect to login
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }
    
    return Promise.reject(error)
  }
)

export default apiClient
