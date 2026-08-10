import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import toast from 'react-hot-toast';
import { Package, ChevronRight, CheckCircle } from 'lucide-react';

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders/admin/all');
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await API.put(`/orders/admin/${orderId}/status`, { status: newStatus });
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders();
    } catch (err) {
      toast.error('Failed to update order status');
    }
  };

  const statuses = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-extrabold text-gray-900">Manage Customer Orders</h1>
        <p className="text-xs text-gray-500 mt-1">Review live orders and update fulfillment status</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-wider border-b">
              <tr>
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Total Paid</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Fulfillment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((o) => (
                <tr key={o._id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-mono font-bold text-gray-900">
                    <p>#{o._id.slice(-6)}</p>
                    <p className="text-[10px] text-gray-400 font-sans">{new Date(o.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="p-4 font-medium text-gray-800">
                    <p>{o.user?.name || o.shippingAddress?.fullName}</p>
                    <p className="text-[10px] text-gray-400">{o.user?.email}</p>
                  </td>
                  <td className="p-4 font-extrabold text-indigo-600">
                    ₹{o.totalAmount?.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-gray-600">{o.paymentMethod}</td>
                  <td className="p-4">
                    <select
                      value={o.orderStatus}
                      onChange={(e) => handleStatusChange(o._id, e.target.value)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold border cursor-pointer ${
                        o.orderStatus === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        o.orderStatus === 'Cancelled' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {statuses.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
