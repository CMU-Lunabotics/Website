/**
 * Shared deterministic starfield geometry used by the page wallpaper
 * and by inverted sponsor-tile stars so both stay in the same places.
 */

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

export const STARFIELD_VB_W = 1600;
export const STARFIELD_VB_H = 1000;

export interface Star {
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
      x: Math.round(rand() * STARFIELD_VB_W * 10) / 10,
      y: Math.round(rand() * STARFIELD_VB_H * 10) / 10,
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

export const STARFIELD_STARS = generateStars(160, 20260518);

/** Dark inverse of the wallpaper star color (user swatch). */
export const INVERTED_STAR_COLOR = '#090A11';
