-- Mailing list table for footer signups.
-- Run once in the Supabase dashboard: SQL Editor → paste → Run.

create table if not exists public.mailing_list (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  created_at timestamptz not null default now()
);

alter table public.mailing_list enable row level security;

-- Anyone may sign up (insert only — no public read/update/delete).
create policy "anyone can subscribe"
  on public.mailing_list
  for insert
  to anon
  with check (true);
