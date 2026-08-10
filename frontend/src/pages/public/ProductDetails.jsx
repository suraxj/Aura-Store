import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../../services/api';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import ProductCard from '../../components/common/ProductCard';
import toast from 'react-hot-toast';
import {
  Star,
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  CheckCircle,
  MapPin,
  MessageSquare,
  Sparkles,
  Share2
} from 'lucide-react';

export default function ProductDetails() {
  const { identifier } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeMsg, setPincodeMsg] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Review Form state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    fetchProductDetails();
  }, [identifier]);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/products/${identifier}`);
      setProduct(data);
      setSelectedImage(data.images[0] || '');

      // Fetch Reviews
      const revRes = await API.get(`/reviews/product/${data._id}`);
      setReviews(revRes.data || []);

      // Fetch Related Products from same category
      if (data.category) {
        const catId = data.category._id || data.category;
        const relRes = await API.get(`/products?category=${catId}&limit=4`);
        setRelatedProducts(relRes.data.products.filter(p => p._id !== data._id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeMsg({ success: true, text: 'Delivery Available! Expected within 2-3 business days.' });
    } else {
      setPincodeMsg({ success: false, text: 'Please enter a valid 6-digit Pincode.' });
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to post a review');
      return;
    }
    setSubmittingReview(true);
    try {
      await API.post('/reviews', {
        productId: product._id,
        rating: newRating,
        comment: newComment,
      });
      toast.success('Review submitted successfully!');
      setNewComment('');
      fetchProductDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex justify-center">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold">Product Not Found</h2>
        <Link to="/shop" className="text-indigo-600 font-semibold underline">Back to Shop</Link>
      </div>
    );
  }

  const isLiked = isInWishlist(product._id);
  const displayPrice = product.discountPrice > 0 ? product.discountPrice : product.price;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-indigo-600">Shop</Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Display Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm">
        
        {/* Left: Gallery & Zoom Preview */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 group">
            <img
              src={selectedImage || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
            />
            {product.discountPercentage > 0 && (
              <span className="absolute top-4 left-4 bg-rose-500 text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails list */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-2xl border-2 overflow-hidden flex-shrink-0 transition ${
                    selectedImage === img ? 'border-indigo-600 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details & Purchase Panel */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-md">
                {product.brand}
              </span>
              <span className="text-xs text-gray-400 font-mono">SKU: {product.sku}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 text-sm font-bold text-gray-900">{product.rating}</span>
              </div>
              <span className="text-xs text-gray-400">({reviews.length} Customer Reviews)</span>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-baseline gap-4">
              <span className="text-3xl font-extrabold text-slate-950">
                ₹{displayPrice.toLocaleString('en-IN')}
              </span>
              {product.discountPrice > 0 && (
                <span className="text-base text-gray-400 line-through font-medium">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              {product.shortDescription || product.description}
            </p>

            {/* Stock status */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-gray-700">Availability:</span>
              {product.stock > 0 ? (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> In Stock ({product.stock} units available)
                </span>
              ) : (
                <span className="text-rose-600 font-bold">Currently Out of Stock</span>
              )}
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-gray-800">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-xs font-bold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => addToCart(product._id, quantity)}
                  disabled={product.stock <= 0}
                  className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition ${
                    product.stock > 0
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>

                <button
                  onClick={async () => {
                    const success = await addToCart(product._id, quantity);
                    if (success) navigate('/checkout');
                  }}
                  disabled={product.stock <= 0}
                  className="flex-1 py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-2xl transition"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => toggleWishlist(product._id)}
                  className={`p-3.5 rounded-2xl border transition ${
                    isLiked ? 'bg-rose-50 border-rose-200 text-rose-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Pincode Checker */}
            <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/60 space-y-2">
              <label className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-indigo-600" />
                Check Delivery & Express Shipping Pincode
              </label>
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter 6-digit Pincode"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-indigo-200 rounded-xl text-xs"
                />
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition">
                  Check
                </button>
              </form>
              {pincodeMsg && (
                <p className={`text-[11px] font-semibold ${pincodeMsg.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {pincodeMsg.text}
                </p>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Specifications & Features Tab Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-8">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">Product Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.specifications && product.specifications.map((spec, i) => (
              <div key={i} className="flex justify-between p-3 bg-gray-50 rounded-xl text-xs">
                <span className="font-semibold text-gray-500">{spec.key}</span>
                <span className="font-bold text-gray-900">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {product.features && product.features.length > 0 && (
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-4">Key Highlight Features</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-gray-700">
              {product.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-2 p-3 bg-indigo-50/40 rounded-xl">
                  <CheckCircle className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Reviews & Ratings Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-600" />
            Customer Reviews & Ratings ({reviews.length})
          </h2>
        </div>

        {/* Add Review Form */}
        {user && (
          <form onSubmit={handleReviewSubmit} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Write a Verified Review</h3>
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-600">Your Rating:</span>
              <div className="flex items-center text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setNewRating(star)}
                    className="p-1 hover:scale-110 transition"
                  >
                    <Star className={`w-5 h-5 ${star <= newRating ? 'fill-current' : 'text-gray-300'}`} />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows={3}
              placeholder="Share your experience with this product..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
              className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />

            <button
              type="submit"
              disabled={submittingReview}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition"
            >
              {submittingReview ? 'Submitting...' : 'Post Review'}
            </button>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No reviews yet. Be the first verified buyer to leave a review!</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev._id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-gray-900">{rev.name}</span>
                    {rev.isVerifiedPurchase && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400">{new Date(rev.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>

                <p className="text-xs text-gray-700 leading-relaxed">{rev.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-gray-900">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
