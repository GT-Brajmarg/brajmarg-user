-- ============================================================
-- CONTACT MESSAGES
-- Stores submissions from the public /contact form.
-- Anonymous users can INSERT only; reads are restricted to
-- authenticated admins (handle in admin panel as needed).
-- Run this in Supabase SQL Editor.
-- ============================================================

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  user_id uuid references auth.users(id) on delete set null,
  user_agent text,
  ip_address text,
  status text not null default 'new'
    check (status in ('new', 'read', 'responded', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

create index if not exists contact_messages_status_idx
  on public.contact_messages (status);

alter table public.contact_messages enable row level security;

-- Anyone (including anon) may submit a message
drop policy if exists "Anyone can submit contact message"
  on public.contact_messages;
create policy "Anyone can submit contact message"
  on public.contact_messages for insert
  with check (true);

-- Only the original submitter (when authenticated) can read their own row.
-- Admin reads should go through the service-role key in your admin panel.
drop policy if exists "Submitter can read own messages"
  on public.contact_messages;
create policy "Submitter can read own messages"
  on public.contact_messages for select
  using (auth.uid() is not null and auth.uid() = user_id);
