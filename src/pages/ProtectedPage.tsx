import { useNavigate } from 'react-router-dom'

const ProtectedPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Protected Content</h1>
        <p className="mb-6 text-gray-600">
          This is a protected page that requires authentication to access.
        </p>
        
        <div className="bg-yellow-50 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Secure Area</h2>
          <p className="text-gray-600">
            This page contains sensitive information that is only accessible to authenticated users.
          </p>
        </div>
        
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 mr-2"
        >
          Back to Home
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

export default ProtectedPage
