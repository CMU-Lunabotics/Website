import { TeamHero } from '@/components/TeamHero';
import { Section } from '@/components/Section';
import { MemberGrid } from '@/components/MemberGrid';
import { MentorCard } from '@/components/MentorCard';
import { Button } from '@/components/ui/button';
import { getMembers, getTeamInfo, getMentors } from '@/lib/content';
import { ExternalLink, Users, BookOpen, Download } from 'lucide-react';

export const metadata = {
  title: 'Team - CMU MoonMiners',
  description: 'Meet the interdisciplinary team building autonomous lunar excavation robots for NASA Lunabotics.',
};

export default async function TeamPage() {
  const [members, teamInfo, mentors] = await Promise.all([
    getMembers(),
    getTeamInfo(),
    getMentors(),
  ]);

  return (
    <>
      <TeamHero />

      {/* Advisors — Figma: left-aligned header, 42px title, 20px subtitle */}
      <Section
        id="advisors"
        title="Our Advisors"
        subtitle="Expert guidance from leading researchers in robotics and space systems"
        headerAlign="left"
        titleSize="advisors"
        subtitleSize="advisors"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.name} mentor={mentor} />
          ))}
        </div>
      </Section>

      {/* Team Members */}
      <Section 
        title="Our Team" 
        subtitle="The talented individuals driving our mission forward"
        className="bg-black"
        titleClassName="text-left text-[36px]"
        subtitleClassName="text-left text-[20px]"
      >
        <MemberGrid members={members} />
      </Section>
    </>
  );
}
