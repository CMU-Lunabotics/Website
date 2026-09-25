import teamRoster from '@/../content/team-roster.json';

const SUBTEAM_ORDER = ['Avionics', 'Mechanical', 'Outreach', 'Software', 'Systems'] as const;

export function TeamRoster() {
  const roster = teamRoster.subteams as Record<string, string[]>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6">
      {SUBTEAM_ORDER.map((team) => (
        <div key={team}>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-starlight">
            {team}
          </h3>
          <ul className="flex flex-col gap-1.5">
            {(roster[team] ?? []).map((name) => (
              <li key={name} className="text-sm leading-relaxed text-moon-dust">
                {name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
