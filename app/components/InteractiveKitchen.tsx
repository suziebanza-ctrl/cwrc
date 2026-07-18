"use client";

import { useState } from "react";
import PublishedObjectContent from "./PublishedObjectContent";

type KitchenObject =
  | "recipes"
  | "dailyPlan"
  | "coffee"
  | "annie"
  | "library"
  | "pantry"
  | "table"
  | "window";

type KitchenItem = {
  icon: string;
  title: string;
  english: string;
  spanish: string;
  description: string;
};

const items: Record<
  KitchenObject,
  KitchenItem
> = {
  recipes: {
    icon: "📖",
    title: "Le livre de recettes",
    english: "The Recipe Book",
    spanish: "El libro de recetas",
    description:
      "50 recettes simples, cinq ingrédients au maximum et aucun doctorat en cuisine requis.",
  },

  dailyPlan: {
    icon: "📋",
    title: "Le tableau du jour",
    english: "Today’s Board",
    spanish: "El tablero del día",
    description:
      "Cet espace accueillera les menus, les nouveautés et les annonces provenant du portail administrateur.",
  },

  coffee: {
    icon: "☕",
    title: "La station de café",
    english: "The Coffee Station",
    spanish: "La estación de café",
    description:
      "Chroniques, conversations et vérités importantes découvertes avant ou après la première tasse.",
  },

  annie: {
    icon: "🐕",
    title: "Les histoires d’Annie",
    english: "Annie’s Stories",
    spanish: "Las historias de Annie",
    description:
      "Annie attend patiemment ses histoires. Elle nie toutefois avoir goûté aux recherches laissées sur le comptoir.",
  },

  library: {
    icon: "📚",
    title: "La bibliothèque nutrition",
    english: "The Nutrition Library",
    spanish: "La biblioteca de nutrición",
    description:
      "Livres, dossiers et contenus consacrés à la nutrition, à la santé et au plaisir de bien manger.",
  },

  pantry: {
    icon: "🫙",
    title: "Le garde-manger des connaissances",
    english: "The Knowledge Pantry",
    spanish: "La despensa del conocimiento",
    description:
      "Conseils pratiques, fiches thématiques et petits contenus soigneusement rangés dans les bocaux du CWRC.",
  },

  table: {
    icon: "🍽️",
    title: "La table de la bonne compagnie",
    english: "The Good Company Table",
    spanish: "La mesa de la buena compañía",
    description:
      "Histoires sur les repas partagés et sur cette vérité fondamentale : la bonne compagnie améliore presque tout.",
  },

  window: {
    icon: "🪟",
    title: "La fenêtre des saisons",
    english: "The Seasonal Window",
    spanish: "La ventana de las estaciones",
    description:
      "Recettes saisonnières, souvenirs de la Gaspésie et contenus qui changent avec le temps.",
  },
};

const hotspots: {
  key: KitchenObject;
  left: string;
  top: string;
}[] = [
  {
    key: "window",
    left: "8%",
    top: "27%",
  },
  {
    key: "dailyPlan",
    left: "91%",
    top: "17%",
  },
  {
    key: "pantry",
    left: "67%",
    top: "22%",
  },
  {
    key: "coffee",
    left: "84%",
    top: "45%",
  },
  {
    key: "annie",
    left: "65%",
    top: "44%",
  },
  {
    key: "recipes",
    left: "30%",
    top: "52%",
  },
  {
    key: "table",
    left: "52%",
    top: "56%",
  },
  {
    key: "library",
    left: "11%",
    top: "84%",
  },
];

