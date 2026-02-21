-- Create allowed_users table
CREATE TABLE allowed_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  added_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE allowed_users ENABLE ROW LEVEL SECURITY;

-- Create function to verify allowed users (for future auth)
CREATE FUNCTION is_allowed_user(email text)
RETURNS boolean AS $$
SELECT EXISTS(SELECT 1 FROM allowed_users WHERE email = $1)
$$ LANGUAGE SQL;

-- Public read policy (admin panel is password-protected)
-- Future: When we add Supabase Auth, replace with authenticated policy
CREATE POLICY "Public read access" ON allowed_users
  FOR SELECT USING (true);

-- Add submitted_by columns to updates table
ALTER TABLE updates
  ADD COLUMN IF NOT EXISTS submitted_by text,
  ADD COLUMN IF NOT EXISTS submitted_at timestamptz DEFAULT now();

-- Update existing updates to have a submitted_by value (optional)
UPDATE updates SET submitted_by = 'admin@andrew.cmu.edu' WHERE submitted_by IS NULL;
