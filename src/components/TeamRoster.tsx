'use client';

import { useState } from 'react';
import { ChevronDown, Mail } from 'lucide-react';
import { Member } from '@/lib/content';

const SUBTEAM_ORDER = ['Avionics', 'Mechanical', 'Outreach', 'Software', 'Systems'] as const;

function lastName(name: string): string {
  const tokens = name.split(/\s+/);
  return tokens[tokens.length - 1];
}

function sortMembers(members: Member[]): Member[] {
  return [...members].sort((a, b) => {
    if (a.isLead !== b.isLead) return a.isLead ? -1 : 1;
    const cmp = lastName(a.name).localeCompare(lastName(b.name));
    return cmp !== 0 ? cmp : a.name.localeCompare(b.name);
  });
}

function groupBySubteam(members: Member[]): Record<string, Member[]> {
  const groups: Record<string, Member[]> = {};
  for (const team of SUBTEAM_ORDER) groups[team] = [];

  for (const m of members) {
    for (const raw of m.subteam.split(',')) {
      const team = raw.trim();
      if (groups[team]) groups[team].push(m);
    }
  }

  for (const team of SUBTEAM_ORDER) {
    groups[team] = sortMembers(groups[team]);
  }
  return groups;
}

function NameList({ members }: { members: Member[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {members.map((m) => (
        <li
          key={m.name}
          data-testid="member-card"
          className={`flex items-center gap-2 text-base leading-relaxed ${
            m.isLead
              ? 'font-semibold text-starlight'
              : 'text-moon-dust'
          }`}
        >
          {m.email ? (
            <a
              href={`mailto:${m.email}`}
              aria-label={`Email ${m.name}`}
              className="flex-shrink-0 text-moon-dust/60 hover:text-supernova transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
            </a>
          ) : (
            <span className="flex-shrink-0 w-3.5" />
          )}
          {m.name}
        </li>
      ))}
    </ul>
  );
}

interface TeamRosterProps {
  members: Member[];
}

const PROJECT_LEAD = { name: 'Luqman Zaceria', email: 'lzaceria@andrew.cmu.edu' };

export function TeamRoster({ members }: TeamRosterProps) {
  const groups = groupBySubteam(members);

  // Default: Avionics open on mobile
  const [open, setOpen] = useState<Set<string>>(new Set(['Avionics']));

  const toggle = (team: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(team)) next.delete(team);
      else next.add(team);
      return next;
    });

  return (
    <>
      {/* Project Lead — centered above subteam columns */}
      <p className="mb-4 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-starlight">
        Project Lead:{' '}
        <a
          href={`mailto:${PROJECT_LEAD.email}`}
          aria-label={`Email ${PROJECT_LEAD.name}`}
          className="text-moon-dust/60 hover:text-supernova transition-colors"
        >
          <Mail className="h-3.5 w-3.5" />
        </a>
        <span className="text-base font-semibold normal-case tracking-normal text-starlight">
          {PROJECT_LEAD.name}
        </span>
      </p>

      {/* Desktop: five open columns (hidden below lg) */}
      <div className="hidden lg:grid grid-cols-5 gap-6">
        {SUBTEAM_ORDER.map((team) => (
          <div key={team}>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-starlight">
              {team}
            </h3>
            <NameList members={groups[team]} />
          </div>
        ))}
      </div>

      {/* Mobile / tablet: accordion (visible below lg) */}
      <div className="flex flex-col gap-2 lg:hidden">
        {SUBTEAM_ORDER.map((team) => {
          const isOpen = open.has(team);
          return (
            <div key={team} className="border-b border-titanium/30">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggle(team)}
                className="flex w-full items-center justify-between py-3 text-sm font-bold uppercase tracking-[0.2em] text-starlight"
              >
                <span>
                  {team}{' '}
                  <span className="text-moon-dust font-normal normal-case tracking-normal">
                    ({groups[team].length})
                  </span>
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-moon-dust transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="pb-4">
                  <NameList members={groups[team]} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
