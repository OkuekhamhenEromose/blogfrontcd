import { createContext, useState, useEffect } from 'react';
import { getCurrentUser, logout as apiLogout } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = getCurrentUser();
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = (userData) => {
    setUser(userData.user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};