import { useEffect, useState } from "react";

interface Pulse {
  id: number;
  pathId: string;
  progress: number;
  speed: number;
}

export function CircuitBackground() {
  const [pulses, setPulses] = useState<Pulse[]>([]);

  // Circuit paths - complex diagonal and curved patterns
  const paths = [
    // Diagonal paths
    "M 0 20 L 30 50 L 60 20 L 100 50",
    "M 0 80 L 40 50 L 70 80 L 100 60",
    "M 20 0 L 50 40 L 80 10 L 100 30",
    "M 80 0 L 50 30 L 30 60 L 0 40",
    
    // Horizontal with bends
    "M 0 30 L 25 30 L 35 40 L 65 40 L 75 30 L 100 30",
    "M 0 70 L 20 70 L 30 60 L 70 60 L 80 70 L 100 70",
    
    // Vertical with bends
    "M 40 0 L 40 25 L 50 35 L 50 65 L 40 75 L 40 100",
    "M 70 0 L 70 20 L 60 30 L 60 70 L 70 80 L 70 100",
    
    // Complex curves
    "M 0 50 Q 25 20, 50 50 T 100 50",
    "M 50 0 Q 20 25, 50 50 T 50 100",
  ];

  useEffect(() => {
    // Initialize pulses
    const initialPulses: Pulse[] = paths.flatMap((_, pathIndex) =>
      Array.from({ length: 2 }, (__, pulseIndex) => ({
        id: pathIndex * 2 + pulseIndex,
        pathId: `path-${pathIndex}`,
        progress: (pulseIndex * 50 + Math.random() * 20) % 100,
        speed: 0.15 + Math.random() * 0.25,
      }))
    );
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
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Glow filter for circuit traces */}
        <filter id="circuit-glow">
          <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Strong glow for pulses */}
        <filter id="pulse-glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradient for pulses */}
        <radialGradient id="pulseGradient">
          <stop offset="0%" stopColor="rgba(50, 184, 198, 1)" />
          <stop offset="50%" stopColor="rgba(50, 184, 198, 0.6)" />
          <stop offset="100%" stopColor="rgba(50, 184, 198, 0)" />
        </radialGradient>

        {/* Define paths for animation */}
        {paths.map((d, i) => (
          <path key={i} id={`path-${i}`} d={d} fill="none" />
        ))}
      </defs>

      {/* Background gradient */}
      <rect width="100" height="100" fill="url(#bg-gradient)" opacity="0.3" />
      <defs>
        <radialGradient id="bg-gradient">
          <stop offset="0%" stopColor="rgba(50, 184, 198, 0.1)" />
          <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
        </radialGradient>
      </defs>

      {/* Circuit traces - multiple layers for depth */}
      <g opacity="0.15">
        {paths.map((d, i) => (
          <path
            key={`trace-bg-${i}`}
            d={d}
            stroke="rgba(50, 184, 198, 0.3)"
            strokeWidth="0.3"
            fill="none"
          />
        ))}
      </g>

      <g opacity="0.25" filter="url(#circuit-glow)">
        {paths.map((d, i) => (
          <path
            key={`trace-${i}`}
            d={d}
            stroke="rgba(50, 184, 198, 0.6)"
            strokeWidth="0.15"
            fill="none"
          />
        ))}
      </g>

      {/* Connection nodes at path intersections */}
      <g filter="url(#circuit-glow)">
        {[
          [30, 50], [60, 20], [40, 50], [70, 80],
          [50, 40], [80, 10], [50, 30], [30, 60],
          [25, 30], [35, 40], [65, 40], [75, 30],
          [20, 70], [30, 60], [70, 60], [80, 70],
          [40, 25], [50, 35], [50, 65], [40, 75],
          [70, 20], [60, 30], [60, 70], [70, 80],
          [25, 20], [50, 50], [75, 80],
        ].map(([x, y], i) => (
          <g key={`node-${i}`}>
            {/* Outer glow */}
            <circle
              cx={x}
              cy={y}
              r="0.8"
              fill="rgba(50, 184, 198, 0.2)"
              opacity="0.6"
            >
              <animate
                attributeName="r"
                values="0.8;1.2;0.8"
                dur={`${3 + (i % 3)}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.6;0.3;0.6"
                dur={`${3 + (i % 3)}s`}
                repeatCount="indefinite"
              />
            </circle>
            {/* Core node */}
            <circle
              cx={x}
              cy={y}
              r="0.4"
              fill="rgba(50, 184, 198, 0.9)"
            />
          </g>
        ))}
      </g>

      {/* Animated pulses traveling along paths */}
      {pulses.map((pulse) => (
        <circle
          key={pulse.id}
          r="0.6"
          fill="url(#pulseGradient)"
          filter="url(#pulse-glow)"
        >
          <animateMotion
            dur="0s"
            repeatCount="1"
            fill="freeze"
          >
            <mpath href={`#${pulse.pathId}`} />
            <set attributeName="startOffset" to={`${pulse.progress}%`} />
          </animateMotion>
          {/* Position pulse along path using transform */}
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.9;1"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* Additional animated pulses using CSS */}
      <style>
        {`
          @keyframes pulse-travel {
            0% { offset-distance: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { offset-distance: 100%; opacity: 0; }
          }
        `}
      </style>
    </svg>
  );
}
