import Link from 'next/link';
import { Instagram, Linkedin, Youtube, Rocket } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { MailingListForm } from '@/components/MailingListForm';

const LINK_COLUMNS = [
  {
    title: 'Team',
    links: [
      { label: 'Our Story', href: '/about' },
      { label: 'Our Team', href: '/team' },
    ],
  },
  {
    title: 'Sponsors',
    links: [
      { label: 'Partner', href: '/sponsors' },
      { label: 'Donate', href: '/donate' },
    ],
  },
  {
    title: 'Updates',
    links: [
      { label: 'News', href: '/updates' },
      { label: 'Submit an Update', href: '/login' },
    ],
  },
];

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/cmumoonminers', Icon: Instagram },
  { label: 'YouTube', href: 'https://www.youtube.com/@cmumoonminers', Icon: Youtube },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/cmu-moon-miners/', Icon: Linkedin },
];

export const Footer = () => {
  return (
    <footer className="relative z-[1] mt-16 border-t border-titanium/20 bg-deep-space/80 backdrop-blur-sm">
      {/* Cosmic accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #33204F 25%, #C41230 50%, #33204F 75%, transparent 100%)',
        }}
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-14">
        {/* Top: brand + links + newsletter */}
        <div className="flex flex-wrap items-start justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" aria-label="Moon Miners home">
              <Logo size="md" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-moon-dust">
              Carnegie Mellon University&apos;s student team building autonomous lunar
              excavation robotics for the NASA Lunabotics Challenge.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-sm border border-titanium/30 text-moon-dust transition-colors hover:border-supernova/60 hover:text-starlight"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-12">
            {LINK_COLUMNS.map((col) => (
              <div key={col.title} className="flex min-w-[100px] flex-col gap-2">
                <h3 className="mb-1 text-sm font-bold uppercase tracking-[0.2em] text-starlight">
                  {col.title}
                </h3>
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-moon-dust transition-colors hover:text-supernova"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="w-full max-w-sm border border-titanium/30 bg-void/60 p-6 clip-corner-sm">
            <h2 className="text-lg font-bold text-starlight">Mailing List</h2>
            <p className="mt-1 text-sm text-moon-dust">Stay informed on our mission.</p>
            <MailingListForm />
          </div>
        </div>

        {/* Bottom: contact + NASA */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-titanium/20 pt-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-starlight">
              Contact
            </h3>
            <a
              href="mailto:moonminers@cmu.edu"
              className="mt-1 block text-sm text-moon-dust transition-colors hover:text-supernova"
            >
              moonminers@cmu.edu
            </a>
          </div>

          <div className="flex items-center gap-2.5 text-moon-dust">
            <Rocket className="h-5 w-5 text-supernova" aria-hidden />
            <p className="text-sm">NASA Lunabotics Challenge</p>
          </div>
        </div>

        <div className="mt-10 text-center text-xs tracking-wide text-titanium">
          <span className="text-tartan">—</span> CMU Moon Miners © 2026{' '}
          <span className="text-tartan">—</span>
        </div>
      </div>
    </footer>
  );
};
