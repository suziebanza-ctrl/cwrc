"use client";

import { useState } from "react";
import type { Locale } from "../i18n/config";

type StudySection = {
  id: string;
  icon: string;
  title: Record<Locale, string>;
  position: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
};

const sections: StudySection[] = [
  {
    id: "geography",
    icon: "🌍",
    title: {
      fr: "Géographie",
      en: "Geography",
      es: "Geografía",
    },
    position: {
      left: "3.2%",
      top: "5%",
      width: "14.5%",
      height: "27%",
    },
  },
  {
    id: "science",
    icon: "🔬",
    title: {
      fr: "Sciences",
      en: "Science",
      es: "Ciencias",
    },
    position: {
      left: "2.7%",
      top: "36.5%",
      width: "15.2%",
      height: "20%",
    },
  },
  {
    id: "history",
    icon: "🏺",
    title: {
      fr: "Histoire",
      en: "History",
      es: "Historia",
    },
    position: {
      left: "22.9%",
      top: "23%",
      width: "7.3%",
      height: "17%",
    },
  },
  {
    id: "culture-arts",
    icon: "🎨",
    title: {
      fr: "Culture et arts",
      en: "Culture and Arts",
      es: "Cultura y Artes",
    },
    position: {
      left: "41.2%",
      top: "28.5%",
      width: "19.5%",
      height: "10.5%",
    },
  },
  {
    id: "sports",
    icon: "🏆",
    title: {
      fr: "Sports",
      en: "Sports",
      es: "Deportes",
    },
    position: {
      left: "45.3%",
      top: "42.5%",
      width: "10.2%",
      height: "10.5%",
    },
  },
  {
    id: "mathematics",
    icon: "➗",
    title: {
      fr: "Mathématiques",
      en: "Mathematics",
      es: "Matemáticas",
    },
    position: {
      left: "71.2%",
      top: "23.5%",
      width: "7.6%",
      height: "17%",
    },
  },
  {
    id: "philosophy",
    icon: "🏛️",
    title: {
      fr: "Philosophie",
      en: "Philosophy",
      es: "Filosofía",
    },
    position: {
      left: "82.5%",
      top: "5%",
      width: "15%",
      height: "27%",
    },
  },
  {
    id: "sociology-psychology",
    icon: "🧠",
    title: {
      fr: "Sociologie et psychologie",
      en: "Sociology and Psychology",
      es: "Sociología y Psicología",
    },
    position: {
      left: "82.2%",
      top: "36.5%",
      width: "16.5%",
      height: "20%",
    },
  },
];

const translations = {
  fr: {
    title: "Salle d’étude",
    subtitle:
      "Choisissez une matière en cliquant sur une affiche ou sur le symbole placé juste en dessous.",
    close: "Fermer",
    ready: "Cette section est prête à accueillir ses premiers contenus.",
    coming:
      "Les livres, articles, jeux et découvertes de cette matière seront ajoutés progressivement.",
    quiet: "Salle silencieuse — aucune musique",
  },
  en: {
    title: "Study Room",
    subtitle:
      "Choose a subject by clicking its sign or the symbol placed just below it.",
    close: "Close",
    ready: "This section is ready to welcome its first content.",
    coming:
      "Books, articles, games and discoveries for this subject will be added progressively.",
    quiet: "Quiet room — no music",
  },
  es: {
    title: "Sala de estudio",
    subtitle:
      "Elija una materia haciendo clic en su letrero o en el símbolo situado justo debajo.",
    close: "Cerrar",
    ready: "Esta sección está lista para recibir sus primeros contenidos.",
    coming:
      "Los libros, artículos, juegos y descubrimientos de esta materia se añadirán progresivamente.",
    quiet: "Sala silenciosa — sin música",
  },
} satisfies Record<
  Locale,
  {
    title: string;
    subtitle: string;
    close: string;
    ready: string;
    coming: string;
    quiet: string;
  }
>;

