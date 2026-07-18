"use client";

import { useState } from "react";

type LibraryObject =
  | "jokeBook"
  | "confirmedHall"
  | "animalTeam"
  | "jenny"
  | "capone"
  | "lilo"
  | "globe"
  | "staffDoor"
  | "secretShelf"
  | "cathySign";

type LibraryItem = {
  icon: string;
  title: string;
  english: string;
  spanish: string;
  description: string;
  secret?: boolean;
};

const items: Record<
  LibraryObject,
  LibraryItem
> = {
  jokeBook: {
    icon: "📖",
    title:
      "Les 100 petites blagues à raconter",
    english:
      "100 Little Jokes to Tell",
    spanish:
      "100 pequeños chistes para contar",
    description:
      "Cent blagues courtes, bienveillantes et faciles à retenir, présentées en français, anglais et espagnol.",
  },

  confirmedHall: {
    icon: "🏛️",
    title:
      "Le Hall des vérités confirmées",
    english:
      "The Hall of Confirmed Truths",
    spanish:
      "El Salón de las Verdades Confirmadas",
    description:
      "L’arche centrale mène aux affirmations dont la véracité a survécu à l’examen du CWRC.",
  },

  animalTeam: {
    icon: "🐾",
    title:
      "Le tableau de l’équipe animale",
    english:
      "The Animal Team Board",
    spanish:
      "El tablero del equipo animal",
    description:
      "Jenny, Ranger, Lilo, Annie, Capone et Niko y possèdent chacun un dossier officiel, ou du moins une photo très sérieuse.",
  },

  jenny: {
    icon: "🐴",
    title: "La section de Jenny",
    english: "Jenny’s Section",
    spanish: "La sección de Jenny",
    description:
      "Cet espace accueillera plus tard le livre des histoires de Jenny, ses observations et sa sagesse équine.",
  },

  capone: {
    icon: "🐈",
    title:
      "Capone, assistant de recherche",
    english:
      "Capone, Research Assistant",
    spanish:
      "Capone, asistente de investigación",
    description:
      "Capone pratique une méthode de recherche avancée : dormir directement sur les références les plus importantes.",
  },

  lilo: {
    icon: "🐩",
    title:
      "Le coin de réflexion de Lilo",
    english:
      "Lilo’s Thinking Corner",
    spanish:
      "El rincón de reflexión de Lilo",
    description:
      "Lilo réfléchit profondément. Les ronflements occasionnels font officiellement partie du processus.",
  },

  globe: {
    icon: "🌍",
    title: "Le globe des histoires",
    english:
      "The Globe of Stories",
    spanish:
      "El globo de las historias",
    description:
      "Ce globe accueillera des histoires, des curiosités et des contenus provenant de différents pays.",
  },

  staffDoor: {
    icon: "🚪",
    title:
      "Le passage réservé aux pattes",
    english:
      "The Paws-Only Passage",
    spanish:
      "El pasaje reservado para patas",
    description:
      "Passage secret découvert! Cette porte est réservée au personnel possédant deux ou quatre pattes. Les humains doivent présenter une excellente raison et une gâterie.",
    secret: true,
  },

  secretShelf: {
    icon: "🗝️",
    title:
      "L’étagère qui n’était pas là",
    english:
      "The Shelf That Wasn’t There",
    spanish:
      "La estantería que no estaba allí",
    description:
      "Passage secret découvert! En tirant le troisième livre, l’étagère pivote. En tirant le mauvais livre, on obtient seulement un dictionnaire de 900 pages.",
    secret: true,
  },

  cathySign: {
    icon: "🔎",
    title:
      "La preuve derrière le tableau",
    english:
      "The Evidence Behind the Sign",
    spanish:
      "La evidencia detrás del letrero",
    description:
      "Passage secret découvert! Derrière le tableau se trouve une note : « Si Cathy l’a dit, vérifiez tout de même les données. Elles confirmeront probablement qu’elle avait raison. »",
    secret: true,
  },
};

