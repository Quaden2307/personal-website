import type { Metadata, Viewport } from "next";
import { Patrick_Hand } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

/* The pen: Patrick Hand (SIL Open Font License), served by next/font. */
const hand = Patrick_Hand({ weight: "400", subsets: ["latin"], variable: "--font-hand", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#e3d3b4",
  colorScheme: "light",
};

/*
  Runs before first paint: marks the page as scripted, which turns the stacked pages
  into the one-screen notebook. If the client bundle has not mounted within four
  seconds, the page falls back to the stacked pages, which work without script.
*/
const bootScript = `(function(){var d=document.documentElement;d.classList.add("js");setTimeout(function(){if(!window.__notebookReady){d.classList.remove("js");}},4000);})();`;

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  sameAs: [site.github.href, site.linkedin.href],
  affiliation: { "@type": "CollegeOrUniversity", name: "University of Waterloo" },
  knowsAbout: ["Machine learning", "Information retrieval", "Mathematics"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={hand.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <link rel="preload" href="/fonts/GingerInk.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/GeneralSans-Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      </head>
      <body>
        <a className="skip-link" href="#notebook">
          Skip to the notebook
        </a>
        {children}
      </body>
    </html>
  );
}
