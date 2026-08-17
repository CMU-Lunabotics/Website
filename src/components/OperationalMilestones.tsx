'use client';

import { useEffect, useMemo, useState } from 'react';

export interface MilestoneItem {
  label: string;
  /** ISO date, e.g. "2026-10-30" — edit in content/site.json */
  date: string;
  /** Optional venue shown under the label */
  location?: string;
}

interface OperationalMilestonesProps {
  title: string;
  subtitle: string;
  milestones: MilestoneItem[];
}

// SVG viewBox dimensions
const VB_W = 1328;
const VB_H = 552;
const GRID_COLS = 12;
const GRID_ROWS = 6;

// Shape of the rising timeline curve; milestone dots are distributed
// along it by arc length, so any number of milestones works.
const CURVE_VERTICES: Array<[number, number]> = [
  [100, 501],
  [206, 417],
  [420, 367],
  [526, 278],
  [740, 234],
  [946, 182],
  [1060, 102],
  [1273, 100],
];

// Cumulative arc lengths for interpolation
const SEGMENT_LENGTHS = CURVE_VERTICES.slice(1).map(([x, y], i) => {
  const [px, py] = CURVE_VERTICES[i];
  return Math.hypot(x - px, y - py);
});
const TOTAL_LENGTH = SEGMENT_LENGTHS.reduce((a, b) => a + b, 0);

/** Point at parameter t ∈ [0,1] along the curve (by arc length). */
function pointAt(t: number): { x: number; y: number } {
  const target = Math.min(Math.max(t, 0), 1) * TOTAL_LENGTH;
  let walked = 0;
  for (let i = 0; i < SEGMENT_LENGTHS.length; i++) {
    if (walked + SEGMENT_LENGTHS[i] >= target) {
      const f = (target - walked) / SEGMENT_LENGTHS[i];
      const [x1, y1] = CURVE_VERTICES[i];
      const [x2, y2] = CURVE_VERTICES[i + 1];
      return { x: x1 + (x2 - x1) * f, y: y1 + (y2 - y1) * f };
    }
    walked += SEGMENT_LENGTHS[i];
  }
  const [x, y] = CURVE_VERTICES[CURVE_VERTICES.length - 1];
  return { x, y };
}

/** Path string along the curve from t=a to t=b, following the vertices. */
function pathBetween(a: number, b: number): string {
  const start = pointAt(a);
  const end = pointAt(b);
  const pts: Array<{ x: number; y: number }> = [start];
  let walked = 0;
  for (let i = 1; i < CURVE_VERTICES.length - 1; i++) {
    walked += SEGMENT_LENGTHS[i - 1];
    const t = walked / TOTAL_LENGTH;
    if (t > a && t < b) pts.push({ x: CURVE_VERTICES[i][0], y: CURVE_VERTICES[i][1] });
  }
  pts.push(end);
  return `M ${pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L ')}`;
}

// Parse "YYYY-M-D" leniently — unpadded months/days (e.g. "2026-11-7") would
// otherwise produce Invalid Date and silently break the timeline strokes.
function parseDate(iso: string): number {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, (m || 1) - 1, d || 1).getTime();
}

