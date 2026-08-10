import React from 'react';
import { Sparkles, ShieldCheck, Award, Users, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Vision & Craft</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Redefining Modern E-Commerce With <span className="text-indigo-600">Aura.</span>
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Founded with a passion for sleek minimalist technology and premium luxury aesthetics, Aura Store brings together top-tier wireless audio, smart wearables, and curated urban fashion under one seamless digital experience.
        </p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center space-y-2">
          <h3 className="text-3xl font-extrabold text-indigo-600">50K+</h3>
          <p className="text-xs font-semibold text-gray-700">Happy Worldwide Customers</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center space-y-2">
          <h3 className="text-3xl font-extrabold text-indigo-600">99.8%</h3>
          <p className="text-xs font-semibold text-gray-700">On-Time Express Deliveries</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center space-y-2">
          <h3 className="text-3xl font-extrabold text-indigo-600">4.9 / 5</h3>
          <p className="text-xs font-semibold text-gray-700">Average Customer Satisfaction</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center space-y-2">
          <h3 className="text-3xl font-extrabold text-indigo-600">24/7</h3>
          <p className="text-xs font-semibold text-gray-700">Real-Time Dedicated Support</p>
        </div>
      </div>

    </div>
  );
}
