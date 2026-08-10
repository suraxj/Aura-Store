import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import toast from 'react-hot-toast';
import { Tag, Trash2, Plus } from 'lucide-react';

export default function ManageCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [minimumOrderValue, setMinimumOrderValue] = useState('1000');
  const [expiryDate, setExpiryDate] = useState('2030-12-31');

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const { data } = await API.get('/coupons');
      setCoupons(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await API.post('/coupons', {
        code,
        discountType,
        discountValue,
        minimumOrderValue,
        expiryDate
      });
      toast.success('Coupon created successfully!');
      setCode('');
      setDiscountValue('');
      fetchCoupons();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create coupon');
    }
  };

  const toggleStatus = async (id) => {
    try {
      await API.put(`/coupons/${id}/toggle`);
      toast.success('Coupon status updated');
      fetchCoupons();
    } catch (err) {
      toast.error('Failed to toggle coupon');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete coupon?')) return;
    try {
      await API.delete(`/coupons/${id}`);
      toast.success('Coupon deleted');
      fetchCoupons();
    } catch (err) {
      toast.error('Failed to delete coupon');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-extrabold text-gray-900">Manage Discount Coupons</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Form */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 text-xs">
          <h3 className="text-sm font-bold text-gray-900">Create New Promo Code</h3>
          <form onSubmit={handleCreate} className="space-y-3">
            <input
              type="text"
              required
              placeholder="Code (e.g. SUMMER30)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border rounded-xl uppercase font-bold"
            />
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border rounded-xl"
            >
              <option value="percentage">Percentage OFF (%)</option>
              <option value="fixed">Fixed Amount OFF (₹)</option>
            </select>
            <input
              type="number"
              required
              placeholder="Discount Value (e.g. 20 or 500)"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border rounded-xl"
            />
            <input
              type="number"
              placeholder="Min Order Value (₹)"
              value={minimumOrderValue}
              onChange={(e) => setMinimumOrderValue(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border rounded-xl"
            />
            <input
              type="date"
              required
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border rounded-xl"
            />
            <button type="submit" className="w-full py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow">
              Create Coupon
            </button>
          </form>
        </div>

        {/* Coupons List */}
        <div className="md:col-span-2 space-y-3">
          {coupons.map((c) => (
            <div key={c._id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-indigo-600 font-mono">{c.code}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${c.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                    {c.isActive ? 'Active' : 'Disabled'}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5">
                  {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`} on orders &gt; ₹{c.minimumOrderValue}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleStatus(c._id)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-xs font-bold rounded-lg"
                >
                  Toggle Active
                </button>
                <button onClick={() => handleDelete(c._id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
