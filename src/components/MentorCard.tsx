import Image from "next/image";
import { Mentor } from "@/lib/content";
import { getStorageUrl } from "@/lib/supabase";
import { cn } from "@/lib/utils";

interface MentorCardProps {
  mentor: Mentor;
}

const DEFAULT_ADVISOR_PHOTO = "mentors/zhang-ji.jpg";

export function MentorCard({ mentor }: MentorCardProps) {
  const photoSrc = mentor.photo || getStorageUrl(DEFAULT_ADVISOR_PHOTO);

  const hasLink = (url: string | undefined) => url && url.trim() !== "";

  return (
    <article
      className={cn(
        "flex w-full max-w-[410px] flex-col overflow-hidden",
        "card-cosmic clip-corner-sm"
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
        <p className="text-base text-moon-dust">{mentor.title}</p>
        <p className="text-[36px] font-semibold leading-[100%] text-starlight">
          {mentor.name}
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-3">
            {hasLink(mentor.links.wikipedia ?? "") && (
              <a
                href={mentor.links.wikipedia ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-supernova underline underline-offset-2 hover:text-starlight"
              >
                Wikipedia
              </a>
            )}
            {hasLink(mentor.links.google_scholar ?? "") && (
              <a
                href={mentor.links.google_scholar ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-supernova underline underline-offset-2 hover:text-starlight"
              >
                Google Scholar
              </a>
            )}
            {hasLink(mentor.links.website) && (
              <a
                href={mentor.links.website!}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-supernova underline underline-offset-2 hover:text-starlight"
              >
                Website
              </a>
            )}
            {hasLink(mentor.links.linkedin) && (
              <a
                href={mentor.links.linkedin!}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-supernova underline underline-offset-2 hover:text-starlight"
              >
                LinkedIn
              </a>
            )}
            {mentor.links.email && (
              <a
                href={`mailto:${mentor.links.email}`}
                className="text-sm text-supernova underline underline-offset-2 hover:text-starlight"
              >
                Email
              </a>
            )}
          </div>
          {mentor.bio && (
            <p className="text-base leading-normal text-moon-dust">{mentor.bio}</p>
          )}
        </div>
        {mentor.expertise.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {mentor.expertise.map((skill) => (
              <span
                key={skill}
                className="rounded-[20px] bg-plum/50 px-3.5 py-2.5 text-sm font-medium text-starlight"
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
