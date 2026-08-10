import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [], subtotal: 0 });
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [], subtotal: 0 });
      setCoupon(null);
    }
  }, [user]);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const { data } = await API.get('/cart');
      setCart(data);
    } catch (error) {
      console.error('Failed to fetch cart', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      toast.error('Please login to add items to your cart');
      return false;
    }
    try {
      const { data } = await API.post('/cart', { productId, quantity });
      setCart(data);
      toast.success('Added to cart!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add item to cart');
      return false;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const { data } = await API.put('/cart/item', { productId, quantity });
      setCart(data);
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update quantity');
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data } = await API.delete(`/cart/item/${productId}`);
      setCart(data);
      toast.success('Item removed from cart');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove item');
      return false;
    }
  };

  const clearCart = async () => {
    try {
      await API.delete('/cart');
      setCart({ items: [], subtotal: 0 });
      setCoupon(null);
    } catch (error) {
      console.error(error);
    }
  };

  const applyCoupon = async (code) => {
    if (!code) {
      toast.error('Please enter a coupon code');
      return false;
    }
    try {
      const { data } = await API.post('/coupons/validate', {
        code,
        subtotal: cart.subtotal
      });
      setCoupon(data);
      toast.success(data.message);
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid coupon');
      setCoupon(null);
      return false;
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    toast.success('Coupon removed');
  };

  // Calculations
  const subtotal = cart.subtotal || 0;
  const discountAmount = coupon ? coupon.calculatedDiscount : 0;
  const shippingFee = subtotal > 1000 || subtotal === 0 ? 0 : 50;
  const tax = Math.round((subtotal - discountAmount) * 0.18);
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee + tax);
  const totalItemCount = cart.items ? cart.items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      coupon,
      totalItemCount,
      subtotal,
      discountAmount,
      shippingFee,
      tax,
      grandTotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      applyCoupon,
      removeCoupon,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
