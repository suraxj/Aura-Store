import React, { useEffect, useRef } from 'react';
import { Sparkles, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';

export default function ZoomGridSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    const updateScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      // Scrolled progress from 0 (entering viewport) to 1 (leaving sticky region)
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));

      const items = container.querySelectorAll('.grid-item:not(.special)');
      items.forEach((item, idx) => {
        const factor = (idx % 4 + 1) * 0.15;
        const translateZ = (progress - 0.5) * 1100 * factor;
        
        // Cards remain 100% visible throughout progress, fading out gently only above 0.88
        let opacity = 1;
        if (progress > 0.88) {
          opacity = (1 - progress) / 0.12;
        } else if (progress < 0.05) {
          opacity = progress / 0.05;
        }
        
        item.style.transform = `translateZ(${translateZ}px)`;
        item.style.opacity = `${opacity}`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: 'Aura SoundX Pro',
      subtitle: 'Active ANC Audio',
      price: '₹12,999',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=75',
      tag: 'FLAGSHIP'
    },
    {
      title: 'Chronos OLED',
      subtitle: 'Titanium Smartwatch',
      price: '₹18,499',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=75',
      tag: 'NEW DROP'
    },
    {
      title: 'Sonic Pods Elite',
      subtitle: 'Spatial 3D Wireless',
      price: '₹7,999',
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=75',
      tag: '30% OFF'
    },
    {
      title: 'Urban Stealth Jacket',
      subtitle: 'Waterproof Outerwear',
      price: '₹6,499',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=75',
      tag: 'HOT ITEM'
    },
    {
      title: 'Aura Ambient Light',
      subtitle: 'RGB Smart Lamp',
      price: '₹4,299',
      rating: '4.6',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=75',
      tag: 'POPULAR'
    },
    {
      title: 'AirPulse Earbuds',
      subtitle: '40h Battery Reserve',
      price: '₹4,999',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=400&q=75',
      tag: 'BEST VALUE'
    },
    {
      title: 'Minimalist Desk Lamp',
      subtitle: 'Touch Dimmer LED',
      price: '₹3,499',
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=400&q=75',
      tag: 'FEATURED'
    },
    {
      title: 'FlexFit Gym Runners',
      subtitle: 'Cushioned Sneaker',
      price: '₹5,999',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=75',
      tag: 'TOP RATED'
    },
    {
      title: 'Titanium Smart Ring',
      subtitle: 'Health & Sleep Monitor',
      price: '₹14,999',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=75',
      tag: 'INNOVATION'
    },
    {
      title: 'Aura Soundbar Ultra',
      subtitle: 'Dolby 7.1 Surround',
      price: '₹22,999',
      rating: '5.0',
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=75',
      tag: 'VIP DROP'
    },
    {
      title: 'Leather Duffle Bag',
      subtitle: 'Handcrafted Genuine',
      price: '₹8,999',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=75',
      tag: 'LUXURY'
    },
    {
      title: 'Mechanical Keypad',
      subtitle: 'RGB Hot-Swap Switch',
      price: '₹9,499',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=75',
      tag: 'GAMING'
    },
    {
      title: 'Studio Monitor X',
      subtitle: 'Hi-Res Reference',
      price: '₹26,999',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=400&q=75',
      tag: 'PRO AUDIO'
    },
    {
      title: 'Voyager Backpack',
      subtitle: 'TSA Approved Travel',
      price: '₹7,499',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=400&q=75',
      tag: 'ESSENTIAL'
    },
    {
      title: 'Precision Drone 4K',
      subtitle: 'Gimbal Stabilization',
      price: '₹45,999',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=400&q=75',
      tag: 'ULTRA TECH'
    },
    {
      title: 'Solar Power Bank',
      subtitle: '30,000mAh Heavy Duty',
      price: '₹3,999',
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1609592424109-dd9892f1b177?auto=format&fit=crop&w=400&q=75',
      tag: 'OUTDOOR'
    }
  ];

  return (
    <div className="stuck-grid-wrapper my-8 overflow-hidden relative" ref={containerRef}>
      
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle Grid Accent Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b15_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="stuck-grid">
        
        {/* Central Feature Hero Highlight */}
        <div className="grid-item special flex flex-col items-center justify-center space-y-4 shadow-2xl rounded-3xl border border-indigo-500/40 backdrop-blur-2xl z-20">
          <div className="p-3.5 bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 rounded-2xl shadow-xl text-white">
            <Sparkles className="w-8 h-8 animate__animated animate__pulse animate__infinite" />
          </div>
          <div className="space-y-1 text-center">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-indigo-400">
              NEXT-GEN HARDWARE & CRAFT
            </span>
            <h2 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-indigo-100 via-white to-pink-200 bg-clip-text text-transparent tracking-tight">
              ENGINEERED FOR EXCELLENCE
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed text-center font-normal">
            Immerse yourself in precision audio, titanium wearables, and urban luxury. Scroll down to watch our full tech ecosystem zoom into 3D perspective.
          </p>
          <Link
            to="/shop"
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
          >
            <span>Explore All 3D Tech</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3D Floating Feature Product Cards */}
        {features.map((item, idx) => (
          <div
            key={idx}
            className="grid-item shadow-2xl flex items-center gap-3.5 p-3.5 bg-slate-950/95 border border-indigo-500/40 rounded-2xl hover:border-indigo-400 hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-300 min-w-[260px] max-w-[280px]"
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-900 border border-slate-800">
              <LazyImage
                src={item.image}
                alt={item.title}
                width={150}
                quality={75}
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30">
                  {item.tag}
                </span>
                <span className="flex items-center text-[10px] font-bold text-amber-400">
                  <Star className="w-2.5 h-2.5 fill-current mr-0.5" />
                  {item.rating}
                </span>
              </div>
              <h4 className="text-xs font-extrabold text-white truncate leading-snug">{item.title}</h4>
              <p className="text-[10px] text-slate-300 truncate">{item.subtitle}</p>
              <div className="flex items-center justify-between mt-1.5">
                <p className="text-xs font-black text-emerald-400">{item.price}</p>
                <Link
                  to="/shop"
                  className="text-[10px] font-bold text-indigo-300 hover:text-white flex items-center gap-0.5 group"
                >
                  <span>View</span>
                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
