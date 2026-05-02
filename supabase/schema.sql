-- Run this in your Supabase SQL Editor

-- INVITATIONS
CREATE TABLE IF NOT EXISTS invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,

  partner1_name TEXT NOT NULL,
  partner2_name TEXT NOT NULL,
  wedding_date DATE NOT NULL,

  template_id TEXT NOT NULL DEFAULT 'botanica',

  venue_name TEXT,
  venue_address TEXT,
  venue_lat DECIMAL,
  venue_lng DECIMAL,
  ceremony_time TIME,
  reception_time TIME,
  dress_code TEXT,
  personal_message TEXT,

  timeline JSONB DEFAULT '[]',

  languages TEXT[] DEFAULT '{en}',
  rsvp_deadline DATE,
  max_guests INTEGER,
  show_gallery BOOLEAN DEFAULT true,
  show_countdown BOOLEAN DEFAULT true,

  package TEXT NOT NULL DEFAULT 'essential',
  active_until TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT false,

  view_count INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RSVP RESPONSES
CREATE TABLE IF NOT EXISTS rsvp_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,

  guest_name TEXT NOT NULL,
  email TEXT,
  attending BOOLEAN NOT NULL,
  adults INTEGER DEFAULT 1,
  children INTEGER DEFAULT 0,
  menu_choice TEXT CHECK (menu_choice IN ('meat', 'fish', 'vegetarian', 'vegan')),
  allergies TEXT,
  message TEXT,

  created_at TIMESTAMPTZ DEFAULT now()
);

-- PHOTOS
CREATE TABLE IF NOT EXISTS invitation_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- PAYMENTS
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  invitation_id UUID REFERENCES invitations(id),
  stripe_session_id TEXT UNIQUE,
  stripe_payment_id TEXT,
  package TEXT NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'eur',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── Row Level Security ───────────────────────────────────────────────────────

ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitation_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Invitations: owner can do everything
CREATE POLICY "Owner manages own invitations" ON invitations
  FOR ALL USING (auth.uid() = user_id);

-- Invitations: public can read active ones (guest view)
CREATE POLICY "Public reads active invitations" ON invitations
  FOR SELECT USING (is_active = true);

-- RSVP: anyone can insert (guests)
CREATE POLICY "Anyone can submit RSVP" ON rsvp_responses
  FOR INSERT WITH CHECK (true);

-- RSVP: owner can read their invitation's responses
CREATE POLICY "Owner reads own RSVPs" ON rsvp_responses
  FOR SELECT USING (
    invitation_id IN (
      SELECT id FROM invitations WHERE user_id = auth.uid()
    )
  );

-- Photos: owner manages
CREATE POLICY "Owner manages photos" ON invitation_photos
  FOR ALL USING (
    invitation_id IN (
      SELECT id FROM invitations WHERE user_id = auth.uid()
    )
  );

-- Photos: public reads active invitation photos
CREATE POLICY "Public reads active photos" ON invitation_photos
  FOR SELECT USING (
    invitation_id IN (
      SELECT id FROM invitations WHERE is_active = true
    )
  );

-- Payments: owner reads own
CREATE POLICY "Owner reads own payments" ON payments
  FOR SELECT USING (auth.uid() = user_id);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON invitations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
