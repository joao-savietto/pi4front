// Modern dark-themed login page with dark blue colors
import React, { useState } from 'react'
import useApi from '../hooks/useApi'
import { useNavigate } from 'react-router-dom'

const LoginPage: React.FC = () => {
  // State for login form
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  // Form error state
  const [error, setError] = useState('')
  
  // Loading state 
  const [loading, setLoading] = useState(false)
  
  const { api } = useApi()
  const navigate = useNavigate()

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!username || !password) {
      setError('Please fill in all fields')
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      // Call auth/login endpoint with username/password
      const response = await api.post('/auth/login', { username, password })
      
      // Extract tokens from response  
      const { access_token: accessToken, token_type: tokenType } = response.data
      
      // Store tokens using useApi hook methods - assuming it handles localStorage properly
      if (accessToken && tokenType) {
        console.log('Login successful')
        
        // Redirect to protected page
        navigate('/protected')
      }
      
    } catch (err) {
      setError('Invalid username or password')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-950 p-4">
      <div className="w-full max-w-md">
        {/* Card container with modern styling */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-700 overflow-hidden transition-all duration-300 hover:shadow-2xl">
          {/* Header with dark blue gradient */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 py-8 px-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjEiLz48L3N2Zz4=')]"></div>
            <h1 className="relative text-white text-3xl font-bold tracking-tight">Welcome Back</h1>
            <p className="relative text-blue-200 mt-2 text-sm">Sign in to continue to your account</p>
          </div>
          
          {/* Form Container */}
          <div className="p-8">
            {error && (
              <div className="mb-6 bg-red-500/20 border border-red-500/30 text-red-200 p-4 rounded-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-slate-200 text-sm font-medium mb-2">
                  Username
                </label>
                <div className="relative">
                  <input 
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400"
                    placeholder="Enter your username"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-slate-200 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input 
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400"
                    placeholder="Enter your password"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <button 
                  type="button"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  Forgot password?
                </button>
              </div>
              
              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-3 px-4 rounded-xl text-white font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                  loading 
                    ? 'bg-blue-700 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
            
            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm">
                Don't have an account? 
                <button 
                  type="button"
                  className="text-blue-400 hover:text-blue-300 font-medium ml-1 transition-colors duration-200"
                >
                  Create one
                </button>
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-xs">
            © 2025 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
