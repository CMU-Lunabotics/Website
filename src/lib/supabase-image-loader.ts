export default function supabaseLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // Already a full URL from getStorageUrl() — return as-is
  if (src.startsWith('http')) {
    return src;
  }
  return `https://hypejatlztjwwyyznnwd.supabase.co/storage/v1/object/public/media/${src}`;
}
