import Image from 'next/image';
import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { MemberGrid } from '@/components/MemberGrid';
import { MentorCard } from '@/components/MentorCard';
import { getMembers, getTeamInfo, getMentors } from '@/lib/content';

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
      <PageHeader
        title="Our Team"
        subtitle="Meet the interdisciplinary group building the future of lunar robotics"
      />

      {/* Team Photo Banner */}
      <Section className="py-0">
        <div className="relative aspect-[3/1] rounded-2xl overflow-hidden">
          <Image
            src={teamInfo.teamPhoto}
            alt="CMU MoonMiners team photo"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            priority
          />
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            CMU MoonMiners Team 2025
          </p>
        </div>
      </Section>

      {/* Team Description */}
      <Section title="About Our Team">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-muted-foreground text-center">
            {teamInfo.blurb}
          </p>
        </div>
      </Section>

      {/* Team Members */}
      <Section 
        title="Team Members" 
        subtitle="The talented individuals driving our mission forward"
        className="bg-muted/30"
      >
        <MemberGrid members={members} />
      </Section>

      {/* Mentors */}
      <Section 
        title="Our Mentors" 
        subtitle="Expert guidance from leading researchers in robotics and space systems"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.name} mentor={mentor} />
          ))}
        </div>
      </Section>
    </>
  );
}
