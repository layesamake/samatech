import type { MetadataRoute } from "next";

// Icônes d'application (écran d'accueil du téléphone), issues du kit Samatech
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Samatech",
    short_name: "Samatech",
    lang: "fr",
    start_url: "/fr",
    display: "standalone",
    theme_color: "#012247",
    background_color: "#ffffff",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
