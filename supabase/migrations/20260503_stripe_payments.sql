-- payments table
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  invitation_id uuid references invitations(id) on delete set null,
  stripe_session_id text unique,
  stripe_payment_id text,
  package text not null,
  amount integer not null,   -- cents
  currency text not null default 'eur',
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table payments enable row level security;

-- Users can only see their own payments
create policy "users read own payments"
  on payments for select
  using (auth.uid() = user_id);

-- Service role inserts (from webhook)
create policy "service inserts payments"
  on payments for insert
  with check (true);

-- active_until on invitations (idempotent)
alter table invitations
  add column if not exists active_until timestamptz;

-- Index for webhook lookups
create index if not exists payments_user_id_idx on payments(user_id);
create index if not exists payments_invitation_id_idx on payments(invitation_id);
