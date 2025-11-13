import { useEffect, useRef } from 'react';

interface CircuitBackgroundProps {
  className?: string;
}

/**
 * CircuitBackground - High-performance animated circuit board pattern
 * Optimized for Chrome, Firefox, and Safari with minimal DOM operations
 * Uses CSS animations and GPU acceleration for smooth performance
 */
export default function CircuitBackground({ className = '' }: CircuitBackgroundProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const { floor, random } = Math;
    const svg = svgRef.current;
    const container = containerRef.current;

    // Optimized settings for performance
    const settings = {
      size: 30, // Larger cells = fewer elements
      wireMaxLen: 25, // Shorter wires = less complexity
      stroke: '#3b82f6',
      bg: '#0a1628',
      pathBg: '#1e3a8a',
      straightness: 3, // More straight lines = simpler paths
    };

    const { width, height } = container.getBoundingClientRect();
    svg.setAttribute('width', `${width}`);
    svg.setAttribute('height', `${height}`);

    const cols = Math.ceil(width / settings.size);
    const rows = Math.ceil(height / settings.size);

    // Create grid
    const grid: number[][] = [];
    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < cols; j++) {
        grid[i][j] = 0;
      }
    }

    const getRandomInt = (min: number, max: number) => {
      return floor(random() * (max - min + 1)) + min;
    };

    // Generate wires - reduced count for performance
    const wires: Array<Array<[number, number]>> = [];
    const wireCount = floor((cols * rows) / 25); // Reduced density

    for (let i = 0; i < wireCount; i++) {
      const startRow = getRandomInt(0, rows - 1);
      const startCol = getRandomInt(0, cols - 1);
      
      if (grid[startRow][startCol] !== 0) continue;

      const wire: Array<[number, number]> = [[startRow, startCol]];
      grid[startRow][startCol] = 1;

      let currentRow = startRow;
      let currentCol = startCol;
      const wireLen = getRandomInt(5, settings.wireMaxLen);

      for (let j = 0; j < wireLen; j++) {
        const directions: Array<[number, number]> = [];
        
        for (let k = 0; k < settings.straightness; k++) {
          if (currentRow > 0 && grid[currentRow - 1][currentCol] === 0) {
            directions.push([-1, 0]);
          }
          if (currentRow < rows - 1 && grid[currentRow + 1][currentCol] === 0) {
            directions.push([1, 0]);
          }
          if (currentCol > 0 && grid[currentRow][currentCol - 1] === 0) {
            directions.push([0, -1]);
          }
          if (currentCol < cols - 1 && grid[currentRow][currentCol + 1] === 0) {
            directions.push([0, 1]);
          }
        }

        if (directions.length === 0) break;

        const [dRow, dCol] = directions[getRandomInt(0, directions.length - 1)];
        currentRow += dRow;
        currentCol += dCol;
        
        if (grid[currentRow][currentCol] !== 0) break;
        
        grid[currentRow][currentCol] = 1;
        wire.push([currentRow, currentCol]);
      }

      if (wire.length > 1) {
        wires.push(wire);
      }
    }

    // Batch DOM operations - create all paths at once
    const fragment = document.createDocumentFragment();
    const circleGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    circleGroup.setAttribute('opacity', '0.6');
    
    const staticPathGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    staticPathGroup.setAttribute('opacity', '0.4');
    staticPathGroup.setAttribute('stroke', settings.stroke);
    staticPathGroup.setAttribute('stroke-width', '2');
    staticPathGroup.setAttribute('fill', 'none');
    staticPathGroup.setAttribute('stroke-linecap', 'round');

    const bgPathGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    bgPathGroup.setAttribute('opacity', '0.25');
    bgPathGroup.setAttribute('stroke', settings.pathBg);
    bgPathGroup.setAttribute('stroke-width', '3');
    bgPathGroup.setAttribute('fill', 'none');
    bgPathGroup.setAttribute('stroke-linecap', 'round');

    const animatedPathGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    animatedPathGroup.setAttribute('class', 'animated-paths');

    // Draw wires efficiently
    wires.forEach((wire, wireIndex) => {
      let pathD = '';
      const circles: Array<[number, number]> = [];
      
      wire.forEach(([row, col], index) => {
        const x = col * settings.size + settings.size / 2;
        const y = row * settings.size + settings.size / 2;

        // Collect circle positions
        if (index === 0 || index === wire.length - 1 || random() < 0.2) {
          circles.push([x, y]);
        }

        // Build path
        if (index === 0) {
          pathD = `M ${x} ${y}`;
        } else {
          pathD += ` L ${x} ${y}`;
        }
      });

      // Add circles to group
      circles.forEach(([x, y]) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', `${x}`);
        circle.setAttribute('cy', `${y}`);
        circle.setAttribute('r', '2.5');
        circle.setAttribute('fill', settings.stroke);
        circleGroup.appendChild(circle);
      });

      // Add static path
      if (pathD) {
        const staticPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        staticPath.setAttribute('d', pathD);
        staticPathGroup.appendChild(staticPath);

        // Add background path
        const bgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        bgPath.setAttribute('d', pathD);
        bgPathGroup.appendChild(bgPath);

        // Add animated path for fewer wires (every 4th for performance)
        if (wireIndex % 4 === 0) {
          const pathLength = wire.length * settings.size;
          const animPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          animPath.setAttribute('d', pathD);
          animPath.setAttribute('stroke', settings.stroke);
          animPath.setAttribute('stroke-width', '3');
          animPath.setAttribute('fill', 'none');
          animPath.setAttribute('stroke-linecap', 'round');
          animPath.setAttribute('stroke-dasharray', `10 ${pathLength}`);
          animPath.setAttribute('opacity', '0.8');
          // Use CSS class for animation instead of SVG animate
          animPath.setAttribute('class', `flow-animation flow-${wireIndex % 3}`);
          animPath.style.strokeDashoffset = `${pathLength}`;
          animatedPathGroup.appendChild(animPath);
        }
      }
    });

    // Append all groups at once (single reflow)
    fragment.appendChild(bgPathGroup);
    fragment.appendChild(staticPathGroup);
    fragment.appendChild(circleGroup);
    fragment.appendChild(animatedPathGroup);
    svg.appendChild(fragment);

    // Cleanup
    return () => {
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden ${className}`} 
      style={{ backgroundColor: '#0a1628' }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* SVG Circuit Animation */}
      <svg
        ref={svgRef}
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{
          // GPU acceleration hints
          transform: 'translateZ(0)',
          willChange: 'transform',
          WebkitTransform: 'translateZ(0)',
        }}
      />

      {/* CSS Animations - More performant than SVG animate */}
      <style>{`
        .flow-animation {
          animation-duration: 40s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        
        .flow-0 {
          animation-name: flow-dash-0;
        }
        
        .flow-1 {
          animation-name: flow-dash-1;
          animation-delay: 13.3s;
        }
        
        .flow-2 {
          animation-name: flow-dash-2;
          animation-delay: 26.6s;
        }
        
        @keyframes flow-dash-0 {
          from {
            stroke-dashoffset: var(--path-length, 1000);
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes flow-dash-1 {
          from {
            stroke-dashoffset: var(--path-length, 1000);
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes flow-dash-2 {
          from {
            stroke-dashoffset: var(--path-length, 1000);
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
