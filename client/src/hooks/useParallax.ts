import { useEffect, useState } from "react";

interface UseParallaxOptions {
  speed?: number; // Parallax speed multiplier (0.1 = slow, 1 = normal)
  direction?: "up" | "down";
}

/**
 * Hook to create parallax scroll effect
 * Returns transform value to apply to element
 */
export function useParallax({ speed = 0.5, direction = "up" }: UseParallaxOptions = {}) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const multiplier = direction === "up" ? -1 : 1;
      setOffset(scrolled * speed * multiplier);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed, direction]);

  return {
    transform: `translateY(${offset}px)`,
    offset,
  };
}
