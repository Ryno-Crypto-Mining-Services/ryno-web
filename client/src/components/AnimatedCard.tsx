import { ReactNode, createContext, useContext } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/**
 * Context to share animation visibility state with child components
 */
const AnimationContext = createContext<boolean>(false);

export function useAnimationTrigger() {
  return useContext(AnimationContext);
}

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wrapper component that provides animation trigger to all children
 * Use with AnimatedCounter that reads from useAnimationTrigger()
 */
export function AnimatedCard({ children, className }: AnimatedCardProps) {
  const { ref, isVisible } = useScrollAnimation(0.3);

  return (
    <AnimationContext.Provider value={isVisible}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </AnimationContext.Provider>
  );
}
