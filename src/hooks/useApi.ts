import { useState } from 'react'
import axios from 'axios'
import type { TokenResponse } from '../types/token.interface.ts'

const useApi = () => {
  const [api] = useState<ReturnType<typeof axios.create>>(() => {
    // Create axios instance with base URL and default headers
    return axios.create({
      baseURL: 'https://esp.savietto.app/',
      // baseURL: 'http://localhost:8000/',
      headers: {
        'Content-Type': 'application/json'
      }
    })
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
