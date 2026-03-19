'use client';

import { useState } from 'react';

export type MilestoneVariant = 'default' | 'moon' | 'highlight';

export interface MilestoneItem {
  label: string;
  position: 'above' | 'below';
  variant?: MilestoneVariant;
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

// Dot positions on the curve (SVG coords)
const dots = [
  { x: 100, y: 501 },
  { x: 206, y: 417 },
  { x: 420, y: 367 },
  { x: 526, y: 278 },
  { x: 740, y: 234 },
  { x: 946, y: 182 }, // "We are here"
  { x: 1060, y: 102 },
  { x: 1273, y: 100 },
];

// Label positions and styles (SVG coords)
// dotIndex maps each label to its corresponding dot on the curve
const labels: Array<{
  text: string;
  x: number;
  y: number;
  baseType: 'past' | 'milestone' | 'current';
  dotIndex: number;
}> = [
  { text: 'Moon Miners founded', x: 26, y: 375, baseType: 'past', dotIndex: 0 },
  { text: 'Preliminary Design Review', x: 119, y: 313, baseType: 'milestone', dotIndex: 1 },
  { text: 'Accepted into Lunabotics Challenge', x: 410, y: 197, baseType: 'milestone', dotIndex: 3 },
  { text: 'Trackbot V1 assembled', x: 663, y: 285, baseType: 'milestone', dotIndex: 4 },
  { text: 'Critical Design Review', x: 347, y: 403, baseType: 'milestone', dotIndex: 2 },
  { text: 'We are here', x: 911, y: 231, baseType: 'current', dotIndex: 5 },
  { text: 'Qualifying Challenge', x: 990, y: 52, baseType: 'milestone', dotIndex: 6 },
  { text: 'The Challenge', x: 1198, y: 52, baseType: 'milestone', dotIndex: 7 },
];

// Mobile chronological order
const mobileTimeline = [
  { text: 'Moon Miners founded', type: 'past' as const },
  { text: 'Preliminary Design Review', type: 'done' as const },
  { text: 'Accepted into Lunabotics Challenge', type: 'done' as const },
  { text: 'Trackbot V1 assembled', type: 'done' as const },
  { text: 'Critical Design Review', type: 'done' as const },
  { text: 'We are here', type: 'current' as const },
  { text: 'Qualifying Challenge', type: 'future' as const },
  { text: 'The Challenge', type: 'future' as const },
];

// Straight line path through milestone dots
const CURVE = `M ${dots.map(d => `${d.x} ${d.y}`).join(' L ')}`;

// Per-variant decorative elements when a milestone is selected
type DecoDot = { cx: number; cy: number; r: number; type: 'orange' | 'purple' | 'dark' };
type Orbit = { cx: number; cy: number; r: number; stroke: string };

const variantDecorations: Record<number, {
  glow: { x: number; y: number };
  orbits: Orbit[];
  dots: DecoDot[];
  line?: { x1: number; y1: number; x2: number; y2: number };
  moon?: { cx: number; cy: number; outerR: number; innerR: number; offsetX: number; offsetY: number; rotation: number };
}> = {
  0: { // Moon Miners founded
    glow: { x: 100, y: 501 },
    orbits: [{ cx: 143, cy: 438, r: 56, stroke: '#545151' }],
    dots: [
      { cx: 87, cy: 429, r: 9, type: 'orange' },
      { cx: 93, cy: 463, r: 5, type: 'purple' },
    ],
  },
  1: { // Preliminary Design Review
    glow: { x: 206, y: 417 },
    orbits: [],
    dots: [
      { cx: 170, cy: 370, r: 4, type: 'purple' },
      { cx: 248, cy: 455, r: 3, type: 'dark' },
    ],
    moon: { cx: 205, cy: 465, outerR: 56, innerR: 54, offsetX: 14, offsetY: -10, rotation: -15.58 },
  },
  2: { // Accepted into Lunabotics Challenge
    glow: { x: 526, y: 278 },
    orbits: [
      { cx: 533, cy: 191, r: 74, stroke: '#4B4B4B' },
      { cx: 584, cy: 139, r: 32, stroke: '#4B4B4B' },
    ],
    dots: [
      { cx: 464, cy: 166, r: 5, type: 'orange' },
      { cx: 579, cy: 249, r: 7, type: 'dark' },
      { cx: 488, cy: 139, r: 16, type: 'purple' },
    ],
  },
  3: { // Trackbot V1 assembled
    glow: { x: 740, y: 234 },
    orbits: [{ cx: 824, cy: 232, r: 36, stroke: '#4B4B4B' }],
    dots: [
      { cx: 807, cy: 201, r: 5, type: 'orange' },
      { cx: 701, cy: 251, r: 5, type: 'orange' },
      { cx: 792, cy: 219, r: 2.5, type: 'dark' },
      { cx: 715, cy: 249, r: 3.5, type: 'dark' },
      { cx: 854, cy: 252, r: 6, type: 'purple' },
    ],
    line: { x1: 747, y1: 196, x2: 854, y2: 253 },
  },
  4: { // Critical Design Review
    glow: { x: 420, y: 367 },
    orbits: [
      { cx: 457, cy: 358, r: 73, stroke: '#797777' },
      { cx: 407, cy: 424, r: 89, stroke: '#797777' },
    ],
    dots: [
      { cx: 390, cy: 335, r: 13, type: 'purple' },
    ],
  },
  6: { // Qualifying Challenge
    glow: { x: 1060, y: 102 },
    orbits: [
      { cx: 992, cy: 87, r: 32, stroke: '#555151' },
      { cx: 938, cy: 51, r: 55, stroke: '#555151' },
    ],
    dots: [],
  },
  7: { // The Challenge
    glow: { x: 1273, y: 100 },
    orbits: [{ cx: 1237, cy: 29, r: 64, stroke: '#4E4E4E' }],
    dots: [],
  },
};

function DecorationDot({ cx, cy, r, type }: DecoDot) {
  const fill = type === 'orange' ? 'url(#om-orange-dot)'
    : type === 'purple' ? 'url(#om-purple-dot)'
    : '#1e1e1e';
  return (
    <circle cx={cx} cy={cy} r={r} fill={fill}
      stroke="rgba(255,255,255,0.5)" strokeWidth={1}
    />
  );
}

export function OperationalMilestones({ title, subtitle }: OperationalMilestonesProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const colW = VB_W / GRID_COLS;
  const rowH = VB_H / GRID_ROWS;
  const deco = selected !== null ? variantDecorations[selected] : null;

  const handleLabelClick = (index: number) => {
    if (index === 5) return; // "We are here" not selectable
    setSelected(prev => prev === index ? null : index);
  };

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1408px] px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-12 lg:mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight font-display">
            {title}
          </h2>
          <p className="mt-6 text-2xl text-white/80 font-display">
            {subtitle}
          </p>
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
                  <stop offset="0%" stopColor="#d3bcbf" stopOpacity={0.2} />
                  <stop offset="40%" stopColor="#d3bcbf" stopOpacity={0.17} />
                  <stop offset="70%" stopColor="#d3bcbf" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#d3bcbf" stopOpacity={0} />
                </linearGradient>
                <radialGradient id="om-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff6b35" stopOpacity={0.8} />
                  <stop offset="70%" stopColor="#ff4500" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#ff4500" stopOpacity={0} />
                </radialGradient>
                <radialGradient id="om-sphere" cx="35%" cy="35%" r="60%">
                  <stop offset="0%" stopColor="#ffaa66" />
                  <stop offset="100%" stopColor="#ee4400" />
                </radialGradient>
                <radialGradient id="om-white-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="50%" stopColor="#f1ede6" />
                  <stop offset="100%" stopColor="#f1ede6" stopOpacity={0} />
                </radialGradient>
                <linearGradient id="om-orange-dot" x1="0.5" y1="0" x2="0.5" y2="1">
                  <stop offset="0%" stopColor="#FF6224" />
                  <stop offset="80%" stopColor="#fabfa8" />
                  <stop offset="100%" stopColor="#F1EDE6" />
                </linearGradient>
                <linearGradient id="om-purple-dot" x1="0.5" y1="0" x2="0.5" y2="1">
                  <stop offset="0%" stopColor="#C4BEF6" />
                  <stop offset="100%" stopColor="#A39696" />
                </linearGradient>
                {/* Crescent moon gradient & mask */}
                <linearGradient id="om-crescent-fill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8B7FC7" />
                  <stop offset="50%" stopColor="#5B4FA0" />
                  <stop offset="100%" stopColor="#3A2D7A" />
                </linearGradient>
                <radialGradient id="om-crescent-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#8B7FC7" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#8B7FC7" stopOpacity={0} />
                </radialGradient>
              </defs>

