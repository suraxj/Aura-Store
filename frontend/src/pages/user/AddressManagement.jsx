import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MapPin, Plus, Trash2 } from 'lucide-react';

export default function AddressManagement() {
  const { user, addAddress, deleteAddress } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    houseNo: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    addressType: 'Home'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addAddress(formData);
    if (success) {
      setShowModal(false);
      setFormData({
        fullName: '',
        phone: '',
        houseNo: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
        addressType: 'Home'
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Address Book</h1>
          <p className="text-xs text-gray-500 mt-1">Manage saved shipping addresses for instant checkout</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Address
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {user?.addresses && user.addresses.map((addr) => (
          <div key={addr._id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-2 relative">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-gray-900">{addr.fullName}</h3>
              <span className="text-[10px] font-bold uppercase bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                {addr.addressType}
              </span>
            </div>
            <p className="text-xs text-gray-600">{addr.houseNo}, {addr.street}</p>
            <p className="text-xs text-gray-600">{addr.city}, {addr.state} - {addr.pincode}</p>
            <p className="text-xs text-gray-500 font-mono">Ph: {addr.phone}</p>

            <button
              onClick={() => deleteAddress(addr._id)}
              className="absolute bottom-4 right-4 text-gray-400 hover:text-rose-600 p-2"
              title="Delete Address"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-gray-900">Add New Address</h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <input
                type="text"
                required
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full p-2.5 bg-gray-50 border rounded-xl"
              />
              <input
                type="text"
                required
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 bg-gray-50 border rounded-xl"
              />
              <input
                type="text"
                required
                placeholder="House / Flat No."
                value={formData.houseNo}
                onChange={(e) => setFormData({ ...formData, houseNo: e.target.value })}
                className="w-full p-2.5 bg-gray-50 border rounded-xl"
              />
              <input
                type="text"
                required
                placeholder="Street / Area"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                className="w-full p-2.5 bg-gray-50 border rounded-xl"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border rounded-xl"
                />
                <input
                  type="text"
                  required
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border rounded-xl"
                />
              </div>
              <input
                type="text"
                required
                placeholder="Pincode"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                className="w-full p-2.5 bg-gray-50 border rounded-xl"
              />
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
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
