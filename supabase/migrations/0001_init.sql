-- Ussly admin schema
-- Tables: briefs, availability (single-row), portfolio, testimonials

create extension if not exists "pgcrypto";

-- ─── BRIEFS ────────────────────────────────────────────────────────────────
create type brief_status as enum ('new', 'replied', 'archived');

create table public.briefs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  project text,
  budget text,
  message text not null,
  status brief_status not null default 'new',
  notes text
);

create index briefs_created_at_idx on public.briefs (created_at desc);
create index briefs_status_idx on public.briefs (status);

-- ─── AVAILABILITY (single row, id = 1) ─────────────────────────────────────
create table public.availability (
  id smallint primary key default 1,
  is_open boolean not null default true,
  booking_label text not null default 'Booking Q3 2026',
  slots_left smallint not null default 1,
  next_open_label text not null default 'Next open · Oct',
  after_label text not null default 'After: closed til 2027',
  updated_at timestamptz not null default now(),
  constraint availability_singleton check (id = 1)
);

insert into public.availability (id) values (1) on conflict do nothing;

-- ─── PORTFOLIO ─────────────────────────────────────────────────────────────
create table public.portfolio (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  sort_order int not null default 0,
  num text not null,
  year text not null,
  title text not null,
  italic text not null,
  description text not null,
  role text[] not null default '{}',
  palette text[] not null default '{}',
  accent text not null,
  url text not null,
  domain text not null,
  published boolean not null default true
);

create index portfolio_sort_idx on public.portfolio (sort_order);

-- ─── TESTIMONIALS ──────────────────────────────────────────────────────────
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  sort_order int not null default 0,
  quote text not null,
  name text not null,
  role text not null,
  org text not null,
  accent text not null default 'text-accent',
  published boolean not null default true
);

create index testimonials_sort_idx on public.testimonials (sort_order);

-- ─── ADMIN ALLOWLIST ───────────────────────────────────────────────────────
create table public.admin_emails (
  email text primary key
);

-- Helper: is the current authed user an admin?
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_emails ae
    where ae.email = (auth.jwt() ->> 'email')
  );
$$;

-- ─── RLS ────────────────────────────────────────────────────────────────────
alter table public.briefs        enable row level security;
alter table public.availability  enable row level security;
alter table public.portfolio     enable row level security;
alter table public.testimonials  enable row level security;
alter table public.admin_emails  enable row level security;

-- Public read where it makes sense
create policy "availability public read"
  on public.availability for select using (true);

create policy "portfolio public read"
  on public.portfolio for select using (published = true);

create policy "testimonials public read"
  on public.testimonials for select using (published = true);

-- Admin full access (via is_admin())
create policy "briefs admin all"        on public.briefs       for all using (public.is_admin()) with check (public.is_admin());
create policy "availability admin all"  on public.availability for all using (public.is_admin()) with check (public.is_admin());
create policy "portfolio admin all"     on public.portfolio    for all using (public.is_admin()) with check (public.is_admin());
create policy "testimonials admin all"  on public.testimonials for all using (public.is_admin()) with check (public.is_admin());
create policy "admin_emails admin all"  on public.admin_emails for all using (public.is_admin()) with check (public.is_admin());

-- Briefs are inserted by the public (contact form) via the service-role key on the server,
-- which bypasses RLS — no anon insert policy needed.
