import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 text-center space-y-6">
      <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center shadow-inner">
        <Sparkles className="w-10 h-10" />
      </div>
      
      <div className="space-y-2">
        <span className="text-4xl font-extrabold text-indigo-600">404</span>
        <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">
          The page you are looking for doesn't exist or has been moved to a new destination.
        </p>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Link
          to="/"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2"
        >
          <Home className="w-4 h-4" /> Go to Homepage
        </Link>
        <Link
          to="/shop"
          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Browse Shop
        </Link>
      </div>
    </div>
  );
}
