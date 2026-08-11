import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  const isLiked = isInWishlist(product._id);
  const discountPercent = product.discountPercentage || 
    (product.discountPrice > 0 ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0);

  const displayPrice = product.discountPrice > 0 ? product.discountPrice : product.price;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock <= 0) return;
    
    addToCart(product._id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative bg-white rounded-3xl border border-gray-100/80 shadow-sm hover:shadow-2xl hover:border-indigo-100 hover:-translate-y-1.5 transition-all duration-500 ease-out flex flex-col overflow-hidden">
      
      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-slate-50 overflow-hidden">
        
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className="absolute top-3.5 left-3.5 z-10 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md shadow-rose-500/20 tracking-wider">
            {discountPercent}% OFF
          </span>
        )}

        {/* BestSeller / Featured Badge */}
        {product.isBestSeller && (
          <span className="absolute top-3.5 right-3.5 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md shadow-amber-500/20 tracking-wider">
            Best Seller
          </span>
        )}

        {/* Product Image with smooth 700ms zoom */}
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images && product.images[0] ? product.images[0] : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Overlay Action Buttons with Staggered Slide-Up */}
        <div className="absolute inset-0 bg-slate-950/25 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
          <button
            onClick={() => onQuickView && onQuickView(product)}
            className="p-3 bg-white/95 text-slate-800 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transform translate-y-6 group-hover:translate-y-0 transition-all duration-300 delay-75 active:scale-90"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => toggleWishlist(product._id)}
            className={`p-3 rounded-full shadow-lg transform translate-y-6 group-hover:translate-y-0 transition-all duration-300 delay-150 active:scale-90 ${
              isLiked ? 'bg-rose-500 text-white' : 'bg-white/95 text-slate-800 hover:bg-rose-500 hover:text-white'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 transition-transform duration-200 ${isLiked ? 'fill-current scale-110' : ''}`} />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1.5">
            <span className="uppercase tracking-wider text-[10px] font-semibold text-slate-400">{product.brand}</span>
            {product.category?.name && (
              <span className="bg-indigo-50/80 text-indigo-600 text-[10px] px-2 py-0.5 rounded-md font-semibold tracking-wide border border-indigo-100/50">
                {product.category.name}
              </span>
            )}
          </div>

          <Link to={`/product/${product.slug}`} className="block">
            <h3 className="font-semibold text-sm text-slate-900 line-clamp-2 hover:text-indigo-600 transition-colors duration-200">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 text-xs">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="ml-1 font-bold text-slate-800">{product.rating || 4.5}</span>
          </div>
          <span className="text-slate-400 font-normal">({product.numReviews || 12})</span>
        </div>

        {/* Pricing & Add to Cart Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-extrabold text-slate-900">
                ₹{displayPrice.toLocaleString('en-IN')}
              </span>
              {product.discountPrice > 0 && (
                <span className="text-xs text-slate-400 line-through font-medium">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-300 active:scale-95 shadow-sm ${
              added
                ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                : product.stock > 0
                ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-500/25'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 animate-badge-pop" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{product.stock > 0 ? 'Add' : 'Out'}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
