import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  RefreshCw,
  Headset,
  Send,
  ArrowUp,
  Instagram,
  Twitter,
  Youtube,
  Github,
  CheckCircle2
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800/80 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* 1. Value Guarantee Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 pb-12 border-b border-slate-800/80 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300">
            <div className="p-3 bg-gradient-to-tr from-indigo-600 to-violet-500 text-white rounded-xl shadow-md">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Express Delivery</h4>
              <p className="text-[11px] text-slate-400">Free shipping on orders over ₹1000</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
            <div className="p-3 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-xl shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Encrypted Payments</h4>
              <p className="text-[11px] text-slate-400">100% Buyer Protection & Stripe</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10 transition-all duration-300">
            <div className="p-3 bg-gradient-to-tr from-purple-600 to-pink-500 text-white rounded-xl shadow-md">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">30-Day Returns</h4>
              <p className="text-[11px] text-slate-400">Hassle-free instant money-back</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300">
            <div className="p-3 bg-gradient-to-tr from-amber-500 to-orange-500 text-white rounded-xl shadow-md">
              <Headset className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">24/7 Dedicated Support</h4>
              <p className="text-[11px] text-slate-400">Real-time expert assistance</p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-white">AURA STORE</span>
                <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest -mt-1">LUXURY & TECH</p>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md font-normal">
              Aura Store is your destination for precision wireless audio, titanium smart wearables, curated urban apparel, and high-performance lifestyle technology.
            </p>
            
            {/* Interactive Newsletter Subscription Form */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h5 className="text-xs font-extrabold text-white uppercase tracking-wider">
                🎁 Subscribe to Secret VIP Offers
              </h5>
              <p className="text-[11px] text-slate-400">Get early drop notifications and an instant ₹500 discount coupon.</p>

              {subscribed ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Subscribed! Check your inbox for code <strong>VIPAURA500</strong></span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md transition-all duration-300 active:scale-95"
                  >
                    <span>Join</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-bold text-slate-400 mr-2">Follow Us:</span>
              <a href="#" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 hover:scale-110 transition duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 hover:scale-110 transition duration-300">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 hover:scale-110 transition duration-300">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:scale-110 transition duration-300">
                <Github className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Quick Links Column 1 */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-xs font-black text-white uppercase tracking-widest border-b border-slate-800 pb-2">
              Categories
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li><Link to="/category/electronics" className="hover:text-indigo-400 transition">Electronics & Audio</Link></li>
              <li><Link to="/category/fashion" className="hover:text-indigo-400 transition">Fashion & Apparel</Link></li>
              <li><Link to="/category/home-living" className="hover:text-indigo-400 transition">Home & Living</Link></li>
              <li><Link to="/category/fitness" className="hover:text-indigo-400 transition">Fitness & Smart Gear</Link></li>
              <li><Link to="/shop" className="hover:text-indigo-400 transition">All Flagship Deals</Link></li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-xs font-black text-white uppercase tracking-widest border-b border-slate-800 pb-2">
              Customer Care
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li><Link to="/profile" className="hover:text-indigo-400 transition">My Account Profile</Link></li>
              <li><Link to="/orders" className="hover:text-indigo-400 transition">Track My Orders</Link></li>
              <li><Link to="/wishlist" className="hover:text-indigo-400 transition">My Saved Wishlist</Link></li>
              <li><Link to="/cart" className="hover:text-indigo-400 transition">Shopping Bag</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-400 transition">Contact VIP Support</Link></li>
            </ul>
          </div>

          {/* Quick Links Column 3 */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-xs font-black text-white uppercase tracking-widest border-b border-slate-800 pb-2">
              Company & Policy
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li><Link to="/about" className="hover:text-indigo-400 transition">About Aura Store</Link></li>
              <li><span className="cursor-pointer hover:text-indigo-400 transition">Privacy Policy & Cookies</span></li>
              <li><span className="cursor-pointer hover:text-indigo-400 transition">Terms & Conditions</span></li>
              <li><span className="cursor-pointer hover:text-indigo-400 transition">Shipping & Delivery Info</span></li>
              <li><span className="cursor-pointer hover:text-indigo-400 transition">Return & Refund Policy</span></li>
            </ul>
          </div>

        </div>

        {/* 3. Bottom Copyright & Payment Badges */}
        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Aura Store Inc. All rights reserved. Precision technology & luxury craft.</p>
          
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 bg-slate-900 rounded-lg text-[10px] font-bold text-slate-300 border border-slate-800">VISA</span>
            <span className="px-3 py-1 bg-slate-900 rounded-lg text-[10px] font-bold text-slate-300 border border-slate-800">MASTERCARD</span>
            <span className="px-3 py-1 bg-slate-900 rounded-lg text-[10px] font-bold text-slate-300 border border-slate-800">APPLE PAY</span>
            <span className="px-3 py-1 bg-slate-900 rounded-lg text-[10px] font-bold text-slate-300 border border-slate-800">STRIPE</span>
            <span className="px-3 py-1 bg-slate-900 rounded-lg text-[10px] font-bold text-slate-300 border border-slate-800">UPI / NETBANKING</span>
            
            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 transition-all duration-300 ml-2"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
