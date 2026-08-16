import React, { useState, useEffect } from 'react';
import { X, ArrowLeftRight, ShoppingBag, Star, Search, Plus, Check, Sparkles } from 'lucide-react';
import { useCompare } from '../../context/CompareContext';
import { useCart } from '../../context/CartContext';
import API from '../../services/api';
import LazyImage from './LazyImage';

export default function CompareModal() {
  const { compareList, selectForSlot, removeFromCompare, clearCompare, isCompareModalOpen, setIsCompareModalOpen } = useCompare();
  const { addToCart } = useCart();

  const [availableProducts, setAvailableProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isCompareModalOpen) {
      fetchProducts();
    }
  }, [isCompareModalOpen]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/products');
      setAvailableProducts(data.products || data || []);
    } catch (err) {
      console.error('Error fetching products for compare selector:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isCompareModalOpen || compareList.length === 0) return null;

  const prod1 = compareList[0];
  const prod2 = compareList[1];

  const p1Price = prod1?.discountPrice || prod1?.price || 0;
  const p2Price = prod2?.discountPrice || prod2?.price || 0;

  const filteredProducts = availableProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) && p._id !== prod1?._id
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md animate__animated animate__fadeIn">
      
      {/* Light Clean Glass Container */}
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 text-white rounded-2xl shadow-md shadow-indigo-500/20">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Side-by-Side Product Comparison</h3>
              <p className="text-xs font-medium text-slate-500">Compare features, pricing, and ratings side by side</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="text-xs font-bold text-slate-500 hover:text-rose-600 transition px-3 py-1.5 rounded-xl hover:bg-rose-50"
            >
              Clear Comparison
            </button>
            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-gray-100 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            
            {/* Center Split Badge */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-indigo-600 text-white shadow-xl items-center justify-center border-4 border-white font-bold text-xs">
              VS
            </div>

            {/* Slot 1 Column */}
            {prod1 && (
              <div className="bg-slate-50/80 border border-gray-200 rounded-2xl p-6 space-y-6 flex flex-col justify-between relative shadow-sm">
                <button
                  onClick={() => removeFromCompare(prod1._id)}
                  className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-rose-600 rounded-full hover:bg-white shadow-sm transition"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="space-y-4 text-center">
                  <div className="w-44 h-44 mx-auto rounded-2xl overflow-hidden bg-white border border-gray-100 p-2 shadow-sm">
                    <LazyImage
                      src={prod1.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=75'}
                      alt={prod1.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-indigo-600 tracking-widest px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 inline-block mb-1.5">
                      {prod1.category?.name || 'Product 1'}
                    </span>
                    <h4 className="text-lg font-black text-slate-900 leading-snug">{prod1.name}</h4>
                  </div>

                  {/* Price & Savings */}
                  <div className="space-y-1">
                    <div className="text-2xl font-black text-slate-900">
                      ₹{p1Price.toLocaleString('en-IN')}
                    </div>
                    {prod2 && p1Price < p2Price && (
                      <span className="inline-block text-[11px] font-extrabold text-emerald-700 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full animate-pulse">
                        Lowest Price (Save ₹{(p2Price - p1Price).toLocaleString('en-IN')})
                      </span>
                    )}
                  </div>
                </div>

                {/* Specs Table */}
                <div className="space-y-3 pt-4 border-t border-gray-200 text-xs">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-slate-500 font-medium">Customer Rating</span>
                    <span className="font-extrabold text-amber-500 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current" /> {prod1.ratings || 4.8} / 5
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-slate-500 font-medium">Brand</span>
                    <span className="font-bold text-slate-800">{prod1.brand || 'AURA'}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-slate-500 font-medium">Stock Status</span>
                    <span className={`font-bold ${prod1.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {prod1.stock > 0 ? `In Stock (${prod1.stock})` : 'Out of Stock'}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-slate-500 font-medium">Warranty</span>
                    <span className="font-bold text-slate-800">2-Year International</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-slate-500 font-medium">Express Shipping</span>
                    <span className="font-bold text-indigo-600">Free 24h Dispatch</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => addToCart(prod1._id, 1)}
                  disabled={prod1.stock <= 0}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Product 1 to Bag</span>
                </button>
              </div>
            )}

            {/* Slot 2 Column */}
            {prod2 ? (
              <div className="bg-slate-50/80 border border-gray-200 rounded-2xl p-6 space-y-6 flex flex-col justify-between relative shadow-sm">
                <button
                  onClick={() => removeFromCompare(prod2._id)}
                  className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-rose-600 rounded-full hover:bg-white shadow-sm transition"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="space-y-4 text-center">
                  <div className="w-44 h-44 mx-auto rounded-2xl overflow-hidden bg-white border border-gray-100 p-2 shadow-sm">
                    <LazyImage
                      src={prod2.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=75'}
                      alt={prod2.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-purple-600 tracking-widest px-3 py-1 rounded-full bg-purple-50 border border-purple-100 inline-block mb-1.5">
                      {prod2.category?.name || 'Product 2'}
                    </span>
                    <h4 className="text-lg font-black text-slate-900 leading-snug">{prod2.name}</h4>
                  </div>

                  {/* Price & Savings */}
                  <div className="space-y-1">
                    <div className="text-2xl font-black text-slate-900">
                      ₹{p2Price.toLocaleString('en-IN')}
                    </div>
                    {prod1 && p2Price < p1Price && (
                      <span className="inline-block text-[11px] font-extrabold text-emerald-700 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full animate-pulse">
                        Lowest Price (Save ₹{(p1Price - p2Price).toLocaleString('en-IN')})
                      </span>
                    )}
                  </div>
                </div>

                {/* Specs Table */}
                <div className="space-y-3 pt-4 border-t border-gray-200 text-xs">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-slate-500 font-medium">Customer Rating</span>
                    <span className="font-extrabold text-amber-500 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current" /> {prod2.ratings || 4.9} / 5
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-slate-500 font-medium">Brand</span>
                    <span className="font-bold text-slate-800">{prod2.brand || 'AURA'}</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-slate-500 font-medium">Stock Status</span>
                    <span className={`font-bold ${prod2.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {prod2.stock > 0 ? `In Stock (${prod2.stock})` : 'Out of Stock'}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-slate-500 font-medium">Warranty</span>
                    <span className="font-bold text-slate-800">2-Year International</span>
                  </div>

                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-slate-500 font-medium">Express Shipping</span>
                    <span className="font-bold text-purple-600">Free 24h Dispatch</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => addToCart(prod2._id, 1)}
                  disabled={prod2.stock <= 0}
                  className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-purple-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Product 2 to Bag</span>
                </button>
              </div>
            ) : (
              /* Slot 2 Interactive Product Selector Grid */
              <div className="bg-slate-50/80 border-2 border-dashed border-gray-300 rounded-2xl p-6 space-y-4 flex flex-col">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
                      <Plus className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-900">Select 2nd Product to Compare</h4>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
                    {filteredProducts.length} Available
                  </span>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search products to compare..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
                  />
                </div>

                {/* Product List Selector */}
                <div className="flex-1 overflow-y-auto max-h-[360px] space-y-2.5 pr-1">
                  {filteredProducts.slice(0, 8).map((product) => (
                    <div
                      key={product._id}
                      onClick={() => selectForSlot(product, 1)}
                      className="p-3 bg-white hover:bg-indigo-50/70 border border-gray-200 hover:border-indigo-300 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition shadow-sm group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=100&q=75'}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h5 className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-600 transition">
                            {product.name}
                          </h5>
                          <p className="text-[10px] text-slate-500">₹{(product.discountPrice || product.price).toLocaleString('en-IN')}</p>
                        </div>
                      </div>

                      <button className="px-3 py-1 bg-indigo-600 text-white font-bold text-[10px] rounded-lg group-hover:scale-105 transition">
                        Select
                      </button>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
