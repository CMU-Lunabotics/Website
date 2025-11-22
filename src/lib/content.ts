import { z } from 'zod';

// Site configuration schema
export const SiteConfigSchema = z.object({
  teamName: z.string(),
  tagline: z.string(),
  contactEmail: z.string().email(),
  location: z.string(),
  logo: z.string(),
  social: z.object({
    github: z.string().url(),
    youtube: z.string().url(),
    instagram: z.string().url(),
  }),
  hero: z.object({
    headline: z.string(),
    subhead: z.string(),
    ctaPrimary: z.object({
      label: z.string(),
      href: z.string(),
    }),
    ctaSecondary: z.object({
      label: z.string(),
      href: z.string(),
    }),
    heroImage: z.string(),
    video: z.string().nullable(),
  }),
});

export type SiteConfig = z.infer<typeof SiteConfigSchema>;

// Member schema
export const MemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  subteam: z.string(),
  year: z.string(),
  email: z.union([z.string().email(), z.literal("")]),
  photo: z.string(),
  links: z.object({
    linkedin: z.string(),
    github: z.string(),
    website: z.string(),
    instagram: z.string(),
  }),
  bio: z.string(),
  tags: z.array(z.string()),
});

export type Member = z.infer<typeof MemberSchema>;

// Team info schema
export const TeamInfoSchema = z.object({
  teamPhoto: z.string(),
  blurb: z.string(),
  pillars: z.array(z.object({
    title: z.string(),
    desc: z.string(),
  })),
});

export type TeamInfo = z.infer<typeof TeamInfoSchema>;

// Sponsor schema
export const SponsorSchema = z.object({
  name: z.string(),
  logo: z.string(),
  url: z.string().url().or(z.literal('#')).optional(),
  blurb: z.string(),
  whiteOnDark: z.boolean(),
});

export type Sponsor = z.infer<typeof SponsorSchema>;

// Sponsor tier schema
export const SponsorTierSchema = z.object({
  name: z.string(),
  minAmount: z.number(),
  sponsors: z.array(SponsorSchema),
});

export type SponsorTier = z.infer<typeof SponsorTierSchema>;

// Sponsors schema
export const SponsorsSchema = z.object({
  sponsors: z.array(SponsorSchema),
  callToAction: z.object({
    headline: z.string(),
    copy: z.string(),
    email: z.string().email(),
  }),
});

export type Sponsors = z.infer<typeof SponsorsSchema>;

// Content loader functions
export async function getSiteConfig(): Promise<SiteConfig> {
  const content = await import('../../content/site.json');
  return SiteConfigSchema.parse(content.default);
}

export async function getMembers(): Promise<Member[]> {
  const content = await import('../../content/members.json');
  return z.array(MemberSchema).parse(content.default);
}

export async function getTeamInfo(): Promise<TeamInfo> {
  const content = await import('../../content/team.json');
  return TeamInfoSchema.parse(content.default);
}

export async function getSponsors(): Promise<Sponsors> {
  const content = await import('../../content/sponsors.json');
  return SponsorsSchema.parse(content.default);
}

// Mentor schema
export const MentorSchema = z.object({
  name: z.string(),
  title: z.string(),
  affiliation: z.string(),
  photo: z.string(),
  bio: z.string(),
  expertise: z.array(z.string()),
  links: z.object({
    website: z.string(),
    linkedin: z.string(),
    email: z.string().email(),
  }),
});

export type Mentor = z.infer<typeof MentorSchema>;

export async function getMentors(): Promise<Mentor[]> {
  const content = await import('../../content/mentors.json');
  return z.array(MentorSchema).parse(content.default);
}

// Update schema
export const UpdateSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  category: z.string(),
  summary: z.string(),
  images: z.array(z.string()),
  content: z.string(),
  tags: z.array(z.string()),
  link: z.string().url().or(z.literal('')).optional(),
  linkLabel: z.string().optional(),
  links: z.array(z.object({
    url: z.string().url(),
    label: z.string(),
  })).optional(),
});

export type Update = z.infer<typeof UpdateSchema>;

export async function getUpdates(): Promise<Update[]> {
  const content = await import('../../content/updates.json');
  return z.array(UpdateSchema).parse(content.default);
}
