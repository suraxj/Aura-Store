import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  AlertTriangle,
  Clock,
  TrendingUp,
  LayoutDashboard,
  Plus,
  ArrowRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const { data } = await API.get('/admin/dashboard');
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex justify-center">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Format chart data
  const chartData = stats?.salesChart?.map(s => ({
    month: s._id,
    revenue: s.totalSales,
    orders: s.count
  })) || [
    { month: 'Mar', revenue: 45000, orders: 12 },
    { month: 'Apr', revenue: 78000, orders: 19 },
    { month: 'May', revenue: 62000, orders: 15 },
    { month: 'Jun', revenue: 110000, orders: 28 },
    { month: 'Jul', revenue: 145000, orders: 34 },
    { month: 'Aug', revenue: 192000, orders: 48 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-indigo-600" />
            Executive Admin Control Center
          </h1>
          <p className="text-xs text-gray-500 mt-1">Real-time performance analytics, revenue stats & inventory management</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products/new"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Product
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Revenue */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Revenue</span>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-gray-900">
            ₹{stats?.totalRevenue?.toLocaleString('en-IN') || 0}
          </p>
          <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4% from last month
          </span>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Orders</span>
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-gray-900">{stats?.totalOrders || 0}</p>
          <span className="text-[10px] text-gray-500">
            Pending: <span className="font-bold text-amber-600">{stats?.pendingOrders || 0}</span> | Delivered: <span className="font-bold text-emerald-600">{stats?.deliveredOrders || 0}</span>
          </span>
        </div>

        {/* Total Products */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Catalogue</span>
            <div className="p-2.5 bg-violet-50 text-violet-600 rounded-2xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-gray-900">{stats?.totalProducts || 0}</p>
          <span className="text-[10px] text-gray-500">Live products in store</span>
        </div>

        {/* Registered Users */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Customers</span>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-2xl">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-gray-900">{stats?.totalUsers || 0}</p>
          <span className="text-[10px] text-gray-500">Registered member accounts</span>
        </div>

      </div>

      {/* Analytics Chart */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="text-base font-extrabold text-gray-900">Revenue Growth & Sales Trends</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} />
              <Tooltip formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Low Stock Alerts & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Low Stock Alerts */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Low Stock Alerts (&lt; 5 items)
            </h3>
            <Link to="/admin/products" className="text-xs font-bold text-indigo-600">Manage All</Link>
          </div>

          <div className="space-y-3">
            {stats?.lowStockProducts && stats.lowStockProducts.length > 0 ? (
              stats.lowStockProducts.map((p) => (
                <div key={p._id} className="flex items-center justify-between p-3 bg-rose-50/50 rounded-2xl border border-rose-100 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt="" className="w-10 h-10 object-cover rounded-xl" />
                    <div>
                      <h4 className="font-bold text-gray-900">{p.name}</h4>
                      <p className="text-gray-500">₹{p.price}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-rose-600 bg-white px-3 py-1 rounded-full shadow-sm">
                    Stock: {p.stock}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 italic">All items are well stocked above threshold.</p>
            )}
          </div>
        </div>

        {/* Quick Admin Action Navigation */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-gray-900 border-b pb-3">Admin Quick Management Links</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/admin/products" className="p-4 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl text-xs font-bold transition flex items-center justify-between">
              Manage Products <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/admin/orders" className="p-4 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl text-xs font-bold transition flex items-center justify-between">
              Manage Orders <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/admin/users" className="p-4 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl text-xs font-bold transition flex items-center justify-between">
              Manage Users <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/admin/coupons" className="p-4 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl text-xs font-bold transition flex items-center justify-between">
              Manage Coupons <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
