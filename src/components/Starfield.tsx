/**
 * Fixed cosmic background: Event Horizon base, deterministic starfield,
 * and faint plum nebula glows. Sits behind all page content.
 */

import {
  STARFIELD_STARS,
  STARFIELD_VB_H,
  STARFIELD_VB_W,
} from '@/components/starfield-data';

export function Starfield() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-void" aria-hidden="true">
      {/* Nebula glows */}
      <div
        className="absolute -top-[20%] -right-[10%] h-[70vh] w-[70vw] rounded-full opacity-60"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(51, 32, 79, 0.45) 0%, rgba(51, 32, 79, 0.12) 50%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-[45%] -left-[15%] h-[60vh] w-[55vw] rounded-full opacity-50"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(51, 32, 79, 0.35) 0%, rgba(21, 20, 38, 0.2) 55%, transparent 72%)',
        }}
      />
      <div
        className="absolute -bottom-[25%] right-[5%] h-[50vh] w-[50vw] rounded-full opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(196, 18, 48, 0.18) 0%, rgba(51, 32, 79, 0.12) 50%, transparent 72%)',
        }}
      />

      {/* Stars */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${STARFIELD_VB_W} ${STARFIELD_VB_H}`}
        preserveAspectRatio="xMidYMid slice"
      >
        {STARFIELD_STARS.map((star, i) =>
          star.twinkles ? (
            <circle
              key={i}
              cx={star.x}
              cy={star.y}
              r={star.r}
              fill={star.color}
              className="star-twinkle"
              style={
                {
                  '--star-max': star.maxOpacity,
                  '--star-min': star.minOpacity,
                  '--star-dur': `${star.duration}s`,
                  '--star-delay': `${star.delay}s`,
                } as React.CSSProperties
              }
            />
          ) : (
            <circle
              key={i}
              cx={star.x}
              cy={star.y}
              r={star.r}
              fill={star.color}
              opacity={star.maxOpacity}
            />
          )
        )}
      </svg>
    </div>
  );
}
