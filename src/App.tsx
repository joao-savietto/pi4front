import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-md">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link to="/" className="text-xl font-bold text-blue-600">Pi4Front</Link>
                <div className="flex space-x-4">
                  <Link to="/" className="px-3 py-2 rounded-md hover:bg-gray-100">Home</Link>
                  <Link to="/counter" className="px-3 py-2 rounded-md hover:bg-gray-100">Counter</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={
              <div className="text-center">
                <div className="flex justify-center space-x-8 mb-12">
                  <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                  </a>
                  <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                  </a>
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Vite + React with Redux</h1>
                <p className="text-lg text-gray-600 mb-8">
                  A modern web application built with Vite, React and Redux Toolkit
                </p>
                
                <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
                  <h2 className="text-2xl font-semibold mb-4">Features</h2>
                  <ul className="text-left text-gray-700 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>React with TypeScript</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Vite for fast development</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Tailwind CSS styling</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Redux Toolkit for state management</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>React Router DOM for navigation</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8">
                  <Link to="/counter" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200 inline-block">
                    Go to Counter Demo
                  </Link>
                </div>
              </div>
            } />

            {/* Counter Route */}
            <Route path="/counter" element={
              <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Redux Counter Demo</h1>
                
                <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                  <p className="text-4xl font-mono font-bold text-blue-600 mb-6">{count}</p>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                      onClick={() => setCount(count + 1)}
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md transition duration-200"
                    >
                      Increment
                    </button>
                    <button 
                      onClick={() => setCount(count - 1)}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md transition duration-200"
                    >
                      Decrement
                    </button>
                    <button 
                      onClick={() => setCount(count + 5)}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-md transition duration-200"
                    >
                      Add 5
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <Link to="/" className="text-blue-600 hover:underline">← Back to Home</Link>
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
