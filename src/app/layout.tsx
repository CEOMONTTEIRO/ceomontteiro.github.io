import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "./globals.css";
import { ExperienceProvider } from "@/components/ExperienceProvider";
import { RevealEffects } from "@/components/Reveal";

export const metadata: Metadata = {
  metadataBase: new URL("https://ceomontteiro.github.io"),
  title: "Mateus Monteiro — Entre lógica e forma",
  description:
    "Desenvolvedor Fullstack Jr. em São Paulo. React, Next.js, APIs e design se encontram em um portfólio feito de código, intenção e movimento.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Mateus Monteiro",
    title: "Mateus Monteiro — Entre lógica e forma",
    description:
      "Código, design e visão de produto. Explore meus projetos e um laboratório 3D original.",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Mateus Monteiro — desenvolvimento com intenção.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mateus Monteiro — Entre lógica e forma",
    images: ["/opengraph.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg", apple: "/icon.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f2f2ea",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mateus Monteiro Ramos",
    url: "https://ceomontteiro.github.io/",
    jobTitle: "Desenvolvedor Fullstack Jr.",
    sameAs: ["https://github.com/CEOMONTTEIRO"],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Desenvolvimento web",
      "APIs REST",
      "UI/UX",
    ],
  };
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <ExperienceProvider>
          {children}
          <RevealEffects />
        </ExperienceProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
        />
      </body>
    </html>
  );
}
