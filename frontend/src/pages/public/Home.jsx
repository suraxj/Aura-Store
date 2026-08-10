import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import ProductCard from '../../components/common/ProductCard';
import QuickViewModal from '../../components/common/QuickViewModal';
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
  Tag
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

      setCategories(catRes.data);
      setFeaturedProducts(featRes.data);
      setBestSellers(bestRes.data);
      setFlashSaleProducts(allRes.data.products || []);
    } catch (error) {
      console.error('Error loading homepage data', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO BANNER SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 p-8 sm:p-12 lg:p-16 shadow-2xl border border-slate-800">
        {/* Glow background circles */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Next-Gen Audio & Smart Tech 2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
            Elevate Your Everyday <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-rose-300 bg-clip-text text-transparent">Aura.</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-xl">
            Discover precision-engineered wireless headphones, titanium smartwatches, tailored urban apparel, and smart home aesthetics.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/shop"
              className="px-7 py-3.5 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-bold text-sm rounded-2xl shadow-glow hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link
              to="/category/electronics"
              className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm rounded-2xl transition duration-200"
            >
              View Electronics
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Shop by Category</h2>
            <p className="text-xs text-gray-500 mt-1">Curated premium essentials tailored for your lifestyle</p>
          </div>
          <Link to="/shop" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            See All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/category/${cat.slug}`}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-gray-100 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <h3 className="font-bold text-base group-hover:text-indigo-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-gray-300 line-clamp-1">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FLASH SALE / DEALS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 rounded-3xl p-6 sm:p-8 border border-amber-500/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-lg">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                  Flash Sales & Limited Deals
                </h2>
                <p className="text-xs text-gray-600">Save up to 40% OFF before stock runs out!</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-xs font-bold text-rose-600 border border-rose-100 shadow-sm">
              <Clock className="w-4 h-4 animate-spin" />
              <span>Ends in 05h : 22m : 40s</span>
            </div>
          </div>

          {/* Product Cards Carousel / Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashSaleProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. BEST SELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 text-white rounded-2xl">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Best Sellers</h2>
              <p className="text-xs text-gray-500">Top-rated items loved by over 50,000+ customers</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </section>

      {/* 5. PROMOTIONAL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-slate-900 text-white overflow-hidden p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
          <div className="space-y-4 max-w-lg z-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Limited Coupon Discount
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Unlock Extra ₹500 OFF On Orders Above ₹2000
            </h2>
            <p className="text-xs text-gray-300">
              Use promo code <span className="font-bold text-amber-300">WELCOME100</span> during multi-step checkout. Valid for all new & returning members.
            </p>
            <button
              onClick={() => navigate('/shop')}
              className="px-6 py-3 bg-white text-slate-900 font-bold text-xs rounded-xl hover:bg-gray-100 transition shadow-lg"
            >
              Shop & Apply Coupon
            </button>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
              alt="Promo"
              className="w-72 h-72 object-cover rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* 6. TRENDING / FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500 text-white rounded-2xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Trending Collections</h2>
              <p className="text-xs text-gray-500">Handpicked items trending across social media</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onQuickView={setQuickViewProduct}
            />
          ))}
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section className="bg-gray-100/80 py-16 border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900">What Our Buyers Say</h2>
            <p className="text-xs text-gray-500 mt-1">Real feedback from verified purchasers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed italic">
                "The Aura SoundX Headphones delivered unbelievable noise cancellation! Fast 2-day delivery and crisp packaging. Highly recommended!"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="" className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Sophia Martinez</h4>
                  <p className="text-[10px] text-emerald-600 font-semibold">Verified Purchaser</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed italic">
                "Chronos OLED Smartwatch is worth every rupee. The titanium body feels super premium and battery lasts a full week."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="" className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">David Miller</h4>
                  <p className="text-[10px] text-emerald-600 font-semibold">Verified Purchaser</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed italic">
                "Easy multi-step checkout with instant coupon code application. The leather bomber jacket fits like a glove!"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="" className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Elena Rostova</h4>
                  <p className="text-[10px] text-emerald-600 font-semibold">Verified Purchaser</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
