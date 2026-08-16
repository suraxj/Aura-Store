import React, { useState } from 'react';
import { X, ArrowLeftRight, Check, ShoppingBag, Star, Zap, ShieldCheck } from 'lucide-react';
import { useCompare } from '../../context/CompareContext';
import { useCart } from '../../context/CartContext';
import LazyImage from './LazyImage';

export default function CompareModal() {
  const { compareList, removeFromCompare, clearCompare, isCompareModalOpen, setIsCompareModalOpen } = useCompare();
  const { addToCart } = useCart();
  const [splitRatio, setSplitRatio] = useState(50); // 50/50 default split ratio

  if (!isCompareModalOpen || compareList.length === 0) return null;

  const prod1 = compareList[0];
  const prod2 = compareList[1];

  const p1Price = prod1?.discountPrice || prod1?.price || 0;
  const p2Price = prod2?.discountPrice || prod2?.price || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-xl animate__animated animate__fadeIn">
      
      {/* Container Card */}
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <ArrowLeftRight className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Side-by-Side Product Comparison</h3>
              <p className="text-xs text-slate-400">Comparing {compareList.length} of 2 items</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="text-xs font-bold text-slate-400 hover:text-rose-400 transition px-3 py-1.5 rounded-lg hover:bg-slate-800"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Body: Split Screen */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            
            {/* Center Split Divider Icon */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-indigo-600 text-white shadow-glow items-center justify-center border-2 border-slate-900 pointer-events-none">
              <ArrowLeftRight className="w-4 h-4" />
            </div>

            {/* Product 1 Column */}
            {prod1 && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-5 flex flex-col justify-between relative group hover:border-indigo-500/40 transition">
                <button
                  onClick={() => removeFromCompare(prod1._id)}
                  className="absolute top-3 right-3 p-1.5 text-slate-500 hover:text-rose-400 rounded-full hover:bg-slate-900 transition z-10"
                  title="Remove from comparison"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="space-y-4 text-center">
                  <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 p-2">
                    <LazyImage
                      src={prod1.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=75'}
                      alt={prod1.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-indigo-400 tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 inline-block mb-1">
                      {prod1.category?.name || 'Item 1'}
                    </span>
                    <h4 className="text-lg font-black text-white">{prod1.name}</h4>
                  </div>

                  {/* Price & Highlight Badge */}
                  <div className="space-y-1">
                    <div className="text-2xl font-black text-emerald-400">
                      ₹{p1Price}
                    </div>
                    {prod2 && p1Price < p2Price && (
                      <span className="inline-block text-[10px] font-extrabold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full animate-bounce">
                        Better Price (Save ₹{p2Price - p1Price})
                      </span>
                    )}
                  </div>
                </div>

                {/* Specs Table */}
                <div className="space-y-3 pt-4 border-t border-slate-800/80 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <span className="text-slate-400">Rating</span>
                    <span className="font-bold text-amber-400 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current" /> {prod1.ratings || 4.8} / 5
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <span className="text-slate-400">Stock Availability</span>
                    <span className={`font-bold ${prod1.stock > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {prod1.stock > 0 ? `In Stock (${prod1.stock})` : 'Out of Stock'}
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <span className="text-slate-400">Warranty</span>
                    <span className="font-bold text-slate-200">2-Year International</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <span className="text-slate-400">Delivery</span>
                    <span className="font-bold text-indigo-300">Free Express 24h</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => addToCart(prod1._id, 1)}
                  disabled={prod1.stock <= 0}
                  className="w-full py-3 mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Product 1 to Bag</span>
                </button>
              </div>
            )}

            {/* Product 2 Column */}
            {prod2 ? (
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-5 flex flex-col justify-between relative group hover:border-purple-500/40 transition">
                <button
                  onClick={() => removeFromCompare(prod2._id)}
                  className="absolute top-3 right-3 p-1.5 text-slate-500 hover:text-rose-400 rounded-full hover:bg-slate-900 transition z-10"
                  title="Remove from comparison"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="space-y-4 text-center">
                  <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 p-2">
                    <LazyImage
                      src={prod2.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=75'}
                      alt={prod2.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-purple-400 tracking-widest px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 inline-block mb-1">
                      {prod2.category?.name || 'Item 2'}
                    </span>
                    <h4 className="text-lg font-black text-white">{prod2.name}</h4>
                  </div>

                  {/* Price & Highlight Badge */}
                  <div className="space-y-1">
                    <div className="text-2xl font-black text-emerald-400">
                      ₹{p2Price}
                    </div>
                    {prod1 && p2Price < p1Price && (
                      <span className="inline-block text-[10px] font-extrabold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full animate-bounce">
                        Better Price (Save ₹{p1Price - p2Price})
                      </span>
                    )}
                  </div>
                </div>

                {/* Specs Table */}
                <div className="space-y-3 pt-4 border-t border-slate-800/80 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <span className="text-slate-400">Rating</span>
                    <span className="font-bold text-amber-400 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current" /> {prod2.ratings || 4.9} / 5
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <span className="text-slate-400">Stock Availability</span>
                    <span className={`font-bold ${prod2.stock > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {prod2.stock > 0 ? `In Stock (${prod2.stock})` : 'Out of Stock'}
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <span className="text-slate-400">Warranty</span>
                    <span className="font-bold text-slate-200">2-Year International</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <span className="text-slate-400">Delivery</span>
                    <span className="font-bold text-purple-300">Free Express 24h</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => addToCart(prod2._id, 1)}
                  disabled={prod2.stock <= 0}
                  className="w-full py-3 mt-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Product 2 to Bag</span>
                </button>
              </div>
            ) : (
              <div className="bg-slate-950/40 border-2 border-dashed border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 min-h-[400px]">
                <div className="p-4 bg-slate-900 rounded-full border border-slate-800 text-slate-500">
                  <ArrowLeftRight className="w-8 h-8" />
                </div>
                <h4 className="text-sm font-bold text-white">Select a 2nd Product</h4>
                <p className="text-xs text-slate-400 max-w-xs">
                  Click the compare icon on any other product card to side-by-side compare specs, price, and features!
                </p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
