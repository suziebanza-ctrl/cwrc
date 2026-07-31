"use client";

import { useEffect, useState } from "react";
import type { Locale } from "../i18n/config";

type Floor = "ground" | "upper";
type Translation = Record<Locale, string>;

type RoomSpot = {
  key: string;
  title: Translation;
  image: string;
  left: string;
  top: string;
  width: string;
  height: string;
};

const tr = (fr: string, en: string, es: string): Translation => ({
  fr,
  en,
  es,
});

const copy = {
  fr: {
    eyebrow: "Architecture du CWRC",
    title: "Plan du Centre",
    subtitle:
      "Découvrez le domaine vu du haut. Sélectionnez une pièce pour admirer son décor en grand format.",
    ground: "Rez-de-chaussée",
    upper: "Deuxième étage",
    changeFloor: "Changer d’étage",
    close: "Fermer",
    planAltGround: "Plan vu du haut du rez-de-chaussée du CWRC",
    planAltUpper: "Plan vu du haut du deuxième étage du CWRC",
  },
  en: {
    eyebrow: "CWRC Architecture",
    title: "Center Floor Plan",
    subtitle:
      "Discover the estate from above. Select a room to admire its decor in a large view.",
    ground: "Ground Floor",
    upper: "Second Floor",
    changeFloor: "Change floor",
    close: "Close",
    planAltGround: "Top-down plan of the CWRC ground floor",
    planAltUpper: "Top-down plan of the CWRC second floor",
  },
  es: {
    eyebrow: "Arquitectura del CWRC",
    title: "Plano del Centro",
    subtitle:
      "Descubre la finca desde arriba. Selecciona una sala para admirar su decoración en gran formato.",
    ground: "Planta baja",
    upper: "Segundo piso",
    changeFloor: "Cambiar de piso",
    close: "Cerrar",
    planAltGround: "Plano visto desde arriba de la planta baja del CWRC",
    planAltUpper: "Plano visto desde arriba del segundo piso del CWRC",
  },
} satisfies Record<Locale, Record<string, string>>;

const rooms: Record<Floor, RoomSpot[]> = {
  ground: [
    {
      key: "theatre",
      title: tr("Théâtre", "Theatre", "Teatro"),
      image: "/images/theatre-cwrc.png",
      left: "29%",
      top: "21%",
      width: "18%",
      height: "18%",
    },
    {
      key: "relaxation-room",
      title: tr("Salle de relaxation", "Relaxation Room", "Sala de relajación"),
      image: "/images/salle-detente.png",
      left: "50%",
      top: "22%",
      width: "18%",
      height: "20%",
    },
    {
      key: "library",
      title: tr("Grande Bibliothèque", "Grand Library", "Gran Biblioteca"),
      image: "/images/bibliotheque.png",
      left: "71%",
      top: "22%",
      width: "18%",
      height: "20%",
    },
    {
      key: "kitchen",
      title: tr("Cuisine", "Kitchen", "Cocina"),
      image: "/images/cuisine.png",
      left: "29%",
      top: "42%",
      width: "18%",
      height: "19%",
    },
    {
      key: "dining-room",
      title: tr("Salle à manger", "Dining Room", "Comedor"),
      image: "/images/salle-manger.png",
      left: "28%",
      top: "68%",
      width: "23%",
      height: "30%",
    },
    {
      key: "grand-salon",
      title: tr("Grand Salon", "Grand Lounge", "Gran Salón"),
      image: "/images/grand-salon-cwrc.png",
      left: "70%",
      top: "68%",
      width: "23%",
      height: "30%",
    },
    {
      key: "greenhouse",
      title: tr("Grande Serre", "Grand Greenhouse", "Gran Invernadero"),
      image: "/images/greenhouse.png",
      left: "89%",
      top: "55%",
      width: "17%",
      height: "31%",
    },
    {
      key: "gardens",
      title: tr("Jardins extérieurs", "Outdoor Gardens", "Jardines exteriores"),
      image: "/images/jardin.png",
      left: "10%",
      top: "51%",
      width: "15%",
      height: "68%",
    },
  ],
  upper: [
    {
      key: "laboratory",
      title: tr("Laboratoire", "Laboratory", "Laboratorio"),
      image: "/images/laboratoire.png",
      left: "30%",
      top: "21%",
      width: "22%",
      height: "23%",
    },
    {
      key: "office-suzie",
      title: tr("Bureau de Suzie", "Suzie’s Office", "Oficina de Suzie"),
      image: "/images/bureau-suzie.png",
      left: "51%",
      top: "21%",
      width: "18%",
      height: "20%",
    },
    {
      key: "office-gpt",
      title: tr("Étude technique GPT", "GPT Technical Studio", "Estudio técnico de GPT"),
      image: "/images/Bureau-gpt.png",
      left: "72%",
      top: "21%",
      width: "22%",
      height: "23%",
    },
    {
      key: "study-room",
      title: tr("Salle d’étude", "Study Room", "Sala de estudio"),
      image: "/images/salle-etude.png",
      left: "30%",
      top: "57%",
      width: "25%",
      height: "38%",
    },
    {
      key: "administrative-office",
      title: tr("Bureau d’Amateur", "Amateur’s Office", "Oficina de Amateur"),
      image: "/images/bureau-administratif.png",
      left: "70%",
      top: "45%",
      width: "22%",
      height: "18%",
    },
    {
      key: "office-cathy",
      title: tr("Cabinet de Dre Cathy", "Dr. Cathy’s Office", "Oficina de la Dra. Cathy"),
      image: "/images/bureau-cathy.png",
      left: "70%",
      top: "66%",
      width: "22%",
      height: "24%",
    },
  ],
};

