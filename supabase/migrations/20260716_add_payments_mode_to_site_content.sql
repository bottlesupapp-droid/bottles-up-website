alter table public.site_content
add column if not exists payments_mode text not null default 'test'
check (payments_mode in ('test', 'live'));
