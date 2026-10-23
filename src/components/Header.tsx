"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Mark, ArrowIcon } from "./icons";
import { identity } from "@/domain/portfolio";

const links = [
  { href: "/", label: "Início" },
  { href: "/projetos/", label: "Projetos" },
  { href: "/sobre/", label: "Sobre" },
];
export function Header() {
  const pathname = usePathname();
  return (
    <header className="site-header shell">
      <Link href="/" className="brand" aria-label="Mateus Monteiro, início">
        <Mark />
        <span>
          mateus<span className="brand-suffix">.dev</span>
        </span>
      </Link>
      <nav className="navigation" aria-label="Navegação principal">
        {links.map((link) => {
          const active =
            pathname === link.href ||
            (link.href !== "/" && pathname === link.href.slice(0, -1));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${active ? "is-active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              {active && (
                <motion.span
                  className="nav-pill"
                  layoutId="nav-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 35 }}
                />
              )}
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
      <a
        className="header-contact"
        href={`mailto:${identity.email}`}
        aria-label="Conversar com Mateus por e-mail"
      >
        <span>Vamos conversar</span>
        <ArrowIcon />
      </a>
    </header>
  );
}
