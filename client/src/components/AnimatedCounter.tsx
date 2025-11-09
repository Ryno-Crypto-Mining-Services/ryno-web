import { useCountUp } from "@/hooks/useCountUp";

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
  className = "",
  trigger,
}: AnimatedCounterProps) {
  const counter = useCountUp({ end, suffix, duration, externalTrigger: trigger });

  return (
    <span ref={counter.ref} className={className}>
      {counter.value}
    </span>
  );
}
