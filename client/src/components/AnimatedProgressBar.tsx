import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";

interface AnimatedProgressBarProps {
  value: number; // 0-100
  color?: string;
  height?: string;
  className?: string;
}

export function AnimatedProgressBar({
  value,
  color = "bg-primary",
  height = "h-2",
  className = "",
}: AnimatedProgressBarProps) {
  const { ref, isVisible } = useScrollAnimation(0.5);

  return (
    <div ref={ref} className={`w-full bg-muted rounded-full overflow-hidden ${height} ${className}`}>
      <motion.div
        className={`${height} ${color} rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: isVisible ? `${value}%` : 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
      />
    </div>
  );
}