function formatDate(iso: string): string {
  return new Date(parseDate(iso)).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

export function OperationalMilestones({ title, subtitle, milestones }: OperationalMilestonesProps) {
  const [selected, setSelected] = useState<number | null>(null);
  // Resolved on the client after mount so server and client HTML match.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);

  const colW = VB_W / GRID_COLS;
  const rowH = VB_H / GRID_ROWS;

  const sorted = useMemo(
    () => [...milestones].sort((a, b) => parseDate(a.date) - parseDate(b.date)),
    [milestones]
  );
  const n = sorted.length;

  // Evenly distribute milestone dots along the curve
  const dots = useMemo(
    () => sorted.map((_, i) => pointAt(n > 1 ? i / (n - 1) : 0.5)),
    [sorted, n]
  );

  // "We are here": interpolated between the surrounding milestones by date
  const marker = useMemo(() => {
    if (now === null || n === 0) return null;
    const times = sorted.map((m) => parseDate(m.date));
    if (now <= times[0]) return { t: 0, ...pointAt(0) };
    if (now >= times[n - 1]) return { t: 1, ...pointAt(1) };
    let i = 0;
    while (i < n - 1 && times[i + 1] < now) i++;
    const f = (now - times[i]) / (times[i + 1] - times[i]);
    const t = (i + f) / (n - 1);
    return { t, ...pointAt(t) };
  }, [now, sorted, n]);

  const isPast = (i: number) => now !== null && parseDate(sorted[i].date) < now;

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1408px] px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-12 lg:mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl font-semibold text-starlight tracking-tight font-display">
            {title}
          </h2>
          <p className="mt-6 text-xl text-moon-dust font-display">{subtitle}</p>
        </div>

        {/* ── Desktop curved timeline ── */}
        <div className="hidden md:block">
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
            onClick={() => setSelected(null)}
          >
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="om-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#33204F" stopOpacity={0.45} />
                  <stop offset="40%" stopColor="#33204F" stopOpacity={0.35} />
                  <stop offset="70%" stopColor="#33204F" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#33204F" stopOpacity={0} />
                </linearGradient>
                <radialGradient id="om-white-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="50%" stopColor="#F5F1E8" />
                  <stop offset="100%" stopColor="#F5F1E8" stopOpacity={0} />
                </radialGradient>
                <linearGradient id="om-supernova-dot" x1="0.5" y1="0" x2="0.5" y2="1">
                  <stop offset="0%" stopColor="#F04455" />
                  <stop offset="80%" stopColor="#F58C96" />
                  <stop offset="100%" stopColor="#F5F1E8" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              {Array.from({ length: GRID_COLS + 1 }, (_, i) => (
                <line
                  key={`v${i}`}
                  x1={i * colW} y1={0} x2={i * colW} y2={VB_H}
                  stroke="#767786" strokeOpacity={0.25}
                />
              ))}
              {Array.from({ length: GRID_ROWS + 1 }, (_, i) => (
                <line
                  key={`h${i}`}
                  x1={0} y1={i * rowH} x2={VB_W} y2={i * rowH}
                  stroke="#767786" strokeOpacity={0.25}
                />
              ))}

              {/* Left and bottom axis */}
              <line x1={0} y1={0} x2={0} y2={VB_H} stroke="#F5F1E8" strokeWidth={1.5} />
              <line x1={0} y1={VB_H} x2={VB_W} y2={VB_H} stroke="#F5F1E8" strokeWidth={1.5} />

              {/* Gradient fill below curve */}
              <path
                d={`${pathBetween(0, 1)} L ${VB_W} 100 L ${VB_W} ${VB_H} L 0 ${VB_H} L 0 501 Z`}
                fill="url(#om-area)"
              />

              {/* Timeline stroke — solid up to today, dashed for the future */}
              {marker ? (
                <>
                  {marker.t > 0 && (
                    <path d={pathBetween(0, marker.t)} fill="none" stroke="#F5F1E8" strokeWidth={1.5} />
                  )}
                  {marker.t < 1 && (
                    <path
                      d={pathBetween(marker.t, 1)}
                      fill="none" stroke="#F5F1E8" strokeWidth={1.5} strokeDasharray="6 4"
                    />
                  )}
                </>
              ) : (
                <path
                  d={pathBetween(0, 1)}
                  fill="none" stroke="#F5F1E8" strokeWidth={1.5} strokeDasharray="6 4"
                />
              )}

              {/* Dashed connectors from each dot to its label */}
              {dots.map((d, i) => {
                const below = i % 2 === 1;
                return (
                  <line
                    key={`conn-${i}`}
                    x1={d.x} y1={d.y}
                    x2={d.x} y2={below ? d.y + 50 : d.y - 50}
                    stroke="#F5F1E8" strokeOpacity={0.3} strokeDasharray="4 4" strokeWidth={1}
                  />
                );
              })}

              {/* Milestone dots */}
              {dots.map((d, i) => (
                <circle
                  key={i}
                  cx={d.x} cy={d.y} r={6}
                  fill="#151426"
                  stroke={isPast(i) ? '#F5F1E8' : '#767786'}
                  strokeWidth={1.5}
                />
              ))}

              {/* Selected milestone glow */}
              {selected !== null && dots[selected] && (
                <>
                  <circle cx={dots[selected].x} cy={dots[selected].y} r={26}
                    fill="none" stroke="#F04455" strokeOpacity={0.5} strokeDasharray="4 4"
                  />
                  <circle cx={dots[selected].x} cy={dots[selected].y} r={14} fill="url(#om-white-glow)" />
                  <circle cx={dots[selected].x} cy={dots[selected].y} r={5}
                    fill="#F5F1E8" stroke="#F5F1E8" strokeWidth={1}
                  />
                </>
              )}

              {/* "We are here" glowing marker with orbiting planets */}
              {marker && (
                <>
                  <circle cx={marker.x} cy={marker.y} r={14} fill="url(#om-white-glow)" />
                  <circle cx={marker.x} cy={marker.y} r={5}
                    fill="#F5F1E8" stroke="#F5F1E8" strokeWidth={1}
                  />
                  <circle cx={marker.x} cy={marker.y} r={48}
                    fill="none" stroke="#F5F1E8" strokeOpacity={0.3} strokeDasharray="4 4"
                  />
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from={`0 ${marker.x} ${marker.y}`}
                      to={`360 ${marker.x} ${marker.y}`}
                      dur="10s"
                      repeatCount="indefinite"
                    />
                    <circle cx={marker.x + 48} cy={marker.y} r={7} fill="url(#om-supernova-dot)" />
                    <circle cx={marker.x - 48} cy={marker.y} r={13} fill="url(#om-supernova-dot)" />
                  </g>
                </>
              )}
            </svg>

            {/* Milestone labels */}
            {sorted.map((m, i) => {
              const d = dots[i];
              const below = i % 2 === 1;
              const isSelected = selected === i;
              const past = isPast(i);
              const centerPct = Math.min(Math.max((d.x / VB_W) * 100, 10), 89);
              const containerClass = isSelected
                ? 'bg-[#F5F1E8] border-[#F5F1E8]'
                : past
                  ? 'bg-[#090A12] border-[#767786]'
                  : 'bg-[#090A12] border-[#F5F1E8] opacity-60';
              const labelClass = isSelected
                ? 'text-[#090A12]'
                : past
                  ? 'text-[#F5F1E8]/50'
                  : 'text-[#F5F1E8]';
              return (
                <div
                  key={`${m.label}-${i}`}
                  className={`absolute -translate-x-1/2 border px-3 py-1 whitespace-nowrap text-center transition-all duration-200 cursor-pointer ${containerClass} ${below ? '' : '-translate-y-full'}`}
                  style={{
                    left: `${centerPct}%`,
                    top: `${((below ? d.y + 56 : d.y - 56) / VB_H) * 100}%`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected((prev) => (prev === i ? null : i));
                  }}
                >
                  <span className={`block text-[14px] leading-tight font-display ${labelClass}`}>
                    {m.label}
                  </span>
                  <span className={`block text-[11px] leading-tight ${isSelected ? 'text-[#33204F]' : 'text-[#767786]'}`}>
                    {formatDate(m.date)}
                    {m.location ? ` · ${m.location}` : ''}
                  </span>
                </div>
              );
            })}

            {/* "We are here" label — rendered last so it paints above milestone labels */}
            {marker && (
              <div
                className="absolute z-10 -translate-x-1/2 border border-[#F5F1E8] bg-[#F5F1E8] px-3 py-0.5 whitespace-nowrap pointer-events-none"
                style={{
                  left: `${(marker.x / VB_W) * 100}%`,
                  top: `${((Math.min(marker.y + 66, VB_H - 30)) / VB_H) * 100}%`,
                }}
              >
                <span className="text-[14px] font-display text-[#090A12]">We are here</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Mobile vertical timeline ── */}
        <div className="md:hidden">
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-titanium/50" aria-hidden="true" />
            {sorted.map((m, i) => {
              const past = isPast(i);
              const showMarkerAfter =
                marker !== null &&
                past &&
                (i === n - 1 || !isPast(i + 1));
              return (
                <div key={`${m.label}-${i}`}>
                  <div className="relative mb-6">
                    <div
                      className={`absolute left-[-19px] top-1 w-2.5 h-2.5 rounded-full border-[1.5px] bg-void ${
                        past ? 'border-[#767786]' : 'border-[#F5F1E8]'
                      }`}
                    />
                    <p className={`text-sm font-[var(--font-noto)] ${past ? 'text-moon-dust/40' : 'text-moon-dust'}`}>
                      {m.label}
                    </p>
                    <p className="text-xs text-titanium">
                      {formatDate(m.date)}
                      {m.location ? ` · ${m.location}` : ''}
                    </p>
                  </div>
                  {showMarkerAfter && (
                    <div className="relative mb-6">
                      <div className="absolute left-[-22px] top-0.5 w-4 h-4 rounded-full bg-gradient-to-br from-supernova to-tartan shadow-[0_0_10px_rgba(240,68,85,0.6)]" />
                      <p className="text-sm font-[var(--font-noto)] text-[#F5F1E8] font-medium">
                        We are here
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
