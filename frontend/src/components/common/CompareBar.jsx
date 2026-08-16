import React from 'react';
import { ArrowLeftRight, X, Sparkles } from 'lucide-react';
import { useCompare } from '../../context/CompareContext';

export default function CompareBar() {
  const { compareList, removeFromCompare, clearCompare, setIsCompareModalOpen } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/95 border border-indigo-200 rounded-2xl shadow-2xl p-3 sm:px-6 backdrop-blur-2xl flex items-center gap-4 animate__animated animate__slideInUp max-w-xl w-[92%] sm:w-auto">
      
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl text-white shadow-md shadow-indigo-500/20">
          <ArrowLeftRight className="w-4 h-4 animate-pulse" />
        </div>
        <div className="hidden sm:block">
          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Product Compare</h4>
          <p className="text-[10px] text-slate-500 font-medium">{compareList.length} of 2 items selected</p>
        </div>
      </div>

      {/* Product Thumbnails */}
      <div className="flex items-center gap-2">
        {compareList.map((product) => (
          <div key={product._id} className="relative group">
            <img
              src={product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=75'}
              alt={product.name}
              className="w-10 h-10 object-cover rounded-lg border border-gray-200 bg-slate-50 shadow-sm"
            />
            <button
              onClick={() => removeFromCompare(product._id)}
              className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-rose-500 text-white rounded-full flex items-center justify-center text-[10px] shadow-md hover:bg-rose-600 transition"
              title="Remove"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        ))}

        {compareList.length < 2 && (
          <div className="w-10 h-10 rounded-lg border-2 border-dashed border-indigo-200 bg-indigo-50/50 flex items-center justify-center text-[10px] text-indigo-600 font-bold">
            +1
          </div>
        )}
      </div>

      {/* Trigger Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsCompareModalOpen(true)}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-indigo-600/20 active:scale-95 transition flex items-center gap-1.5"
        >
          <span>Compare Side-by-Side</span>
          <ArrowLeftRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={clearCompare}
          className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition text-xs"
          title="Clear Compare List"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
