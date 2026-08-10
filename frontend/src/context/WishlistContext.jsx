import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/wishlist');
      setWishlist(data.products || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = async (productId) => {
    if (!user) {
      toast.error('Please login to save items to your wishlist');
      return false;
    }
    try {
      const { data } = await API.post('/wishlist/toggle', { productId });
      setWishlist(data.products || []);
      
      const isAdded = data.products.some(p => (p._id || p) === productId);
      if (isAdded) {
        toast.success('Added to wishlist');
      } else {
        toast.success('Removed from wishlist');
      }
      return true;
    } catch (error) {
      toast.error('Failed to update wishlist');
      return false;
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(p => (p._id || p) === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, loading, toggleWishlist, isInWishlist, fetchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