export default function InteractiveStudyRoom({
  locale,
}: {
  locale: Locale;
}) {
  const [selectedSection, setSelectedSection] =
    useState<StudySection | null>(null);

  const text = translations[locale];

  return (
    <main className="studyRoom">
      <header className="roomHeader">
        <p className="eyebrow">CWRC</p>
        <h1>{text.title}</h1>
        <p className="subtitle">{text.subtitle}</p>
        <p className="quietNotice">🤫 {text.quiet}</p>
      </header>

      <section
        className="roomScene"
        aria-label={text.title}
      >
        <img
          src="/images/salle-etude.png"
          alt={text.title}
          className="roomImage"
        />

        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            className="categoryHotspot"
            style={section.position}
            aria-label={section.title[locale]}
            title={section.title[locale]}
            onClick={() => setSelectedSection(section)}
          >
            <span className="clickSymbol" aria-hidden="true">
              <span className="symbolGlow" />
              <span className="symbolIcon">{section.icon}</span>
            </span>
          </button>
        ))}
      </section>

      {selectedSection && (
        <div
          className="modalBackdrop"
          role="presentation"
          onClick={() => setSelectedSection(null)}
        >
          <section
            className="sectionModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="study-section-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="closeButton"
              onClick={() => setSelectedSection(null)}
              aria-label={text.close}
            >
              ×
            </button>

            <div className="modalIcon" aria-hidden="true">
              {selectedSection.icon}
            </div>

            <p className="modalEyebrow">CWRC · {text.title}</p>

            <h2 id="study-section-title">
              {selectedSection.title[locale]}
            </h2>

            <p>{text.ready}</p>
            <p>{text.coming}</p>

            <button
              type="button"
              className="goldButton"
              onClick={() => setSelectedSection(null)}
            >
              {text.close}
            </button>
          </section>
        </div>
      )}

      <style jsx>{`
        .studyRoom {
          width: 100%;
          color: #172d26;
        }

        .roomHeader {
          max-width: 900px;
          margin: 0 auto 24px;
          padding: 8px 20px;
          text-align: center;
        }

        .eyebrow,
        .modalEyebrow {
          margin: 0 0 8px;
          color: #9a7228;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        h1 {
          margin: 0;
          color: #193a30;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(2rem, 5vw, 3.8rem);
        }

        .subtitle {
          max-width: 760px;
          margin: 14px auto 10px;
          font-size: 1.05rem;
          line-height: 1.65;
        }

        .quietNotice {
          display: inline-block;
          margin: 5px 0 0;
          padding: 7px 13px;
          border: 1px solid rgba(154, 114, 40, 0.35);
          border-radius: 999px;
          background: #fffaf0;
          color: #6e5425;
          font-size: 0.88rem;
          font-weight: 700;
        }

        .roomScene {
          position: relative;
          width: 100%;
          max-width: 1672px;
          margin: 0 auto;
          overflow: visible;
          border: 5px solid #3e2917;
          border-radius: 12px;
          background: #2a1b10;
          box-shadow:
            0 22px 55px rgba(37, 24, 12, 0.32),
            0 0 0 2px #b58a3a;
        }

        .roomImage {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 7px;
        }

        .categoryHotspot {
          position: absolute;
          z-index: 5;
          display: block;
          padding: 0;
          cursor: pointer;
          border: 2px solid transparent;
          border-radius: 6px;
          background: transparent;
          transition:
            border-color 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease;
        }

        .categoryHotspot:hover,
        .categoryHotspot:focus-visible {
          border-color: rgba(255, 220, 125, 0.9);
          background: rgba(32, 77, 57, 0.12);
          box-shadow:
            inset 0 0 24px rgba(255, 221, 131, 0.2),
            0 0 18px rgba(255, 211, 103, 0.75);
          outline: none;
        }

        .clickSymbol {
          position: absolute;
          left: 50%;
          bottom: -25px;
          width: 29px;
          height: 29px;
          transform: translateX(-50%);
          border: 2px solid #d9b65c;
          border-radius: 50%;
          background: #173f32;
          box-shadow:
            0 3px 8px rgba(0, 0, 0, 0.5),
            inset 0 0 5px rgba(255, 232, 165, 0.3);
          transition:
            transform 180ms ease,
            box-shadow 180ms ease;
        }

        .symbolGlow {
          position: absolute;
          inset: -5px;
          border: 1px solid rgba(255, 218, 111, 0.65);
          border-radius: 50%;
          opacity: 0.75;
          animation: gentleGlow 2.4s ease-in-out infinite;
        }

        .symbolIcon {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          font-size: 15px;
          line-height: 1;
        }

        .categoryHotspot:hover .clickSymbol,
        .categoryHotspot:focus-visible .clickSymbol {
          transform: translateX(-50%) scale(1.15);
          box-shadow:
            0 0 18px rgba(255, 219, 111, 0.95),
            inset 0 0 6px rgba(255, 243, 201, 0.45);
        }

        .modalBackdrop {
          position: fixed;
          z-index: 1000;
          inset: 0;
          display: grid;
          place-items: center;
          padding: 20px;
          background: rgba(14, 12, 9, 0.76);
          backdrop-filter: blur(4px);
        }

        .sectionModal {
          position: relative;
          width: min(540px, 100%);
          padding: 38px 34px 32px;
          border: 3px solid #b68b38;
          border-radius: 18px;
          background:
            linear-gradient(rgba(255, 253, 246, 0.97), rgba(247, 239, 216, 0.97)),
            #fffaf0;
          color: #26372f;
          text-align: center;
          box-shadow:
            0 28px 80px rgba(0, 0, 0, 0.5),
            inset 0 0 0 5px rgba(255, 255, 255, 0.65);
        }

        .sectionModal h2 {
          margin: 8px 0 20px;
          color: #173f32;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(1.8rem, 6vw, 2.7rem);
        }

        .sectionModal p:not(.modalEyebrow) {
          margin: 10px 0;
          line-height: 1.65;
        }

        .modalIcon {
          display: grid;
          width: 72px;
          height: 72px;
          margin: 0 auto 18px;
          place-items: center;
          border: 3px solid #c7a04e;
          border-radius: 50%;
          background: #173f32;
          font-size: 34px;
          box-shadow: 0 7px 20px rgba(23, 63, 50, 0.25);
        }

        .closeButton {
          position: absolute;
          top: 10px;
          right: 14px;
          width: 38px;
          height: 38px;
          cursor: pointer;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: #5e4720;
          font-size: 2rem;
          line-height: 1;
        }

        .closeButton:hover,
        .closeButton:focus-visible {
          background: rgba(182, 139, 56, 0.15);
          outline: 2px solid #b68b38;
        }

        .goldButton {
          margin-top: 20px;
          padding: 11px 24px;
          cursor: pointer;
          border: 2px solid #b68b38;
          border-radius: 999px;
          background: #173f32;
          color: #fff9e9;
          font-weight: 800;
          transition:
            transform 150ms ease,
            background 150ms ease;
        }

        .goldButton:hover,
        .goldButton:focus-visible {
          transform: translateY(-2px);
          background: #245a47;
          outline: none;
        }

        @keyframes gentleGlow {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(0.92);
          }

          50% {
            opacity: 0.9;
            transform: scale(1.08);
          }
        }

        @media (max-width: 800px) {
          .roomHeader {
            padding-inline: 8px;
          }

          .subtitle {
            font-size: 0.95rem;
          }

          .roomScene {
            border-width: 3px;
            border-radius: 8px;
          }

          .clickSymbol {
            bottom: -18px;
            width: 22px;
            height: 22px;
            border-width: 1px;
          }

          .symbolIcon {
            font-size: 11px;
          }

          .sectionModal {
            padding: 34px 22px 26px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .symbolGlow {
            animation: none;
          }

          .categoryHotspot,
          .clickSymbol,
          .goldButton {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}