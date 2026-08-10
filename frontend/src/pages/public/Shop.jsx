import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import API from '../../services/api';
import ProductCard from '../../components/common/ProductCard';
import QuickViewModal from '../../components/common/QuickViewModal';
import {
  SlidersHorizontal,
  Search,
  Filter,
  X,
  ChevronDown,
  Star,
  RotateCcw,
  PackageX
} from 'lucide-react';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brandsList, setBrandsList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter States from URL query parameters
  const routeCategory = slug || '';
  const currentCategory = routeCategory || searchParams.get('category') || '';
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || 'newest';
  const currentMinPrice = searchParams.get('minPrice') || '';
  const currentMaxPrice = searchParams.get('maxPrice') || '';
  const currentRating = searchParams.get('rating') || '';
  const currentDiscount = searchParams.get('minDiscount') || '';
  const currentInStock = searchParams.get('inStock') === 'true';
  const currentBrand = searchParams.get('brand') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchParams, routeCategory]);

  const fetchCategories = async () => {
    try {
      const { data } = await API.get('/categories');
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(searchParams);
      if (routeCategory) {
        params.set('category', routeCategory);
      }
      const queryString = params.toString();
      const { data } = await API.get(`/products?${queryString}`);
      setProducts(data.products || []);
      setTotalPages(data.pages || 1);
      setTotalProducts(data.totalProducts || 0);
      setBrandsList(data.brands || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1'); // Reset to page 1 on filter change
    setSearchParams(params);
  };

  const clearAllFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Shop Catalogue</h1>
          <p className="text-xs text-gray-500 mt-1">
            Showing <span className="font-semibold text-gray-900">{totalProducts}</span> products available
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={currentSort}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm cursor-pointer"
            >
              <option value="newest">Sort: Newest Arrivals</option>
              <option value="price-low">Sort: Price Low to High</option>
              <option value="price-high">Sort: Price High to Low</option>
              <option value="popular">Sort: Most Popular</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="discount">Sort: Biggest Discount</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block w-64 flex-shrink-0 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <span className="text-sm font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
              Filters
            </span>
            {(currentCategory || currentBrand || currentMinPrice || currentMaxPrice || currentRating || currentDiscount || currentInStock || currentSearch) && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          {/* Search Input Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-800">Search Keyword</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={currentSearch}
                onChange={(e) => updateParam('search', e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-800">Category</label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => updateParam('category', '')}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  !currentCategory ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Categories
              </button>
              {categories.map((c) => (
                <button
                  key={c._id}
                  onClick={() => updateParam('category', c.slug)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition ${
                    currentCategory === c.slug ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2 pt-4 border-t border-gray-100">
            <label className="text-xs font-bold text-gray-800">Price Range (₹)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={currentMinPrice}
                onChange={(e) => updateParam('minPrice', e.target.value)}
                className="w-1/2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Max"
                value={currentMaxPrice}
                onChange={(e) => updateParam('maxPrice', e.target.value)}
                className="w-1/2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs"
              />
            </div>
          </div>

          {/* Brand Filter */}
          {brandsList.length > 0 && (
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <label className="text-xs font-bold text-gray-800">Brand</label>
              <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                {brandsList.map((b) => (
                  <label key={b} className="flex items-center gap-2 px-1 py-1 text-xs text-gray-600 hover:text-gray-900 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={currentBrand.includes(b)}
                      onChange={(e) => {
                        const brands = currentBrand ? currentBrand.split(',') : [];
                        let updated;
                        if (e.target.checked) {
                          updated = [...brands, b];
                        } else {
                          updated = brands.filter(item => item !== b);
                        }
                        updateParam('brand', updated.join(','));
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Rating Filter */}
          <div className="space-y-2 pt-4 border-t border-gray-100">
            <label className="text-xs font-bold text-gray-800">Minimum Rating</label>
            <div className="space-y-1">
              {[4, 3, 2, 1].map((r) => (
                <button
                  key={r}
                  onClick={() => updateParam('rating', currentRating === String(r) ? '' : String(r))}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition ${
                    currentRating === String(r) ? 'bg-amber-50 text-amber-700 font-bold border border-amber-200' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{r} Stars & Above</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="pt-4 border-t border-gray-100">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs font-bold text-gray-800">In Stock Only</span>
              <input
                type="checkbox"
                checked={currentInStock}
                onChange={(e) => updateParam('inStock', e.target.checked ? 'true' : '')}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </label>
          </div>

        </aside>

        {/* PRODUCT GRID MAIN AREA */}
        <main className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl p-5 border border-gray-100 space-y-4 animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-2xl"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 space-y-4 max-w-md mx-auto my-12">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto">
                <PackageX className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No Products Found</h3>
              <p className="text-xs text-gray-500">
                We couldn't find any products matching your selected filters or search terms.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-full font-semibold text-xs hover:bg-indigo-700 transition"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6">
                  {[...Array(totalPages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set('page', String(pageNum));
                          setSearchParams(params);
                        }}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition ${
                          currentPage === pageNum
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

    </div>
  );
}
