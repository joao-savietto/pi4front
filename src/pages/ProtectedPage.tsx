// Example protected page that demonstrates API usage with token handling
import { useState, useEffect } from 'react'
import { useApi } from '../hooks/useApi'

export const ProtectedPage = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { api, getTokens } = useApi()

  useEffect(() => {
    // Check if tokens exist
    const tokens = getTokens()
    
    if (!tokens.accessToken) {
      setError('You must be logged in to view this page')
      setLoading(false)
      return
    }

    // Fetch protected data using the API client with interceptors
    const fetchData = async () => {
      try {
        const response = await api.get('/protected/data')
        setData(response.data)
        setLoading(false)
      } catch (err: any) {
        setError('Failed to fetch protected data. Please check your token.')
        setLoading(false)
        console.error('Error fetching protected data:', err)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div className="text-center py-8">Loading...</div>
  
  if (error) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="mb-4">{error}</p>
        <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Protected Data</h2>
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
      <div className="mt-6">
        <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
      </div>
    </div>
  )
}

export default ProtectedPage
