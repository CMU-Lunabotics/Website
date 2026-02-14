-- Add INSERT policy for allowed_users
CREATE POLICY "Public insert access" ON allowed_users
  FOR INSERT WITH CHECK (true);

-- Add UPDATE policy for allowed_users
CREATE POLICY "Public update access" ON allowed_users
  FOR UPDATE USING (true);

-- Add DELETE policy for allowed_users
CREATE POLICY "Public delete access" ON allowed_users
  FOR DELETE USING (true);
