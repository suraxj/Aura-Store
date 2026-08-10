import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isLiked = isInWishlist(product._id);
  const discountPercent = product.discountPercentage || 
    (product.discountPrice > 0 ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0);

  const displayPrice = product.discountPrice > 0 ? product.discountPrice : product.price;

  return (
    <div className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
        
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-rose-500 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-sm">
            {discountPercent}% OFF
          </span>
        )}

        {/* BestSeller / Featured Badge */}
        {product.isBestSeller && (
          <span className="absolute top-3 right-3 z-10 bg-amber-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm tracking-wider">
            Best Seller
          </span>
        )}

        {/* Product Image */}
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images && product.images[0] ? product.images[0] : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Overlay Hover Action Buttons */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-4">
          <button
            onClick={() => onQuickView && onQuickView(product)}
            className="p-3 bg-white text-slate-800 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => toggleWishlist(product._id)}
            className={`p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ${
              isLiked ? 'bg-rose-500 text-white' : 'bg-white text-slate-800 hover:bg-rose-500 hover:text-white'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 font-medium mb-1">
            <span>{product.brand}</span>
            {product.category?.name && (
              <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-md font-semibold">
                {product.category.name}
              </span>
            )}
          </div>

          <Link to={`/product/${product.slug}`} className="block">
            <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 hover:text-indigo-600 transition duration-200">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 text-xs">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="ml-1 font-bold text-gray-800">{product.rating || 4.5}</span>
          </div>
          <span className="text-gray-400 font-normal">({product.numReviews || 12})</span>
        </div>

        {/* Pricing & Add to Cart Footer */}
        <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-extrabold text-indigo-950">
                ₹{displayPrice.toLocaleString('en-IN')}
              </span>
              {product.discountPrice > 0 && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => addToCart(product._id, 1)}
            disabled={product.stock <= 0}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
              product.stock > 0
                ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {product.stock > 0 ? 'Add' : 'Out'}
          </button>
        </div>

      </div>
    </div>
  );
}
