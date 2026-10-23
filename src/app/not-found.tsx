import Link from "next/link";
import { Footer } from "@/components/Footer";
export default function NotFound() {
  return (
    <div className="inner-page">
      <main className="not-found shell" id="conteudo">
        <span className="eyebrow">404 / FORA DO CAMINHO</span>
        <h1>
          Vamos voltar
          <br />
          ao começo<span className="accent">?</span>
        </h1>
        <Link href="/" className="button button-primary">
          Voltar ao início ↗
        </Link>
      </main>
      <Footer />
    </div>
  );
}
