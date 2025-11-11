/**
 * CircuitBackground - Optimized for Safari Performance
 * 
 * Uses pure CSS grid pattern with minimal animations instead of complex SVG.
 * This approach is significantly more performant across all browsers,
 * especially Safari which struggles with SVG filters and animations.
 */

export function CircuitBackground() {
  return (
    <div className="absolute inset-0 w-full h-full opacity-30">
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/70" />
      
      {/* CSS Grid Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          // Safari optimization: Force GPU acceleration
          transform: 'translateZ(0)',
          willChange: 'transform',
          WebkitTransform: 'translateZ(0)',
        }}
      />
      
      {/* Animated glow spots - CSS only */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glow 1 - Top Left */}
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse-slow"
          style={{
            top: '10%',
            left: '10%',
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)',
            animation: 'float-1 20s ease-in-out infinite',
          }}
        />
        
        {/* Glow 2 - Top Right */}
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse-slow"
          style={{
            top: '20%',
            right: '15%',
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.12) 0%, transparent 70%)',
            animation: 'float-2 25s ease-in-out infinite',
            animationDelay: '5s',
          }}
        />
        
        {/* Glow 3 - Bottom Center */}
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse-slow"
          style={{
            bottom: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, transparent 70%)',
            animation: 'float-3 30s ease-in-out infinite',
            animationDelay: '10s',
          }}
        />
      </div>
      
      {/* CSS Keyframe Animations */}
      <style>{`
        @keyframes float-1 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          33% {
            transform: translate(30px, -20px);
            opacity: 0.5;
          }
          66% {
            transform: translate(-20px, 30px);
            opacity: 0.4;
          }
        }
        
        @keyframes float-2 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.25;
          }
          33% {
            transform: translate(-25px, 25px);
            opacity: 0.45;
          }
          66% {
            transform: translate(25px, -15px);
            opacity: 0.35;
          }
        }
        
        @keyframes float-3 {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
            opacity: 0.2;
          }
          50% {
            transform: translateX(-50%) translateY(-30px);
            opacity: 0.4;
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
