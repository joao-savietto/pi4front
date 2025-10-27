import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import type { TokenResponse } from '../types/token.interface.ts';

// Define types for auth context
interface AuthContextType {
  user: TokenResponse | null;
  login: (username: string, password: string) => Promise<TokenResponse>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Check if tokens exist in localStorage
  const [user, setUser] = useState<TokenResponse | null>(null);
  
  useEffect(() => {
    const storedTokens = localStorage.getItem('access_token');
    if (storedTokens) {
      // For simplicity, we'll just store the access token as user data 
      // In a real app you might want to store more comprehensive user info
      setUser({
        access_token: storedTokens,
        token_type: 'bearer',
        refresh_token: localStorage.getItem('refresh_token') || ''
      });
    }
  }, []);

  const login = async (username: string, password: string): Promise<TokenResponse> => {
    // Create axios instance with base URL and default headers
    const api = axios.create({
      baseURL: 'https://esp.savietto.app/',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    try {
      // Call API endpoint for login
      const response = await api.post('/auth/login', { username, password });
      
      // Extract tokens from response  
      const tokenResponse: TokenResponse = response.data;
      
      // Store tokens in localStorage 
      localStorage.setItem('access_token', tokenResponse.access_token);
      localStorage.setItem('refresh_token', tokenResponse.refresh_token);
      
      // Set user state with full token data
      setUser(tokenResponse);
      
      return tokenResponse;
    } catch (error) {
      console.error(error);
      throw error;  // Re-throw to let calling components handle the error
    }
  }; 

  const logout = () => {
    // Remove tokens from localStorage and set user to null
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  }; 

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
