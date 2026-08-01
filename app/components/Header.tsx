"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "../i18n/config";
import { localizedHref } from "../i18n/config";
import { getContent } from "../i18n/content";

const ui = {
  fr: {
    menu: "Menu",
    close: "Fermer le menu",
    plan: "Plan du Centre",
    admin: "Portail administrateur",
    language: "Choisir la langue",
  },
  en: {
    menu: "Menu",
    close: "Close menu",
    plan: "Center Floor Plan",
    admin: "Admin Portal",
    language: "Choose language",
  },
  es: {
    menu: "Menú",
    close: "Cerrar el menú",
    plan: "Plano del Centro",
    admin: "Portal administrativo",
    language: "Elegir idioma",
  },
} satisfies Record<Locale, Record<string, string>>;

export default function Header({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const pathname = usePathname();
  const { nav } = getContent(locale).common;
  const t = ui[locale];
  const [menuOpen, setMenuOpen] = useState(false);
  const [languagesOpen, setLanguagesOpen] = useState(false);

  const links = [
    ["home", nav.home, "🏛️"],
    ["rooms", nav.rooms, "🚪"],
    ["center-map", t.plan, "🗺️"],
    ["research", nav.research, "🔎"],
    ["ask-cathy", nav.ask, "💬"],
    ["submit-case", nav.submit, "📄"],
    ["development-log", nav.log, "📖"],
    ["contact", nav.contact, "✉️"],
    ["admin", t.admin, "🔐"],
  ];

  useEffect(() => {
    setMenuOpen(false);
    setLanguagesOpen(false);
  }, [pathname]);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setLanguagesOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const languageHref = (nextLocale: Locale) => {
    const localizedPath = pathname.match(/^\/(fr|en|es)(?=\/|$)/)
      ? pathname.replace(/^\/(fr|en|es)(?=\/|$)/, `/${nextLocale}`)
      : localizedHref(nextLocale, pathname);

    return localizedPath || `/${nextLocale}`;
  };

  return (
    <>
      <header className="compactHeader">
        <Link
          href={localizedHref(locale, "home")}
          className="logo"
          aria-label={nav.home}
        >
          CWRC
        </Link>

        <div className="headerActions">
          <div className="languageControl">
            <button
              type="button"
              className="languageToggle"
              aria-expanded={languagesOpen}
              aria-controls="cwrc-language-menu"
              onClick={() => {
                setLanguagesOpen((open) => !open);
                setMenuOpen(false);
              }}
            >
              {locale.toUpperCase()} <span aria-hidden="true">▾</span>
            </button>

            {languagesOpen && (
              <nav
                id="cwrc-language-menu"
                className="languageMenu"
                aria-label={t.language}
              >
                {(["fr", "en", "es"] as Locale[]).map((language) => (
                  <Link
                    key={language}
                    href={languageHref(language)}
                    hrefLang={language}
                    aria-current={language === locale ? "page" : undefined}
                    className={language === locale ? "activeLanguage" : ""}
                  >
                    {language === "fr"
                      ? "Français"
                      : language === "en"
                        ? "English"
                        : "Español"}
                  </Link>
                ))}
              </nav>
            )}
          </div>

          <button
            type="button"
            className="menuToggle"
            aria-expanded={menuOpen}
            aria-controls="cwrc-main-menu"
            onClick={() => {
              setMenuOpen((open) => !open);
              setLanguagesOpen(false);
            }}
          >
            <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
            <span>{menuOpen ? t.close : t.menu}</span>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          className="menuOverlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setMenuOpen(false);
            }
          }}
        >
          <nav id="cwrc-main-menu" className="menuPanel" aria-label="CWRC">
            {links.map(([href, label, icon], index) => (
              <Link
                key={href}
                href={localizedHref(locale, href)}
                className={index === links.length - 1 ? "adminLink" : ""}
              >
                <span aria-hidden="true">{icon}</span>
                <strong>{label}</strong>
              </Link>
            ))}
          </nav>
        </div>
      )}

      <style jsx>{`
        .compactHeader {
          position: sticky;
          top: 0;
          z-index: 1000;
          display: flex;
          min-height: 58px;
          padding: 0 22px;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          background: #102a4c;
          box-shadow: 0 5px 18px rgba(5, 17, 31, 0.2);
          color: #f7f1e6;
        }

        .logo {
          color: #f7f1e6;
          font-family: Georgia, serif;
          font-size: 1.3rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-decoration: none;
        }

        .headerActions {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .languageControl {
          position: relative;
        }

        .languageToggle,
        .menuToggle {
          display: inline-flex;
          min-height: 38px;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border-radius: 999px;
          cursor: pointer;
          font-weight: 800;
        }

        .languageToggle {
          min-width: 64px;
          padding: 7px 12px;
          border: 1px solid #d8c49a;
          background: #d8c49a;
          color: #102a4c;
        }

        .menuToggle {
          padding: 7px 14px;
          border: 1px solid rgba(247, 241, 230, 0.75);
          background: transparent;
          color: #f7f1e6;
        }

        .menuToggle span:first-child {
          font-size: 1.15rem;
          line-height: 1;
        }

        .languageToggle:focus-visible,
        .menuToggle:focus-visible,
        .logo:focus-visible {
          outline: 3px solid #f7d77a;
          outline-offset: 3px;
        }

        .languageMenu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          z-index: 1100;
          display: grid;
          min-width: 155px;
          overflow: hidden;
          border: 1px solid #d8c49a;
          border-radius: 14px;
          background: #fffdf8;
          box-shadow: 0 15px 35px rgba(5, 17, 31, 0.3);
        }

        .languageMenu a {
          padding: 11px 15px;
          color: #102a4c;
          text-decoration: none;
        }

        .languageMenu a:hover,
        .languageMenu a:focus-visible,
        .languageMenu .activeLanguage {
          outline: none;
          background: #f7f1e6;
        }

        .languageMenu .activeLanguage {
          border-left: 5px solid #8a6a3d;
          font-weight: 900;
        }

        .menuOverlay {
          position: fixed;
          inset: 58px 0 0;
          z-index: 950;
          display: flex;
          justify-content: flex-end;
          background: rgba(5, 17, 31, 0.48);
          backdrop-filter: blur(3px);
        }

        .menuPanel {
          display: flex;
          width: min(360px, 92vw);
          height: 100%;
          overflow-y: auto;
          padding: 18px;
          flex-direction: column;
          gap: 8px;
          background: #fffdf8;
          box-shadow: -18px 0 45px rgba(5, 17, 31, 0.28);
        }

        .menuPanel a {
          display: flex;
          min-height: 50px;
          padding: 10px 14px;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(138, 106, 61, 0.22);
          border-radius: 13px;
          background: #fff;
          color: #102a4c;
          text-decoration: none;
        }

        .menuPanel a:hover,
        .menuPanel a:focus-visible {
          border-color: #8a6a3d;
          outline: none;
          background: #f7f1e6;
        }

        .menuPanel a span {
          width: 28px;
          font-size: 1.25rem;
          text-align: center;
        }

        .menuPanel .adminLink {
          margin-top: 10px;
          border-color: #8a6a3d;
          background: #102a4c;
          color: #f7f1e6;
        }

        @media (max-width: 520px) {
          .compactHeader {
            min-height: 54px;
            padding: 0 12px;
          }

          .menuOverlay {
            inset: 54px 0 0;
          }

          .languageToggle,
          .menuToggle {
            min-height: 36px;
          }

          .menuToggle {
            padding-inline: 11px;
          }

          .menuToggle span:last-child {
            font-size: 0.86rem;
          }
        }
      `}</style>
    </>
  );
}
