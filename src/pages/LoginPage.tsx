import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle successful login by redirecting to protected page
  const handleLoginSuccess = () => {
    // Navigate to home page after successful login
    navigate('/');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset previous errors
    setError('');
    setIsLoading(true);
    
    try {
      if (!authContext) {
        throw new Error('Contexto de autenticação não disponível');
      }
      
      // Call the login function from AuthContext which will handle API call and token storage
      await authContext.login(username, password);
      
      // Reset form 
      setUsername('');
      setPassword('');
      
      handleLoginSuccess();
    } catch (err: any) {
      console.error('Erro no login:', err);
      
      // Check for 401 status code specifically
      if (err.response && err.response.status === 401) {
        setError('Usuário ou senha inválidos');
      } else {
        setError('Erro interno. Tente novamente mais tarde.');
      }
      
      // Show modal for errors
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setShowErrorModal(false);
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
              <p className="text-[#93c5fd]">Faça login na sua conta</p>
            </div>

            {error && !showErrorModal && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Login Form */}
            <div className="max-w-md mx-auto bg-[rgba(10,14,33,0.7)] backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-white/80 mb-2 font-medium">
                    Usuário
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-[rgba(15,20,35,0.6)] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-white/50"
                    required
                    placeholder="Insira seu usuário"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="password" className="block text-white/80 mb-2 font-medium">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-[rgba(15,20,35,0.6)] border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder:text-white/50"
                    required
                    placeholder="Insira sua senha"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-200 font-medium ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </button>
              </form>
            </div>

          </div>

          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-blue-500/30"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-blue-500/30"></div>
        </div>
      </div>

      {/* Error Modal - Moved outside form container to cover entire viewport */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[rgba(10,14,33,0.9)] backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
            <h3 className="text-2xl font-bold text-red-400 mb-4">Erro de login</h3>
            <p className="text-white/80 mb-8">{error}</p>
            <button
              onClick={closeModal}
              className="bg-linear-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-200 font-medium"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