const hotspots: {
  key: LibraryObject;
  left: string;
  top: string;
}[] = [
  {
    key: "jokeBook",
    left: "27%",
    top: "82%",
  },
  {
    key: "confirmedHall",
    left: "52%",
    top: "43%",
  },
  {
    key: "animalTeam",
    left: "81%",
    top: "35%",
  },
  {
    key: "jenny",
    left: "35%",
    top: "63%",
  },
  {
    key: "capone",
    left: "81%",
    top: "63%",
  },
  {
    key: "lilo",
    left: "68%",
    top: "83%",
  },
  {
    key: "globe",
    left: "94%",
    top: "78%",
  },
  {
    key: "staffDoor",
    left: "92%",
    top: "57%",
  },
  {
    key: "secretShelf",
    left: "29%",
    top: "27%",
  },
  {
    key: "cathySign",
    left: "80%",
    top: "54%",
  },
];

const secretKeys: LibraryObject[] = [
  "staffDoor",
  "secretShelf",
  "cathySign",
];

export default function InteractiveLibrary() {
  const [selected, setSelected] =
    useState<LibraryObject | null>(
      null,
    );

  const [hovered, setHovered] =
    useState<LibraryObject | null>(
      null,
    );

  const [
    discoveredSecrets,
    setDiscoveredSecrets,
  ] = useState<LibraryObject[]>([]);

  const selectedItem = selected
    ? items[selected]
    : null;

  function openObject(
    key: LibraryObject,
  ) {
    if (key === "jokeBook") {
      window.location.href =
        "/library/jokes";

      return;
    }

    if (key === "confirmedHall") {
      window.location.href =
        "/confirmed-truths";

      return;
    }

    if (
      items[key].secret &&
      !discoveredSecrets.includes(key)
    ) {
      setDiscoveredSecrets(
        (oldSecrets) => [
          ...oldSecrets,
          key,
        ],
      );
    }

    setSelected(key);
  }

  return (
    <section style={pageStyle}>
      <p style={eyebrowStyle}>
        Division des connaissances du
        CWRC
      </p>

      <h1 style={titleStyle}>
        La Grande Bibliothèque
      </h1>

      <p style={translatedTitleStyle}>
        The Grand Library · La Gran
        Biblioteca
      </p>

      <p style={introStyle}>
        Cliquez sur les livres, les
        animaux et les objets. Certains
        passages préfèrent toutefois ne
        pas être trouvés trop
        rapidement.
      </p>

      <div style={secretCounterStyle}>
        🗝️ Passages secrets découverts ·
        Secret passages found · Pasajes
        secretos descubiertos :{" "}
        <strong>
          {discoveredSecrets.length} /{" "}
          {secretKeys.length}
        </strong>
      </div>

      <div style={libraryStyle}>
        <img
          src="/images/bibliotheque.png"
          alt="La Grande Bibliothèque du CWRC"
          style={imageStyle}
        />

        {hotspots.map((hotspot) => {
          const item =
            items[hotspot.key];

          const active =
            hovered === hotspot.key;

          const discovered =
            discoveredSecrets.includes(
              hotspot.key,
            );

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
                backgroundColor:
                  discovered
                    ? "#8A3F74"
                    : active
                      ? "#D8C49A"
                      : "#102A4C",
                color: active
                  ? "#102A4C"
                  : "#FFFDF8",
                boxShadow: discovered
                  ? "0 0 0 8px rgba(138,63,116,.3), 0 0 28px #E9A9D5"
                  : active
                    ? "0 0 0 8px rgba(216,196,154,.35), 0 0 28px #F7D77A"
                    : "0 5px 18px rgba(0,0,0,.45)",
              }}
            >
              {item.secret &&
              !discovered
                ? "?"
                : item.icon}
            </button>
          );
        })}
      </div>

      <div style={objectGridStyle}>
        {(
          Object.keys(
            items,
          ) as LibraryObject[]
        ).map((key) => {
          const item = items[key];

          const discovered =
            discoveredSecrets.includes(
              key,
            );

          return (
            <button
              key={key}
              type="button"
              onClick={() =>
                openObject(key)
              }
              style={
                key === "jokeBook"
                  ? jokeBookButtonStyle
                  : item.secret
                    ? secretButtonStyle
                    : objectButtonStyle
              }
            >
              <span
                style={objectIconStyle}
              >
                {item.secret &&
                !discovered
                  ? "❓"
                  : item.icon}
              </span>

              <span style={labelStyle}>
                <strong>
                  {item.secret &&
                  !discovered
                    ? "Objet mystérieux"
                    : item.title}
                </strong>

                <small>
                  {item.secret &&
                  !discovered
                    ? "Mysterious object"
                    : item.english}
                </small>

                <small>
                  {item.secret &&
                  !discovered
                    ? "Objeto misterioso"
                    : item.spanish}
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
            aria-labelledby="library-object-title"
            style={
              selectedItem.secret
                ? secretStoryStyle
                : storyStyle
            }
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <span
              style={storyIconStyle}
            >
              {selectedItem.icon}
            </span>

            {selectedItem.secret && (
              <p style={secretFoundStyle}>
                ✨ Passage secret
                découvert! · Secret
                passage found! · ¡Pasaje
                secreto descubierto!
              </p>
            )}

            <h2
              id="library-object-title"
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

            {!selectedItem.secret && (
              <div
                style={
                  preparationNoteStyle
                }
              >
                <strong>
                  Contenu évolutif
                </strong>

                <p
                  style={{
                    margin: "7px 0 0",
                  }}
                >
                  Cet emplacement pourra
                  recevoir des histoires,
                  des livres et d’autres
                  contenus publiés depuis
                  le portail
                  administrateur.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() =>
                setSelected(null)
              }
              style={closeButtonStyle}
            >
              Fermer · Close · Cerrar
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
    "clamp(2.5rem,6vw,5rem)",
  lineHeight: 1,
};

const translatedTitleStyle = {
  margin: "10px 0",
  textAlign: "center" as const,
  color: "#8A6A3D",
  fontFamily: "Georgia, serif",
  fontWeight: "bold",
};

const introStyle = {
  maxWidth: "850px",
  margin: "18px auto 20px",
  textAlign: "center" as const,
  color: "#6E5B3F",
  fontSize: "1.15rem",
  lineHeight: 1.7,
};

const secretCounterStyle = {
  width: "fit-content",
  maxWidth: "100%",
  margin: "0 auto 22px",
  padding: "10px 16px",
  borderRadius: "999px",
  backgroundColor: "#102A4C",
  color: "#FFFDF8",
  textAlign: "center" as const,
  fontSize: ".9rem",
};

const libraryStyle = {
  position: "relative" as const,
  overflow: "hidden",
  borderRadius: "24px",
  boxShadow:
    "0 18px 44px rgba(16,42,76,.25)",
  border:
    "1px solid rgba(138,106,61,.4)",
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
  fontWeight: "bold",
  cursor: "pointer",
  transition:
    "transform .2s, background-color .2s, box-shadow .2s",
};

const objectGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(215px,1fr))",
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

const jokeBookButtonStyle = {
  ...objectButtonStyle,
  border: "2px solid #8A6A3D",
  backgroundColor: "#F7E9BD",
  boxShadow:
    "0 7px 18px rgba(138,106,61,.18)",
};

const secretButtonStyle = {
  ...objectButtonStyle,
  border:
    "2px dashed rgba(138,63,116,.65)",
  backgroundColor: "#F8EDF5",
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
  zIndex: 2000,
  display: "grid",
  placeItems: "center",
  overflowY: "auto" as const,
  padding: "20px",
  backgroundColor:
    "rgba(5,16,32,.88)",
};

const storyStyle = {
  width: "min(700px,100%)",
  maxHeight: "88vh",
  overflowY: "auto" as const,
  padding: "30px",
  borderRadius: "22px",
  backgroundColor: "#FFFDF8",
  color: "#102A4C",
  border: "3px solid #D8C49A",
  boxShadow:
    "0 24px 70px rgba(0,0,0,.48)",
};

const secretStoryStyle = {
  ...storyStyle,
  border: "4px solid #8A3F74",
  background:
    "linear-gradient(145deg,#FFFDF8,#F8EDF5)",
};

const storyIconStyle = {
  display: "block",
  fontSize: "3.5rem",
  textAlign: "center" as const,
};

const secretFoundStyle = {
  margin: "12px 0",
  textAlign: "center" as const,
  color: "#8A3F74",
  fontWeight: "bold",
  textTransform:
    "uppercase" as const,
  letterSpacing: ".08em",
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