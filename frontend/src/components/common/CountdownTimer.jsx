import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function CountdownTimer({ initialHours = 5, initialMinutes = 22, initialSeconds = 40 }) {
  const getInitialTime = () => {
    const totalSeconds = initialHours * 3600 + initialMinutes * 60 + initialSeconds;
    const storedTarget = localStorage.getItem('aura_flash_sale_target');
    const now = Date.now();

    if (storedTarget) {
      const targetTime = parseInt(storedTarget, 10);
      if (targetTime > now) {
        return Math.floor((targetTime - now) / 1000);
      }
    }

    // Set new target end time
    const newTarget = now + totalSeconds * 1000;
    localStorage.setItem('aura_flash_sale_target', newTarget.toString());
    return totalSeconds;
  };

  const [timeLeft, setTimeLeft] = useState(getInitialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      const storedTarget = localStorage.getItem('aura_flash_sale_target');
      const now = Date.now();
      
      if (storedTarget) {
        const targetTime = parseInt(storedTarget, 10);
        const diff = Math.floor((targetTime - now) / 1000);
        
        if (diff > 0) {
          setTimeLeft(diff);
        } else {
          // Reset timer cycle when expired
          const newTarget = now + (initialHours * 3600 + initialMinutes * 60 + initialSeconds) * 1000;
          localStorage.setItem('aura_flash_sale_target', newTarget.toString());
          setTimeLeft(initialHours * 3600 + initialMinutes * 60 + initialSeconds);
        }
      } else {
        const newTarget = now + (initialHours * 3600 + initialMinutes * 60 + initialSeconds) * 1000;
        localStorage.setItem('aura_flash_sale_target', newTarget.toString());
        setTimeLeft(initialHours * 3600 + initialMinutes * 60 + initialSeconds);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [initialHours, initialMinutes, initialSeconds]);

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
