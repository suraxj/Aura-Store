import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import API from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('aura_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);
  const authCheckRef = useRef(false);

  useEffect(() => {
    if (!authCheckRef.current) {
      authCheckRef.current = true;
      checkAuth();
    }
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('aura_token');
    if (!token) {
      setUser(null);
      localStorage.removeItem('aura_user');
      setLoading(false);
      return;
    }

    try {
      const { data } = await API.get('/auth/profile');
      setUser(data);
      localStorage.setItem('aura_user', JSON.stringify(data));
    } catch (err) {
      setUser(null);
      localStorage.removeItem('aura_user');
      localStorage.removeItem('aura_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await API.post('/auth/login', { email, password });
      setUser(data);
      localStorage.setItem('aura_user', JSON.stringify(data));
      if (data.token) {
        localStorage.setItem('aura_token', data.token);
      }
      toast.success(`Welcome back, ${data.name}!`);
      return { success: true, user: data };
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await API.post('/auth/register', { name, email, password });
      setUser(data);
      localStorage.setItem('aura_user', JSON.stringify(data));
      if (data.token) {
        localStorage.setItem('aura_token', data.token);
      }
      toast.success('Account created successfully!');
      return { success: true, user: data };
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const logout = async () => {
    try {
      await API.post('/auth/logout');
    } catch (err) {
      console.error(err);
    } finally {
      setUser(null);
      localStorage.removeItem('aura_user');
      localStorage.removeItem('aura_token');
      toast.success('Logged out successfully');
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const { data } = await API.put('/auth/profile', profileData);
      setUser(data);
      localStorage.setItem('aura_user', JSON.stringify(data));
      toast.success('Profile updated successfully');
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to update profile';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const addAddress = async (addressData) => {
    try {
      const { data } = await API.post('/auth/addresses', addressData);
      setUser(prev => ({ ...prev, addresses: data }));
      toast.success('Address added successfully');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add address');
      return false;
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const { data } = await API.delete(`/auth/addresses/${addressId}`);
      setUser(prev => ({ ...prev, addresses: data }));
      toast.success('Address deleted');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete address');
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, addAddress, deleteAddress, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
