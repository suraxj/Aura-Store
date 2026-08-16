import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

export default function PaymentSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6 animate__animated animate__backInDown">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate__animated animate__tada animate__infinite">
        <CheckCircle className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900">Order Confirmed!</h1>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          Thank you for shopping at Aura Store. Your order has been registered and is being processed for express delivery.
        </p>
      </div>

      {order && (
        <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm text-left max-w-md mx-auto space-y-3 text-xs">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500 font-semibold">Order ID:</span>
            <span className="font-mono font-bold text-gray-900">{order._id}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500 font-semibold">Payment Method:</span>
            <span className="font-bold text-gray-900">{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500 font-semibold">Total Paid:</span>
            <span className="font-bold text-indigo-600">₹{order.totalAmount?.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-semibold">Status:</span>
            <span className="font-bold text-emerald-600">{order.orderStatus}</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-4 pt-4">
        <Link
          to="/orders"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2"
        >
          <Package className="w-4 h-4" /> Track My Orders
        </Link>
        <Link
          to="/shop"
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl flex items-center gap-2"
        >
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
