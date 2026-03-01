'use client';

import { Moon } from 'lucide-react';

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

export function OperationalMilestones({ title, subtitle, milestones }: OperationalMilestonesProps) {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 lg:mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight font-[var(--font-noto)]">
            {title}
          </h2>
          <p className="mt-2 text-lg text-white/80 font-[var(--font-noto)]">
            {subtitle}
          </p>
        </div>

        {/* Timeline: horizontal line with nodes. Dots sit on the line; labels above or below. */}
        <div className="relative min-h-[160px] flex flex-col justify-center">
          {/* Main timeline line - dark grey */}
          <div
            className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-neutral-600 z-0"
            aria-hidden
          />

          {/* Subtle background shapes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
            <div className="absolute left-1/4 top-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
            <div className="absolute left-2/3 top-1/3 w-24 h-24 rounded-full border border-white/5" />
            <div className="absolute right-1/4 bottom-1/4 w-20 h-20 rounded-full border border-white/5" />
          </div>

          <div className="relative flex justify-between gap-2 lg:gap-4 z-10">
            {milestones.map((milestone, index) => (
              <MilestoneNode
                key={index}
                label={milestone.label}
                position={milestone.position}
                variant={milestone.variant ?? 'default'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MilestoneNode({
  label,
  position,
  variant,
}: {
  label: string;
  position: 'above' | 'below';
  variant: MilestoneVariant;
}) {
  const isAbove = position === 'above';
  const connectorHeight = 20;

  return (
    <div className="flex flex-1 flex-col items-center min-w-0 max-w-[220px]">
      {/* Top: label (if above) or spacer */}
      <div className="flex min-h-[48px] flex-col items-center justify-end">
        {isAbove ? (
          <>
            <p className="text-center text-sm font-medium text-white/90 font-[var(--font-noto)] leading-tight px-0.5">
              {label}
            </p>
            <div
              className="w-px bg-neutral-500 shrink-0"
              style={{ height: connectorHeight }}
              aria-hidden
            />
          </>
        ) : (
          <div style={{ height: connectorHeight }} aria-hidden />
        )}
      </div>

      {/* Dot on the timeline */}
      <div className="relative z-10 flex shrink-0 -my-px">
        {variant === 'moon' ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900/60 text-white/90 border border-blue-700/40">
            <Moon className="h-5 w-5" strokeWidth={1.5} />
          </div>
        ) : variant === 'highlight' ? (
          <div className="relative flex h-12 w-12 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-orange-500/80 blur-md" />
            <div className="relative h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 ring-2 ring-orange-400/50" />
          </div>
        ) : (
          <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-black ring-2 ring-neutral-800">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </div>
        )}
      </div>

      {/* Bottom: connector + label (if below) or spacer */}
      <div className="flex min-h-[48px] flex-col items-center justify-start">
        {!isAbove ? (
          <>
            <div
              className="w-px bg-neutral-500 shrink-0"
              style={{ height: connectorHeight }}
              aria-hidden
            />
            <p className="mt-1 text-center text-sm font-medium text-white/90 font-[var(--font-noto)] leading-tight px-0.5">
              {label}
            </p>
          </>
        ) : (
          <div style={{ height: connectorHeight }} aria-hidden />
        )}
      </div>
    </div>
  );
}
