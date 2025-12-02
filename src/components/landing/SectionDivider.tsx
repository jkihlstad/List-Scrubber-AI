// ===========================================
// SECTION DIVIDER COMPONENT
// ===========================================

'use client';

interface SectionDividerProps {
  variant: 'wave' | 'gradient' | 'particles' | 'mesh';
  className?: string;
}

export function SectionDivider({ variant, className = '' }: SectionDividerProps) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {variant === 'wave' && <WaveVariant />}
      {variant === 'gradient' && <GradientVariant />}
      {variant === 'particles' && <ParticlesVariant />}
      {variant === 'mesh' && <MeshVariant />}
    </div>
  );
}

function WaveVariant() {
  return (
    <div className="relative h-24 w-full">
      {/* CSS for animations */}
      <style>
        {`
          @keyframes wave-slow {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(-25px); }
          }
          @keyframes wave-medium {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(25px); }
          }
          @keyframes wave-fast {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(-15px); }
          }
          .animate-wave-slow { animation: wave-slow 8s ease-in-out infinite; }
          .animate-wave-medium { animation: wave-medium 6s ease-in-out infinite; }
          .animate-wave-fast { animation: wave-fast 4s ease-in-out infinite; }
        `}
      </style>

      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Animated wave layers */}
        <path
          d="M0,60 C300,90 600,30 900,60 C1050,75 1150,60 1200,60 L1200,120 L0,120 Z"
          fill="url(#wave-gradient)"
          className="animate-wave-slow"
        />
        <path
          d="M0,70 C300,40 600,100 900,70 C1050,55 1150,70 1200,70 L1200,120 L0,120 Z"
          fill="url(#wave-gradient)"
          className="animate-wave-medium opacity-60"
        />
        <path
          d="M0,80 C300,110 600,50 900,80 C1050,65 1150,80 1200,80 L1200,120 L0,120 Z"
          fill="url(#wave-gradient)"
          className="animate-wave-fast opacity-40"
        />
      </svg>
    </div>
  );
}

function GradientVariant() {
  return (
    <div className="relative h-20 w-full flex items-center justify-center">
      {/* CSS for animations */}
      <style>
        {`
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.3; transform: scaleY(1); }
            50% { opacity: 0.6; transform: scaleY(1.5); }
          }
          @keyframes slide-light {
            0% { transform: translateX(-600px); }
            100% { transform: translateX(600px); }
          }
          .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
          .animate-slide-light { animation: slide-light 3s linear infinite; }
        `}
      </style>

      {/* Animated glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent animate-pulse-glow" />
      </div>

      {/* Main gradient line */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[1px] w-3/4 bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
      </div>

      {/* Moving light effect */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="h-[3px] w-32 bg-gradient-to-r from-transparent via-violet-400 to-transparent animate-slide-light blur-sm" />
      </div>

      {/* Accent dot */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
      </div>
    </div>
  );
}

function ParticlesVariant() {
  // Generate particles with deterministic values for SSR compatibility
  const particles = [
    { id: 0, left: '5%', delay: '0s', duration: '4s', size: '3px' },
    { id: 1, left: '15%', delay: '0.5s', duration: '5s', size: '4px' },
    { id: 2, left: '25%', delay: '1s', duration: '3.5s', size: '2px' },
    { id: 3, left: '35%', delay: '1.5s', duration: '4.5s', size: '5px' },
    { id: 4, left: '45%', delay: '2s', duration: '4s', size: '3px' },
    { id: 5, left: '55%', delay: '2.5s', duration: '5.5s', size: '4px' },
    { id: 6, left: '65%', delay: '3s', duration: '3s', size: '2px' },
    { id: 7, left: '75%', delay: '3.5s', duration: '4.5s', size: '5px' },
    { id: 8, left: '85%', delay: '4s', duration: '4s', size: '3px' },
    { id: 9, left: '95%', delay: '4.5s', duration: '5s', size: '4px' },
    { id: 10, left: '10%', delay: '0.2s', duration: '4.2s', size: '3px' },
    { id: 11, left: '20%', delay: '0.7s', duration: '5.2s', size: '4px' },
    { id: 12, left: '30%', delay: '1.2s', duration: '3.7s', size: '2px' },
    { id: 13, left: '40%', delay: '1.7s', duration: '4.7s', size: '5px' },
    { id: 14, left: '50%', delay: '2.2s', duration: '4.2s', size: '3px' },
    { id: 15, left: '60%', delay: '2.7s', duration: '5.7s', size: '4px' },
    { id: 16, left: '70%', delay: '3.2s', duration: '3.2s', size: '2px' },
    { id: 17, left: '80%', delay: '3.7s', duration: '4.7s', size: '5px' },
    { id: 18, left: '90%', delay: '4.2s', duration: '4.2s', size: '3px' },
    { id: 19, left: '98%', delay: '4.7s', duration: '5.2s', size: '4px' },
  ];

  return (
    <div className="relative h-24 w-full">
      {/* CSS for animations */}
      <style>
        {`
          @keyframes float-particle {
            0% {
              transform: translateY(0) translateX(0);
              opacity: 0;
            }
            10% { opacity: 0.6; }
            90% { opacity: 0.6; }
            100% {
              transform: translateY(96px) translateX(20px);
              opacity: 0;
            }
          }
          .animate-float-particle { animation: float-particle 5s ease-in-out infinite; }
        `}
      </style>

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute top-0 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 animate-float-particle"
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}

      {/* Connecting line effect */}
      <div className="absolute inset-0 opacity-20">
        <svg className="h-full w-full">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="url(#line-gradient)" strokeWidth="1" className="animate-pulse" />
        </svg>
      </div>
    </div>
  );
}

function MeshVariant() {
  return (
    <div className="relative h-28 w-full overflow-hidden">
      {/* CSS for animations */}
      <style>
        {`
          @keyframes mesh-fade {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.7; }
          }
          @keyframes scan-line {
            0% { transform: translateY(0); }
            100% { transform: translateY(112px); }
          }
          .animate-mesh-fade { animation: mesh-fade 4s ease-in-out infinite; }
          .animate-scan-line { animation: scan-line 3s linear infinite; }
        `}
      </style>

      {/* Grid pattern */}
      <div className="absolute inset-0">
        <svg className="h-full w-full opacity-20">
          <defs>
            <pattern
              id="mesh-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="url(#mesh-gradient)"
                strokeWidth="0.5"
              />
            </pattern>
            <linearGradient id="mesh-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh-pattern)" />
        </svg>
      </div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 animate-mesh-fade">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-violet-500/10 to-transparent" />
      </div>

      {/* Scanning line effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent animate-scan-line" />
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-violet-500/30 animate-pulse" />
      <div className="absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-violet-500/30 animate-pulse delay-500" />
      <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-indigo-500/30 animate-pulse delay-1000" />
      <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-indigo-500/30 animate-pulse delay-1000" />
    </div>
  );
}
