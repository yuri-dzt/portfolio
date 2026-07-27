import type { Metadata } from "next";
import { Archivo, Martian_Mono } from "next/font/google";
import "./globals.css";
import { profile, socials } from "@/data/site";

/**
 * Archivo: grotesca de origem tipográfica industrial, com peso de verdade nos
 * títulos. Martian Mono, desenhada para código, carrega só os rótulos técnicos.
 * Inter ficou de fora de propósito — é a fonte-reflexo de todo site gerado.
 */
const sans = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/**
 * Domínio usado em canonical, Open Graph e JSON-LD.
 *
 * Em produção, defina NEXT_PUBLIC_SITE_URL com o domínio final. Sem ela, a
 * própria Vercel informa a URL do deploy — assim preview e produção geram
 * links que existem, em vez de apontar para um domínio ainda não comprado.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} · ${profile.role}`,
  description: profile.tagline,
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    profile.name,
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} · ${profile.role}`,
    description: profile.tagline,
    url: siteUrl,
    siteName: profile.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} · ${profile.role}`,
    description: profile.tagline,
  },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${socials.email}`,
    url: siteUrl,
    sameAs: [socials.github, socials.linkedin, socials.instagram].filter(Boolean),
  };

  return (
    <html lang="pt-BR" className={`${sans.variable} ${mono.variable}`}>
      <head>
        {/*
          Liga as animações de entrada. Roda antes do corpo ser pintado, então
          não há flash; e se o JS não rodar, o conteúdo fica visível por padrão.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
