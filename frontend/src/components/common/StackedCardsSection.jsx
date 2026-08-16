import React, { useEffect, useRef } from 'react';
import { Truck, ShieldCheck, Award, Headphones, CreditCard, Sparkles } from 'lucide-react';

export default function StackedCardsSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const cards = container.querySelectorAll('.stack-cards__item');
      if (!cards.length) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / totalScrollable);
      const numCards = cards.length;

      cards.forEach((card, index) => {
        const threshold = (index + 1) / (numCards + 0.2);
        if (progress >= threshold) {
          card.classList.add('slide-up');
        } else {
          card.classList.remove('slide-up');
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cardData = [
    {
      title: '24-Hour Express Shipping',
      desc: 'Get your orders delivered at lightning speed with priority 24-hour fulfillment and real-time GPS tracking across 500+ cities.',
      icon: <Truck className="w-6 h-6 text-emerald-400" />,
      num: '01',
      bgColor: '#0F3842'
    },
    {
      title: '30-Day Money-Back Guarantee',
      desc: 'Shop with total peace of mind. If you are not 100% satisfied with your purchase, return it within 30 days with no questions asked.',
      icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />,
      num: '02',
      bgColor: '#0B4550'
    },
    {
      title: 'Aura VIP Membership & Cashbacks',
      desc: 'Unlock 5% instant cashback on every order, free gift wrapping, and exclusive early-bird access to seasonal sales drops.',
      icon: <Award className="w-6 h-6 text-amber-400" />,
      num: '03',
      bgColor: '#0D4E5B'
    },
    {
      title: '24/7 Dedicated Concierge',
      desc: 'Our product experts are available 24/7 to assist with recommendations, sizing, order customization, and instant support.',
      icon: <Headphones className="w-6 h-6 text-violet-400" />,
      num: '04',
      bgColor: '#105664'
    },
    {
      title: 'Ultra-Secure 256-Bit Checkout',
      desc: 'Bank-grade encrypted payments via Cards, UPI, NetBanking, and Stripe with instant fraud protection on all transactions.',
      icon: <CreditCard className="w-6 h-6 text-rose-400" />,
      num: '05',
      bgColor: '#135E6D'
    }
  ];

  return (
    <div className="stack-cards-container my-16" ref={containerRef}>
      {/* Background Animated Light Rays */}
      <div className="s__rays">
        <div className="a-rays">
          <svg className="a__scene" width="300" height="800" viewBox="0 0 300 800">
            <path
              d="M50 0 L100 800 M150 0 L200 800 M250 0 L300 800"
              stroke="rgba(78, 206, 225, 0.15)"
            />
          </svg>
        </div>
      </div>

      {/* Sticky Stack Container */}
      <div className="stack-cards">
        <div className="text-center mb-8 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Aura Shopping Guarantee</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Why Over 50,000+ Buyers Trust Aura
          </h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto mt-2">
            Scroll down to unveil our core commitments to speed, security, and premium quality.
          </p>
        </div>

        {cardData.map((c, index) => (
          <div
            key={index}
            className="stack-cards__item"
            style={{
              zIndex: cardData.length - index,
              backgroundColor: c.bgColor
            }}
          >
            <div className="inner">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md">
                    {c.icon}
                  </div>
                  <h3>{c.title}</h3>
                </div>
                <p>{c.desc}</p>
              </div>

              <div className="counter font-mono">{c.num}</div>
            </div>
            <div className="shadow" />
          </div>
        ))}
      </div>
    </div>
  );
}
