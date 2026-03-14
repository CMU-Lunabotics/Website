import Image from 'next/image';
import { Mentor } from '@/lib/content';
import { getStorageUrl } from '@/lib/supabase';
import { cn } from '@/lib/utils';

interface MentorCardProps {
  mentor: Mentor;
}

const DEFAULT_ADVISOR_PHOTO = 'mentors/zhang-ji.jpg';

export function MentorCard({ mentor }: MentorCardProps) {
  const photoSrc = mentor.photo || getStorageUrl(DEFAULT_ADVISOR_PHOTO);

  const hasLink = (url: string | undefined) => url && url.trim() !== '';

  return (
    <article
      className={cn(
        'flex w-full max-w-[410px] flex-col overflow-hidden',
        'bg-black'
      )}
    >
      <div className="relative h-[360px] w-full shrink-0">
        <Image
          src={photoSrc}
          alt={`Portrait of ${mentor.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 410px"
        />
      </div>

      <div className="flex flex-col gap-4 px-4 pb-5 pt-4">
        <p className="text-base text-[#9f9f9f]">{mentor.title}</p>

        <p className="text-[36px] font-semibold leading-[100%] text-white">
          {mentor.name}
        </p>

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-3">
            {hasLink(mentor.links.wikipedia ?? '') && (
              
                href={mentor.links.wikipedia ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white underline underline-offset-2 hover:text-white/80"
              >
                Wikipedia
              </a>
            )}
            {hasLink(mentor.links.google_scholar ?? '') && (
              
                href={mentor.links.google_scholar ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white underline underline-offset-2 hover:text-white/80"
              >
                Google Scholar
              </a>
            )}
            {hasLink(mentor.links.website) && (
              
                href={mentor.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white underline underline-offset-2 hover:text-white/80"
              >
                Website
              </a>
            )}
            {hasLink(mentor.links.linkedin) && (
              
                href={mentor.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white underline underline-offset-2 hover:text-white/80"
              >
                LinkedIn
              </a>
            )}
            {mentor.links.email && (
              
                href={`mailto:${mentor.links.email}`}
                className="text-sm text-white underline underline-offset-2 hover:text-white/80"
              >
                Email
              </a>
            )}
          </div>
          {mentor.bio && (
            <p className="text-base leading-normal text-white">{mentor.bio}</p>
          )}
        </div>

        {mentor.expertise.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {mentor.expertise.map((skill) => (
              <span
                key={skill}
                className="rounded-[20px] bg-white/10 px-3.5 py-2.5 text-sm font-medium text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}