import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { Package, ChevronRight, Clock, CheckCircle2, XCircle, Truck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders/myorders');
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      await API.put(`/orders/${orderId}/cancel`);
      toast.success('Order cancelled successfully');
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel order');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex justify-center">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
          <Package className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-900">No Orders Yet</h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            You haven't placed any orders with us. Start exploring our shop catalogue today!
          </p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg transition"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-extrabold text-gray-900">My Orders</h1>
        <p className="text-xs text-gray-500 mt-1">Track and manage your recent purchase history</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-6 space-y-4">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
              <div>
                <p className="text-xs text-gray-400 font-mono">Order ID: <span className="text-gray-900 font-bold">{order._id}</span></p>
                <p className="text-[11px] text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  order.orderStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                  order.orderStatus === 'Cancelled' ? 'bg-rose-100 text-rose-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {order.orderStatus}
                </span>

                {['Pending', 'Confirmed'].includes(order.orderStatus) && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="px-3 py-1 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-lg transition"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>

            {/* Order Items preview */}
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt="" className="w-12 h-12 object-cover rounded-xl border bg-gray-50" />
                    <div>
                      <h4 className="font-bold text-gray-900">{item.name}</h4>
                      <p className="text-gray-500">Qty: {item.quantity} x ₹{item.price}</p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            {/* Order Footer */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="text-xs">
                <span className="text-gray-500">Total Amount: </span>
                <span className="font-extrabold text-indigo-600 text-sm">₹{order.totalAmount?.toLocaleString('en-IN')}</span>
              </div>

              <Link
                to={`/order/${order._id}`}
                className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold text-xs rounded-xl flex items-center gap-1 transition"
              >
                Track Order <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
