/**
 * Upload transparent sponsor marquee logos to Supabase Storage.
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or anon key if
 * your storage policies allow upsert).
 *
 *   node --env-file=.env.local scripts/upload-sponsor-marquee.mjs
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MARQUEE_DIR = path.join(__dirname, '..', 'public', 'images', 'sponsors', 'marquee');
const BUCKET = 'media';
const STORAGE_PREFIX = 'sponsors/marquee';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or anon key).');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  if (!fs.existsSync(MARQUEE_DIR)) {
    console.error(`No local marquee folder at ${MARQUEE_DIR}. Nothing to upload.`);
    process.exit(1);
  }

  const files = fs.readdirSync(MARQUEE_DIR).filter((f) => f.endsWith('.png'));
  if (files.length === 0) {
    console.error('No PNG files in marquee folder.');
    process.exit(1);
  }

  let ok = 0;
  let failed = 0;

  for (const file of files) {
    const storagePath = `${STORAGE_PREFIX}/${file}`;
    const buffer = fs.readFileSync(path.join(MARQUEE_DIR, file));
    const { error } = await supabase.storage.from(BUCKET).upload(storagePath, buffer, {
      contentType: 'image/png',
      upsert: true,
    });

    if (error) {
      console.error(`Failed: ${storagePath} — ${error.message}`);
      failed++;
    } else {
      console.log(`Uploaded: ${storagePath}`);
      ok++;
    }
  }

  console.log(`\nDone: ${ok} uploaded, ${failed} failed.`);
  process.exit(failed > 0 ? 1 : 0);
}

main();
