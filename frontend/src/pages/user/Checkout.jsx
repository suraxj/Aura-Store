import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';
import toast from 'react-hot-toast';
import {
  MapPin,
  CreditCard,
  CheckCircle,
  Truck,
  Plus,
  ArrowRight,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';

export default function Checkout() {
  const { cart, coupon, subtotal, discountAmount, shippingFee, tax, grandTotal, clearCart } = useCart();
  const { user, addAddress } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [loading, setLoading] = useState(false);

  // New Address modal state
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: user?.name || '',
    phone: '',
    houseNo: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    addressType: 'Home'
  });

  const handleAddAddressSubmit = async (e) => {
    e.preventDefault();
    const success = await addAddress(newAddr);
    if (success) {
      setShowAddressModal(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!user.addresses || user.addresses.length === 0) {
      toast.error('Please select or add a shipping address');
      setStep(1);
      return;
    }

    const shippingAddress = user.addresses[selectedAddressIndex] || user.addresses[0];

    setLoading(true);
    try {
      let transactionId = '';

      // If Stripe payment selected, handle payment intent API
      if (paymentMethod === 'Stripe Online Payment') {
        const { data: intentData } = await API.post('/payment/create-intent', {
          amount: grandTotal
        });
        transactionId = intentData.transactionId;
      }

      const orderItems = cart.items.map((item) => ({
        product: item.product?._id || item.product,
        quantity: item.quantity,
        name: item.product?.name || item.name,
        price: item.price,
      }));

      const orderPayload = {
        items: orderItems,
        shippingAddress,
        paymentMethod,
        couponCode: coupon ? coupon.code : '',
        transactionId
      };

      const { data: createdOrder } = await API.post('/orders', orderPayload);
      await clearCart();
      toast.success('Order placed successfully!');
      navigate('/payment-success', { state: { order: createdOrder } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold">Your cart is empty</h2>
        <Link to="/shop" className="text-indigo-600 font-semibold underline">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Step Tracker Indicator Header */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
            1
          </div>
          <span className={`text-xs font-bold ${step >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>Address</span>
        </div>
        <div className="h-0.5 flex-1 mx-4 bg-gray-200"></div>

        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
            2
          </div>
          <span className={`text-xs font-bold ${step >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>Summary</span>
        </div>
        <div className="h-0.5 flex-1 mx-4 bg-gray-200"></div>

        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
            3
          </div>
          <span className={`text-xs font-bold ${step >= 3 ? 'text-gray-900' : 'text-gray-400'}`}>Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Step Content Left */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* STEP 1: SELECT ADDRESS */}
          {step === 1 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  Select Delivery Shipping Address
                </h2>
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="px-3.5 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" /> Add New Address
                </button>
              </div>

              {user.addresses && user.addresses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses.map((addr, idx) => (
                    <div
                      key={addr._id || idx}
                      onClick={() => setSelectedAddressIndex(idx)}
                      className={`p-5 rounded-2xl border cursor-pointer transition ${
                        selectedAddressIndex === idx
                          ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-gray-900">{addr.fullName}</span>
                        <span className="text-[10px] font-bold uppercase bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                          {addr.addressType}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{addr.houseNo}, {addr.street}</p>
                      <p className="text-xs text-gray-600">{addr.city}, {addr.state} - {addr.pincode}</p>
                      <p className="text-xs text-gray-500 font-mono mt-2">Ph: {addr.phone}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 bg-gray-50 rounded-2xl text-center space-y-3">
                  <p className="text-xs text-gray-500">No saved addresses found in your account.</p>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                  >
                    Add Shipping Address
                  </button>
                </div>
              )}

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!user.addresses || user.addresses.length === 0}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
                >
                  Continue to Summary <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ORDER SUMMARY */}
          {step === 2 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-indigo-600" />
                Review Order Items & Shipping Destination
              </h2>

              <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-xs space-y-1">
                <p className="font-bold text-indigo-950">Delivering to:</p>
                <p className="text-gray-700">
                  {user.addresses[selectedAddressIndex]?.fullName} ({user.addresses[selectedAddressIndex]?.phone})
                </p>
                <p className="text-gray-600">
                  {user.addresses[selectedAddressIndex]?.houseNo}, {user.addresses[selectedAddressIndex]?.street},{' '}
                  {user.addresses[selectedAddressIndex]?.city}, {user.addresses[selectedAddressIndex]?.state} - {user.addresses[selectedAddressIndex]?.pincode}
                </p>
              </div>

              <div className="space-y-3 divide-y divide-gray-100">
                {cart.items.map((item) => (
                  <div key={item._id} className="pt-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.product?.images[0]} alt="" className="w-12 h-12 object-cover rounded-xl border" />
                      <div>
                        <h4 className="font-bold text-gray-900">{item.product?.name}</h4>
                        <p className="text-gray-500">Qty: {item.quantity} x ₹{item.price}</p>
                      </div>
                    </div>
                    <span className="font-extrabold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <button onClick={() => setStep(1)} className="text-xs font-bold text-gray-500 hover:text-gray-800">
                  Back to Address
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
                >
                  Proceed to Payment <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD CHOICE */}
          {step === 3 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-600" />
                Select Preferred Payment Gateway
              </h2>

              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${paymentMethod === 'Cash on Delivery' ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20' : 'border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Cash on Delivery'}
                      onChange={() => setPaymentMethod('Cash on Delivery')}
                      className="text-indigo-600"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Cash on Delivery (COD)</h4>
                      <p className="text-[11px] text-gray-500">Pay cash upon parcel arrival at doorstep</p>
                    </div>
                  </div>
                  <Truck className="w-5 h-5 text-indigo-600" />
                </label>

                <label className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${paymentMethod === 'Stripe Online Payment' ? 'border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/20' : 'border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Stripe Online Payment'}
                      onChange={() => setPaymentMethod('Stripe Online Payment')}
                      className="text-indigo-600"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Stripe Online Payment (Credit / Debit / NetBanking)</h4>
                      <p className="text-[11px] text-gray-500">Encrypted instant online settlement</p>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-indigo-600" />
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <button onClick={() => setStep(2)} className="text-xs font-bold text-gray-500 hover:text-gray-800">
                  Back to Summary
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
                >
                  {loading ? 'Processing Order...' : `Confirm & Pay ₹${grandTotal.toLocaleString('en-IN')}`}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Price Breakdown Sidebar Right */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 h-fit">
          <h3 className="text-sm font-extrabold text-gray-900 border-b border-gray-100 pb-3">Final Payment Breakdown</h3>
          
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span className="font-bold text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Coupon ({coupon?.code})</span>
                <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="font-bold text-gray-900">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
            </div>

            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span className="font-bold text-gray-900">₹{tax.toLocaleString('en-IN')}</span>
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline text-sm font-extrabold text-slate-900">
              <span>Total Payable</span>
              <span className="text-xl text-indigo-600">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Add Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-gray-900">Add New Shipping Address</h3>
            <form onSubmit={handleAddAddressSubmit} className="space-y-3 text-xs">
              <input
                type="text"
                required
                placeholder="Full Recipient Name"
                value={newAddr.fullName}
                onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                className="w-full p-2.5 bg-gray-50 border rounded-xl"
              />
              <input
                type="text"
                required
                placeholder="Mobile Phone Number"
                value={newAddr.phone}
                onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                className="w-full p-2.5 bg-gray-50 border rounded-xl"
              />
              <input
                type="text"
                required
                placeholder="House / Flat / Building No."
                value={newAddr.houseNo}
                onChange={(e) => setNewAddr({ ...newAddr, houseNo: e.target.value })}
                className="w-full p-2.5 bg-gray-50 border rounded-xl"
              />
              <input
                type="text"
                required
                placeholder="Street / Area / Landmark"
                value={newAddr.street}
                onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                className="w-full p-2.5 bg-gray-50 border rounded-xl"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="City"
                  value={newAddr.city}
                  onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border rounded-xl"
                />
                <input
                  type="text"
                  required
                  placeholder="State"
                  value={newAddr.state}
                  onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border rounded-xl"
                />
              </div>
              <input
                type="text"
                required
                placeholder="Pincode"
                value={newAddr.pincode}
                onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                className="w-full p-2.5 bg-gray-50 border rounded-xl"
              />
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
