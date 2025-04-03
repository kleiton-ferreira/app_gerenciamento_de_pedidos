//Frontend/src/services/authService.js

import api from './api';

export const register = async (userData) => {
  try {
    const { data } = await api.post('/auth/register', userData);
    return data;
  } catch (error) {
    throw new Error(error || 'Registration failed');
  }
};

export const login = async (email, password) => {
  try {
    const { token, user } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    throw new Error(error || 'Login failed');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
