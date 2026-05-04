ALTER TABLE invitations
  ADD COLUMN IF NOT EXISTS background_music TEXT CHECK (background_music IN ('romance', 'waltz', 'garden'));
