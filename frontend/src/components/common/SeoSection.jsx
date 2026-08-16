import React, { useState } from 'react';
import { ChevronDown, Sparkles, ShieldCheck, Truck, HelpCircle, Award, CheckCircle } from 'lucide-react';

export default function SeoSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: 'What makes Aura Store flagship products unique?',
      a: 'Aura Store products are engineered with premium materials including Grade-5 titanium, beryllium acoustic audio drivers, spatial sound cancellation, and custom urban fabrics. Every item undergoes a 25-point quality check before dispatch.'
    },
    {
      q: 'How fast is express delivery & order tracking?',
      a: 'We offer free priority 24-hour express shipping on all orders over ₹1000 across 500+ cities. You will receive an SMS and email notification with real-time GPS live tracking as soon as your order leaves our warehouse.'
    },
    {
      q: 'What is the 30-Day Money-Back Guarantee policy?',
      a: 'If you are not 100% satisfied with your purchase, you can return it within 30 days of delivery for a full refund or instant replacement with no questions asked.'
    },
    {
      q: 'Are payments secure on Aura Store?',
      a: 'Yes! All transactions are encrypted via bank-grade 256-bit SSL protocols. We support credit/debit cards, UPI, NetBanking, Apple Pay, Stripe, and Cash on Delivery (COD).'
    },
    {
      q: 'How do Aura VIP Cashback Rewards work?',
      a: 'As an Aura member, you earn 5% instant cashback points on every purchase which can be redeemed at checkout. VIP members also receive early access to seasonal product drops and exclusive discounts.'
    },
    {
      q: 'Does Aura Store provide international warranty?',
      a: 'All flagship electronics and smart gear come with a comprehensive 2-Year International Warranty covering manufacturing defects and hardware performance.'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 space-y-12">
      
      {/* 1. SEO Rich Keyword Content Hub */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-extrabold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Aura Store Official Shopping Hub</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
          India's Premier Destination for Luxury Audio, Smart Wearables & Urban Craft
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-slate-600 leading-relaxed">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Precision ANC Wireless Audio & Wearables
            </h3>
            <p>
              Welcome to <strong>Aura Store</strong>, where cutting-edge acoustic engineering meets sleek luxury design. Explore our flagship collection of active noise-canceling headphones, spatial 3D audio earbuds, titanium smartwatches, and sleep-tracking smart rings crafted for audiophiles and tech enthusiasts.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Tailored Apparel, Smart Home & Express Delivery
            </h3>
            <p>
              Upgrade your everyday aesthetic with our curated line of waterproof urban jackets, handcrafted genuine leather duffles, and smart RGB ambient lighting. Enjoy <strong>free express shipping</strong>, <strong>256-bit encrypted checkout</strong>, and <strong>24/7 dedicated support</strong> on every order.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Interactive FAQ Accordion */}
      <div className="space-y-6" itemScope itemType="https://schema.org/FAQPage">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-xs text-slate-500">Everything you need to know about shopping, shipping, and warranties</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-indigo-600 transition-colors"
                >
                  <span itemProp="name">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-600' : ''}`} />
                </button>

                {isOpen && (
                  <div
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                    className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-gray-50 bg-slate-50/50 animate__animated animate__fadeIn"
                  >
                    <p itemProp="text">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
