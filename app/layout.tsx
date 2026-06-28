import type { Metadata, Viewport } from "next";
import "./globals.css";

const BASE_URL = "https://ravanatechsolutions.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Ravana Tech Solutions — We Build Digital Experiences",
    template: "%s | Ravana Tech Solutions",
  },

  description:
    "Ravana Tech Solutions is an elite software studio building pixel-perfect web apps, AI-powered backends, cross-platform mobile apps, and scalable admin systems. Next.js · React Native · LLMs · RAG · PostgreSQL · AWS.",

  keywords: [
    // Brand
    "Ravana Tech Solutions",
    "Ravana Tec Solutions",
    "ravana tech",
    // Services (pulled from SERVICES array)
    "web development",
    "mobile app development",
    "AI integration",
    "admin panel development",
    "software maintenance",
    "software development",
    "software studio",
    "digital product engineering",
    // Tech stack (pulled from service tags)
    "Next.js development",
    "React development",
    "TypeScript",
    "Tailwind CSS",
    "React Native",
    "Expo",
    "Flutter",
    "LLM integration",
    "RAG pipeline",
    "OpenAI integration",
    "fine-tuning",
    "Node.js",
    "Python",
    "PostgreSQL",
    "AWS",
    "RBAC dashboard",
    "real-time analytics",
    "CI/CD",
    "DevOps",
    // Project domains (pulled from PROJECTS)
    "e-commerce platform",
    "artist website",
    "DTF printing platform",
    "business website Sri Lanka",
    "cleaning services website Australia",
    "Dhamma school website",
    // Audience / intent
    "hire software engineers",
    "custom software development company",
    "cross-platform mobile apps",
    "SPA development",
    "landing page development",
    "microservices architecture",
    "startup software studio",
    "enterprise software development",
    "Sri Lanka software company",
  ],

  authors: [
    { name: "Tharaka Athuluwage", url: BASE_URL },
    { name: "Chathil Mandinu", url: BASE_URL },
    { name: "Kalpa Sahan", url: BASE_URL },
  ],

  creator: "Ravana Tech Solutions",
  publisher: "Ravana Tech Solutions",

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Ravana Tech Solutions",
    title: "Ravana Tech Solutions — We Build Digital Experiences",
    description:
      "Pixel-perfect web interfaces, AI-powered backends, mobile apps, and admin systems — built to scale. From concept to deployment, we cover the full spectrum of digital product engineering.",
    images: [
      {
        url: "/og-image.png",   // place a 1200×630 image here
        width: 1200,
        height: 630,
        alt: "Ravana Tech Solutions — Elite Software Studio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@ravanatecsolutions",
    creator: "@ravanatecsolutions",
    title: "Ravana Tech Solutions — We Build Digital Experiences",
    description:
      "Elite software studio · Web · Mobile · AI · Admin Systems · Sri Lanka & worldwide.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#00E5CC" }],
  },

  manifest: "/manifest.json",

  verification: {
    // google: "YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN",
    // yandex: "YOUR_YANDEX_TOKEN",
  },

  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#030A10" },
    { media: "(prefers-color-scheme: light)", color: "#030A10" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Ravana Tech Solutions",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/logo.png`,
        },
        foundingDate: "2022",
        description:
          "Elite software studio specialising in web development, mobile apps, AI integration, and admin systems.",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          availableLanguage: "English",
          url: `${BASE_URL}/#contact`,
        },
        sameAs: [
          "https://instagram.com/ravanatecsolutions",
          "https://www.facebook.com/profile.php?id=61590397422978",
          "https://wa.me/94778195727",
          "https://www.tiktok.com/@ravana.tec.soluti",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Ravana Tech Solutions",
        publisher: { "@id": `${BASE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${BASE_URL}/?s={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${BASE_URL}/#service`,
        name: "Ravana Tech Solutions",
        url: BASE_URL,
        priceRange: "$$",
        areaServed: "Worldwide",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Software Development Services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development", description: "Next.js, React, TypeScript, Tailwind" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App Development", description: "React Native, Expo, Flutter" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Integration", description: "LLMs, RAG, OpenAI, fine-tuning" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Admin Panel Development", description: "RBAC, Analytics, Real-time, CMS" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Maintenance & Support", description: "Monitoring, SLA, DevOps, CI/CD" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Software Development", description: "Node.js, Python, PostgreSQL, AWS" } },
          ],
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#030A10",
          color: "#E0EFFF",
          fontFamily: "'Space Grotesk', sans-serif",
          overflowX: "hidden",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        {children}
      </body>
    </html>
  );
}