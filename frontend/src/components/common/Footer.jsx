import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Truck, RefreshCw, Headset, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300 pt-16 pb-12 border-t border-slate-800">
      
      {/* Value Proposition Features Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 pb-12 border-b border-slate-800/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/60">
            <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Free Express Delivery</h4>
              <p className="text-xs text-gray-400">On all orders above ₹1000</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/60">
            <div className="p-3 bg-emerald-600/20 text-emerald-400 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Secure Encrypted Payments</h4>
              <p className="text-xs text-gray-400">100% Buyer Protection & Stripe</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/60">
            <div className="p-3 bg-violet-600/20 text-violet-400 rounded-xl">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">30-Day Easy Returns</h4>
              <p className="text-xs text-gray-400">Hassle-free instant refunds</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/60">
            <div className="p-3 bg-amber-600/20 text-amber-400 rounded-xl">
              <Headset className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">24/7 Dedicated Support</h4>
              <p className="text-xs text-gray-400">Always here to assist you</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">AURA STORE</span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Discover futuristic electronics, luxury apparel, minimalist home décor, and high-performance gear crafted for the modern lifestyle.
            </p>
            
            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-white mb-2">Subscribe to Secret Member Deals</p>
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <button className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-xs flex items-center gap-1 transition">
                  Join <Send className="w-3 h-3" />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Shop Collections</h5>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><Link to="/category/electronics" className="hover:text-indigo-400 transition">Electronics & Audio</Link></li>
              <li><Link to="/category/fashion" className="hover:text-indigo-400 transition">Fashion & Apparel</Link></li>
              <li><Link to="/category/home-living" className="hover:text-indigo-400 transition">Home & Living</Link></li>
              <li><Link to="/category/fitness" className="hover:text-indigo-400 transition">Fitness & Gear</Link></li>
              <li><Link to="/shop" className="hover:text-indigo-400 transition">All Featured Deals</Link></li>
            </ul>
          </div>

          {/* Account & Orders */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Account & Support</h5>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><Link to="/profile" className="hover:text-indigo-400 transition">My Account Profile</Link></li>
              <li><Link to="/orders" className="hover:text-indigo-400 transition">Track My Orders</Link></li>
              <li><Link to="/wishlist" className="hover:text-indigo-400 transition">My Saved Wishlist</Link></li>
              <li><Link to="/cart" className="hover:text-indigo-400 transition">Shopping Bag</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-400 transition">Contact Customer Support</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company</h5>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><Link to="/about" className="hover:text-indigo-400 transition">About Aura Store</Link></li>
              <li><span className="cursor-pointer hover:text-indigo-400 transition">Privacy Policy</span></li>
              <li><span className="cursor-pointer hover:text-indigo-400 transition">Terms of Service</span></li>
              <li><span className="cursor-pointer hover:text-indigo-400 transition">Shipping Policy</span></li>
              <li><span className="cursor-pointer hover:text-indigo-400 transition">Return & Refund Terms</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Aura Store Inc. All rights reserved. Original branding & technology.</p>
          <div className="flex items-center gap-4">
            <span className="px-2.5 py-1 bg-slate-900 rounded text-[10px] font-semibold text-gray-400 border border-slate-800">VISA</span>
            <span className="px-2.5 py-1 bg-slate-900 rounded text-[10px] font-semibold text-gray-400 border border-slate-800">MASTERCARD</span>
            <span className="px-2.5 py-1 bg-slate-900 rounded text-[10px] font-semibold text-gray-400 border border-slate-800">STRIPE</span>
            <span className="px-2.5 py-1 bg-slate-900 rounded text-[10px] font-semibold text-gray-400 border border-slate-800">CASH ON DELIVERY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
