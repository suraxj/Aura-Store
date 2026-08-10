import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../../services/api';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';

export default function AddEditProduct() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDescription: '',
    price: '',
    discountPrice: '',
    category: '',
    subCategory: '',
    brand: '',
    images: [''],
    stock: '',
    sku: '',
    specifications: [{ key: '', value: '' }],
    features: [''],
    isFeatured: false,
    isBestSeller: false
  });

  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchProduct();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const { data } = await API.get('/categories');
      setCategories(data);
      if (data.length > 0 && !formData.category) {
        setFormData(prev => ({ ...prev, category: data[0]._id }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);
      setFormData({
        name: data.name || '',
        description: data.description || '',
        shortDescription: data.shortDescription || '',
        price: data.price || '',
        discountPrice: data.discountPrice || '',
        category: data.category?._id || data.category || '',
        subCategory: data.subCategory || '',
        brand: data.brand || '',
        images: data.images && data.images.length > 0 ? data.images : [''],
        stock: data.stock || 0,
        sku: data.sku || '',
        specifications: data.specifications && data.specifications.length > 0 ? data.specifications : [{ key: '', value: '' }],
        features: data.features && data.features.length > 0 ? data.features : [''],
        isFeatured: data.isFeatured || false,
        isBestSeller: data.isBestSeller || false
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await API.put(`/products/${id}`, formData);
        toast.success('Product updated successfully!');
      } else {
        await API.post('/products', formData);
        toast.success('Product created successfully!');
      }
      navigate('/admin/products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Link to="/admin/products" className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-indigo-600">
        <ArrowLeft className="w-4 h-4" /> Back to Products List
      </Link>

      <div className="pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-extrabold text-gray-900">
          {isEdit ? 'Edit Product Details' : 'Add New Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6 text-xs">
        
        <div className="space-y-1">
          <label className="font-bold text-gray-700">Product Title / Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Aura SoundX Noise Canceling Headphones"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2.5 bg-gray-50 border rounded-xl"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-bold text-gray-700">Original Price (₹)</label>
            <input
              type="number"
              required
              placeholder="14999"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full p-2.5 bg-gray-50 border rounded-xl"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700">Discounted Special Price (₹)</label>
            <input
              type="number"
              placeholder="11999"
              value={formData.discountPrice}
              onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
              className="w-full p-2.5 bg-gray-50 border rounded-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="font-bold text-gray-700">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-2.5 bg-gray-50 border rounded-xl"
            >
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700">Brand Name</label>
            <input
              type="text"
              required
              placeholder="Aura Sound"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="w-full p-2.5 bg-gray-50 border rounded-xl"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700">Stock Count</label>
            <input
              type="number"
              required
              placeholder="25"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="w-full p-2.5 bg-gray-50 border rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-bold text-gray-700">Short Description</label>
          <input
            type="text"
            required
            placeholder="One-line summary for product cards..."
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            className="w-full p-2.5 bg-gray-50 border rounded-xl"
          />
        </div>

        <div className="space-y-1">
          <label className="font-bold text-gray-700">Full Description</label>
          <textarea
            rows={4}
            required
            placeholder="Detailed specifications, material, usage instructions..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-3 bg-gray-50 border rounded-xl"
          />
        </div>

        {/* Image URLs */}
        <div className="space-y-2">
          <label className="font-bold text-gray-700">Image URLs</label>
          {formData.images.map((img, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="text"
                required
                placeholder="https://images.unsplash.com/..."
                value={img}
                onChange={(e) => {
                  const updated = [...formData.images];
                  updated[idx] = e.target.value;
                  setFormData({ ...formData, images: updated });
                }}
                className="flex-1 p-2.5 bg-gray-50 border rounded-xl"
              />
              {formData.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, images: formData.images.filter((_, i) => i !== idx) })}
                  className="p-2 text-rose-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => setFormData({ ...formData, images: [...formData.images, ''] })}
            className="text-xs font-bold text-indigo-600 flex items-center gap-1 pt-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add another image URL
          </button>
        </div>

        {/* Checkboxes */}
        <div className="flex gap-6 pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="rounded text-indigo-600"
            />
            <span className="font-bold text-gray-700">Featured Item</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isBestSeller}
              onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
              className="rounded text-indigo-600"
            />
            <span className="font-bold text-gray-700">Best Seller Item</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}
        </button>

      </form>
    </div>
  );
}
