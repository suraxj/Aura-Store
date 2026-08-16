import React from 'react';
import { Link } from 'react-router-dom';

export default function AuraLogo({ showText = true, size = 'md', className = '' }) {
  // Size presets
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <Link to="/" className={`inline-flex items-center gap-3 group ${className}`}>
      {/* 3D Vector Monogram Icon Mark */}
      <div className={`${iconSizes[size] || 'w-10 h-10'} relative flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="auraLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Container */}
          <rect width="100" height="100" rx="28" fill="#0f172a" />
          
          {/* Subtle Outer Aura Ring */}
          <circle cx="50" cy="50" r="41" stroke="url(#auraLogoGrad)" strokeWidth="2.5" opacity="0.4" strokeDasharray="6 5" />

          {/* Interlocking Monogram Emblem "A" */}
          <path d="M 50 18 L 78 76 L 63 76 L 50 46 L 37 76 L 22 76 Z" fill="url(#auraLogoGrad)" filter="url(#logoGlow)" />
          <path d="M 33 58 L 67 58 L 60 67 L 40 67 Z" fill="#ffffff" opacity="0.95" />
          
          {/* Top Sparkle Accent */}
          <path d="M 50 11 L 52 17 L 58 19 L 52 21 L 50 27 L 48 21 L 42 19 L 48 17 Z" fill="#fbbf24" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <span className={`${textSizes[size] || 'text-xl'} font-extrabold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors`}>
            AURA
          </span>
          <span className="text-[9px] font-bold text-indigo-600 tracking-[0.25em] uppercase -mt-1">
            STORE
          </span>
        </div>
      )}
    </Link>
  );
}
