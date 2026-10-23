import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";
import { Header } from "@/components/Header";
import { ExperienceProvider } from "@/components/ExperienceProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://ceomontteiro.github.io"),
  title: {
    default: "Mateus Monteiro — Desenvolvedor Fullstack",
    template: "%s · Mateus Monteiro",
  },
  description:
    "Sou Mateus Monteiro, desenvolvedor fullstack júnior. Interfaces, APIs e produtos digitais com atenção ao detalhe.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Mateus Monteiro",
    title: "Mateus Monteiro — Desenvolvedor Fullstack",
    description: "Código bem pensado. Experiências que ficam.",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Mateus Monteiro — Desenvolvedor Fullstack",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph.png"] },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg", apple: "/icon.png" },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080a0b",
  colorScheme: "dark",
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
    knowsAbout: ["React", "Next.js", "TypeScript", "APIs REST", "UI/UX"],
  };
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <ExperienceProvider>
          <Header />
          {children}
        </ExperienceProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
        />
      </body>
    </html>
  );
}
