with open('/Users/a1/Website/src/components/MentorCard.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "            {hasLink(mentor.links.wikipedia ?? '') && (\n              \n                href={mentor.links.wikipedia ?? '#'}",
    "            {hasLink(mentor.links.wikipedia ?? '') && (\n              <a\n                href={mentor.links.wikipedia ?? '#'}"
)
content = content.replace(
    "            {hasLink(mentor.links.google_scholar ?? '') && (\n              \n                href={mentor.links.google_scholar ?? '#'}",
    "            {hasLink(mentor.links.google_scholar ?? '') && (\n              <a\n                href={mentor.links.google_scholar ?? '#'}"
)
content = content.replace(
    "            {hasLink(mentor.links.website) && (\n              \n                href={mentor.links.website!}",
    "            {hasLink(mentor.links.website) && (\n              <a\n                href={mentor.links.website!}"
)
content = content.replace(
    "            {hasLink(mentor.links.linkedin) && (\n              \n                href={mentor.links.linkedin!}",
    "            {hasLink(mentor.links.linkedin) && (\n              <a\n                href={mentor.links.linkedin!}"
)
content = content.replace(
    "            {mentor.links.email && (\n              \n                href={`mailto:${mentor.links.email}`}",
    "            {mentor.links.email && (\n              <a\n                href={`mailto:${mentor.links.email}`}"
)

with open('/Users/a1/Website/src/components/MentorCard.tsx', 'w') as f:
    f.write(content)

print('Done')