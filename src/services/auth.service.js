import axios from './axios';

export const AuthService = {
  login(data) {
    return axios.post('/login', data);
  },

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  },

  getRole() {
    return localStorage.getItem('role');
  },

  isAuthenticated() {
    const token = localStorage.getItem('authToken');
    // Check if token exists, is not an empty string, and is not the string 'undefined' or 'null'
    console.log('authToken:', token);
    return token && token.length > 0 && token !== 'undefined' && token !== 'null';
  },
};
