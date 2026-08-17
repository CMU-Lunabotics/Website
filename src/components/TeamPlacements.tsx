import { Section } from '@/components/Section';

// Per-logo heights compensate for differing amounts of built-in padding in the source marks.
const COMPANIES: { name: string; logo?: string; className?: string }[] = [
  { name: 'Tesla', logo: '/logos/tesla.svg', className: 'h-14' },
  { name: 'Blue Origin', logo: '/logos/blue-origin.svg', className: 'h-6' },
  { name: 'Stanford', logo: '/logos/stanford.svg', className: 'h-7' },
  { name: 'Anduril' }, // no clean vector mark available — rendered as a wordmark
  { name: 'Apple', logo: '/logos/apple.svg', className: 'h-10' },
  { name: 'AWS', logo: '/logos/aws.svg', className: 'h-10' },
  { name: 'Ford', logo: '/logos/ford.svg', className: 'h-12' },
  { name: 'Stripe', logo: '/logos/stripe.svg', className: 'h-10' },
  { name: 'Siemens', logo: '/logos/siemens.svg', className: 'h-12' },
];

export function TeamPlacements() {
  return (
    <Section
      id="placements"
      title="Where Moon Miners Land"
      subtitle="Our members and alumni go on to build at the frontier — from launch vehicles to autonomous systems."
      headerAlign="left"
      titleSize="advisors"
      subtitleSize="advisors"
    >
      <div className="flex flex-wrap lg:flex-nowrap items-center lg:justify-between gap-x-8 gap-y-8">
        {COMPANIES.map(({ name, logo, className }) =>
          logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={name}
              src={logo}
              alt={name}
              className={`${className ?? 'h-10'} w-auto brightness-0 invert opacity-55 hover:opacity-90 transition-opacity duration-200`}
            />
          ) : (
            <span
              key={name}
              className="text-lg lg:text-xl font-bold uppercase tracking-[0.25em] text-starlight opacity-55 hover:opacity-90 transition-opacity duration-200 select-none whitespace-nowrap"
            >
              {name}
            </span>
          )
        )}
      </div>
    </Section>
  );
}
