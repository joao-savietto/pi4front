import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import SharedLayout from './components/SharedLayout'
import LoginPage from './components/LoginPage'
import ProtectedPage from './pages/ProtectedPage'

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
      {/* Login Route */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected Routes with Layout */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        } 
      >
        {/* Nested routes for protected pages */}
        <Route index element={<ProtectedPage />} />
      </Route>
    </Routes>
  )
}

export default App
