import Image from 'next/image';
import { PageHeader } from '@/components/PageHeader';
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
      <PageHeader
        title="Our Team"
        subtitle="Meet the interdisciplinary group building the future of lunar robotics"
      />

      {/* Quick Navigation */}
      <Section className="py-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild variant="outline" size="lg">
            <a href="#mentors">
              <Users className="mr-2 h-4 w-4" />
              View Mentors
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="/LunaboticsGuideBook.pdf" target="_blank" rel="noopener noreferrer">
              <BookOpen className="mr-2 h-4 w-4" />
              Team Guidebook
              <Download className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a 
              href="https://www.nasa.gov/learning-resources/lunabotics-challenge/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Learn About Lunabotics
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </Section>

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

      {/* Mentors */}
      <Section 
        id="mentors"
        title="Our Mentors" 
        subtitle="Expert guidance from leading researchers in robotics and space systems"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.name} mentor={mentor} />
          ))}
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
    </>
  );
}
