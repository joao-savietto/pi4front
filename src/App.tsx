import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import SharedLayout from './components/SharedLayout'
import LoginPage from './components/LoginPage'
import ProtectedPage from './pages/ProtectedPage'
import HomePage from './pages/HomePage'
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated'

// Define a protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authContext = useContext(AuthContext)
  
  // Handle case where context might be null
  if (!authContext) {
    return <Navigate to="/login" replace />
  }
  
  return authContext.user ? <>{children}</> : <Navigate to="/login" replace />
}

function App() {
  return (
    <Routes>
      {/* Login Route - with redirect for authenticated users */}
      <Route 
        path="/login" 
        element={
          <RedirectIfAuthenticated>
            <LoginPage />
          </RedirectIfAuthenticated>
        } 
      />
      
      {/* Protected Routes with Layout */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        } 
      >
        {/* Nested routes for protected pages - default to HomePage */}
        <Route index element={<HomePage />} />
        <Route path="protected" element={<ProtectedPage />} />
      </Route>
    </Routes>
  )
}

export default App
