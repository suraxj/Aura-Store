import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Home,
  ShoppingBag,
  ShoppingCart,
  Heart,
  Package,
  User,
  X
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function CircularMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dockRef = useRef(null);

  const { totalItemCount } = useCart();
  const { wishlist } = useWishlist();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handlePointerDown = (e) => {
      if (dockRef.current && !dockRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen]);

  const items = [
    { label: 'Home', icon: <Home className="w-5 h-5" />, href: '/', index: 0 },
    { label: 'Shop All', icon: <ShoppingBag className="w-5 h-5" />, href: '/shop', index: 1 },
    { label: `Cart (${totalItemCount})`, icon: <ShoppingCart className="w-5 h-5" />, href: '/cart', index: 2 },
    { label: `Wishlist (${wishlist.length})`, icon: <Heart className="w-5 h-5" />, href: '/wishlist', index: 3 },
    { label: 'My Orders', icon: <Package className="w-5 h-5" />, href: '/orders', index: 4 }
  ];

  return (
    <div className={`ccm-05__dock ${isOpen ? 'is-open' : ''}`} ref={dockRef}>
      {/* Circular backdrop sheet overlay */}
      <div className="ccm-05__sheet" />

      {/* Floating Radial Action Buttons */}
      <ul className="ccm-05__arc">
        {items.map((item) => (
          <li key={item.label} style={{ '--i': item.index }}>
            <Link
              to={item.href}
              onClick={() => setIsOpen(false)}
              aria-label={item.label}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Main Dock Trigger Floating Button */}
      <button
        className="ccm-05__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Quick Actions Navigation Menu"
        title="Quick Actions Navigation Menu"
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <Sparkles className="w-6 h-6 text-white animate__animated animate__pulse animate__infinite" />}
      </button>
    </div>
  );
}
