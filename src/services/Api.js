import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081', // URL of your Spring Boot backend
  withCredentials: true, // Ensure credentials (cookies) are sent with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      window.location.href = 'http://localhost:8081/oauth2/authorization/keycloak';
    }
    return Promise.reject(error);
  }
);

export default api;