import { useCountUp } from "@/hooks/useCountUp";
import { useAnimationTrigger } from "@/components/AnimatedCard";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
  trigger?: boolean; // External trigger for animation
}

export function AnimatedCounter({
  end,
  suffix = "",
  duration = 2000,
  className,
  trigger,
}: AnimatedCounterProps) {
  const contextTrigger = useAnimationTrigger();
  const finalTrigger = trigger !== undefined ? trigger : (contextTrigger || undefined);
  const counter = useCountUp({ end, suffix, duration, externalTrigger: finalTrigger });

  return (
    <span ref={counter.ref} className={`inline-block ${className}`}>
      {counter.value}
    </span>
  );
}
