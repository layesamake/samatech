import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Toutes les pages sont sous /[lang] : la racine renvoie vers le français.
    return [{ source: "/", destination: "/fr", permanent: false }];
  },
};

export default nextConfig;
