"use client";

import { useState } from "react";
import { Dialog } from "./Dialog";
import { Mark, SunIcon } from "./icons";
import { useExperience } from "./ExperienceProvider";

const links = [
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#laboratorio", label: "Laboratório" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { dark, toggleTheme } = useExperience();

  return (
    <header className="site-header shell">
      <a className="brand" href="#inicio" aria-label="Mateus Monteiro, início">
        <Mark />
        <span>
          Mateus
          <br />
          <strong>Monteiro.</strong>
        </span>
      </a>
      <nav className="desktop-nav" aria-label="Navegação principal">
        {links.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <button
          className="icon-button theme-button"
          onClick={toggleTheme}
          aria-label={dark ? "Usar ambiente claro" : "Usar ambiente escuro"}
          aria-pressed={dark}
        >
          <SunIcon />
        </button>
        <a href="#contato" className="header-contact">
          Vamos conversar <span className="status-dot" aria-hidden="true" />
        </a>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </div>
      <Dialog
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        titleId="menu-title"
        className="mobile-menu"
      >
        <span className="eyebrow" id="menu-title">
          POR ONDE VAMOS?
        </span>
        <nav aria-label="Navegação no celular">
          {[...links, { href: "#contato", label: "Contato" }].map(
            (link, index) => (
              <a
                href={link.href}
                key={link.href}
                onClick={() => setMenuOpen(false)}
              >
                <span className="mono">0{index + 1}</span>
                {link.label}
                <span aria-hidden="true">↗</span>
              </a>
            ),
          )}
        </nav>
        <p>
          São Paulo, Brasil.
          <br />
          Ideias abertas ao mundo.
        </p>
      </Dialog>
    </header>
  );
}
