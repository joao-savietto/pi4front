// Shared layout component with navbar and authentication logic
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useContext, useState, useRef, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { FaUser } from 'react-icons/fa'

const SharedLayout: React.FC = () => {
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  
  // Check if user is authenticated using AuthContext
  const isAuthenticated = !!authContext?.user
  
  const handleLogout = () => {
    if (authContext) {
      authContext.logout()
    }
    navigate('/login')
    setShowDropdown(false)
  }
  
  // Close dropdown when clicking outside
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) &&
          (buttonRef.current && !buttonRef.current.contains(event.target as Node))) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-[#0a0e21] shadow-md border-b border-[#0d1b36] text-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-xl font-bold">Monitor</Link>
              <div className=" flex space-x-4">
                {isAuthenticated ? (
                  <>
                    <Link to="/" className="px-3 py-2 rounded-md hover:bg-[#0d1b36]">Home</Link>
                    <Link to="/protected" className="px-3 py-2 rounded-md hover:bg-[#0d1b36]">Protected Page</Link>
                  </>
                ) : (
                  <>
                    {/* Show login when not authenticated */}
                    <Link to="/login" className="px-3 py-2 rounded-md hover:bg-[#0d1b36]">Login</Link>
                  </>
                )}
              </div>
            </div>
            
            {/* User dropdown */}
            {isAuthenticated && (
              <div className="relative flex items-center">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  ref={buttonRef}
                  className="flex items-center focus:outline-none cursor-pointer"
                >
                  <FaUser className="w-6 h-6 text-white" />
                </button>
                {showDropdown && (
                  <div 
                    ref={dropdownRef} 
                    className="absolute right-0 top-full mt-2 w-48 bg-[#0a0e21] border border-[#0d1b36] rounded-md shadow-lg py-1 z-50 transition-opacity duration-200 ease-in-out"
                  >
                    <p className="px-4 py-2 text-sm font-medium">Admin</p>
                    <p id="user-email-display" className="px-4 py-1 text-xs truncate">
                      User
                    </p>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-[#0d1b36]"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="">
        <div className="w-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default SharedLayout
