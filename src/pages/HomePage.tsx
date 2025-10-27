import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to Pi4Front</h1>
        <p className="mb-6 text-gray-600">
          You've successfully logged in! This is your home page.
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Dashboard Overview</h2>
          <p className="text-gray-600 mb-4">Here's what you can do:</p>
          <ul className="text-left space-y-2 text-sm">
            <li className="flex items-center">
              <span className="mr-2">•</span> Manage your account settings
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span> View your recent activities
            </li>
            <li className="flex items-center">
              <span className="mr-2">•</span> Access protected resources
            </li>
          </ul>
        </div>
        
        <button 
          onClick={() => navigate('/protected')}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 mr-2"
        >
          Go to Protected Page
        </button>
        
        <button 
          onClick={() => navigate('/login')}
          className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default HomePage
