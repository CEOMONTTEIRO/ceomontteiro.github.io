"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import Magnet from "../react-bits/Magnet";
import { useExperience } from "../ExperienceProvider";
import { ArrowIcon } from "../icons";

export function MagneticLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  const { motionEnabled } = useExperience();
  return (
    <Magnet
      padding={28}
      magnetStrength={6}
      maxOffset={7}
      disabled={!motionEnabled}
      wrapperClassName="magnet-wrap"
    >
      <Link
        href={href}
        className={`button ${secondary ? "button-secondary" : "button-primary"}`}
      >
        {children}
        <ArrowIcon />
      </Link>
    </Magnet>
  );
}
