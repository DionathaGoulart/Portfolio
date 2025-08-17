import React from 'react'

export const GDLogo: React.FC = () => (
  <div className="flex items-center justify-center">
    <svg
      width="300"
      height="300"
      viewBox="0 0 300 300"
      className="drop-shadow-lg"
    >
      {/* Círculo de fundo com gradiente */}
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.2" />
        </filter>
      </defs>

      <circle
        cx="150"
        cy="150"
        r="140"
        fill="url(#bgGradient)"
        filter="url(#shadow)"
        className="animate-pulse"
      />

      {/* Letra G */}
      <path
        d="M 80 100
           L 80 200
           Q 80 220 100 220
           L 140 220
           Q 160 220 160 200
           L 160 160
           L 130 160
           L 130 190
           Q 130 200 120 200
           L 110 200
           Q 100 200 100 190
           L 100 110
           Q 100 100 110 100
           L 140 100
           Q 160 100 160 120
           L 140 120
           Q 120 120 120 100"
        fill="white"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Letra D */}
      <path
        d="M 180 100
           L 180 220
           L 200 220
           L 200 200
           L 210 200
           Q 230 200 230 180
           L 230 140
           Q 230 120 210 120
           L 200 120
           L 200 100
           Z

           M 200 140
           L 210 140
           Q 210 140 210 150
           L 210 170
           Q 210 180 210 180
           L 200 180
           Z"
        fill="white"
        stroke="white"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  </div>
)
