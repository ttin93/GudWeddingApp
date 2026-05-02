-- Migration: Add extra invitation fields
-- Run in Supabase SQL Editor

ALTER TABLE invitations
  ADD COLUMN IF NOT EXISTS story TEXT,
  ADD COLUMN IF NOT EXISTS hashtag TEXT,
  ADD COLUMN IF NOT EXISTS contact_name TEXT,
  ADD COLUMN IF NOT EXISTS contact_phone TEXT,
  ADD COLUMN IF NOT EXISTS contact_email TEXT,
  ADD COLUMN IF NOT EXISTS children_policy TEXT,
  ADD COLUMN IF NOT EXISTS transport_notes TEXT,
  ADD COLUMN IF NOT EXISTS music_playlist_url TEXT,
  ADD COLUMN IF NOT EXISTS accommodation JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS gift_registry JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS faq JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS labels JSONB;
