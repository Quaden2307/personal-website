import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import Starfield from "@/components/Starfield";
import Choreo from "@/components/Choreo";
import ShipCursor from "@/components/ShipCursor";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Caden Sun",
  description: "Caden Sun — personal site, projects, and experience.",
  openGraph: {
    title: "Caden Sun",
    description: "Personal site, projects, and experience.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#070a14",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body className="relative min-h-screen">
        <Starfield />
        <Choreo />
        <ShipCursor />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