export default function InteractiveKitchen() {
  const [selected, setSelected] =
    useState<KitchenObject | null>(null);

  const [hovered, setHovered] =
    useState<KitchenObject | null>(null);

  const selectedItem = selected
    ? items[selected]
    : null;

  function openObject(
    key: KitchenObject,
  ) {
    if (key === "recipes") {
      window.location.href =
        "/kitchen/recipes";

      return;
    }

    setSelected(key);
  }

  return (
    <section style={pageStyle}>
      <p style={eyebrowStyle}>
        Division nutrition et café du CWRC
      </p>

      <h1 style={titleStyle}>
        La cuisine du CWRC
      </h1>

      <p style={multilingualTitleStyle}>
        The CWRC Kitchen · La cocina del CWRC
      </p>

      <p style={introStyle}>
        Passez sur un objet pour
        l’illuminer, puis cliquez pour
        découvrir ce qu’il contient.
      </p>

      <div style={kitchenStyle}>
        <img
          src="/images/cuisine.png"
          alt="La cuisine du CWRC"
          style={imageStyle}
        />

        {hotspots.map((hotspot) => {
          const item =
            items[hotspot.key];

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
                  : "#FFFDF8",
                boxShadow: active
                  ? "0 0 0 8px rgba(216,196,154,.35), 0 0 28px #F7D77A"
                  : "0 5px 18px rgba(0,0,0,.42)",
              }}
            >
              {item.icon}
            </button>
          );
        })}
      </div>

      <div style={objectGridStyle}>
        {(
          Object.keys(
            items,
          ) as KitchenObject[]
        ).map((key) => {
          const item = items[key];

          return (
            <button
              key={key}
              type="button"
              onClick={() =>
                openObject(key)
              }
              style={
                key === "recipes"
                  ? recipeButtonStyle
                  : objectButtonStyle
              }
            >
              <span
                style={objectIconStyle}
              >
                {item.icon}
              </span>

              <span style={labelStyle}>
                <strong>
                  {item.title}
                </strong>

                <small>
                  {item.english}
                </small>

                <small>
                  {item.spanish}
                </small>
              </span>
            </button>
          );
        })}
      </div>

      {selectedItem && (
        <div
          style={overlayStyle}
          onClick={() =>
            setSelected(null)
          }
          role="presentation"
        >
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="kitchen-story-title"
            style={storyStyle}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <span
              style={storyIconStyle}
            >
              {selectedItem.icon}
            </span>

            <h2
              id="kitchen-story-title"
              style={storyTitleStyle}
            >
              {selectedItem.title}
            </h2>

            <p
              style={
                translationTitleStyle
              }
            >
              {selectedItem.english}
              <br />
              {selectedItem.spanish}
            </p>

            <p style={storyTextStyle}>
              {selectedItem.description}
            </p>

            {selected && (
              <PublishedObjectContent
                roomKey="kitchen"
                objectKey={selected}
              />
            )}

            <button
              type="button"
              onClick={() =>
                setSelected(null)
              }
              style={closeButtonStyle}
            >
              Fermer
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
  textTransform:
    "uppercase" as const,
  color: "#8A6A3D",
  fontWeight: "bold",
  fontSize: ".82rem",
};

const titleStyle = {
  margin: "12px 0 6px",
  textAlign: "center" as const,
  color: "#102A4C",
  fontSize:
    "clamp(2.4rem,6vw,4.8rem)",
  lineHeight: 1,
};

const multilingualTitleStyle = {
  margin: "10px 0",
  textAlign: "center" as const,
  color: "#8A6A3D",
  fontFamily: "Georgia, serif",
  fontWeight: "bold",
};

const introStyle = {
  maxWidth: "820px",
  margin: "18px auto 34px",
  textAlign: "center" as const,
  color: "#6E5B3F",
  fontSize: "1.15rem",
  lineHeight: 1.7,
};

const kitchenStyle = {
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
  width:
    "clamp(38px,4.5vw,58px)",
  height:
    "clamp(38px,4.5vw,58px)",
  borderRadius: "50%",
  border: "3px solid #FFFDF8",
  fontSize:
    "clamp(1rem,2vw,1.45rem)",
  cursor: "pointer",
  transition:
    "transform .2s, background-color .2s, box-shadow .2s",
};

const objectGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(210px,1fr))",
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
  textAlign: "left" as const,
  cursor: "pointer",
};

const recipeButtonStyle = {
  ...objectButtonStyle,
  border: "2px solid #8A6A3D",
  backgroundColor: "#F7E9BD",
  boxShadow:
    "0 7px 18px rgba(138,106,61,.18)",
};

const objectIconStyle = {
  flexShrink: 0,
  fontSize: "2rem",
};

const labelStyle = {
  display: "grid",
  gap: "3px",
};

const overlayStyle = {
  position: "fixed" as const,
  inset: 0,
  zIndex: 1000,
  display: "grid",
  placeItems: "center",
  padding: "20px",
  backgroundColor:
    "rgba(9,25,48,.78)",
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
  fontSize: "3.5rem",
  textAlign: "center" as const,
};

const storyTitleStyle = {
  margin: "12px 0 5px",
  textAlign: "center" as const,
  fontSize: "2rem",
};

const translationTitleStyle = {
  margin: "6px 0 20px",
  textAlign: "center" as const,
  color: "#8A6A3D",
  lineHeight: 1.6,
};

const storyTextStyle = {
  margin: "16px 0",
  fontSize: "1.08rem",
  lineHeight: 1.8,
};

const preparationNoteStyle = {
  marginTop: "20px",
  padding: "16px",
  borderRadius: "14px",
  backgroundColor: "#F7F1E6",
  color: "#6E5B3F",
  lineHeight: 1.6,
};

const closeButtonStyle = {
  display: "block",
  margin: "24px auto 0",
  padding: "12px 20px",
  border: 0,
  borderRadius: "999px",
  backgroundColor: "#102A4C",
  color: "#FFFDF8",
  fontWeight: "bold",
  cursor: "pointer",
};
