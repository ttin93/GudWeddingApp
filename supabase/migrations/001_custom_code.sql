-- Migration: Add custom code columns for Signature package
-- Run this in your Supabase SQL Editor

ALTER TABLE invitations
  ADD COLUMN IF NOT EXISTS custom_css TEXT,
  ADD COLUMN IF NOT EXISTS custom_js TEXT,
  ADD COLUMN IF NOT EXISTS custom_head_html TEXT;

-- To set a user as Super Admin, run:
--   UPDATE auth.users
--   SET raw_user_meta_data = raw_user_meta_data || '{"is_admin": true}'::jsonb
--   WHERE email = 'your@email.com';