              {/* Grid lines */}
              {Array.from({ length: GRID_COLS + 1 }, (_, i) => (
                <line
                  key={`v${i}`}
                  x1={i * colW} y1={0} x2={i * colW} y2={VB_H}
                  stroke="#fff" strokeOpacity={0.2}
                />
              ))}
              {Array.from({ length: GRID_ROWS + 1 }, (_, i) => (
                <line
                  key={`h${i}`}
                  x1={0} y1={i * rowH} x2={VB_W} y2={i * rowH}
                  stroke="#fff" strokeOpacity={0.2}
                />
              ))}

              {/* Left and bottom axis */}
              <line x1={0} y1={0} x2={0} y2={VB_H} stroke="#f1ede6" strokeWidth={1.5} />
              <line x1={0} y1={VB_H} x2={VB_W} y2={VB_H} stroke="#f1ede6" strokeWidth={1.5} />

              {/* Gradient fill below curve */}
              <path
                d={`${CURVE} L ${VB_W} 100 L ${VB_W} ${VB_H} L 0 ${VB_H} L 0 501 Z`}
                fill="url(#om-area)"
              />

              {/* Timeline stroke — solid for visited, dashed for future */}
              <path
                d={`M ${dots.slice(0, 6).map(d => `${d.x} ${d.y}`).join(' L ')}`}
                fill="none" stroke="#f1ede6" strokeWidth={1.5}
              />
              <path
                d={`M ${dots.slice(5).map(d => `${d.x} ${d.y}`).join(' L ')}`}
                fill="none" stroke="#f1ede6" strokeWidth={1.5} strokeDasharray="6 4"
              />

