import type { MetadataRoute } from "next";

const BASE_URL = "https://ravanatechsolutions.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",       // keep API routes private
          "/_next/",     // Next.js internals
          "/admin/",     // any future admin area
        ],
      },
      {
        // Block AI training scrapers that respect robots.txt
        userAgent: [
          "GPTBot",
          "Google-Extended",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
          "Omgilibot",
          "FacebookBot",
        ],
        disallow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}