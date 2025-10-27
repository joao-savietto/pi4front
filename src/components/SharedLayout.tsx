// Shared layout component with navbar and authentication logic
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const SharedLayout: React.FC = () => {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  
  // Check if user is authenticated using AuthContext
  const isAuthenticated = !!authContext?.user
  
  const handleLogout = () => {
    if (authContext) {
      authContext.logout()
    }
    navigate('/login')
  }
  
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-xl font-bold text-blue-600">Pi4Front</Link>
              <div className=" flex space-x-4">
                {isAuthenticated ? (
                  <>
                    <Link to="/" className="px-3 py-2 rounded-md hover:bg-gray-100">Home</Link>
                    <Link to="/protected" className="px-3 py-2 rounded-md hover:bg-gray-100">Protected Page</Link>
                    {/* Show logout when authenticated */}
                    <button onClick={handleLogout} className="px-3 py-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    {/* Show login when not authenticated */}
                    <Link to="/login" className="px-3 py-2 rounded-md hover:bg-gray-100">Login</Link>
                  </>
                )}
              </div>
            </div>
            
            {/* User dropdown */}
            {isAuthenticated && (
              <div className="relative flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=100&q=80"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-grow text-left">
                  <p className="font-mono text-xs uppercase">Admin</p>
                  <p id="user-email-display" className="text-sm font-medium truncate">
                    User
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 flex-grow">
        <Outlet />
      </main>
    </div>
  )
}

export default SharedLayout
