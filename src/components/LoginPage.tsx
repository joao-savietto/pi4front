import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LoginForm } from './LoginForm';

const LoginPage: React.FC = () => {
  const [error, setError] = useState('');
  const authContext = useContext(AuthContext);

  // Handle successful login by redirecting to protected page
  const handleLoginSuccess = () => {
    // The AuthContext will automatically update the authentication state,
    // and routing should take care of the redirection 
    setError('');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0e21] to-[#0d1b36] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1a3a] rounded-full filter blur-[100px] opacity-30 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#2563eb] rounded-full filter blur-[100px] opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        {/* Login Card */}
        <div className="bg-[rgba(10,14,33,0.7)] backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Bem-vindo de volta</h1>
              <p className="text-[#93c5fd]">Faça login na your account</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Use the LoginForm component instead of manual form */}
            <LoginForm onLoginSuccess={handleLoginSuccess} />

          </div>

          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-blue-500/30"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-blue-500/30"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
