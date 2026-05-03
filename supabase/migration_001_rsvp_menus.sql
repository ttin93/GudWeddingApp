-- Run this in Supabase SQL Editor → SQL Editor → New query

-- 1. Per-person menu choices (array of {label, menu} objects)
ALTER TABLE rsvp_responses
  ADD COLUMN IF NOT EXISTS guest_menus JSONB DEFAULT NULL;

-- 2. Children ages field
ALTER TABLE rsvp_responses
  ADD COLUMN IF NOT EXISTS children_ages TEXT DEFAULT NULL;

-- 3. RSVP mode on invitation: 'form' | 'contact' | 'both'
ALTER TABLE invitations
  ADD COLUMN IF NOT EXISTS rsvp_mode TEXT DEFAULT 'form'
    CHECK (rsvp_mode IN ('form', 'contact', 'both'));

-- 4. Add extra invitation fields that may be missing
ALTER TABLE invitations
  ADD COLUMN IF NOT EXISTS story TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS hashtag TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS contact_name TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS contact_phone TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS contact_email TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS children_policy TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS transport_notes TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS accommodation JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS gift_registry JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS faq JSONB DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS music_playlist_url TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS labels JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS show_story BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS show_program BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS show_dress_code BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS show_children_policy BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS show_hashtag BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS show_music BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS show_contact BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS show_transport BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS show_accommodation BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS show_gift_registry BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS show_faq BOOLEAN DEFAULT false;
