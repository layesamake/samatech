import type { NextConfig } from "next";

// Images des réalisations envoyées dans la médiathèque du CMS
const cmsUrl = process.env.CMS_URL ? new URL(process.env.CMS_URL) : null;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: cmsUrl
      ? [{ protocol: cmsUrl.protocol === "http:" ? "http" : "https", hostname: cmsUrl.hostname }]
      : [],
  },
  async redirects() {
    // Toutes les pages sont sous /[lang] : la racine renvoie vers le français.
    return [{ source: "/", destination: "/fr", permanent: false }];
  },
};

export default nextConfig;
