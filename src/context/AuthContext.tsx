import { createContext, useState, useEffect } from 'react';

// Define types for auth context
interface AuthContextType {
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Check if tokens exist in localStorage
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string) => {
    // Call API endpoint for login
    // ... similar to LoginPage's code
    // Store tokens in localStorage
    // Set user state
    
    // Example:
    try {
      const response = await api.post('/auth/login', { username, password });
      const { access_token: accessToken } = response.data;
      localStorage.setItem('user', JSON.stringify({ accessToken }));
      setUser({ accessToken });
    } catch (error) {
      console.error(error);
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
