/**
 * Replace mentors/timothy-angert.jpg in Supabase Storage.
 *
 *   node --env-file=.env.local scripts/upload-timothy-angert.mjs [path-to.jpg]
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const input = process.argv[2];

if (!url || !key) {
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}
if (!input || !fs.existsSync(input)) {
  console.error('Usage: node scripts/upload-timothy-angert.mjs <path-to.jpg>');
  process.exit(1);
}

const supabase = createClient(url, key);
const buffer = fs.readFileSync(input);
const { error } = await supabase.storage
  .from('media')
  .upload('mentors/timothy-angert.jpg', buffer, { contentType: 'image/jpeg', upsert: true });

if (error) {
  console.error(error.message);
  process.exit(1);
}
console.log('Uploaded mentors/timothy-angert.jpg');
