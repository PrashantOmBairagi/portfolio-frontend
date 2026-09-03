import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://prashant-bairagi-portfolio.vercel.app"),
  title: {
    default: "Prashant Bairagi — Java Backend Engineer",
    template: "%s · Prashant Bairagi",
  },
  description:
    "Java & Spring Boot backend engineer. Building stateless JWT-secured REST APIs, containerized with Docker, deployed to AWS EC2, serving real users in production.",
  authors: [{ name: "Prashant Bairagi", url: "https://github.com/PrashantOmBairagi" }],
  creator: "Prashant Bairagi",
  publisher: "Prashant Bairagi",
  keywords: [
    "Prashant Bairagi",
    "Java Backend Engineer",
    "Spring Boot Developer",
    "Backend Developer India",
    "REST API",
    "Spring Security",
    "JWT Authentication",
    "Docker",
    "AWS EC2",
    "Nginx Reverse Proxy",
    "MySQL",
    "PostgreSQL",
    "Java Developer",
    "Jabalpur",
  ],
  category: "Portfolio",
  alternates: {
    canonical: "./",
  },
  appleWebApp: {
    capable: true,
    title: "Prashant Bairagi",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Prashant Bairagi",
    title: "Prashant Bairagi — Java Backend Engineer",
    description:
      "Java & Spring Boot backend engineer. Building stateless JWT-secured REST APIs, containerized with Docker, deployed to AWS EC2, serving real users in production.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@PrashantOmBairagi",
    title: "Prashant Bairagi — Java Backend Engineer",
    description:
      "Java & Spring Boot backend engineer. Building stateless JWT-secured REST APIs, containerized with Docker, deployed to AWS EC2, serving real users in production.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Prashant Bairagi",
    url: "https://prashant-bairagi-portfolio.vercel.app/",
    jobTitle: "Java Backend Engineer",
    description:
      "Java & Spring Boot backend engineer building stateless JWT-secured REST APIs, containerized with Docker, deployed to AWS EC2.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jabalpur",
      addressRegion: "Madhya Pradesh",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Jabalpur Engineering College",
    },
    knowsAbout: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "REST API",
      "Docker",
      "AWS EC2",
      "Nginx",
      "MySQL",
      "PostgreSQL",
      "JWT Authentication",
    ],
    sameAs: [
      "https://github.com/PrashantOmBairagi",
      "https://www.linkedin.com/in/prashant-bairagi-kmlpr/",
      "https://leetcode.com/u/prashantbairagi2018/",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: "#09090b" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {children}
      </body>
    </html>
  );
}
