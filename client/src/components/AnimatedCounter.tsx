import { useCountUp } from "@/hooks/useCountUp";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  end,
  suffix = "",
  duration = 2000,
  className = "",
}: AnimatedCounterProps) {
  const counter = useCountUp({ end, suffix, duration });

  return (
    <span ref={counter.ref} className={className}>
      {counter.value}
    </span>
  );
}
