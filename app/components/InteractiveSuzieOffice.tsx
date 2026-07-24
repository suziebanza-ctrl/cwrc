"use client";

import { useState } from "react";
import type { Locale } from "../i18n/config";
import { localizedHref } from "../i18n/config";

type ObjectKey =
  | "suzie"
  | "diplomas"
  | "gaspesie"
  | "lilo"
  | "quality"
  | "books"
  | "cwrc"
  | "smallGlobe"
  | "largeGlobe"
  | "secretPassage";

const copy = {
  fr: {
    eyebrow: "Division des opérations du CWRC",
    title: "Le Bureau de Suzie",
    intro:
      "Passez sur un objet pour l’illuminer, puis cliquez pour ouvrir son dossier.",
    close: "Fermer le dossier",
    comingTitle: "Histoire en préparation",
    comingText:
      "Suzie applique actuellement un contrôle qualité à cette histoire. Elle sera publiée lorsqu’elle aura survécu à toutes les vérifications.",
    objects: {
      suzie: {
        icon: "👩‍🔬",
        title: "Suzie et sa planchette",
      },
      diplomas: {
        icon: "🎓",
        title: "Le mur des diplômes",
      },
      gaspesie: {
        icon: "🌊",
        title: "Les souvenirs de la Gaspésie",
      },
      lilo: {
        icon: "🐩",
        title: "Lilo, agente du moral",
      },
      quality: {
        icon: "☕",
        title: "Planifier, vérifier, améliorer",
      },
      books: {
        icon: "📚",
        title: "Les dossiers de qualité et de risques",
      },
      cwrc: {
        icon: "🏛️",
        title: "L’affiche officielle du CWRC",
      },
      smallGlobe: {
        icon: "🌍",
        title: "Voyage par continent",
      },
      largeGlobe: {
        icon: "🌎",
        title: "Le Grand Défi mondial",
      },
      secretPassage: {
        icon: "🖼️",
        title: "Le passage secret des cinquante tableaux",
      },
    },
  },

  en: {
    eyebrow: "CWRC Operations Division",
    title: "Suzie’s Office",
    intro:
      "Hover over an object to illuminate it, then select it to open its file.",
    close: "Close the file",
    comingTitle: "Story in preparation",
    comingText:
      "Suzie is currently applying quality control to this story. It will be published once it has survived every verification.",
    objects: {
      suzie: {
        icon: "👩‍🔬",
        title: "Suzie and her clipboard",
      },
      diplomas: {
        icon: "🎓",
        title: "The diploma wall",
      },
      gaspesie: {
        icon: "🌊",
        title: "Memories of Gaspésie",
      },
      lilo: {
        icon: "🐩",
        title: "Lilo, morale officer",
      },
      quality: {
        icon: "☕",
        title: "Plan, check, improve",
      },
      books: {
        icon: "📚",
        title: "Quality and risk files",
      },
      cwrc: {
        icon: "🏛️",
        title: "The official CWRC sign",
      },
      smallGlobe: {
        icon: "🌍",
        title: "Journey by continent",
      },
      largeGlobe: {
        icon: "🌎",
        title: "The Great World Challenge",
      },
      secretPassage: {
        icon: "🖼️",
        title: "The secret passage of fifty paintings",
      },
    },
  },

  es: {
    eyebrow: "División de operaciones del CWRC",
    title: "La oficina de Suzie",
    intro:
      "Pasa sobre un objeto para iluminarlo y selecciónalo para abrir su expediente.",
    close: "Cerrar el expediente",
    comingTitle: "Historia en preparación",
    comingText:
      "Suzie está aplicando actualmente un control de calidad a esta historia. Se publicará cuando haya superado todas las verificaciones.",
    objects: {
      suzie: {
        icon: "👩‍🔬",
        title: "Suzie y su carpeta",
      },
      diplomas: {
        icon: "🎓",
        title: "La pared de diplomas",
      },
      gaspesie: {
        icon: "🌊",
        title: "Recuerdos de Gaspésie",
      },
      lilo: {
        icon: "🐩",
        title: "Lilo, encargada de la moral",
      },
      quality: {
        icon: "☕",
        title: "Planificar, verificar y mejorar",
      },
      books: {
        icon: "📚",
        title: "Expedientes de calidad y riesgos",
      },
      cwrc: {
        icon: "🏛️",
        title: "El letrero oficial del CWRC",
      },
      smallGlobe: {
        icon: "🌍",
        title: "Viaje por continente",
      },
      largeGlobe: {
        icon: "🌎",
        title: "El Gran Desafío Mundial",
      },
      secretPassage: {
        icon: "🖼️",
        title: "El pasaje secreto de los cincuenta cuadros",
      },
    },
  },
} as const;