              {/* Dashed lines from each dot to its label */}
              {labels.map((l, i) => {
                const d = dots[l.dotIndex];
                return (
                  <line
                    key={`conn-${i}`}
                    x1={d.x} y1={d.y}
                    x2={l.x + 40} y2={l.y}
                    stroke="#f1ede6" strokeOpacity={0.3} strokeDasharray="4 4" strokeWidth={1}
                  />
                );
              })}

              {/* Milestone dots */}
              {dots.map((d, i) => {
                if (i === 5 && selected === null) return null; // "We are here" shown via orange sphere
                return (
                  <circle
                    key={i}
                    cx={d.x} cy={d.y} r={6}
                    fill="#1e1e1e"
                    stroke={i === 0 ? '#505050' : '#f1ede6'}
                    strokeWidth={1.5}
                  />
                );
              })}

              {/* Default "We are here" glowing dot with orbiting planets (only when nothing selected) */}
              {selected === null && (
                <>
                  {/* Glowing dot */}
                  <circle cx={946} cy={182} r={14} fill="url(#om-white-glow)" />
                  <circle cx={946} cy={182} r={5} fill="#f1ede6" stroke="#f1ede6" strokeWidth={1} />

                  {/* Dashed orbit circle */}
                  <circle cx={946} cy={182} r={48} fill="none" stroke="#f1ede6" strokeOpacity={0.3} strokeDasharray="4 4" />

                  {/* Two orbiting orange planets */}
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 946 182"
                      to="360 946 182"
                      dur="10s"
                      repeatCount="indefinite"
                    />
                    <circle cx={994} cy={182} r={7} fill="url(#om-orange-dot)" />
                    <circle cx={898} cy={182} r={13} fill="url(#om-orange-dot)" />
                  </g>
                </>
              )}

              {/* Selected milestone decorations */}
              {deco && (
                <>
                  {/* Orbit circles */}
                  {deco.orbits.map((o, i) => (
                    <circle key={`orbit-${i}`} cx={o.cx} cy={o.cy} r={o.r}
                      fill="none" stroke={o.stroke} strokeWidth={1}
                    />
                  ))}

                  {/* Angled line (Trackbot variant) */}
                  {deco.line && (
                    <line x1={deco.line.x1} y1={deco.line.y1} x2={deco.line.x2} y2={deco.line.y2}
                      stroke="#4B4B4B" strokeWidth={1}
                    />
                  )}

                  {/* Scattered decorative dots */}
                  {deco.dots.map((d, i) => (
                    <DecorationDot key={`deco-${i}`} {...d} />
                  ))}

                  {/* Crescent moon (PDR variant) */}
                  {deco.moon && (
                    <g transform={`rotate(${deco.moon.rotation}, ${deco.moon.cx}, ${deco.moon.cy})`}>
                      <circle cx={deco.moon.cx} cy={deco.moon.cy} r={deco.moon.outerR + 20}
                        fill="url(#om-crescent-glow)"
                      />
                      <mask id="om-crescent-mask">
                        <rect x={deco.moon.cx - deco.moon.outerR - 5} y={deco.moon.cy - deco.moon.outerR - 5}
                          width={deco.moon.outerR * 2 + 10} height={deco.moon.outerR * 2 + 10} fill="white" />
                        <circle cx={deco.moon.cx + deco.moon.offsetX} cy={deco.moon.cy + deco.moon.offsetY}
                          r={deco.moon.innerR} fill="black" />
                      </mask>
                      <circle cx={deco.moon.cx} cy={deco.moon.cy} r={deco.moon.outerR}
                        fill="url(#om-crescent-fill)" mask="url(#om-crescent-mask)"
                      />
                    </g>
                  )}

                  {/* White glow at selected position */}
                  <circle cx={deco.glow.x} cy={deco.glow.y} r={14}
                    fill="url(#om-white-glow)"
                  />
                  <circle cx={deco.glow.x} cy={deco.glow.y} r={5}
                    fill="#f1ede6" stroke="#f1ede6" strokeWidth={1}
                  />
                </>
              )}

