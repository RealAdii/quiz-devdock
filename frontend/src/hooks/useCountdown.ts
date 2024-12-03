import { useState, useEffect } from 'react';

export function useCountdown(targetTimestamp: number) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Math.floor(Date.now() / 1000);
      return Math.max(0, targetTimestamp - now);
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTimestamp]);

  return timeLeft;
}