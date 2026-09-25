import { TeamHero } from '@/components/TeamHero';
import { Section } from '@/components/Section';
import { MentorCard } from '@/components/MentorCard';
import { TeamPlacements } from '@/components/TeamPlacements';
import { TeamRoster } from '@/components/TeamRoster';
import { getMentors } from '@/lib/content';

const KEEP_ADVISORS = ['Red Whittaker', 'Wenshan Wang', 'Zhang Ji'];

const ADVISOR_PHOTO_OVERRIDES: Record<string, string> = {
  'Red Whittaker': '/images/advisors/whittaker.jpg',
  'Wenshan Wang': '/images/advisors/wenshan-wang.jpg',
  'Zhang Ji': '/images/advisors/zhang-ji.jpg',
};

export const metadata = {
  title: 'Team - CMU MoonMiners',
  description: 'Meet the interdisciplinary team building autonomous lunar excavation robots for NASA Lunabotics.',
};

export default async function TeamPage() {
  const allMentors = await getMentors();

  const mentors = allMentors
    .filter((m) => KEEP_ADVISORS.includes(m.name))
    .sort((a, b) => KEEP_ADVISORS.indexOf(a.name) - KEEP_ADVISORS.indexOf(b.name))
    .map((m) => ({
      ...m,
      photo: ADVISOR_PHOTO_OVERRIDES[m.name] ?? m.photo,
    }));

  return (
    <>
      <TeamHero />

      {/* Where Moon Miners land */}
      <TeamPlacements />

      {/* Advisors */}
      <Section
        id="advisors"
        title="Our Advisors"
        subtitle="Expert guidance from leading researchers in robotics and space systems."
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
        subtitle="The talented individuals driving our mission forward."
        headerAlign="left"
        headerClassName="mb-4"
        titleClassName="text-left text-[36px]"
        subtitleClassName="text-left text-[20px]"
      >
        <TeamRoster />
      </Section>
    </>
  );
}
