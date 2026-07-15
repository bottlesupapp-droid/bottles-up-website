-- BottlesUp website CMS schema: events, ticket sales, VIP list, editable site content.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table public.cms_admins (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

-- Named site_events/site_ticket_tiers/site_orders (not events/ticket_tiers/orders): this
-- Supabase project is shared with the BottlesUp mobile app, which already owns tables named
-- "events" and others in that namespace. Prefixed to avoid colliding with the app's schema.
create table public.site_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  venue_name text not null,
  address text,
  start_date timestamptz not null,
  end_date timestamptz,
  cover_image_url text,
  gallery text[] not null default '{}',
  category text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  capacity int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_ticket_tiers (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.site_events(id) on delete cascade,
  name text not null,
  price_cents int not null check (price_cents >= 0),
  currency text not null default 'cad',
  capacity int not null check (capacity >= 0),
  sold_count int not null default 0 check (sold_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_orders (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.site_events(id),
  tier_id uuid not null references public.site_ticket_tiers(id),
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  quantity int not null check (quantity > 0),
  amount_total_cents int not null check (amount_total_cents >= 0),
  currency text not null default 'cad',
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded')),
  ticket_code text unique,
  ticket_sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.vip_emails (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text,
  last_name text,
  source text not null default 'website',
  mailchimp_synced boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.site_content (
  id int primary key default 1 check (id = 1),
  contact_email text,
  contact_phone text,
  address text,
  social_instagram text,
  social_twitter text,
  social_facebook text,
  social_linkedin text,
  footer_tagline text,
  hero_headline text,
  hero_subtext text,
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- updated_at trigger
-- ---------------------------------------------------------------------------
-- public.set_updated_at() already exists on this shared project (used by the mobile
-- app's own tables) with the exact same body - reused here rather than redefined.

create trigger site_events_set_updated_at before update on public.site_events
  for each row execute function public.set_updated_at();
create trigger site_ticket_tiers_set_updated_at before update on public.site_ticket_tiers
  for each row execute function public.set_updated_at();
create trigger site_orders_set_updated_at before update on public.site_orders
  for each row execute function public.set_updated_at();
create trigger site_content_set_updated_at before update on public.site_content
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Atomic tier sold-count increment (avoids a read-modify-write race between
-- concurrent webhook fulfillments for the same tier)
-- ---------------------------------------------------------------------------

create or replace function public.increment_tier_sold(p_tier_id uuid, p_qty int)
returns void
language sql
as $$
  update public.site_ticket_tiers set sold_count = sold_count + p_qty where id = p_tier_id;
$$;

-- ---------------------------------------------------------------------------
-- Admin allow-list helper
-- ---------------------------------------------------------------------------

create or replace function public.is_cms_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (select 1 from public.cms_admins where id = auth.uid());
$$;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.cms_admins enable row level security;
alter table public.site_events enable row level security;
alter table public.site_ticket_tiers enable row level security;
alter table public.site_orders enable row level security;
alter table public.vip_emails enable row level security;
alter table public.site_content enable row level security;

create policy "admins read cms_admins" on public.cms_admins
  for select using (public.is_cms_admin());

create policy "public read published events" on public.site_events
  for select using (status = 'published' or public.is_cms_admin());
create policy "admins manage events" on public.site_events
  for all using (public.is_cms_admin()) with check (public.is_cms_admin());

create policy "public read tiers for published events" on public.site_ticket_tiers
  for select using (
    public.is_cms_admin()
    or exists (select 1 from public.site_events e where e.id = event_id and e.status = 'published')
  );
create policy "admins manage tiers" on public.site_ticket_tiers
  for all using (public.is_cms_admin()) with check (public.is_cms_admin());

-- orders: no anon/authenticated insert or delete policy at all - rows are only ever
-- written by edge functions using the service_role key, which bypasses RLS entirely.
create policy "admins read orders" on public.site_orders
  for select using (public.is_cms_admin());
create policy "admins update orders" on public.site_orders
  for update using (public.is_cms_admin()) with check (public.is_cms_admin());

-- vip_emails: same pattern - inserts only via the vip-subscribe edge function (service_role).
create policy "admins read vip emails" on public.vip_emails
  for select using (public.is_cms_admin());

create policy "public read site content" on public.site_content
  for select using (true);
create policy "admins update site content" on public.site_content
  for update using (public.is_cms_admin()) with check (public.is_cms_admin());

-- ---------------------------------------------------------------------------
-- Storage: event media (public read, admin write)
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('event-media', 'event-media', true)
on conflict (id) do nothing;

create policy "public read event media" on storage.objects
  for select using (bucket_id = 'event-media');
create policy "admins upload event media" on storage.objects
  for insert with check (bucket_id = 'event-media' and public.is_cms_admin());
create policy "admins update event media" on storage.objects
  for update using (bucket_id = 'event-media' and public.is_cms_admin());
create policy "admins delete event media" on storage.objects
  for delete using (bucket_id = 'event-media' and public.is_cms_admin());

-- ---------------------------------------------------------------------------
-- Seed default site content (matches current hardcoded Footer/Header copy)
-- ---------------------------------------------------------------------------

insert into public.site_content (
  id, contact_email, contact_phone, address,
  social_instagram, social_twitter, social_facebook, social_linkedin,
  footer_tagline, hero_headline, hero_subtext
) values (
  1, 'hello@bottlesup.to', '+14169999999', 'Toronto, ON, Canada',
  'https://www.instagram.com/bottlesupapp?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
  'https://twitter.com/bottlesup_to',
  'https://facebook.com/bottlesup.toronto',
  'https://linkedin.com/company/bottlesup-toronto',
  E'Toronto\'s premier nightlife app for VIP bookings and digital tickets. Elevating your night out experience across the city.',
  null, null
)
on conflict (id) do nothing;
