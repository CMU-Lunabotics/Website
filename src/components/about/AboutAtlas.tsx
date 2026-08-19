import { Container } from '@/components/Container';
import { Bot, Cpu, Mountain, Radar, Route, Trophy } from 'lucide-react';

const SUBSYSTEMS = [
  {
    Icon: Mountain,
    title: 'Excavation',
    body: 'Regolith excavation and transport tooling engineered for lunar soil simulant.',
  },
  {
    Icon: Cpu,
    title: 'Autonomy Stack',
    body: 'Coordinated navigation, perception, and decision-making with no human in the loop.',
  },
  {
    Icon: Radar,
    title: 'LiDAR Mapping',
    body: '3D terrain reconstruction and point-cloud rendering of the excavation arena.',
  },
  {
    Icon: Route,
    title: 'Mobility',
    body: 'Tracked drivetrain and structures built to traverse cratered, dusty terrain.',
  },
];

const STATUS = ['Designed', 'Built', 'Competed'];

export function AboutAtlas() {
  return (
    <section className="py-20 lg:py-28">
      <Container className="px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-12">
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-tartan" aria-hidden />
            System Status
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-starlight font-[var(--font-noto)] mb-3">
            Engineered to Lead
          </h2>
          <p className="text-moon-dust text-[20px] font-[var(--font-noto)] max-w-3xl">
            Solving the extreme constraints of the lunar environment through rigorous design,
            simulation, and rapid prototyping.
          </p>
        </div>

        {/* Systems panel */}
        <div className="card-cosmic clip-corner-sm p-8 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-titanium/25 pb-6">
            <div>
              <p className="font-tech text-2xl tracking-[0.25em] text-starlight">ATLAS</p>
              <p className="mt-1 text-sm text-moon-dust">
                NASA Lunabotics 2026 · Mined lunar soil autonomously
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {STATUS.map((label) => (
                <span
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-titanium/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-moon-dust"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-supernova" aria-hidden />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SUBSYSTEMS.map(({ Icon, title, body }) => (
              <div key={title}>
                <Icon className="h-7 w-7 text-supernova" aria-hidden />
                <h3 className="mt-4 text-lg font-semibold text-starlight">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-moon-dust">{body}</p>
              </div>
            ))}
          </div>

          {/* 2026 accolades */}
          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-titanium/25 pt-6">
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-supernova shrink-0" aria-hidden />
              <p className="text-sm leading-relaxed text-moon-dust">
                Won <span className="font-semibold text-starlight">Best Presentations and Demonstrations</span> as a novice team
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Bot className="h-6 w-6 text-supernova shrink-0" aria-hidden />
              <p className="text-sm leading-relaxed text-moon-dust">
                The <span className="font-semibold text-starlight">only first-year team</span> to ever produce an autonomous system.
              </p>
            </div>
          </div>

          {/* 2027 successor teaser */}
          <div className="mt-10 flex flex-wrap items-center gap-4 border border-dashed border-titanium/40 px-6 py-5">
            <span className="relative flex h-2.5 w-2.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-supernova opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-supernova" />
            </span>
            <p className="font-tech text-lg tracking-[0.25em] text-starlight">2027</p>
            <p className="text-sm text-moon-dust">
              ATLAS&apos;s successor is already on the whiteboard. New rover — and a new name — incoming.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
