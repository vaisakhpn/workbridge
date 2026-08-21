import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AuthProvider from "@/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bincoz.in"),
  title: {
    default:
      "Bincoz | Find Part Time Jobs Near Me & Local Workforce Marketplace",
    template: "%s | Bincoz - Part Time Jobs Near Me",
  },
  description:
    "Find part time jobs near me, daily wage work, event management jobs, and temporary staffing opportunities. Connect with verified local employers and hire reliable workers on Bincoz.",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    shortcut: "/favicon.ico",
  },
  keywords: [
    "part time job near me",
    "part time jobs near me",
    "near part time jobs",
    "find part time jobs near me",
    "daily wage jobs near me",
    "event staff jobs near me",
    "temporary jobs near me",
    "local part time work",
    "bincoz",
    "bincoz.in",
    "part time job vacancies",
    "hire local workers near me",
    "urgent part time job openings",
  ],
  alternates: {
    canonical: "https://www.bincoz.in",
  },
  openGraph: {
    title: "Bincoz | Find Part Time Jobs Near Me & Local Workforce Marketplace",
    description:
      "Search & apply for part time jobs near you, daily wage work, and event jobs. Connect with verified local employers instantly on Bincoz.",
    url: "https://www.bincoz.in",
    siteName: "Bincoz",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bincoz | Find Part Time Jobs Near Me & Local Workforce Marketplace",
    description:
      "Find part time jobs near me, daily wage work, event jobs, and temporary staffing on Bincoz.",
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.bincoz.in/#website",
      url: "https://www.bincoz.in",
      name: "Bincoz",
      description: "Part-Time Jobs & Local Workforce Marketplace",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.bincoz.in/jobs/search?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://www.bincoz.in/#organization",
      name: "Bincoz",
      url: "https://www.bincoz.in",
      logo: "https://www.bincoz.in/favicon.ico",
      sameAs: [],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full overflow-x-hidden antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen max-w-[100vw] flex-col overflow-x-hidden">
        <AuthProvider>{children}</AuthProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
