// Custom hook to provide configured Axios instance with interceptors
import { useMemo } from 'react'
import { apiClient as ApiClient } from '../utils/api'

export const useApi = () => {
  // Create a memoized API client instance that won't change between renders
  const api = useMemo(() => {
    return ApiClient
  }, [])

  // Function to manually set tokens (useful for login flows)
  const setTokens = (accessToken: string, refreshToken?: string) => {
    localStorage.setItem('accessToken', accessToken)
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken)
    }
  }

  // Function to clear stored tokens
  const clearTokens = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  // Function to get stored tokens
  const getTokens = () => {
    return {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken')
    }
  }

  return {
    api,
    setTokens,
    clearTokens,
    getTokens
  }
}

export default useApi
