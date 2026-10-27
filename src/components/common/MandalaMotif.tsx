import React from 'react';

export const MandalaMotif: React.FC<{ className?: string; color?: string; size?: number }> = ({
  className = '',
  color = '#D97706',
  size = 64
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`opacity-80 select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="50" cy="50" r="38" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <circle cx="50" cy="50" r="14" stroke={color} strokeWidth="1.2" />
      <circle cx="50" cy="50" r="4" fill={color} />

      {/* 8-fold radial petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 50 50)`}>
          <path
            d="M50 14 C46 26, 44 32, 50 36 C56 32, 54 26, 50 14 Z"
            fill="none"
            stroke={color}
            strokeWidth="1"
            opacity="0.85"
          />
          <circle cx="50" cy="18" r="1.5" fill={color} />
          <path
            d="M50 4 C48 8, 47 11, 50 13 C53 11, 52 8, 50 4 Z"
            fill={color}
            opacity="0.4"
          />
        </g>
      ))}
    </svg>
  );
};

export const OrnamentalDivider: React.FC<{ color?: string; className?: string }> = ({
  color = '#D97706',
  className = ''
}) => {
  return (
    <div className={`flex items-center justify-center gap-3 py-2 ${className}`}>
      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-600/50" />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
        <path
          d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
          fill={color}
          opacity="0.75"
        />
        <circle cx="12" cy="12" r="2" fill="#FFFDF9" />
      </svg>
      <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-600/50" />
    </div>
  );
};

export const GaneshIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 48,
  color = '#B45309',
  className = ''
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Auspicious Symbol"
    >
      {/* Traditional Auspicious Tilak and Trishul/Modak Motif */}
      <path
        d="M32 6C34.5 10 37 14 37 18C37 21 34.8 23 32 23C29.2 23 27 21 27 18C27 14 29.5 10 32 6Z"
        fill={color}
        opacity="0.9"
      />
      <circle cx="32" cy="14" r="2" fill="#FEF3C7" />
      <path
        d="M24 22C20 25 18 30 18 36C18 44 24 50 32 50C40 50 46 44 46 36C46 30 44 25 40 22"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M32 24V40C32 44 34 46 37 46C40 46 41 43 41 40"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="28" cy="28" r="1.5" fill={color} />
      <circle cx="36" cy="28" r="1.5" fill={color} />
      <path
        d="M26 34C28 35.5 30 36 32 36C34 36 36 35.5 38 34"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
