import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zer0xLabs",
  description: "Zer0xLabs — Elite software studio building pixel-perfect web apps, mobile experiences, AI integrations, and scalable backends for clients worldwide.",
  keywords: "Zer0xLabs, software studio, web development, mobile apps, AI integration, Next.js, React, software engineering",
  openGraph: {
    title: "Zer0xLabs — We Build Digital Experiences",
    description: "Pixel-perfect web interfaces, AI-powered backends, mobile apps, and admin systems — technology that scales.",
    url: "https://zer0xlabs.com",
    siteName: "Zer0xLabs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zer0xLabs — We Build Digital Experiences",
    description: "Elite software studio. Web · Mobile · AI · Admin Systems.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030A10",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href="https://zer0xlabs.com" />
        <link rel="icon" href="/favicon.ico" />
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