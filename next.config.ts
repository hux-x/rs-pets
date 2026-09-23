import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// NOTE: static export (`output: 'export'`) was removed here. The site now
// pulls its catalog from a live WordPress REST API, so pages need to be
// rendered per-request (or with ISR) rather than frozen once at build time —
// otherwise a product added in wp-admin would never appear on the live site
// until someone manually rebuilds and redeploys the frontend. Deploy this
// to a platform that runs Next.js as a server (Vercel, Node, etc.) rather
// than pure static hosting.
if (!nextConfig.images) nextConfig.images = {};
nextConfig.images.unoptimized = true;

export default nextConfig;
