import { useEffect, useState } from "react";
import { useScrollAnimation } from "./useScrollAnimation";

interface UseCountUpOptions {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  externalTrigger?: boolean | null; // Use external trigger instead of scroll detection. null = use internal observer
}

/**
 * Hook to animate a number counting up when it enters the viewport
 */
export function useCountUp({
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  suffix = "",
  externalTrigger,
}: UseCountUpOptions) {
  const { ref, isVisible } = useScrollAnimation(0.3);
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  // Use external trigger if provided (not null/undefined), otherwise use internal scroll detection
  const shouldAnimate = (externalTrigger !== null && externalTrigger !== undefined) ? externalTrigger : isVisible;

  // Reset hasAnimated when using external trigger and it becomes false
  useEffect(() => {
    if ((externalTrigger !== null && externalTrigger !== undefined) && !externalTrigger && hasAnimated) {
      setHasAnimated(false);
      setCount(start);
    }
  }, [externalTrigger, hasAnimated, start]);

  useEffect(() => {
    if (!shouldAnimate || hasAnimated) return;

    setHasAnimated(true);
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation (ease-out quart)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = start + (end - start) * easeOutQuart;

      setCount(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [shouldAnimate, hasAnimated, start, end, duration]);

  const formattedCount = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toString();

  return {
    ref,
    value: `${formattedCount}${suffix}`,
    count: decimals > 0 ? parseFloat(count.toFixed(decimals)) : Math.floor(count),
    isVisible,
  };
}
