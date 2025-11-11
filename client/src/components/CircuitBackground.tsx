import { useEffect, useState } from "react";

interface Point {
  x: number;
  y: number;
}

interface Line {
  start: Point;
  end: Point;
}

interface Pulse {
  id: number;
  lineIndex: number;
  progress: number;
  speed: number;
}

export function CircuitBackground() {
  const [pulses, setPulses] = useState<Pulse[]>([]);

  // Define connection points for circuit board
  const points: Point[] = [
    // Top row
    { x: 10, y: 15 },
    { x: 25, y: 15 },
    { x: 40, y: 15 },
    { x: 55, y: 15 },
    { x: 70, y: 15 },
    { x: 85, y: 15 },
    
    // Middle-top row
    { x: 15, y: 35 },
    { x: 30, y: 35 },
    { x: 45, y: 35 },
    { x: 60, y: 35 },
    { x: 75, y: 35 },
    { x: 90, y: 35 },
    
    // Center row
    { x: 10, y: 50 },
    { x: 25, y: 50 },
    { x: 40, y: 50 },
    { x: 55, y: 50 },
    { x: 70, y: 50 },
    { x: 85, y: 50 },
    
    // Middle-bottom row
    { x: 15, y: 65 },
    { x: 30, y: 65 },
    { x: 45, y: 65 },
    { x: 60, y: 65 },
    { x: 75, y: 65 },
    { x: 90, y: 65 },
    
    // Bottom row
    { x: 10, y: 85 },
    { x: 25, y: 85 },
    { x: 40, y: 85 },
    { x: 55, y: 85 },
    { x: 70, y: 85 },
    { x: 85, y: 85 },
  ];

  // Define straight lines connecting points (geometric circuit traces)
  const lines: Line[] = [
    // Horizontal lines
    { start: points[0], end: points[1] },
    { start: points[1], end: points[2] },
    { start: points[2], end: points[3] },
    { start: points[3], end: points[4] },
    { start: points[4], end: points[5] },
    
    { start: points[6], end: points[7] },
    { start: points[7], end: points[8] },
    { start: points[8], end: points[9] },
    { start: points[9], end: points[10] },
    { start: points[10], end: points[11] },
    
    { start: points[12], end: points[13] },
    { start: points[13], end: points[14] },
    { start: points[14], end: points[15] },
    { start: points[15], end: points[16] },
    { start: points[16], end: points[17] },
    
    { start: points[18], end: points[19] },
    { start: points[19], end: points[20] },
    { start: points[20], end: points[21] },
    { start: points[21], end: points[22] },
    { start: points[22], end: points[23] },
    
    { start: points[24], end: points[25] },
    { start: points[25], end: points[26] },
    { start: points[26], end: points[27] },
    { start: points[27], end: points[28] },
    { start: points[28], end: points[29] },
    
    // Vertical lines
    { start: points[0], end: points[12] },
    { start: points[1], end: points[13] },
    { start: points[2], end: points[14] },
    { start: points[3], end: points[15] },
    { start: points[4], end: points[16] },
    { start: points[5], end: points[17] },
    
    // Diagonal connections
    { start: points[1], end: points[7] },
    { start: points[3], end: points[9] },
    { start: points[13], end: points[19] },
    { start: points[15], end: points[21] },
    { start: points[25], end: points[19] },
    { start: points[27], end: points[21] },
  ];

  useEffect(() => {
    // Initialize pulses on random lines
    const initialPulses: Pulse[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      lineIndex: Math.floor(Math.random() * lines.length),
      progress: Math.random(),
      speed: 0.003 + Math.random() * 0.005,
    }));
    setPulses(initialPulses);

    // Safari optimization: Frame rate limiting to 30 FPS for better performance
    const frameDelay = 1000 / 30; // Target 30 FPS
    let lastTime = performance.now();
    let animationId: number;

    const animate = () => {
      const now = performance.now();
      
      // Skip frame if not enough time has passed
      if (now - lastTime < frameDelay) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      lastTime = now;
      
      setPulses((prev) =>
        prev.map((pulse) => {
          const newProgress = pulse.progress + pulse.speed;
          // Reset pulse to new random line when it completes
          if (newProgress >= 1) {
            return {
              ...pulse,
              lineIndex: Math.floor(Math.random() * lines.length),
              progress: 0,
              speed: 0.003 + Math.random() * 0.005,
            };
          }
          return {
            ...pulse,
            progress: newProgress,
          };
        })
      );
      
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-40"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      style={{
        // Safari optimizations: Force GPU acceleration
        transform: 'translateZ(0)',
        willChange: 'transform',
        WebkitTransform: 'translateZ(0)',
      }}
    >
      <defs>
        {/* Safari optimization: Reduced blur for better performance */}
        <filter id="point-glow">
          <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Safari optimization: Reduced blur for pulse glow */}
        <filter id="pulse-glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradient for pulses (electrical effect) */}
        <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
          <stop offset="50%" stopColor="rgba(34, 211, 238, 1)" />
          <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
        </linearGradient>
      </defs>

      {/* Dark background to improve text readability */}
      <rect width="100" height="100" fill="rgba(0, 0, 0, 0.7)" />

      {/* Circuit lines - straight geometric traces */}
      <g opacity="0.3">
        {lines.map((line, i) => (
          <line
            key={`line-${i}`}
            x1={line.start.x}
            y1={line.start.y}
            x2={line.end.x}
            y2={line.end.y}
            stroke="rgba(34, 211, 238, 0.6)"
            strokeWidth="0.2"
            strokeLinecap="square"
          />
        ))}
      </g>

      {/* Connection points (nodes) */}
      <g filter="url(#point-glow)">
        {points.map((point, i) => (
          <circle
            key={`point-${i}`}
            cx={point.x}
            cy={point.y}
            r="0.5"
            fill="rgba(34, 211, 238, 0.8)"
          />
        ))}
      </g>

      {/* Animated electrical pulses traveling point-to-point */}
      {pulses.map((pulse) => {
        const line = lines[pulse.lineIndex];
        if (!line) return null;

        // Calculate current position along the line
        const x = line.start.x + (line.end.x - line.start.x) * pulse.progress;
        const y = line.start.y + (line.end.y - line.start.y) * pulse.progress;

        // Calculate angle for pulse orientation
        const angle = Math.atan2(line.end.y - line.start.y, line.end.x - line.start.x) * (180 / Math.PI);

        return (
          <g key={pulse.id} transform={`translate(${x}, ${y}) rotate(${angle})`}>
            {/* Pulse glow */}
            <ellipse
              cx="0"
              cy="0"
              rx="2"
              ry="0.8"
              fill="url(#pulseGradient)"
              filter="url(#pulse-glow)"
              opacity={Math.sin(pulse.progress * Math.PI)}
            />
            {/* Pulse core */}
            <ellipse
              cx="0"
              cy="0"
              rx="1"
              ry="0.4"
              fill="rgba(34, 211, 238, 1)"
              opacity={Math.sin(pulse.progress * Math.PI)}
            />
          </g>
        );
      })}
    </svg>
  );
}
