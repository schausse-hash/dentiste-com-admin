-- Run this in Supabase SQL editor
-- Table: public.pages
create table if not exists public.pages (
  slug text primary key,
  title text,
  content_md text not null default '',
  updated_at timestamptz not null default now()
);

-- Keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_pages_updated_at on public.pages;
create trigger trg_pages_updated_at
before update on public.pages
for each row execute function public.set_updated_at();

-- RLS
alter table public.pages enable row level security;

-- Public can read
drop policy if exists "Public read pages" on public.pages;
create policy "Public read pages"
  on public.pages
  for select
  to anon, authenticated
  using (true);

-- Only authenticated users can insert/update/delete
drop policy if exists "Auth write pages" on public.pages;
create policy "Auth write pages"
  on public.pages
  for all
  to authenticated
  using (true)
  with check (true);
