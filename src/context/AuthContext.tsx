import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Define types for auth context
interface AuthContextType {
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Check if tokens exist in localStorage
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string) => {
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
      
      // Extract access token from response  
      const { access_token: accessToken } = response.data;
      
      // Store tokens in localStorage and set user state
      localStorage.setItem('user', JSON.stringify({ accessToken }));
      setUser({ accessToken });
    } catch (error) {
      console.error(error);
      throw error;  // Re-throw to let calling components handle the error
    }
  }; 

  const logout = () => {
    // Remove tokens from localStorage and set user to null
    localStorage.removeItem('user');
    setUser(null);
  }; 

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
