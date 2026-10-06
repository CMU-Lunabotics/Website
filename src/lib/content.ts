import { z } from 'zod';
import { supabase, getStorageUrl } from './supabase';

// Ensure external profile links are absolute (DB rows often store "linkedin.com/in/name"
// without a protocol, which the browser would resolve relative to our own domain).
function externalUrl(url: string | undefined | null): string {
  const trimmed = (url ?? '').trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed.replace(/^\/+/, '')}`;
}

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
    // Each milestone: a label, an ISO date (YYYY-MM-DD), and an optional
    // location shown under the label. Past/future styling and the
    // "We are here" marker are computed automatically from today's date.
    milestones: z.array(z.object({
      label: z.string(),
      date: z.string(),
      location: z.string().optional(),
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
  isLead: z.boolean(),
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

// Enhanced sponsor data with tier grouping for the sponsor page
export type SponsorWithTier = {
  name: string;
  logo: string;
  url: string;
  blurb: string;
  whiteOnDark: boolean;
  tierName: string;
  tierSlug: string;
  displayOrder: number;
};

export type MarqueeSponsor = {
  name: string;
  logo: string;
  url: string;
};

export type SponsorsPageData = {
  corporateSponsors: SponsorWithTier[];
  individualDonors: SponsorWithTier[];
  marqueeSponsors: MarqueeSponsor[];
  individualSponsors: MarqueeSponsor[];
  callToAction: {
    headline: string;
    copy: string;
    email: string;
  };
};

type SponsorPriority = { name: string; aliases: string[]; logo: string };

/** Company logos in the /sponsors marquee. CMU is omitted — the school is not a sponsor. */
const COMPANY_PRIORITY: SponsorPriority[] = [
  { name: 'Gecko Robotics', aliases: [], logo: '/images/sponsors/marquee/gecko-robotics.png' },
  { name: 'Gleason', aliases: [], logo: '/images/sponsors/marquee/gleason.png' },
  { name: 'AirLab', aliases: ['Airlab'], logo: '/images/sponsors/marquee/airlab.png' },
  { name: 'Shield AI', aliases: [], logo: '/images/sponsors/marquee/shield-ai.png' },
  { name: 'Lockheed Martin', aliases: [], logo: '/images/sponsors/marquee/lockheed-martin.png' },
  { name: 'SICK', aliases: [], logo: '/images/sponsors/marquee/sick.png' },
  { name: 'Ford', aliases: [], logo: '/images/sponsors/marquee/ford.png' },
  { name: 'XSens', aliases: ['Xsens Technologies', 'Xsens'], logo: '/images/sponsors/marquee/xsens.png' },
  { name: 'SendCutSend', aliases: [], logo: '/images/sponsors/marquee/sendcutsend.png' },
  { name: 'Ansys', aliases: [], logo: '/images/sponsors/marquee/ansys.png' },
  { name: 'KISSsoft', aliases: ['Kisssoft'], logo: '/images/sponsors/marquee/kisssoft.png' },
  { name: 'Onshape', aliases: [], logo: '/images/sponsors/marquee/onshape.png' },
];

/** People listed under the marquee, in the order they used to appear among the logos. */
const PERSON_PRIORITY: SponsorPriority[] = [
  {
    name: 'Clint Kelley',
    aliases: ['Dr. Clinton W. Kelly III', 'Clinton W. Kelly III', 'Clint Kelly'],
    logo: '/images/sponsors/people/clint-kelley.png',
  },
  {
    name: 'Red Whittaker',
    aliases: ['Prof. Red Whittaker', 'William Whittaker'],
    logo: '/images/sponsors/people/red-whittaker.png',
  },
  { name: 'Wenshan Wang', aliases: [], logo: '/images/sponsors/people/wenshan-wang.png' },
  {
    name: 'Howie Choset',
    aliases: ['Prof. Howie Choset', 'Howie Choset'],
    logo: '',
  },
];

/** Matched and dropped so they never fall into the alphabetical tail. */
const EXCLUDED_SPONSORS: { name: string; aliases: string[] }[] = [
  { name: 'Carnegie Mellon University', aliases: ['CMU'] },
];

function namesMatch(a: string, b: string): boolean {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

function takeMatch(rows: MarqueeSponsor[], used: Set<number>, entry: { name: string; aliases: string[] }) {
  const idx = rows.findIndex(
    (r, i) =>
      !used.has(i) &&
      (namesMatch(r.name, entry.name) || entry.aliases.some((alias) => namesMatch(r.name, alias)))
  );
  if (idx >= 0) used.add(idx);
  return idx;
}

function orderSponsors(rows: MarqueeSponsor[]): {
  companies: MarqueeSponsor[];
  people: MarqueeSponsor[];
} {
  const used = new Set<number>();

  const companies = COMPANY_PRIORITY.map((entry) => {
    const idx = takeMatch(rows, used, entry);
    if (idx >= 0) return { ...rows[idx], name: entry.name, logo: entry.logo };
    return { name: entry.name, logo: entry.logo, url: '#' };
  });

  const people = PERSON_PRIORITY.map((entry) => {
    const idx = takeMatch(rows, used, entry);
    if (idx >= 0) return { ...rows[idx], name: entry.name, logo: entry.logo };
    return { name: entry.name, logo: entry.logo, url: '#' };
  });

  for (const entry of EXCLUDED_SPONSORS) takeMatch(rows, used, entry);

  const remaining = rows
    .filter((r, i) => !used.has(i) && Boolean(r.logo))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

  return { companies: [...companies, ...remaining], people };
}

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
    links: (() => {
      const raw = (row.links as { linkedin?: string; github?: string; website?: string; instagram?: string }) || {};
      return {
        linkedin: externalUrl(raw.linkedin),
        github: externalUrl(raw.github),
        website: externalUrl(raw.website),
        instagram: externalUrl(raw.instagram),
      };
    })(),
    bio: row.bio || '',
    tags: (row.tags as string[]) || [],
    isLead: Boolean(row.is_lead),
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
    url: row.url ? externalUrl(row.url) : '#',
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

export async function getSponsorsPageData(): Promise<SponsorsPageData> {
  const { data, error } = await supabase
    .from('sponsors')
    .select('*, sponsor_tiers(name, slug)')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Failed to fetch sponsors from Supabase:', error);
    // Return empty fallback so the page still renders
    const emptySponsors = orderSponsors([]);
    return {
      corporateSponsors: [],
      individualDonors: [],
      marqueeSponsors: emptySponsors.companies,
      individualSponsors: emptySponsors.people,
      callToAction: {
        headline: 'Support CMU MoonMiners',
        copy: 'Help us push lunar robotics forward. Contact us for our sponsorship prospectus.',
        email: 'moonminers@andrew.cmu.edu',
      },
    };
  }

  const rows = data || [];

  const allSponsors: SponsorWithTier[] = rows.map((row) => {
    const tier = row.sponsor_tiers as { name: string; slug: string } | null;
    return {
      name: row.name,
      logo: getStorageUrl(typeof row.logo_path === 'string' ? row.logo_path.trim() : row.logo_path),
      url: row.url ? externalUrl(row.url) : '#',
      blurb: row.blurb || '',
      whiteOnDark: row.white_on_dark || false,
      tierName: tier?.name || 'Sponsor',
      tierSlug: tier?.slug || 'sponsor',
      displayOrder: row.display_order ?? 0,
    };
  });

  // The tier with slug "individual" holds personal donors; everything else is corporate
  const corporateSponsors = allSponsors.filter((s) => s.tierSlug !== 'individual');
  const individualDonors = allSponsors.filter((s) => s.tierSlug === 'individual');

  // Find the first sponsor with CTA fields filled
  const ctaRow = rows.find((row) => row.cta_headline && row.cta_copy && row.cta_email);
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

  const ordered = orderSponsors(
    allSponsors.map((s) => ({ name: s.name, logo: s.logo, url: s.url }))
  );

  return {
    corporateSponsors,
    individualDonors,
    marqueeSponsors: ordered.companies,
    individualSponsors: ordered.people,
    callToAction,
  };
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
    linkedin: z.string().optional(),
    email: z.string().optional(),
    wikipedia: z.string().optional(),
    google_scholar: z.string().optional(),
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
    links: (() => {
      const raw = (row.links as {
        website?: string;
        linkedin?: string;
        email?: string;
        wikipedia?: string;
        google_scholar?: string;
      }) || {};
      return {
        website: externalUrl(raw.website),
        linkedin: externalUrl(raw.linkedin),
        email: raw.email ?? '',
        wikipedia: externalUrl(raw.wikipedia),
        google_scholar: externalUrl(raw.google_scholar),
      };
    })(),
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
  featured: z.boolean(),
  link: z.string().url().or(z.literal('')).optional(),
  linkLabel: z.string().optional(),
  links: z.array(z.object({
    url: z.string().url(),
    label: z.string(),
  })).optional(),
  team: z.string().optional(),
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
      featured: row.featured ?? false,
      link: firstLink?.url || '',
      linkLabel: firstLink?.label || '',
      links: links,
      team: row.team || undefined,
    };
  });

  return z.array(UpdateSchema).parse(updates);
}

export async function getUpdateBySlug(slug: string): Promise<Update | null> {
  const { data: row, error } = await supabase
    .from('updates')
    .select('*')
    .eq('published', true)
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  if (!row) return null;

  const links = (row.links as Array<{ url: string; label: string }>) || [];
  const firstLink = links[0];

  return UpdateSchema.parse({
    id: row.slug,
    title: row.title,
    date: row.date,
    category: row.category,
    summary: row.summary,
    images: ((row.images as string[]) || []).map((img) => getStorageUrl(img)),
    content: row.content || '',
    tags: (row.tags as string[]) || [],
    featured: row.featured ?? false,
    link: firstLink?.url || '',
    linkLabel: firstLink?.label || '',
    links: links,
    team: row.team || undefined,
  });
}
