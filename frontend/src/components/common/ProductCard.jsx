import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star, Check, ArrowLeftRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';

import LazyImage from './LazyImage';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toggleCompare, isInCompare } = useCompare();
  const [added, setAdded] = useState(false);
  const [transformStyle, setTransformStyle] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');

  const isLiked = isInWishlist(product._id);
  const isCompared = isInCompare(product._id);
  const discountPercent = product.discountPercentage || 
    (product.discountPrice > 0 ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0);

  const displayPrice = product.discountPrice > 0 ? product.discountPrice : product.price;

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock <= 0) return;
    
    addToCart(product._id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle, transition: 'transform 0.15s ease-out' }}
      className="ih-02__card ih-08__card group relative bg-white rounded-3xl border border-gray-100/80 shadow-sm hover:shadow-2xl hover:border-indigo-200 flex flex-col overflow-hidden animate__animated animate__fadeIn"
    >
      
      {/* Product Image Container */}
      <div className="ih-08__img-frame relative aspect-square w-full bg-slate-50 overflow-hidden">
        
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className="absolute top-3.5 left-3.5 z-10 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md shadow-rose-500/20 tracking-wider animate__animated animate__pulse animate__infinite">
            {discountPercent}% OFF
          </span>
        )}

        {/* BestSeller / Featured Badge */}
        {product.isBestSeller && (
          <span className="absolute top-3.5 right-3.5 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md shadow-amber-500/20 tracking-wider">
            Best Seller
          </span>
        )}

        {/* Product Image with LazyImage optimization */}
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <LazyImage
            src={product.images && product.images[0] ? product.images[0] : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=75'}
            alt={product.name}
            width={400}
            quality={75}
            className="ih-02__img ih-08__img w-full h-full object-cover object-center"
          />
        </Link>

        {/* Overlay Action Buttons with .ih-02__overlay animated slide */}
        <div className="ih-02__overlay z-20">
          <div className="ih-02__tag">{product.brand || 'AURA'}</div>
          <h4 className="ih-02__name">{product.name}</h4>
          <p className="ih-02__sub">₹{displayPrice.toLocaleString('en-IN')} • ⭐ {product.rating || 4.5}</p>

          <div className="flex items-center gap-3 mt-3 pt-2">
            <button
              onClick={() => onQuickView && onQuickView(product)}
              className="p-2.5 bg-white/95 text-slate-800 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-all active:scale-90"
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => toggleWishlist(product._id)}
              className={`p-2.5 rounded-full shadow-lg transition-all active:scale-90 ${
                isLiked ? 'bg-rose-500 text-white animate__animated animate__heartBeat' : 'bg-white/95 text-slate-800 hover:bg-rose-500 hover:text-white'
              }`}
              title="Wishlist"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => toggleCompare(product)}
              className={`p-2.5 rounded-full shadow-lg transition-all active:scale-90 ${
                isCompared ? 'bg-indigo-600 text-white shadow-indigo-500/50' : 'bg-white/95 text-slate-800 hover:bg-indigo-600 hover:text-white'
              }`}
              title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>
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

        {/* Pricing & Add to Cart Footer with ih-08__btn */}
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
            className={`ih-08__btn px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-300 active:scale-95 shadow-sm ${
              added
                ? 'bg-emerald-600 text-white shadow-emerald-500/20 animate__animated animate__rubberBand'
                : product.stock > 0
                ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-500/25'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
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
