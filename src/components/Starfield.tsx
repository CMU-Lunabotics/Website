/**
 * Fixed cosmic background: Event Horizon base, deterministic starfield,
 * and faint plum nebula glows. Sits behind all page content.
 */

// Deterministic PRNG so the starfield is identical on server and client.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const VB_W = 1600;
const VB_H = 1000;

interface Star {
  x: number;
  y: number;
  r: number;
  color: string;
  maxOpacity: number;
  minOpacity: number;
  duration: number;
  delay: number;
  twinkles: boolean;
}

function generateStars(count: number, seed: number): Star[] {
  const rand = mulberry32(seed);
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    const roll = rand();
    // Mostly starlight, some moon dust, a few supernova sparks
    const color = roll > 0.94 ? '#F04455' : roll > 0.72 ? '#B9B5C7' : '#F5F1E8';
    stars.push({
      x: Math.round(rand() * VB_W * 10) / 10,
      y: Math.round(rand() * VB_H * 10) / 10,
      r: Math.round((0.5 + rand() * 1.1) * 10) / 10,
      color,
      maxOpacity: Math.round((0.35 + rand() * 0.55) * 100) / 100,
      minOpacity: Math.round((0.05 + rand() * 0.15) * 100) / 100,
      duration: Math.round((2.5 + rand() * 5) * 10) / 10,
      delay: Math.round(rand() * 6 * 10) / 10,
      twinkles: rand() > 0.5,
    });
  }
  return stars;
}

const STARS = generateStars(160, 20260518);

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
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
      >
        {STARS.map((star, i) =>
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
