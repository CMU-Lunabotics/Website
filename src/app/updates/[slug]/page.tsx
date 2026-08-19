import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import { getUpdateBySlug } from '@/lib/content';

interface UpdatePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: UpdatePageProps) {
  const { slug } = await params;
  const update = await getUpdateBySlug(slug);
  if (!update) return {};
  return {
    title: `${update.title} - CMU MoonMiners`,
    description: update.summary,
  };
}

export default async function UpdateDetailPage({ params }: UpdatePageProps) {
  const { slug } = await params;
  const update = await getUpdateBySlug(slug);
  if (!update) notFound();

  return (
    <article className="relative pt-32 pb-20 lg:pb-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/updates"
          className="inline-flex items-center gap-2 text-sm text-moon-dust hover:text-starlight transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          All updates
        </Link>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="font-display font-semibold text-sm px-3 py-1 rounded-full bg-tartan text-starlight">
            {update.team ? update.team : 'All'}
          </span>
          <span className="font-display font-semibold text-sm px-4 py-1 rounded-full border border-titanium/50 text-moon-dust">
            {update.category}
          </span>
        </div>

        {/* Title + date */}
        <h1 className="text-4xl sm:text-5xl font-display font-semibold text-starlight leading-tight">
          {update.title}
        </h1>
        <div className="mt-4 flex items-center text-sm text-moon-dust">
          <Calendar className="mr-1.5 h-3.5 w-3.5" />
          {new Date(update.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>

        {/* Summary lede */}
        <p className="mt-6 text-lg text-moon-dust leading-relaxed">{update.summary}</p>

        <div className="cosmic-rule my-10" aria-hidden />

        {/* Images */}
        {update.images.length > 0 && (
          <div className="space-y-6 mb-10">
            {update.images.map((src, i) => (
              <div
                key={src}
                className="relative w-full aspect-[16/9] overflow-hidden bg-deep-space border border-titanium/30"
                style={{ clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)' }}
              >
                <Image
                  src={src}
                  alt={`${update.title} — image ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 896px"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        )}

        {/* Full content */}
        {update.content ? (
          <div className="text-moon-dust text-base leading-relaxed whitespace-pre-line">
            {update.content}
          </div>
        ) : (
          <p className="text-moon-dust/60 italic">No additional details for this update.</p>
        )}

        {/* External links */}
        {update.links && update.links.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-3">
            {update.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-titanium/50 text-starlight px-5 py-2.5 text-sm hover:border-supernova/70 hover:bg-supernova/10 transition-all"
              >
                {l.label}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        )}

        {/* Tags */}
        {update.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {update.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-plum/40 text-moon-dust"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
