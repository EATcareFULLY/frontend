import { useState, useEffect } from 'react';
import api from './Api';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        debugger;
        await api.get('/session/user');
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
//http://localhost:8080/realms/eat-carefully/protocol/openid-connect/logout
  const logout = async () => {
        window.location.href = "http://localhost:8080/realms/eat-carefully/protocol/openid-connect/logout";
      
        setIsAuthenticated(false);
  };

  return { isAuthenticated, loading, logout };
};

export default useAuth;
