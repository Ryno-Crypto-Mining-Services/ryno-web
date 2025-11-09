import { useEffect, useRef, useState } from "react";

interface AnimatedStatProps {
  value: string;
  className?: string;
}

export function AnimatedStat({ value, className = "" }: AnimatedStatProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateValue();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateValue = () => {
    // Extract number from value string
    const match = value.match(/(\d+)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseInt(match[1]);
    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const increment = targetNumber / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNumber) {
        current = targetNumber;
        clearInterval(timer);
      }
      // Replace the number in the original string
      setDisplayValue(value.replace(/\d+/, Math.round(current).toString()));
    }, stepDuration);
  };

  return (
    <div ref={elementRef} className={className}>
      {displayValue}
    </div>
  );
}
