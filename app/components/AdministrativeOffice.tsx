"use client";

import { useState } from "react";
import type { Locale } from "../i18n/config";

type StoryKey =
  | "amateur"
  | "chocolate"
  | "tea"
  | "map"
  | "ranger";

const copy = {
  fr: {
    eyebrow: "Aile administrative du CWRC",
    title: "Le Bureau administratif d’Amateur",
    intro:
      "Touchez un objet pour découvrir son histoire. Amateur affirme que tout est parfaitement classé, ce qui demeure à confirmer.",
    explore: "Objets à examiner",
    close: "Fermer l’histoire",
    clickHint: "Cliquez pour découvrir l’histoire",

    stories: {
      amateur: {
        icon: "🦉",
        title: "Amateur, le hibou administratif",
        text:
          "Amateur fut nommé responsable des archives après avoir rempli son formulaire d’embauche à l’envers. Cathy remarqua qu’il avait tout de même coché les bonnes cases, ce qui constituait déjà une performance supérieure à la moyenne administrative. Depuis, il veille sur les dossiers avec une sagesse pas toujours très sage, des lunettes légèrement de travers et une remarquable capacité à dormir pendant les réunions tout en ayant l’air profondément concentré.",
      },

      chocolate: {
        icon: "🍫",
        title: "Le tiroir secret au chocolat",
        text:
          "Officiellement, ce tiroir contient des formulaires fiscaux classés par ordre alphabétique. En réalité, Amateur y conserve sa réserve de chocolat. Il a choisi cet emplacement après une étude rigoureuse : personne n’ouvre volontairement un tiroir identifié comme fiscal. Ranger effectue néanmoins une ronde quotidienne pour s’assurer que le chocolat demeure parfaitement hors de portée des chiens.",
      },

      tea: {
        icon: "🫖",
        title: "Le protocole du thé de quatre heures",
        text:
          "À seize heures précises, le café peut exceptionnellement céder sa place au thé. Le protocole exige deux tasses, une théière convenablement réchauffée, des sandwichs au concombre et des scones avec confiture. Lilo est autorisée à poser la tête sur la cuisse de Suzie, mais cette disposition ne constitue pas une garantie officielle d’obtenir un morceau de scone.",
      },

      map: {
        icon: "🗺️",
        title: "La carte mondiale du CWRC",
        text:
          "Amateur place une épingle sur la carte chaque fois qu’une personne visite le Centre depuis un nouvel endroit. Il soutient qu’une seule visite suffit pour déclarer l’ouverture d’une succursale internationale. Le service juridique du CWRC n’a jamais approuvé cette interprétation, mais la carte devient tout de même de plus en plus impressionnante.",
      },

      ranger: {
        icon: "🐾",
        title: "L’empreinte de Ranger",
        text:
          "Cette empreinte fut découverte après une ronde de sécurité particulièrement minutieuse. Ranger affirme qu’il vérifiait le plancher, les sorties d’urgence et l’intégrité du tiroir à chocolat. Amateur soutient plutôt que Ranger cherchait des miettes de scone. L’enquête demeure ouverte, mais le plancher a été déclaré exceptionnellement propre.",
      },
    },
  },

  en: {
    eyebrow: "CWRC Administrative Wing",
    title: "Amateur’s Administrative Office",
    intro:
      "Select an object to discover its story. Amateur claims that everything is perfectly filed, which remains to be confirmed.",
    explore: "Objects to examine",
    close: "Close the story",
    clickHint: "Select to discover the story",

    stories: {
      amateur: {
        icon: "🦉",
        title: "Amateur, the administrative owl",
        text:
          "Amateur was appointed head of the archives after completing his employment form upside down. Cathy noticed that he had nevertheless checked all the correct boxes, already an above-average administrative performance. He now watches over the files with wisdom that is not always very wise, slightly crooked glasses, and a remarkable ability to sleep during meetings while appearing deeply focused.",
      },

      chocolate: {
        icon: "🍫",
        title: "The secret chocolate drawer",
        text:
          "Officially, this drawer contains tax forms filed alphabetically. In reality, Amateur keeps his chocolate supply inside it. He selected the location after rigorous study: no one voluntarily opens a drawer labelled for taxes. Ranger nevertheless performs a daily patrol to ensure that the chocolate remains safely out of every dog’s reach.",
      },

      tea: {
        icon: "🫖",
        title: "The four o’clock tea protocol",
        text:
          "At precisely four o’clock, coffee may exceptionally yield its place to tea. Protocol requires two cups, a properly warmed teapot, cucumber sandwiches, and scones with jam. Lilo may rest her head on Suzie’s thigh, but this provision does not constitute an official guarantee that she will receive a piece of scone.",
      },

      map: {
        icon: "🗺️",
        title: "The CWRC world map",
        text:
          "Amateur places a pin on the map whenever someone visits the Center from a new location. He maintains that a single visit is sufficient to declare the opening of an international branch. The CWRC legal department has never approved this interpretation, but the map continues to become increasingly impressive.",
      },

      ranger: {
        icon: "🐾",
        title: "Ranger’s paw print",
        text:
          "This paw print was discovered after a particularly thorough security patrol. Ranger claims that he was inspecting the floor, the emergency exits, and the integrity of the chocolate drawer. Amateur insists that Ranger was looking for scone crumbs. The investigation remains open, but the floor was declared exceptionally clean.",
      },
    },
  },

  es: {
    eyebrow: "Ala administrativa del CWRC",
    title: "La oficina administrativa de Amateur",
    intro:
      "Selecciona un objeto para descubrir su historia. Amateur afirma que todo está perfectamente archivado, algo que todavía debe confirmarse.",
    explore: "Objetos para examinar",
    close: "Cerrar la historia",
    clickHint: "Selecciona para descubrir la historia",

    stories: {
      amateur: {
        icon: "🦉",
        title: "Amateur, el búho administrativo",
        text:
          "Amateur fue nombrado responsable de los archivos después de completar al revés su formulario de contratación. Cathy observó que, aun así, había marcado todas las casillas correctas, lo que ya constituía un rendimiento administrativo superior al promedio. Desde entonces, vigila los expedientes con una sabiduría no siempre muy sabia, las gafas ligeramente torcidas y una extraordinaria capacidad para dormir durante las reuniones mientras parece profundamente concentrado.",
      },

      chocolate: {
        icon: "🍫",
        title: "El cajón secreto del chocolate",
        text:
          "Oficialmente, este cajón contiene formularios fiscales clasificados por orden alfabético. En realidad, Amateur guarda allí su reserva de chocolate. Eligió el lugar tras un estudio riguroso: nadie abre voluntariamente un cajón destinado a los impuestos. Ranger realiza, sin embargo, una ronda diaria para asegurarse de que el chocolate permanezca fuera del alcance de todos los perros.",
      },

      tea: {
        icon: "🫖",
        title: "El protocolo del té de las cuatro",
        text:
          "A las cuatro en punto, el café puede ceder excepcionalmente su lugar al té. El protocolo exige dos tazas, una tetera debidamente calentada, sándwiches de pepino y scones con mermelada. Lilo puede apoyar la cabeza sobre el muslo de Suzie, pero esta disposición no garantiza oficialmente que reciba un trozo de scone.",
      },

      map: {
        icon: "🗺️",
        title: "El mapa mundial del CWRC",
        text:
          "Amateur coloca una chincheta en el mapa cada vez que alguien visita el Centro desde un nuevo lugar. Sostiene que una sola visita basta para declarar abierta una sucursal internacional. El departamento jurídico del CWRC nunca ha aprobado esta interpretación, pero el mapa continúa volviéndose cada vez más impresionante.",
      },

      ranger: {
        icon: "🐾",
        title: "La huella de Ranger",
        text:
          "Esta huella fue descubierta después de una ronda de seguridad particularmente minuciosa. Ranger afirma que estaba inspeccionando el suelo, las salidas de emergencia y la integridad del cajón del chocolate. Amateur sostiene que Ranger buscaba migas de scone. La investigación continúa abierta, pero el suelo fue declarado excepcionalmente limpio.",
      },
    },
  },
} as const;

