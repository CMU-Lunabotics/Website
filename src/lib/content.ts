import { z } from 'zod';
import { supabase, getStorageUrl } from './supabase';

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
    headlineAccent: z.boolean().optional(),
    subhead: z.string().optional(),
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
  mission: z.object({
    title: z.string(),
    body: z.string(),
    cta: z.object({ label: z.string(), href: z.string() }),
    image: z.string(),
  }).optional(),
  bento: z.object({
    title: z.string(),
    updatesTitle: z.string(),
    updatesDescription: z.string(),
    updatesCta: z.string(),
    updatesHref: z.string(),
    membersStat: z.string(),
    membersDescription: z.string(),
    roverStat: z.string(),
    roverDescription: z.string(),
    teamImage: z.string(),
    handsImage: z.string(),
  }).optional(),
  operationalMilestones: z.object({
    title: z.string(),
    subtitle: z.string(),
    milestones: z.array(z.object({
      label: z.string(),
      position: z.enum(['above', 'below']),
      variant: z.enum(['default', 'moon', 'highlight']).optional(),
    })),
  }).optional(),
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
  const config = content.default;
  const parsed = SiteConfigSchema.parse({
    ...config,
    logo: getStorageUrl(config.logo),
    hero: {
      ...config.hero,
      heroImage: getStorageUrl(config.hero.heroImage),
    },
    mission: config.mission ? {
      ...config.mission,
      image: getStorageUrl(config.mission.image),
    } : undefined,
    bento: config.bento,
  });
  return parsed;
}

export async function getMembers(): Promise<Member[]> {
  const { data, error } = await supabase
    .from('members_with_subteams')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;

  const members = (data || []).map((row) => ({
    name: row.name || '',
    role: row.role || '',
    subteam: row.subteam || '',
    year: row.year || '',
    email: row.email || '',
    photo: getStorageUrl(row.photo_path),
    links: (row.links as { linkedin?: string; github?: string; website?: string; instagram?: string }) || {
      linkedin: '',
      github: '',
      website: '',
      instagram: '',
    },
    bio: row.bio || '',
    tags: (row.tags as string[]) || [],
  }));

  return z.array(MemberSchema).parse(members);
}

export async function getTeamInfo(): Promise<TeamInfo> {
  const { data, error } = await supabase
    .from('team_info')
    .select('*')
    .limit(1)
    .single();

  if (error) throw error;

  const teamInfo = {
    teamPhoto: getStorageUrl(data.team_photo_path),
    blurb: data.blurb,
    pillars: (data.pillars as Array<{ title: string; desc: string }>) || [],
  };

  return TeamInfoSchema.parse(teamInfo);
}

export async function getSponsors(): Promise<Sponsors> {
  const { data, error } = await supabase
    .from('sponsors')
    .select('*, sponsor_tiers(name, slug)')
    .order('display_order', { ascending: true });

  if (error) throw error;

  const sponsors = (data || []).map((row) => ({
    name: row.name,
    logo: getStorageUrl(row.logo_path),
    url: row.url || '#',
    blurb: row.blurb || '',
    whiteOnDark: row.white_on_dark || false,
  }));

  // Find the first sponsor with CTA fields filled
  const ctaRow = (data || []).find((row) => row.cta_headline && row.cta_copy && row.cta_email);
  const callToAction = ctaRow
    ? {
        headline: ctaRow.cta_headline!,
        copy: ctaRow.cta_copy!,
        email: ctaRow.cta_email!,
      }
    : {
        headline: 'Support CMU MoonMiners',
        copy: 'Help us push lunar robotics forward. Contact us for our sponsorship prospectus.',
        email: 'moonminers@andrew.cmu.edu',
      };

  return SponsorsSchema.parse({ sponsors, callToAction });
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
  const { data, error } = await supabase
    .from('mentors')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) throw error;

  const mentors = (data || []).map((row) => ({
    name: row.name,
    title: row.title,
    affiliation: row.affiliation,
    photo: getStorageUrl(row.photo_path),
    bio: row.bio || '',
    expertise: (row.expertise as string[]) || [],
    links: (row.links as { website?: string; linkedin?: string; email?: string }) || {
      website: '',
      linkedin: '',
      email: '',
    },
  }));

  return z.array(MentorSchema).parse(mentors);
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
  const { data, error } = await supabase
    .from('updates')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false });

  if (error) throw error;

  const updates = (data || []).map((row) => {
    const links = (row.links as Array<{ url: string; label: string }>) || [];
    const firstLink = links[0];

    return {
      id: row.slug,
      title: row.title,
      date: row.date,
      category: row.category,
      summary: row.summary,
      images: ((row.images as string[]) || []).map((img) => getStorageUrl(img)),
      content: row.content || '',
      tags: (row.tags as string[]) || [],
      link: firstLink?.url || '',
      linkLabel: firstLink?.label || '',
      links: links,
    };
  });

  return z.array(UpdateSchema).parse(updates);
}
