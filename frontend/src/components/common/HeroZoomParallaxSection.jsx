import React, { useEffect, useRef } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';

export default function HeroZoomParallaxSection() {
  const wrapperRef = useRef(null);
  const heroBgRef = useRef(null);
  const foregroundImgRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    };

    const updateParallax = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      // Calculate progress from 0 (top of wrapper entering) to 1 (scrolled through wrapper)
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / totalScrollable);

      // Hero background scale (1 -> 1.4)
      if (heroBgRef.current) {
        const bgScale = 1 + progress * 0.4;
        heroBgRef.current.style.transform = `scale(${bgScale})`;
      }

      // Foreground image perspective scale and z translate (1 -> 2.2, 0 -> 220px)
      if (foregroundImgRef.current) {
        const imgScale = 1 + progress * 1.2;
        const translateZ = progress * 220;
        foregroundImgRef.current.style.transform = `scale(${imgScale}) translateZ(${translateZ}px)`;
      }

      // Darken overlay opacity (0.6 -> 0.9)
      if (overlayRef.current) {
        const opacity = 0.6 + progress * 0.32;
        overlayRef.current.style.background = `rgba(0, 0, 0, ${opacity})`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateParallax(); // Initial positioning

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section className="hz-wrapper my-12" ref={wrapperRef}>
      <div className="hz-sticky-container">
        
        {/* Parallax Scaled Background */}
        <div className="hz-hero-bg" ref={heroBgRef} />

        {/* Dynamic Darken Scroll Overlay */}
        <div className="hz-darken-overlay" ref={overlayRef} />

        {/* Perspective Zoom Image */}
        <div className="hz-image-perspective">
          <LazyImage
            src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1600&q=80"
            alt="Aura SoundX Studio Edition"
            width={1600}
            quality={80}
            priority={true}
            ref={foregroundImgRef}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Clean Floating Foreground Content over Background Image */}
        <div className="hz-intro-content">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto px-4 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-indigo-400/50 text-indigo-300 text-xs font-extrabold tracking-widest uppercase shadow-2xl animate__animated animate__pulse animate__infinite">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Aura SoundX Studio Series</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-[0_6px_16px_rgba(0,0,0,0.95)]">
              Pure Acoustic Precision & Immersive Depth
            </h2>
            
            <p className="text-base sm:text-xl text-slate-100 leading-relaxed font-semibold max-w-xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
              Feel every vibration with custom 45mm beryllium drivers, active spatial cancellation, and zero-latency wireless connectivity.
            </p>

            <div className="pt-2">
              <Link
                to="/shop"
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold text-sm rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
              >
                <span>Discover Studio Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
