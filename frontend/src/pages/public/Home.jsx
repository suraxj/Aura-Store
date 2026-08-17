import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import ProductCard from '../../components/common/ProductCard';
import QuickViewModal from '../../components/common/QuickViewModal';
import LazyImage from '../../components/common/LazyImage';
import ZoomGridSection from '../../components/common/ZoomGridSection';
import HeroZoomParallaxSection from '../../components/common/HeroZoomParallaxSection';
import SeoSection from '../../components/common/SeoSection';
import CountdownTimer from '../../components/common/CountdownTimer';
import TextMaskParallaxSection from '../../components/common/TextMaskParallaxSection';

import {
  Sparkles,
  ArrowRight,
  Zap,
  TrendingUp,
  Award,
  Clock,
  ShieldCheck,
  Star,
  ChevronRight,
  Truck,
  RotateCcw,
  Headphones,
  Lock
} from 'lucide-react';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    setLoading(true);
    try {
      const [catRes, featRes, bestRes, allRes] = await Promise.all([
        API.get('/categories'),
        API.get('/products/featured'),
        API.get('/products/bestsellers'),
        API.get('/products?limit=8')
      ]);

      setCategories(catRes.data || []);
      setFeaturedProducts(featRes.data || []);
      setBestSellers(bestRes.data || []);

      // Dynamically filter discounted products for Flash Sale
      const productsList = allRes.data.products || [];
      const discounted = productsList.filter(p => (p.discountPrice > 0 && p.discountPrice < p.price) || p.discountPercentage > 0);
      setFlashSaleProducts(discounted.length > 0 ? discounted : productsList);
    } catch (error) {
      console.error('Error loading homepage data', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. COMPLETELY REDESIGNED LUXURY HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 p-8 sm:p-12 lg:p-16 shadow-2xl border border-indigo-900/40 animate__animated animate__fadeIn">
        
        {/* Glowing Background Ambient Radial Orbs */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/25 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 animate__animated animate__fadeInLeft">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-xs font-extrabold tracking-widest uppercase shadow-md animate__animated animate__pulse animate__infinite">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Aura Store 2026 • Luxury & Tech Showcase</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
              Redefining Modern Living With{' '}
              <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                Acoustic Audio & Urban Craft.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-xl">
              Experience precision-engineered ANC headphones, titanium smartwatches, tailored urban apparel, and luxury lifestyle aesthetics delivered express to your doorstep.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-700 text-white font-extrabold text-sm rounded-2xl shadow-xl hover:shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 group animate__animated animate__pulse animate__infinite"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <Link
                to="/shop?category=electronics"
                className="px-7 py-4 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-sm rounded-2xl transition-all duration-300 hover:border-indigo-500/50 hover:text-white active:scale-95 backdrop-blur-md shadow-md"
              >
                View Flagship Tech
              </Link>
            </div>

            {/* Social Proof Bar */}
            <div className="pt-4 flex items-center gap-4 border-t border-slate-800/80">
              <div className="flex -space-x-2">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User" className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-white ml-1">4.9 / 5.0</span>
                </div>
                <p className="text-[11px] text-slate-400">Trusted by over <strong className="text-indigo-300">50,000+ buyers</strong> worldwide</p>
              </div>
            </div>

          </div>

          {/* Right Dual 3D Hero Cards */}
          <div className="lg:col-span-5 hidden lg:flex justify-center relative animate__animated animate__zoomIn">
            
            {/* Primary Main Card */}
            <div className="w-80 bg-slate-900/90 border border-slate-700/80 rounded-3xl p-5 backdrop-blur-2xl shadow-2xl hover:border-indigo-500/60 transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative rounded-2xl overflow-hidden mb-4 bg-slate-950">
                <LazyImage
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
                  alt="Aura SoundX Headphones"
                  className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-3 left-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                  BESTSELLER
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-extrabold text-white">Aura SoundX Pro</h4>
                  <p className="text-xs text-indigo-300 font-medium">ANC Acoustic Headphones</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-emerald-400">₹12,999</span>
                  <p className="text-[10px] text-slate-400 line-through">₹16,999</p>
                </div>
              </div>
            </div>

            {/* Overlapping Secondary Floating Card */}
            <div className="absolute -bottom-6 -left-8 w-64 bg-slate-950/95 border border-purple-500/40 rounded-2xl p-3.5 backdrop-blur-xl shadow-2xl hidden xl:flex items-center gap-3 animate__animated animate__fadeInUp">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0">
                <LazyImage
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=75"
                  alt="Chronos Smartwatch"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-extrabold text-purple-400 uppercase tracking-widest">NEW RELEASE</span>
                <h5 className="text-xs font-bold text-white truncate">Chronos Titanium</h5>
                <p className="text-[10px] text-emerald-400 font-extrabold">₹18,499</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* TRUST BADGES BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 p-2 group">
            <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Express Delivery</h4>
              <p className="text-[10px] text-slate-500">Free shipping over ₹999</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 group">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Secure Payments</h4>
              <p className="text-[10px] text-slate-500">256-bit SSL encrypted</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 group">
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">30-Day Returns</h4>
              <p className="text-[10px] text-slate-500">Hassle-free guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 group">
            <div className="p-3 rounded-2xl bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">24/7 VIP Support</h4>
              <p className="text-[10px] text-slate-500">Instant expert advice</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Shop by Category</h2>
            <p className="text-xs text-slate-500 mt-1">Curated premium essentials tailored for your lifestyle</p>
          </div>
          <Link to="/shop" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group">
            <span>See All</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-3xl animate-shimmer"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat, index) => (
              <Link
                key={cat._id}
                to={`/category/${cat.slug}`}
                className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-100 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <LazyImage
                  src={cat.image}
                  alt={cat.name}
                  width={400}
                  quality={75}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <h3 className="font-bold text-base group-hover:text-indigo-300 transition-colors duration-200">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-1">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 3. FLASH SALE / DEALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 rounded-3xl p-6 sm:p-8 border border-amber-500/20 shadow-sm animate__animated animate__fadeInUp">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-2xl shadow-lg shadow-amber-500/25 animate__animated animate__bounce animate__infinite">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  Flash Sales & Limited Deals
                </h2>
                <p className="text-xs text-slate-600">Save up to 40% OFF before stock runs out!</p>
              </div>
            </div>

            <CountdownTimer initialHours={5} initialMinutes={22} initialSeconds={40} />
          </div>

          {/* Product Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-80 rounded-3xl bg-slate-100 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {flashSaleProducts.slice(0, 4).map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. BEST SELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 text-white rounded-2xl shadow-md shadow-indigo-600/20 animate__animated animate__rubberBand">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Best Sellers</h2>
              <p className="text-xs text-slate-500">Top-rated items loved by over 50,000+ customers</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 rounded-3xl bg-slate-100 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        )}
      </section>

      {/* 3D ZOOM PERSPECTIVE GRID SHOWCASE */}
      <ZoomGridSection />

      {/* 5. PROMOTIONAL BANNER WITH ROTATING ARTWORK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-slate-950 text-white overflow-hidden p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 shadow-2xl animate__animated animate__fadeInUp">
          <div className="space-y-4 max-w-lg z-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3.5 py-1.5 rounded-full border border-indigo-500/20 inline-block animate__animated animate__tada animate__infinite">
              Limited Coupon Discount
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Unlock Extra ₹500 OFF On Orders Above ₹2000
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Use promo code <span className="font-extrabold text-amber-300 underline underline-offset-4">WELCOME100</span> during multi-step checkout. Valid for all members.
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="px-7 py-3.5 bg-white text-slate-950 font-bold text-xs rounded-2xl hover:bg-indigo-50 active:scale-95 transition-all duration-300 shadow-xl animate__animated animate__pulse animate__infinite"
            >
              Shop & Apply Coupon
            </button>
          </div>

          <div className="w-full md:w-1/2 flex justify-center z-10 animate__animated animate__zoomIn">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
              alt="Promo"
              className="w-72 h-72 object-cover rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transform hover:scale-105 transition-all duration-700 ease-out"
            />
          </div>
        </div>
      </section>

      {/* 6. TRENDING / FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500 text-white rounded-2xl shadow-md shadow-rose-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Trending Collections</h2>
              <p className="text-xs text-slate-500">Handpicked items trending across social media</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 rounded-3xl animate-shimmer"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        )}
      </section>

      {/* GSAP-STYLE PARALLAX ZOOM HERO BANNER */}
      <HeroZoomParallaxSection />

      {/* 7. CUSTOMER TESTIMONIALS WITH HOVER ELEVATION */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl font-extrabold text-slate-900">What Our Buyers Say</h2>
            <p className="text-xs text-slate-500 mt-1">Real feedback from verified purchasers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "The Aura SoundX Headphones delivered unbelievable noise cancellation! Fast 2-day delivery and crisp packaging. Highly recommended!"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="" className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Sophia Martinez</h4>
                  <p className="text-[10px] text-emerald-600 font-semibold">Verified Purchaser</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "Chronos OLED Smartwatch is worth every rupee. The titanium body feels super premium and battery lasts a full week."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="" className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">David Miller</h4>
                  <p className="text-[10px] text-emerald-600 font-semibold">Verified Purchaser</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "Easy multi-step checkout with instant coupon code application. The leather bomber jacket fits like a glove!"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="" className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Elena Rostova</h4>
                  <p className="text-[10px] text-emerald-600 font-semibold">Verified Purchaser</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC TEXT MASK PARALLAX SCROLL SECTION */}
      <TextMaskParallaxSection />

      {/* SEO CONTENT & FAQ ACCORDION HUB */}
      <SeoSection />

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

    </div>
  );
}