const hotspots: {
  key: ObjectKey;
  left: string;
  top: string;
}[] = [
  { key: "suzie", left: "29%", top: "39%" },
  { key: "diplomas", left: "43%", top: "13%" },
  { key: "gaspesie", left: "79%", top: "29%" },
  { key: "lilo", left: "67%", top: "60%" },
  { key: "quality", left: "7%", top: "67%" },
  { key: "books", left: "88%", top: "78%" },
  { key: "cwrc", left: "72%", top: "9%" },
  { key: "smallGlobe", left: "16%", top: "69%" },
  { key: "largeGlobe", left: "90%", top: "37%" },
  { key: "secretPassage", left: "57%", top: "34%" },
];

export default function InteractiveSuzieOffice({
  locale,
}: {
  locale: Locale;
}) {
  const t = copy[locale];

  const [selected, setSelected] =
    useState<ObjectKey | null>(null);

  const [hovered, setHovered] =
    useState<ObjectKey | null>(null);

  const selectedObject = selected
    ? t.objects[selected]
    : null;

  function openObject(key: ObjectKey) {
    if (key === "secretPassage") {
      window.location.href =
        localizedHref(
          locale,
          "secret-passage",
        );

      return;
    }

    if (key === "smallGlobe") {
      window.location.href =
        `${localizedHref(
          locale,
          "geography-game",
        )}?mode=continent`;

      return;
    }

    if (key === "largeGlobe") {
      window.location.href =
        `${localizedHref(
          locale,
          "geography-game",
        )}?mode=world`;

      return;
    }

    setSelected(key);
  }

  const story = selected
    ? {
        title: t.comingTitle,
        text: t.comingText,
      }
    : null;

  return (
    <section style={pageStyle}>
      <p style={eyebrowStyle}>{t.eyebrow}</p>

      <h1 style={titleStyle}>{t.title}</h1>

      <p style={introStyle}>{t.intro}</p>

      <div style={officeStyle}>
        <img
          src="/images/bureau-suzie.png"
          alt={t.title}
          style={imageStyle}
        />

        {hotspots.map((hotspot) => {
          const item = t.objects[hotspot.key];

          const active =
            hovered === hotspot.key;

          return (
            <button
              key={hotspot.key}
              type="button"
              aria-label={item.title}
              title={item.title}
              onMouseEnter={() =>
                setHovered(hotspot.key)
              }
              onMouseLeave={() =>
                setHovered(null)
              }
              onFocus={() =>
                setHovered(hotspot.key)
              }
              onBlur={() =>
                setHovered(null)
              }
              onClick={() =>
                openObject(hotspot.key)
              }
              style={{
                ...hotspotStyle,
                left: hotspot.left,
                top: hotspot.top,
                transform: active
                  ? "translate(-50%,-50%) scale(1.22)"
                  : "translate(-50%,-50%)",
                backgroundColor: active
                  ? "#D8C49A"
                  : "#102A4C",
                color: active
                  ? "#102A4C"
                  : "#F7F1E6",
                boxShadow: active
                  ? "0 0 0 8px rgba(216,196,154,.32), 0 0 28px #F7D77A"
                  : "0 5px 18px rgba(0,0,0,.38)",
              }}
            >
              {item.icon}
            </button>
          );
        })}
      </div>

      <div style={objectGridStyle}>
        {(
          Object.keys(t.objects) as ObjectKey[]
        ).map((key) => {
          const item = t.objects[key];

          return (
            <button
              key={key}
              type="button"
              onClick={() => openObject(key)}
              style={objectButtonStyle}
            >
              <span style={objectIconStyle}>
                {item.icon}
              </span>

              <span>{item.title}</span>
            </button>
          );
        })}
      </div>

      {selectedObject && story && (
        <div
          style={overlayStyle}
          onClick={() => setSelected(null)}
          role="presentation"
        >
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="suzie-story-title"
            style={storyStyle}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <span style={storyIconStyle}>
              {selectedObject.icon}
            </span>

            <h2
              id="suzie-story-title"
              style={storyTitleStyle}
            >
              {selectedObject.title}
            </h2>

            <h3 style={storySubtitleStyle}>
              {story.title}
            </h3>

            <p style={storyTextStyle}>
              {story.text}
            </p>

            <button
              type="button"
              onClick={() => setSelected(null)}
              style={closeButtonStyle}
            >
              {t.close}
            </button>
          </article>
        </div>
      )}
    </section>
  );
}

