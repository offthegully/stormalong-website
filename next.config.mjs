/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'web-assets.same.dev',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        pathname: '**',
      },
    ],
    unoptimized: true, // Required for static export
  },
}

export default nextConfig;
