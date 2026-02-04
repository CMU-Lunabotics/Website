import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables. Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.');
  console.error('Run: source .env.local or set them manually');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const BUCKET_NAME = 'media';

function getAllFiles(dir, baseDir = dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath, baseDir));
    } else {
      const relativePath = path.relative(baseDir, fullPath);
      files.push({ fullPath, relativePath });
    }
  }

  return files;
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

async function uploadFile(file) {
  const fileBuffer = fs.readFileSync(file.fullPath);
  const storagePath = file.relativePath.replace(/\\/g, '/'); // Windows path fix

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(storagePath, fileBuffer, {
      contentType: getMimeType(file.fullPath),
      upsert: true,
    });

  if (error) {
    console.error(`Failed: ${storagePath} - ${error.message}`);
    return false;
  }

  console.log(`Uploaded: ${storagePath}`);
  return true;
}

async function main() {
  console.log(`Uploading images from ${IMAGES_DIR} to bucket "${BUCKET_NAME}"...\n`);

  const files = getAllFiles(IMAGES_DIR);
  console.log(`Found ${files.length} files to upload.\n`);

  let success = 0;
  let failed = 0;

  for (const file of files) {
    const result = await uploadFile(file);
    if (result) success++;
    else failed++;
  }

  console.log(`\nDone! ${success} uploaded, ${failed} failed.`);
}

main().catch(console.error);
