import { useEffect, useRef } from 'react';

interface CircuitBackgroundProps {
  className?: string;
}

/**
 * CircuitBackground - Animated SVG circuit board pattern
 * Based on CodePen circuit animation, adapted for deep blue theme
 * with optimized colors for white/light blue text readability
 */
export default function CircuitBackground({ className = '' }: CircuitBackgroundProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const { floor, random } = Math;
    const svg = svgRef.current;
    const container = containerRef.current;

    // Deep blue color scheme optimized for text readability
    const settings = {
      size: 20, // Grid cell size
      wireMaxLen: 40, // Max wire length
      stroke: '#3b82f6', // Medium blue wire color (visible but not overpowering)
      bg: '#0a1628', // Deep blue background
      pathBg: '#1e3a8a', // Darker blue for path background
      pathBloomLength: 10, // Animation bloom length
      bloomSpeed: 50, // Animation speed (seconds)
      straightness: 2, // Line straightness (higher = straighter)
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

    // Helper functions
    const getRandomInt = (min: number, max: number) => {
      return floor(random() * (max - min + 1)) + min;
    };

    const createCircle = (x: number, y: number, r: number) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', `${x}`);
      circle.setAttribute('cy', `${y}`);
      circle.setAttribute('r', `${r}`);
      circle.setAttribute('fill', settings.stroke);
      circle.setAttribute('opacity', '0.6');
      return circle;
    };

    const createLine = (x1: number, y1: number, x2: number, y2: number) => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', `${x1}`);
      line.setAttribute('y1', `${y1}`);
      line.setAttribute('x2', `${x2}`);
      line.setAttribute('y2', `${y2}`);
      line.setAttribute('stroke', settings.stroke);
      line.setAttribute('stroke-width', '2');
      line.setAttribute('stroke-linecap', 'round');
      line.setAttribute('opacity', '0.4');
      return line;
    };

    const createPath = (d: string) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('stroke', settings.pathBg);
      path.setAttribute('stroke-width', '3');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('opacity', '0.3');
      return path;
    };

    const createAnimatedPath = (d: string, length: number) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('stroke', settings.stroke);
      path.setAttribute('stroke-width', '3');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-dasharray', `${settings.pathBloomLength} ${length}`);
      path.setAttribute('stroke-dashoffset', `${length}`);
      path.setAttribute('opacity', '0.8');
      
      const animation = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      animation.setAttribute('attributeName', 'stroke-dashoffset');
      animation.setAttribute('from', `${length}`);
      animation.setAttribute('to', '0');
      animation.setAttribute('dur', `${settings.bloomSpeed}s`);
      animation.setAttribute('repeatCount', 'indefinite');
      
      path.appendChild(animation);
      return path;
    };

    // Generate wires
    const wires: Array<Array<[number, number]>> = [];
    const wireCount = floor((cols * rows) / 15);

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
        
        // Add possible directions based on straightness
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

    // Draw wires
    wires.forEach((wire, wireIndex) => {
      let pathD = '';
      
      wire.forEach(([row, col], index) => {
        const x = col * settings.size + settings.size / 2;
        const y = row * settings.size + settings.size / 2;

        // Add connection points (circles)
        if (index === 0 || index === wire.length - 1 || random() < 0.3) {
          svg.appendChild(createCircle(x, y, 3));
        }

        // Build path
        if (index === 0) {
          pathD = `M ${x} ${y}`;
        } else {
          pathD += ` L ${x} ${y}`;
        }

        // Add lines between points
        if (index > 0) {
          const [prevRow, prevCol] = wire[index - 1];
          const prevX = prevCol * settings.size + settings.size / 2;
          const prevY = prevRow * settings.size + settings.size / 2;
          svg.appendChild(createLine(prevX, prevY, x, y));
        }
      });

      // Add background path
      if (pathD) {
        svg.appendChild(createPath(pathD));
        
        // Add animated path for some wires (every 3rd wire)
        if (wireIndex % 3 === 0) {
          const pathLength = wire.length * settings.size;
          svg.appendChild(createAnimatedPath(pathD, pathLength));
        }
      }
    });

    // Cleanup on unmount
    return () => {
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`} style={{ backgroundColor: '#0a1628' }}>
      {/* Dark overlay for enhanced text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* SVG Circuit Animation */}
      <svg
        ref={svgRef}
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      />
    </div>
  );
}
