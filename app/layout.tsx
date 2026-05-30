import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const SITE_URL = "https://ussly.design";
const DESCRIPTION =
  "Ussly is a small independent studio in Lynnwood, WA hand-coding websites for local businesses with character. Real craft, no templates.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ussly — Independent Web Design Studio",
    template: "%s — Ussly",
  },
  description: DESCRIPTION,
  keywords: [
    "web design studio",
    "Lynnwood web design",
    "small business websites",
    "independent design studio",
    "hand-coded websites",
    "restaurant web design",
    "Seattle web design",
  ],
  authors: [{ name: "Ussly", url: SITE_URL }],
  creator: "Ussly",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Ussly",
    title: "Ussly — Independent Web Design Studio",
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ussly — Independent Web Design Studio",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">{children}</body>
    </html>
  );
}
