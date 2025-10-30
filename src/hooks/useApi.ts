import { useState } from 'react'
import axios from 'axios'
import type { TokenResponse } from '../types/token.interface.ts'

const useApi = () => {
  const [api] = useState<ReturnType<typeof axios.create>>(() => {
    // Create axios instance with base URL and default headers
    const apiInstance = axios.create({
      baseURL: 'https://esp.savietto.app/',
      // baseURL: 'http://localhost:8000/',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Request interceptor to add auth header
    apiInstance.interceptors.request.use(
      (config) => {
        const tokens = getTokens()
        if (tokens.access_token) {
          config.headers.Authorization = `Bearer ${tokens.access_token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor to handle 401 errors and refresh tokens
    apiInstance.interceptors.response.use(
      response => response,
      async (error) => {
        const originalRequest = error.config
        
        // If we get a 401 Unauthorized error and it's not already a refresh request
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          
          try {
            // Get refresh token from localStorage
            const tokens = getTokens()
            
            if (!tokens.refresh_token) {
              // If no refresh token, clear auth and redirect to login
              clearTokens()
              window.location.href = '/login'
              return Promise.reject(error)
            }
            
            // Make a request to refresh the token
            const refreshTokenResponse = await axios.post<TokenResponse>('/auth/refresh', {
              refresh_token: tokens.refresh_token
            }, {
              baseURL: 'https://esp.savietto.app/'
            })
            
            const { access_token, refresh_token } = refreshTokenResponse.data
            
            // Store new tokens
            setTokens(access_token, refresh_token)
            
            // Update the original request with new token and retry it
            originalRequest.headers.Authorization = `Bearer ${access_token}`
            return apiInstance(originalRequest)
          } catch (refreshError) {
            // If refresh fails, clear tokens and redirect to login
            clearTokens()
            window.location.href = '/login'
            return Promise.reject(refreshError)
          }
        }
        
        return Promise.reject(error)
      }
    )

    return apiInstance
  })

  const setTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('refresh_token', refreshToken)
  }

  // Get tokens from local storage
  const getTokens = () => {
    return {
      access_token: localStorage.getItem('access_token') || '',
      refresh_token: localStorage.getItem('refresh_token') || ''
    }
  }

  // Clear tokens from local storage
  const clearTokens = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  return { api, setTokens, getTokens, clearTokens }
}

export default useApi
