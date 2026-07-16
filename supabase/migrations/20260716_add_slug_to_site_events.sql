-- Add slug column to site_events table
alter table public.site_events
add column slug text unique;

-- Create a function to generate a slug from title
create or replace function public.generate_slug(title text)
returns text
language sql
immutable
as $$
  select regexp_replace(
    lower(
      trim(
        regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g')
      )
    ),
    '\s+', '-', 'g'
  );
$$;
