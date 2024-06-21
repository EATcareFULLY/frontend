import { useState, useEffect } from 'react';
import api from './Api';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await api.get('/session/user');
        setIsAuthenticated(true);
      } catch (error) {
        window.location.href = 'http://localhost:8081/oauth2/authorization/keycloak';
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    // Handle logout logic
    setIsAuthenticated(false);
    window.location.href = '/'; // Redirect to home or login page
  };

  return { isAuthenticated, loading, logout };

};

export default useAuth;
