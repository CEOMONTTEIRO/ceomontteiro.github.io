import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { AnimatedTitle } from "@/components/experience/AnimatedTitle";
import { AboutContent } from "@/components/AboutContent";
export const metadata: Metadata = {
  title: "Sobre & contato",
  description:
    "Mateus Monteiro Ramos, desenvolvedor fullstack júnior em São Paulo. Tecnologias, trajetória e contato.",
  alternates: { canonical: "/sobre/" },
  openGraph: { url: "/sobre/", title: "Sobre · Mateus Monteiro" },
};
export default function AboutPage() {
  return (
    <div className="inner-page">
      <main id="conteudo" className="shell about-page">
        <header className="page-heading">
          <span className="eyebrow">SOBRE / 02</span>
          <AnimatedTitle text="Prazer, Mateus." />
        </header>
        <AboutContent />
      </main>
      <Footer />
    </div>
  );
}
