"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { PortfolioContent } from "@/types/content";

export function useNavigation(content: PortfolioContent, persona: "dev" | "ti") {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isCV = pathname.includes("/cv");

  const scrollToTop = (e: React.MouseEvent) => {
    if (!isCV) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navLinks = [
    {
      id: "about",
      href: `/${persona}#about`,
      label: persona === "dev" ? "./sobre" : "Sobre",
      scroll: true,
      enabled: content.sections.about.enabled,
    },
    {
      id: "projects",
      href: `/${persona}#projects`,
      label: persona === "dev" ? "./projetos" : "Projetos",
      scroll: true,
      enabled: content.sections.projects.enabled,
    },
    {
      id: "experience",
      href: `/${persona}#experience`,
      label: persona === "dev" ? "./exp" : "Experiência",
      scroll: true,
      enabled: content.sections.experience.enabled,
    },
    {
      id: "contact",
      href: `/${persona}#contact`,
      label: persona === "dev" ? "./contato" : "Contato",
      scroll: true,
      enabled: content.sections.contact.enabled,
    },
    {
      id: "cv",
      href: `/${persona}/cv`,
      label: persona === "dev" ? "./cv" : "Currículo",
      scroll: false,
      enabled: true,
    },
  ].filter((link) => link.enabled);

  return {
    isMenuOpen,
    setIsMenuOpen,
    isCV,
    scrollToTop,
    navLinks,
    pathname,
  };
}
