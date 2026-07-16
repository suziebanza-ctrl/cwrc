"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "../i18n/config";
import { localizedHref } from "../i18n/config";
import { getContent } from "../i18n/content";

export default function Header({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const pathname = usePathname();
  const { nav } = getContent(locale).common;

  const adminLabel =
    locale === "fr"
      ? "Portail administrateur"
      : locale === "es"
        ? "Portal administrativo"
        : "Admin Portal";

  const links = [
    ["home", nav.home],
    ["about", nav.about],
    ["rooms", nav.rooms],
    ["research", nav.research],
    ["ask-cathy", nav.ask],
    ["submit-case", nav.submit],
    ["development-log", nav.log],
    ["contact", nav.contact],
    ["admin", adminLabel],
  ];

  const languageHref = (nextLocale: Locale) => {
    const localizedPath = pathname.match(/^\/(fr|en|es)(?=\/|$)/)
      ? pathname.replace(
          /^\/(fr|en|es)(?=\/|$)/,
          `/${nextLocale}`,
        )
      : localizedHref(nextLocale, pathname);

    return localizedPath || `/${nextLocale}`;
  };

  return (
    <header style={headerStyle}>
      <Link href={localizedHref(locale)} style={logoStyle}>
        <strong>CWRC</strong>
      </Link>

      <nav style={navStyle} aria-label="CWRC">
        {links.map(([href, label]) => (
          <Link
            key={href}
            href={localizedHref(locale, href)}
            style={linkStyle}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div
        style={languageStyle}
        aria-label="Language / Langue / Idioma"
      >
        {(["fr", "en", "es"] as Locale[]).map((language) => (
          <Link
            key={language}
            href={languageHref(language)}
            style={{
              ...languageButton,
              ...(language === locale ? activeLanguage : {}),
            }}
            hrefLang={language}
            aria-current={
              language === locale ? "page" : undefined
            }
          >
            {language === "fr"
              ? "FR"
              : language === "en"
                ? "EN"
                : "ES"}
          </Link>
        ))}
      </div>
    </header>
  );
}

const headerStyle = {
  background: "#102A4C",
  color: "#F7F1E6",
  padding: "18px 30px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap" as const,
  gap: "18px",
  position: "sticky" as const,
  top: 0,
  zIndex: 100,
};

const logoStyle = {
  color: "#F7F1E6",
  textDecoration: "none",
  fontSize: "1.4rem",
};

const navStyle = {
  display: "flex",
  gap: "18px",
  flexWrap: "wrap" as const,
};

const linkStyle = {
  color: "#F7F1E6",
  textDecoration: "none",
  fontWeight: "bold",
};

const languageStyle = {
  display: "flex",
  gap: "8px",
};

const languageButton = {
  background: "#F7F1E6",
  color: "#102A4C",
  textDecoration: "none",
  borderRadius: "999px",
  padding: "8px 14px",
  fontWeight: "bold",
  border: "2px solid transparent",
};

const activeLanguage = {
  background: "#D8C49A",
  borderColor: "#FFFDF8",
};