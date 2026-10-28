-- Per-post choice: tile only, or a public article at /updates/[slug].
alter table public.updates
  add column if not exists detailed_view boolean not null default false;

-- Existing posts that already have a body stay as articles.
update public.updates
set detailed_view = true
where content is not null
  and length(btrim(content)) > 0;
