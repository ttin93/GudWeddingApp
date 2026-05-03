-- Photo gallery table
create table if not exists invitation_photos (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references invitations(id) on delete cascade,
  storage_path text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table invitation_photos enable row level security;

create policy "users manage own photos"
  on invitation_photos for all
  using (
    invitation_id in (
      select id from invitations where user_id = auth.uid()
    )
  );

-- Storage bucket for invitation photos (run separately in Supabase dashboard if needed)
-- insert into storage.buckets (id, name, public) values ('invitation-photos', 'invitation-photos', true)
-- on conflict do nothing;

create index if not exists invitation_photos_invitation_id_idx on invitation_photos(invitation_id);
create index if not exists invitation_photos_order_idx on invitation_photos(invitation_id, display_order);
