import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import toast from 'react-hot-toast';
import { Users, Shield, Ban, CheckCircle } from 'lucide-react';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get('/admin/users');
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      await API.put(`/admin/users/${userId}/role`, { role: newRole });
      toast.success(`User role updated to ${newRole}`);
      fetchUsers();
    } catch (err) {
      toast.error('Failed to update role');
    }
  };

  const toggleBlock = async (userId) => {
    try {
      const { data } = await API.put(`/admin/users/${userId}/block`);
      toast.success(data.message);
      fetchUsers();
    } catch (err) {
      toast.error('Failed to block/unblock user');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-extrabold text-gray-900">Manage Registered Users</h1>
        <p className="text-xs text-gray-500 mt-1">Role assignments & account access controls</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-wider border-b">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-bold text-gray-900 flex items-center gap-3">
                    <img src={u.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <span>{u.name}</span>
                  </td>
                  <td className="p-4 text-gray-600 font-mono">{u.email}</td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleRole(u._id, u.role)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition ${
                        u.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {u.role}
                    </button>
                  </td>
                  <td className="p-4">
                    {u.isBlocked ? (
                      <span className="text-rose-600 font-bold">Blocked</span>
                    ) : (
                      <span className="text-emerald-600 font-bold">Active</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleBlock(u._id)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                        u.isBlocked ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                      }`}
                    >
                      {u.isBlocked ? 'Unblock Account' : 'Block User'}
                    </button>
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
