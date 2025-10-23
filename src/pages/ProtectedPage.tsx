import { useNavigate } from 'react-router-dom'

const ProtectedPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Protected Page</h1>
        <p className="mb-4">This page requires authentication to access.</p>
        
        <button 
          onClick={() => navigate('/login')}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Go to Login
        </button>
      </div>
    </div>
  )
}

export default ProtectedPage