              {/* Location labels */}
              <text x={993} y={22} fill="#8f8f8f" fontSize={14} fontFamily="Noto Sans Display, sans-serif" fontWeight={300} textAnchor="middle">
                <tspan x={993}>{"Florida Space Institute\u2019s"}</tspan>
                <tspan x={993} dy={16}>{"Exolith\u00AE Lab."}</tspan>
              </text>
              <text x={1250} y={22} fill="#8f8f8f" fontSize={14} fontFamily="Noto Sans Display, sans-serif" fontWeight={300} textAnchor="middle">
                Kennedy Space Center
              </text>
            </svg>

            {/* HTML milestone labels */}
            {labels.map((l, i) => {
              const left = (l.x / VB_W) * 100;
              const top = (l.y / VB_H) * 100;
              const isSelected = selected === i;
              const isCurrent = l.baseType === 'current';
              const isClickable = !isCurrent;

              let containerClass: string;
              let textClass: string;

              if (isSelected) {
                // Selected milestone: highlighted
                containerClass = l.baseType === 'past'
                  ? 'bg-[#f1ede6] border-[#505050]'
                  : 'bg-[#f1ede6] border-[#f1ede6]';
                textClass = 'text-[#1e1e1e]';
              } else if (isCurrent && selected === null) {
                // "We are here" default: highlighted
                containerClass = 'bg-[#f1ede6] border-[#f1ede6]';
                textClass = 'text-[#1e1e1e]';
              } else if (isCurrent && selected !== null) {
                // "We are here" when something else selected: dimmed
                containerClass = 'bg-[#201e1e] border-[#f1ede6] opacity-50';
                textClass = 'text-[#f1ede6]';
              } else if (l.baseType === 'past') {
                // Moon Miners founded default
                containerClass = 'bg-black border-[#505050]';
                textClass = 'text-[#f1ede6]/50';
              } else {
                // Regular milestones default
                containerClass = 'bg-black border-[#f1ede6] opacity-50';
                textClass = 'text-[#f1ede6]';
              }

              return (
                <div
                  key={l.text}
                  className={`absolute border px-3 py-0.5 whitespace-nowrap transition-all duration-200 ${containerClass} ${isClickable ? 'cursor-pointer' : ''}`}
                  style={{ left: `${left}%`, top: `${top}%` }}
                  onClick={isClickable ? (e) => { e.stopPropagation(); handleLabelClick(i); } : undefined}
                >
                  <span className={`text-[14px] font-display ${textClass}`}>
                    {l.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile vertical timeline ── */}
        <div className="md:hidden">
          <div className="relative pl-8">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-neutral-700" aria-hidden="true" />
            {mobileTimeline.map((m) => (
              <div key={m.text} className="relative mb-6 last:mb-0">
                {m.type === 'current' ? (
                  <div className="absolute left-[-22px] top-0.5 w-4 h-4 rounded-full bg-gradient-to-br from-orange-400 to-red-600 shadow-[0_0_10px_rgba(255,107,53,0.5)]" />
                ) : (
                  <div
                    className={`absolute left-[-19px] top-1 w-2.5 h-2.5 rounded-full border-[1.5px] bg-black ${
                      m.type === 'past' ? 'border-[#505050]' : 'border-[#f1ede6]'
                    }`}
                  />
                )}
                <p
                  className={`text-sm font-[var(--font-noto)] ${
                    m.type === 'current'
                      ? 'text-[#f1ede6] font-medium'
                      : m.type === 'past'
                        ? 'text-white/30'
                        : 'text-white/70'
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
