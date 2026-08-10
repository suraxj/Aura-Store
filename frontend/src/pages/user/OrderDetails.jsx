import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../services/api';
import { Package, Truck, CheckCircle2, Clock, MapPin, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const { data } = await API.get(`/orders/${id}`);
      setOrder(data);
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

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold">Order Not Found</h2>
        <Link to="/orders" className="text-indigo-600 font-semibold underline mt-2 block">Back to Orders</Link>
      </div>
    );
  }

  const statuses = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
  const currentIdx = statuses.indexOf(order.orderStatus);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Link to="/orders" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-indigo-600">
        <ArrowLeft className="w-4 h-4" /> Back to My Orders
      </Link>

      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-gray-400 font-mono">Order Reference #{order._id}</span>
          <h1 className="text-2xl font-extrabold text-gray-900">Order Tracking Status</h1>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Payment Status: <span className="font-bold text-emerald-600">{order.paymentStatus}</span></p>
          <p className="text-sm font-extrabold text-indigo-600">Total: ₹{order.totalAmount?.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Interactive Status Timeline */}
      {order.orderStatus !== 'Cancelled' ? (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Live Delivery Timeline</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-4">
            {statuses.map((st, idx) => {
              const isCompleted = currentIdx >= idx;
              return (
                <div key={st} className="flex flex-col items-center text-center space-y-2 relative">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs shadow-sm transition ${
                    isCompleted ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                  </div>
                  <span className={`text-xs font-bold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                    {st}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-6 bg-rose-50 border border-rose-100 rounded-3xl text-rose-700 text-xs font-bold">
          This order was cancelled on {order.cancelledAt ? new Date(order.cancelledAt).toLocaleDateString() : 'recently'}.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Shipping Address */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-600" /> Shipping Destination Address
          </h3>
          <div className="text-xs text-gray-600 space-y-1">
            <p className="font-bold text-gray-900">{order.shippingAddress?.fullName}</p>
            <p>{order.shippingAddress?.houseNo}, {order.shippingAddress?.street}</p>
            <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
            <p className="font-mono pt-1">Phone: {order.shippingAddress?.phone}</p>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
          <h3 className="text-sm font-extrabold text-gray-900">Payment Breakdown</h3>
          <div className="text-xs space-y-2 text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-bold text-gray-900">₹{order.subtotal?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <span className="font-bold text-emerald-600">- ₹{order.discount?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping & Tax:</span>
              <span className="font-bold text-gray-900">₹{(order.shippingFee + order.tax)?.toLocaleString('en-IN')}</span>
            </div>
            <div className="pt-2 border-t flex justify-between font-extrabold text-sm text-gray-900">
              <span>Paid Total:</span>
              <span className="text-indigo-600">₹{order.totalAmount?.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
