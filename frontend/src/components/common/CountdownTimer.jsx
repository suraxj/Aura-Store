import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

/**
 * Dynamic CountdownTimer component
 * @param {string|Date} targetDate - Specific target date/time (e.g., '2026-12-31T23:59:59')
 * @param {number} initialHours - Optional duration hours for rolling timer
 * @param {number} initialMinutes - Optional duration minutes for rolling timer
 * @param {number} initialSeconds - Optional duration seconds for rolling timer
 */
export default function CountdownTimer({ targetDate, initialHours, initialMinutes, initialSeconds }) {
  const getTargetTimestamp = () => {
    if (targetDate) {
      return new Date(targetDate).getTime();
    }

    if (initialHours !== undefined || initialMinutes !== undefined || initialSeconds !== undefined) {
      const storedTarget = localStorage.getItem('aura_flash_sale_target');
      const now = Date.now();

      if (storedTarget) {
        const parsed = parseInt(storedTarget, 10);
        if (!isNaN(parsed) && parsed > now) {
          return parsed;
        }
      }

      const durationMs = ((initialHours || 0) * 3600 + (initialMinutes || 0) * 60 + (initialSeconds || 0)) * 1000;
      const newTarget = now + (durationMs > 0 ? durationMs : 5 * 3600 * 1000);
      localStorage.setItem('aura_flash_sale_target', newTarget.toString());
      return newTarget;
    }

    // Default dynamic behavior: Count down to Midnight tonight
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(23, 59, 59, 999);
    return midnight.getTime();
  };

  const calculateSecondsLeft = () => {
    const target = getTargetTimestamp();
    const diff = target - Date.now();
    return Math.max(0, Math.floor(diff / 1000));
  };

  const [timeLeft, setTimeLeft] = useState(calculateSecondsLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateSecondsLeft();
      setTimeLeft(remaining);

      // Reset rolling timer if expired
      if (remaining <= 0 && !targetDate) {
        localStorage.removeItem('aura_flash_sale_target');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, initialHours, initialMinutes, initialSeconds]);

  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-xs font-bold text-rose-600 border border-rose-100 shadow-sm animate__animated animate__pulse animate__infinite">
      <Clock className="w-4 h-4 text-rose-500 animate-spin-slow" />
      <span>Ends in {hours}h : {minutes}m : {seconds}s</span>
    </div>
  );
}