const hotspots: {
  key: StoryKey;
  left: string;
  top: string;
}[] = [
  {
    key: "amateur",
    left: "20%",
    top: "22%",
  },
  {
    key: "chocolate",
    left: "23%",
    top: "65%",
  },
  {
    key: "tea",
    left: "51%",
    top: "59%",
  },
  {
    key: "map",
    left: "59%",
    top: "20%",
  },
  {
    key: "ranger",
    left: "15%",
    top: "88%",
  },
];

export default function AdministrativeOffice({
  locale,
}: {
  locale: Locale;
}) {
  const t = copy[locale];

  const [selected, setSelected] =
    useState<StoryKey | null>(null);

  const story = selected
    ? t.stories[selected]
    : null;

  return (
    <section style={pageStyle}>
      <p style={eyebrowStyle}>{t.eyebrow}</p>

      <h1 style={titleStyle}>{t.title}</h1>

      <p style={introStyle}>{t.intro}</p>

      <div style={officeStyle}>
        <img
          src="/images/bureau-administratif.png"
          alt={t.title}
          style={imageStyle}
        />

        {hotspots.map((hotspot) => {
          const item = t.stories[hotspot.key];

          return (
            <button
              key={hotspot.key}
              type="button"
              onClick={() =>
                setSelected(hotspot.key)
              }
              aria-label={item.title}
              title={`${t.clickHint}: ${item.title}`}
              style={{
                ...hotspotStyle,
                left: hotspot.left,
                top: hotspot.top,
              }}
            >
              {item.icon}
            </button>
          );
        })}
      </div>

      <h2 style={exploreTitleStyle}>
        {t.explore}
      </h2>

      <div style={objectGridStyle}>
        {(
          Object.keys(t.stories) as StoryKey[]
        ).map((key) => {
          const item = t.stories[key];

          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelected(key)}
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

      {story && (
        <div
          style={overlayStyle}
          onClick={() => setSelected(null)}
          role="presentation"
        >
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="office-story-title"
            style={storyStyle}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <span style={storyIconStyle}>
              {story.icon}
            </span>

            <h2
              id="office-story-title"
              style={storyTitleStyle}
            >
              {story.title}
            </h2>

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
  transform: "translate(-50%,-50%)",
  display: "grid",
  placeItems: "center",
  width: "clamp(38px,5vw,58px)",
  height: "clamp(38px,5vw,58px)",
  borderRadius: "50%",
  border: "3px solid #F7F1E6",
  backgroundColor: "#102A4C",
  color: "white",
  fontSize: "clamp(1rem,2vw,1.5rem)",
  cursor: "pointer",
  boxShadow:
    "0 5px 18px rgba(0,0,0,.38)",
};

const exploreTitleStyle = {
  margin: "38px 0 18px",
  textAlign: "center" as const,
  color: "#102A4C",
  fontSize: "1.8rem",
};

const objectGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(190px,1fr))",
  gap: "14px",
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

const storyTextStyle = {
  margin: "20px 0",
  fontSize: "1.08rem",
  lineHeight: 1.8,
  whiteSpace: "pre-wrap" as const,
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