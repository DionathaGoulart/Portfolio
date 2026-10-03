"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { PersonaContent } from "@/types/content";
import type { Skin } from "@/data/theme-config";

/** Nav links of a persona page. Labels follow the skin: shell paths or plain words. */
export function useNavigation(content: PersonaContent, skin: Skin) {
  const { persona } = content;
  const shell = skin === "terminal";
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close the mobile menu when the route changes — adjusted during render instead of
  // in an effect, so the menu never paints open on the new page.
  const [menuPathname, setMenuPathname] = useState(pathname);
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setIsMenuOpen(false);
  }

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
      label: shell ? "./sobre" : "Sobre",
      scroll: true,
      enabled: content.sections.about.enabled,
    },
    {
      id: "projects",
      href: `/${persona}#projects`,
      label: shell ? "./projetos" : "Projetos",
      scroll: true,
      enabled: content.sections.projects.enabled,
    },
    {
      id: "experience",
      href: `/${persona}#experience`,
      label: shell ? "./exp" : "Experiência",
      scroll: true,
      enabled: content.sections.experience.enabled,
    },
    {
      id: "contact",
      href: `/${persona}#contact`,
      label: shell ? "./contato" : "Contato",
      scroll: true,
      enabled: content.sections.contact.enabled,
    },
    {
      id: "cv",
      href: `/${persona}/cv`,
      label: shell ? "./cv" : "Currículo",
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
