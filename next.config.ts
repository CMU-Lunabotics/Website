const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hypejatlztjwwyyznnwd.supabase.co",
        pathname: "/storage/v1/object/public/media/**",
      },
    ],
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
