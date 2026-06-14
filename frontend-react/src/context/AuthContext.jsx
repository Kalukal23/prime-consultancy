import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    if (token) {
      localStorage.setItem('adminToken', token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('adminToken');
      setIsAuthenticated(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await res.json();
    if (data.success) {
      setToken(data.token);
      return true;
    }
    throw new Error(data.message || 'Login failed');
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