const floorImages: Record<Floor, string> = {
  ground: "/images/plan-rez-de-chaussee-cwrc.webp",
  upper: "/images/plan-deuxieme-etage-cwrc.webp",
};

export default function CenterFloorPlan({
  locale,
}: {
  locale: Locale;
}) {
  const t = copy[locale];
  const [floor, setFloor] = useState<Floor>("ground");
  const [selected, setSelected] = useState<RoomSpot | null>(null);

  useEffect(() => {
    if (!selected) {
      return;
    }

    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelected(null);
      }
    }

    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, [selected]);

  function changeFloor(nextFloor: Floor) {
    setFloor(nextFloor);
    setSelected(null);
  }

  return (
    <section className="floorPlanPage">
      <p className="eyebrow">{t.eyebrow}</p>
      <h1>{t.title}</h1>
      <p className="subtitle">{t.subtitle}</p>

      <div className="floorTabs" aria-label={t.changeFloor}>
        <button
          type="button"
          className={floor === "ground" ? "selected" : ""}
          aria-pressed={floor === "ground"}
          onClick={() => changeFloor("ground")}
        >
          1 · {t.ground}
        </button>
        <button
          type="button"
          className={floor === "upper" ? "selected" : ""}
          aria-pressed={floor === "upper"}
          onClick={() => changeFloor("upper")}
        >
          2 · {t.upper}
        </button>
      </div>

      <div className="planFrame">
        <img
          className="planImage"
          src={floorImages[floor]}
          alt={floor === "ground" ? t.planAltGround : t.planAltUpper}
        />

        {rooms[floor].map((room) => (
          <button
            key={room.key}
            type="button"
            className="roomHotspot"
            style={{
              left: room.left,
              top: room.top,
              width: room.width,
              height: room.height,
            }}
            aria-label={room.title[locale]}
            title={room.title[locale]}
            onClick={() => setSelected(room)}
          >
            <span className="screenReaderOnly">{room.title[locale]}</span>
          </button>
        ))}

        <button
          type="button"
          className="stairButton"
          style={{
            left: "50%",
            top: floor === "ground" ? "42%" : "39%",
          }}
          onClick={() => changeFloor(floor === "ground" ? "upper" : "ground")}
          aria-label={t.changeFloor}
          title={t.changeFloor}
        >
          {floor === "ground" ? "⬆️" : "⬇️"}
        </button>
      </div>

      <div className="roomList">
        {rooms[floor].map((room) => (
          <button
            key={room.key}
            type="button"
            onClick={() => setSelected(room)}
          >
            {room.title[locale]}
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="viewer"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelected(null);
            }
          }}
        >
          <figure role="dialog" aria-modal="true" aria-labelledby="room-view-title">
            <figcaption id="room-view-title">{selected.title[locale]}</figcaption>
            <img src={selected.image} alt={selected.title[locale]} />
            <button
              type="button"
              className="viewerClose"
              onClick={() => setSelected(null)}
              aria-label={t.close}
              title={t.close}
            >
              ×
            </button>
          </figure>
        </div>
      )}

      <style jsx>{`
        .floorPlanPage {
          margin-top: 20px;
          color: #102a4c;
        }

        .eyebrow {
          margin: 0;
          color: #8a6a3d;
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-align: center;
          text-transform: uppercase;
        }

        h1 {
          margin: 12px 0 8px;
          font-size: clamp(2.5rem, 6vw, 5rem);
          line-height: 1;
          text-align: center;
        }

        .subtitle {
          max-width: 850px;
          margin: 16px auto 24px;
          color: #6e5b3f;
          font-size: 1.12rem;
          line-height: 1.7;
          text-align: center;
        }

        .floorTabs {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin-bottom: 22px;
        }

        .floorTabs button {
          padding: 12px 22px;
          border: 1px solid #8a6a3d;
          border-radius: 999px;
          background: #fffdf8;
          color: #102a4c;
          cursor: pointer;
          font-weight: 800;
        }

        .floorTabs button.selected {
          background: #102a4c;
          color: #fffdf8;
          box-shadow: 0 8px 22px rgba(16, 42, 76, 0.25);
        }

        .planFrame {
          position: relative;
          overflow: hidden;
          border: 2px solid #d8c49a;
          border-radius: 24px;
          background: #102a4c;
          box-shadow: 0 20px 52px rgba(16, 42, 76, 0.28);
        }

        .planImage {
          display: block;
          width: 100%;
          height: auto;
        }

        .roomHotspot {
          position: absolute;
          padding: 0;
          transform: translate(-50%, -50%);
          border: 0;
          background: transparent;
          cursor: pointer;
        }

        .roomHotspot:focus-visible {
          border: 3px solid #f7d77a;
          border-radius: 12px;
          outline: 3px solid rgba(16, 42, 76, 0.75);
          outline-offset: 2px;
        }

        .screenReaderOnly {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .stairButton {
          position: absolute;
          display: grid;
          width: clamp(38px, 4vw, 56px);
          height: clamp(38px, 4vw, 56px);
          padding: 0;
          place-items: center;
          transform: translate(-50%, -50%);
          border: 3px solid #fffdf8;
          border-radius: 50%;
          background: #8a6a3d;
          box-shadow: 0 7px 22px rgba(0, 0, 0, 0.48);
          cursor: pointer;
          font-size: clamp(1rem, 2vw, 1.45rem);
        }

        .roomList {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 10px;
          margin-top: 18px;
        }

        .roomList button {
          padding: 11px 14px;
          border: 1px solid rgba(138, 106, 61, 0.4);
          border-radius: 12px;
          background: #fffdf8;
          color: #102a4c;
          cursor: pointer;
          font-family: Georgia, serif;
          font-weight: 800;
        }

        .roomList button:hover,
        .roomList button:focus-visible {
          border-color: #8a6a3d;
          outline: none;
          background: #f7f1e6;
        }

        .viewer {
          position: fixed;
          inset: 0;
          z-index: 4000;
          display: grid;
          overflow: auto;
          padding: 18px;
          place-items: center;
          background: rgba(4, 12, 23, 0.94);
          backdrop-filter: blur(6px);
        }

        .viewer figure {
          position: relative;
          width: min(1500px, 96vw);
          margin: auto;
        }

        .viewer figcaption {
          margin-bottom: 12px;
          color: #fffdf8;
          font-family: Georgia, serif;
          font-size: clamp(1.4rem, 3vw, 2.4rem);
          font-weight: 800;
          text-align: center;
        }

        .viewer img {
          display: block;
          width: 100%;
          max-height: 88vh;
          object-fit: contain;
          border: 1px solid rgba(216, 196, 154, 0.8);
          border-radius: 18px;
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.55);
        }

        .viewerClose {
          position: absolute;
          top: 48px;
          right: 12px;
          display: grid;
          width: 44px;
          height: 44px;
          padding: 0;
          place-items: center;
          border: 2px solid #fffdf8;
          border-radius: 50%;
          background: rgba(16, 42, 76, 0.92);
          color: #fffdf8;
          cursor: pointer;
          font-size: 2rem;
          line-height: 1;
        }

        @media (max-width: 700px) {
          .planFrame {
            overflow-x: auto;
          }

          .planImage {
            width: 1050px;
            max-width: none;
          }

          .roomHotspot,
          .stairButton {
            display: none;
          }

        }
      `}</style>
    </section>
  );
}
