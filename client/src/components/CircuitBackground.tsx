import { useEffect, useState } from "react";

interface Pulse {
  id: number;
  path: number;
  progress: number;
  speed: number;
}

export function CircuitBackground() {
  const [pulses, setPulses] = useState<Pulse[]>([]);

  useEffect(() => {
    // Initialize pulses
    const initialPulses: Pulse[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      path: Math.floor(Math.random() * 4),
      progress: Math.random() * 100,
      speed: 0.2 + Math.random() * 0.3,
    }));
    setPulses(initialPulses);

    // Animate pulses
    const interval = setInterval(() => {
      setPulses((prev) =>
        prev.map((pulse) => ({
          ...pulse,
          progress: (pulse.progress + pulse.speed) % 100,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Glow filter for pulses */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradient for pulses */}
        <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(50, 184, 198, 0)" />
          <stop offset="50%" stopColor="rgba(50, 184, 198, 1)" />
          <stop offset="100%" stopColor="rgba(50, 184, 198, 0)" />
        </linearGradient>
      </defs>

      {/* Circuit board pattern */}
      <g stroke="rgba(50, 184, 198, 0.3)" strokeWidth="1" fill="none">
        {/* Horizontal lines */}
        <line x1="0" y1="20%" x2="100%" y2="20%" />
        <line x1="0" y1="40%" x2="100%" y2="40%" />
        <line x1="0" y1="60%" x2="100%" y2="60%" />
        <line x1="0" y1="80%" x2="100%" y2="80%" />

        {/* Vertical lines */}
        <line x1="20%" y1="0" x2="20%" y2="100%" />
        <line x1="40%" y1="0" x2="40%" y2="100%" />
        <line x1="60%" y1="0" x2="60%" y2="100%" />
        <line x1="80%" y1="0" x2="80%" y2="100%" />

        {/* Connection nodes */}
        {[20, 40, 60, 80].map((x) =>
          [20, 40, 60, 80].map((y) => (
            <circle
              key={`${x}-${y}`}
              cx={`${x}%`}
              cy={`${y}%`}
              r="3"
              fill="rgba(50, 184, 198, 0.5)"
            />
          ))
        )}
      </g>

      {/* Animated pulses */}
      {pulses.map((pulse) => {
        const paths = [
          { x1: "0%", y1: "20%", x2: "100%", y2: "20%" },
          { x1: "0%", y1: "60%", x2: "100%", y2: "60%" },
          { x1: "40%", y1: "0%", x2: "40%", y2: "100%" },
          { x1: "80%", y1: "0%", x2: "80%", y2: "100%" },
        ];
        const path = paths[pulse.path];
        const isHorizontal = path.x1 !== path.x2;

        return (
          <line
            key={pulse.id}
            x1={isHorizontal ? `${pulse.progress}%` : path.x1}
            y1={isHorizontal ? path.y1 : `${pulse.progress}%`}
            x2={
              isHorizontal
                ? `${Math.min(pulse.progress + 5, 100)}%`
                : path.x2
            }
            y2={
              isHorizontal
                ? path.y2
                : `${Math.min(pulse.progress + 5, 100)}%`
            }
            stroke="url(#pulseGradient)"
            strokeWidth="2"
            filter="url(#glow)"
          />
        );
      })}
    </svg>
  );
}
