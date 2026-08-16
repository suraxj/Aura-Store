import React, { useEffect, useRef } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TextMaskParallaxSection() {
  const bgRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (bgRef.current) {
            const scrollY = window.scrollY;
            bgRef.current.style.backgroundPosition = `calc(50% + ${scrollY * 0.3}px) calc(50% + ${scrollY * 0.2}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative w-full min-h-[70vh] bg-slate-950 overflow-hidden flex flex-col items-center justify-center py-20 px-4 my-16 border-y border-slate-900 shadow-2xl">
      
      {/* Background Underlay Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80')`
        }}
      />

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b20_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b20_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* Floating Header Tag */}
      <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-extrabold uppercase tracking-widest mb-4 backdrop-blur-md animate__animated animate__pulse animate__infinite">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span>CYBER ACOUSTIC EXPERIENCE</span>
      </div>

      {/* Giant Dynamic Image-Clipped Parallax Text */}
      <div
        ref={bgRef}
        className="relative z-10 font-black text-6xl sm:text-[11rem] md:text-[14rem] leading-none text-center uppercase tracking-tighter select-none transition-all duration-75"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 15px 30px rgba(99,102,241,0.3))'
        }}
      >
        AURA
      </div>

      {/* Subtext Overlay */}
      <div className="relative z-10 max-w-xl text-center space-y-4 -mt-4 sm:-mt-8">
        <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
          Where High Fidelity Sound Meets Unrivaled Aesthetics
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Experience our custom 3D acoustic drivers, spatial surround calibration, and precision titanium hardware.
        </p>
        <div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold text-xs rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Explore Cyber Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </section>
  );
}