const pageStyle = {
  marginTop: "20px",
};

const eyebrowStyle = {
  margin: 0,
  textAlign: "center" as const,
  letterSpacing: ".18em",
  textTransform: "uppercase" as const,
  color: "#8A6A3D",
  fontWeight: "bold",
  fontSize: ".82rem",
};

const titleStyle = {
  margin: "12px 0",
  textAlign: "center" as const,
  color: "#102A4C",
  fontSize: "clamp(2.4rem,6vw,4.8rem)",
  lineHeight: 1,
};

const introStyle = {
  maxWidth: "820px",
  margin: "20px auto 34px",
  textAlign: "center" as const,
  color: "#6E5B3F",
  fontSize: "1.15rem",
  lineHeight: 1.7,
};

const officeStyle = {
  position: "relative" as const,
  overflow: "hidden",
  borderRadius: "24px",
  boxShadow:
    "0 18px 44px rgba(16,42,76,.2)",
  border:
    "1px solid rgba(138,106,61,.35)",
};

const imageStyle = {
  display: "block",
  width: "100%",
  height: "auto",
};

const hotspotStyle = {
  position: "absolute" as const,
  display: "grid",
  placeItems: "center",
  width: "clamp(38px,4.5vw,58px)",
  height: "clamp(38px,4.5vw,58px)",
  borderRadius: "50%",
  border: "3px solid #F7F1E6",
  fontSize: "clamp(1rem,2vw,1.45rem)",
  cursor: "pointer",
  transition:
    "transform .2s, background-color .2s, box-shadow .2s",
};

const objectGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(190px,1fr))",
  gap: "14px",
  marginTop: "26px",
};

const objectButtonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "16px",
  borderRadius: "15px",
  border:
    "1px solid rgba(138,106,61,.3)",
  backgroundColor: "#FFFDF8",
  color: "#102A4C",
  fontFamily: "Georgia, serif",
  fontWeight: "bold",
  fontSize: "1rem",
  textAlign: "left" as const,
  cursor: "pointer",
};

const objectIconStyle = {
  fontSize: "1.8rem",
};

const overlayStyle = {
  position: "fixed" as const,
  inset: 0,
  zIndex: 1000,
  display: "grid",
  placeItems: "center",
  padding: "20px",
  backgroundColor: "rgba(9,25,48,.78)",
};

const storyStyle = {
  width: "min(680px,100%)",
  maxHeight: "85vh",
  overflowY: "auto" as const,
  padding: "30px",
  borderRadius: "22px",
  backgroundColor: "#FFFDF8",
  color: "#102A4C",
  border: "3px solid #D8C49A",
  boxShadow:
    "0 24px 70px rgba(0,0,0,.42)",
};

const storyIconStyle = {
  display: "block",
  fontSize: "3rem",
  textAlign: "center" as const,
};

const storyTitleStyle = {
  margin: "12px 0",
  textAlign: "center" as const,
  fontSize: "2rem",
};

const storySubtitleStyle = {
  margin: "18px 0 8px",
  color: "#8A6A3D",
  textAlign: "center" as const,
};

const storyTextStyle = {
  margin: "16px 0",
  fontSize: "1.08rem",
  lineHeight: 1.8,
};

const closeButtonStyle = {
  display: "block",
  margin: "24px auto 0",
  padding: "12px 20px",
  border: 0,
  borderRadius: "999px",
  backgroundColor: "#102A4C",
  color: "#F7F1E6",
  fontWeight: "bold",
  cursor: "pointer",
};
