-- Atomic view count increment — avoids read-modify-write race condition
create or replace function increment_view_count(inv_slug text)
returns void
language sql
security definer
as $$
  update invitations
  set view_count = coalesce(view_count, 0) + 1
  where slug = inv_slug;
$$;
