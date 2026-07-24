"use client";

import {useState} from "react";
import type {Locale} from "../i18n/config";
import GrandSalonGramophone from "./GrandSalonGramophone";

type ObjectId =
  | "hourglass"
  | "mask"
  | "wall"
  | "statues"
  | "perch"
  | "window"
  | "apples"
  | "cookies"
  | "candy";

type SalonObject = {
  id: ObjectId;
  icon: string;
  left: string;
  top: string;
  width: string;
  height: string;
};

type Copy = {
  eyebrow: string;
  title: string;
  introduction: string;
  comingSoon: string;
  close: string;
  returnToRoom: string;
  imageAlt: string;
  discover: string;
  discoveriesTitle: string;
  mobileHint: string;
  gramophone: string;
  objects: Record<ObjectId, {name: string; story: string}>;
};

const objects: SalonObject[] = [
  {id: "hourglass", icon: "⌛", left: "1%", top: "53%", width: "9%", height: "23%"},
  {id: "mask", icon: "🎭", left: "8%", top: "60%", width: "8%", height: "18%"},
  {id: "wall", icon: "🖼️", left: "1%", top: "4%", width: "20%", height: "35%"},
  {id: "statues", icon: "🗿", left: "45%", top: "11%", width: "14%", height: "42%"},
  {id: "perch", icon: "🦉", left: "62%", top: "24%", width: "11%", height: "39%"},
  {id: "window", icon: "🪟", left: "70%", top: "5%", width: "22%", height: "47%"},
  {id: "apples", icon: "🍎", left: "70%", top: "57%", width: "12%", height: "15%"},
  {id: "cookies", icon: "🍪", left: "82%", top: "57%", width: "8%", height: "17%"},
  {id: "candy", icon: "🍬", left: "77%", top: "68%", width: "21%", height: "20%"},
];

const translations: Record<Locale, Copy> = {
  fr: {
    eyebrow: "The Cathy Was Right Research Center",
    title: "Le Grand Salon de détente",
    introduction:
      "Un endroit pour lire, réfléchir et surveiller discrètement la jarre à biscuits. Cliquez sur les petits repères dorés pour découvrir les objets du salon.",
    comingSoon:
      "Capone se repose, Niko inspecte les lieux et Amateur arrive par la fenêtre.",
    close: "Fermer",
    returnToRoom: "Retourner au salon",
    discover: "Découvrir",
    discoveriesTitle: "Les objets et petites histoires du salon",
    mobileHint:
      "Faites glisser l’image vers la gauche ou la droite pour explorer tout le salon.",
    gramophone: "Ouvrir le gramophone et choisir une musique",
    imageAlt:
      "Grand salon du CWRC avec canapés de cuir, bibliothèque, objets d’art, tapis persan et fenêtre ouverte",
    objects: {
      hourglass: {
        name: "Le sablier du CWRC",
        story:
          "Personne ne sait depuis combien de temps il coule. Amateur affirme que le formulaire d’explication est encore en traitement.",
      },
      mask: {
        name: "Le masque mexicain",
        story:
          "Un magnifique objet d’art rapporté d’un voyage. Capone refuse toutefois de confirmer s’il lui parle la nuit.",
      },
      wall: {
        name: "La Grande Muraille de Chine",
        story:
          "Cathy affirme qu’elle est visible depuis le salon. Techniquement, puisqu’elle est dans le tableau, elle a encore raison.",
      },
      statues: {
        name: "Les statuettes africaines",
        story:
          "Ces objets d’art veillent dignement sur le salon. Ils ont déjà assisté à plusieurs débats et n’ont jamais demandé la parole.",
      },
      perch: {
        name: "Le perchoir d’Amateur",
        story:
          "Le bureau secondaire du hibou administratif. Les dossiers urgents y sont classés entre les biscuits et la sieste.",
      },
      window: {
        name: "La fenêtre ouverte",
        story:
          "La voie d’entrée officielle d’Amateur. Ranger soutient qu’elle constitue une faiblesse dans le système de sécurité.",
      },
      apples: {
        name: "Le panier de pommes",
        story:
          "Des pommes rouges sont toujours offertes aux visiteurs. Jenny demande pourquoi le panier est placé hors de sa portée.",
      },
      cookies: {
        name: "La jarre à biscuits",
        story:
          "La jarre était pleine ce matin. Amateur demande que toute conclusion soit suspendue jusqu’à la fin de l’enquête.",
      },
      candy: {
        name: "Les pots de bonbons",
        story:
          "Ils sont destinés aux visiteurs, ce qui n’empêche absolument personne du CWRC de les inspecter régulièrement.",
      },
    },
  },

  en: {
    eyebrow: "The Cathy Was Right Research Center",
    title: "The Grand Lounge",
    introduction:
      "A place to read, think, and discreetly monitor the cookie jar. Click the small golden markers to discover the objects in the lounge.",
    comingSoon:
      "Capone is resting, Niko is inspecting the room, and Amateur is arriving through the window.",
    close: "Close",
    returnToRoom: "Return to the lounge",
    discover: "Discover",
    discoveriesTitle: "Lounge objects and little stories",
    mobileHint:
      "Swipe the image left or right to explore the entire lounge.",
    gramophone: "Open the gramophone and choose some music",
    imageAlt:
      "The CWRC Grand Lounge with leather sofas, a bookcase, art objects, a Persian rug, and an open window",
    objects: {
      hourglass: {
        name: "The CWRC Hourglass",
        story:
          "Nobody knows how long it has been running. Amateur says the explanation form is still being processed.",
      },
      mask: {
        name: "The Mexican Mask",
        story:
          "A magnificent work of art brought back from a journey. Capone refuses to confirm whether it speaks to him at night.",
      },
      wall: {
        name: "The Great Wall of China",
        story:
          "Cathy says it can be seen from the lounge. Technically, since it is in the painting, she is right again.",
      },
      statues: {
        name: "The African Statuettes",
        story:
          "These works of art watch over the lounge with dignity. They have attended several debates and have never once asked to speak.",
      },
      perch: {
        name: "Amateur’s Perch",
        story:
          "The administrative owl’s secondary office. Urgent files are organized somewhere between the cookies and his nap.",
      },
      window: {
        name: "The Open Window",
        story:
          "Amateur’s official entrance. Ranger insists that it represents a weakness in the security system.",
      },
      apples: {
        name: "The Basket of Apples",
        story:
          "Red apples are always available for visitors. Jenny would like to know why the basket has been placed beyond her reach.",
      },
      cookies: {
        name: "The Cookie Jar",
        story:
          "The jar was full this morning. Amateur requests that all conclusions be suspended until the investigation is complete.",
      },
      candy: {
        name: "The Candy Jars",
        story:
          "They are intended for visitors, which does not prevent anyone at the CWRC from inspecting them regularly.",
      },
    },
  },

  es: {
    eyebrow: "The Cathy Was Right Research Center",
    title: "El Gran Salón de Descanso",
    introduction:
      "Un lugar para leer, reflexionar y vigilar discretamente el tarro de galletas. Haz clic en los pequeños marcadores dorados para descubrir los objetos del salón.",
    comingSoon:
      "Capone descansa, Niko inspecciona el salón y Amateur llega por la ventana.",
    close: "Cerrar",
    returnToRoom: "Volver al salón",
    discover: "Descubrir",
    discoveriesTitle: "Objetos y pequeñas historias del salón",
    mobileHint:
      "Desliza la imagen hacia la izquierda o la derecha para explorar todo el salón.",
    gramophone: "Abrir el gramófono y elegir música",
    imageAlt:
      "El Gran Salón del CWRC con sofás de cuero, biblioteca, objetos de arte, alfombra persa y ventana abierta",
    objects: {
      hourglass: {
        name: "El reloj de arena del CWRC",
        story:
          "Nadie sabe desde cuándo está funcionando. Amateur afirma que el formulario de explicación todavía está siendo procesado.",
      },
      mask: {
        name: "La máscara mexicana",
        story:
          "Una magnífica obra de arte traída de un viaje. Capone se niega a confirmar si le habla durante la noche.",
      },
      wall: {
        name: "La Gran Muralla China",
        story:
          "Cathy afirma que puede verse desde el salón. Técnicamente, como está en el cuadro, vuelve a tener razón.",
      },
      statues: {
        name: "Las estatuillas africanas",
        story:
          "Estas obras de arte vigilan dignamente el salón. Ya han presenciado varios debates y nunca han pedido la palabra.",
      },
      perch: {
        name: "La percha de Amateur",
        story:
          "La oficina secundaria del búho administrativo. Los expedientes urgentes se archivan entre las galletas y la siesta.",
      },
      window: {
        name: "La ventana abierta",
        story:
          "La entrada oficial de Amateur. Ranger sostiene que representa una debilidad en el sistema de seguridad.",
      },
      apples: {
        name: "La cesta de manzanas",
        story:
          "Siempre hay manzanas rojas para los visitantes. Jenny quiere saber por qué la cesta está fuera de su alcance.",
      },
      cookies: {
        name: "El tarro de galletas",
        story:
          "El tarro estaba lleno esta mañana. Amateur pide que toda conclusión quede suspendida hasta que termine la investigación.",
      },
      candy: {
        name: "Los tarros de caramelos",
        story:
          "Están destinados a los visitantes, lo que no impide que todo el mundo en el CWRC los inspeccione regularmente.",
      },
    },
  },
};

export default function GrandSalonPage({locale}: {locale: Locale}) {
  const [selectedId, setSelectedId] = useState<ObjectId | null>(null);
  const [gramophoneOpen, setGramophoneOpen] = useState(false);
  const text = translations[locale];
  const selectedObject = selectedId ? text.objects[selectedId] : null;

  return (
    <main className="salonPage">
      <section className="introduction">
        <p className="eyebrow">{text.eyebrow}</p>
        <h1>{text.title}</h1>
        <p>{text.introduction}</p>
      </section>

      <p id="salon-mobile-hint" className="mobileHint">
        ↔ {text.mobileHint}
      </p>

      <section
        className="salon"
        aria-label={text.title}
        aria-describedby="salon-mobile-hint"
      >
        <div className="sceneCanvas">
          <img
            className="salonBackground"
            src="/images/grand-salon-cwrc.png"
            alt={text.imageAlt}
          />

          <img
            className="capone"
            src="/images/capone-salon.png"
            alt="Capone"
          />

          <img
            className="niko"
            src="/images/niko-marche.png"
            alt="Niko"
          />

          <button
            type="button"
            className="gramophoneButton"
            aria-label={text.gramophone}
            title={text.gramophone}
            onClick={() => setGramophoneOpen(true)}
          >
            <img
              src="/images/gramophone-table-cwrc.png"
              alt=""
              aria-hidden="true"
            />
            <span>♫</span>
          </button>

          <button
            type="button"
            className="amateurButton"
            aria-label={text.objects.perch.name}
            title={text.objects.perch.name}
            onClick={() => setSelectedId("perch")}
          >
            <img
              className="amateur"
              src="/images/amateur-vol.png"
              alt="Amateur"
            />
          </button>

          {objects.map((object) => {
            const item = text.objects[object.id];

            return (
              <button
                key={object.id}
                type="button"
                className="hotspot"
                style={{
                  left: object.left,
                  top: object.top,
                  width: object.width,
                  height: object.height,
                }}
                aria-label={`${text.discover}: ${item.name}`}
                title={item.name}
                onClick={() => setSelectedId(object.id)}
              >
                <span className="hotspotMarker" aria-hidden="true">
                  {object.icon}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section
        className="objectSection"
        aria-labelledby="salon-objects-title"
      >
        <h2 id="salon-objects-title">{text.discoveriesTitle}</h2>

        <div className="objectGrid">
          {objects.map((object) => {
            const item = text.objects[object.id];

            return (
              <button
                key={object.id}
                type="button"
                className="objectCard"
                aria-label={`${text.discover}: ${item.name}`}
                onClick={() => setSelectedId(object.id)}
              >
                <span className="objectCardIcon" aria-hidden="true">
                  {object.icon}
                </span>

                <span className="objectCardCopy">
                  <strong>{item.name}</strong>
                  <span>{item.story}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <p className="comingSoon">{text.comingSoon}</p>

      {selectedObject && (
        <div
          className="dialogBackdrop"
          role="presentation"
          onClick={() => setSelectedId(null)}
        >
          <article
            className="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="salon-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="closeButton"
              aria-label={text.close}
              onClick={() => setSelectedId(null)}
            >
              ×
            </button>

            <p className="dialogSymbol">✦</p>
            <h2 id="salon-dialog-title">{selectedObject.name}</h2>
            <p>{selectedObject.story}</p>

            <button
              type="button"
              className="returnButton"
              onClick={() => setSelectedId(null)}
            >
              {text.returnToRoom}
            </button>
          </article>
        </div>
      )}

      {gramophoneOpen && (
        <GrandSalonGramophone
          locale={locale}
          onClose={() => setGramophoneOpen(false)}
        />
      )}

      <style jsx>{`
        .salonPage {
          min-height: 100vh;
          padding: 48px 24px 70px;
          color: #352417;
          background:
            radial-gradient(
              circle at top,
              rgba(255, 255, 255, 0.95),
              transparent 42%
            ),
            #dceaf2;
        }

        .introduction {
          width: min(900px, 100%);
          margin: 0 auto 28px;
          text-align: center;
        }

        .eyebrow {
          margin: 0 0 8px;
          color: #87621f;
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        h1 {
          margin: 0 0 12px;
          color: #593a20;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(2.1rem, 5vw, 4rem);
        }

        .introduction > p:last-child {
          max-width: 720px;
          margin: 0 auto;
          font-size: 1.05rem;
          line-height: 1.7;
        }

        .mobileHint {
          display: none;
        }

        .salon {
          width: min(1500px, 100%);
          margin: 0 auto;
          overflow: hidden;
          border: 8px solid #6b4527;
          border-radius: 24px;
          background: #6b4527;
          box-shadow:
            0 24px 60px rgba(48, 30, 18, 0.28),
            0 0 0 3px #c99a45;
        }

        .sceneCanvas {
          position: relative;
          width: 100%;
        }

        .salonBackground {
          display: block;
          width: 100%;
          height: auto;
        }

        .capone {
          position: absolute;
          z-index: 4;
          left: 24%;
          bottom: 20%;
          width: 9%;
          height: auto;
          filter: drop-shadow(0 5px 4px rgba(0, 0, 0, 0.35));
          animation: caponeBreath 4s ease-in-out infinite;
          transform-origin: center bottom;
        }

        .niko {
          position: absolute;
          z-index: 6;
          bottom: 4%;
          left: -18%;
          width: 13%;
          height: auto;
          filter: drop-shadow(0 5px 4px rgba(0, 0, 0, 0.35));
          animation: nikoWalk 20s linear infinite;
        }

        .gramophoneButton {
          position: absolute;
          z-index: 9;
          left: 43%;
          top: 46%;
          width: 15%;
          padding: 0;
          cursor: pointer;
          border: 0;
          background: transparent;
          filter: drop-shadow(0 8px 7px rgba(0, 0, 0, 0.38));
          transform-origin: center bottom;
          transition:
            transform 180ms ease,
            filter 180ms ease;
        }

        .gramophoneButton img {
          display: block;
          width: 100%;
          height: auto;
        }

        .gramophoneButton span {
          position: absolute;
          right: -3px;
          top: 8%;
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          color: #fff8d3;
          font-size: 1.45rem;
          border: 2px solid #fff1b8;
          border-radius: 50%;
          background: #173a62;
          box-shadow:
            0 0 0 5px rgba(231, 189, 89, 0.34),
            0 4px 10px rgba(0, 0, 0, 0.34);
          animation: pulse 2.2s infinite;
        }

        .gramophoneButton:hover,
        .gramophoneButton:focus-visible {
          filter: drop-shadow(0 11px 9px rgba(0, 0, 0, 0.48));
          outline: none;
          transform: translateY(-5px) scale(1.035);
        }

        .amateurButton {
          position: absolute;
          z-index: 7;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          padding: 0;
          border: 0;
          pointer-events: none;
          background: transparent;
        }

        .amateur {
          position: absolute;
          left: 64%;
          top: 25%;
          width: 13%;
          height: auto;
          cursor: pointer;
          pointer-events: auto;
          filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.35));
          animation: amateurArrival 15s ease-in-out infinite;
        }

        .hotspot {
          position: absolute;
          z-index: 8;
          cursor: pointer;
          border: 0;
          background: transparent;
        }

        .hotspotMarker {
          position: absolute;
          right: 8px;
          bottom: 8px;
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          font-size: 1.45rem;
          border: 2px solid #fff5c9;
          border-radius: 50%;
          background: #173a62;
          box-shadow:
            0 0 0 4px rgba(231, 189, 89, 0.34),
            0 4px 10px rgba(0, 0, 0, 0.32);
          animation: pulse 2.2s infinite;
        }

        .hotspot:hover .hotspotMarker,
        .hotspot:focus-visible .hotspotMarker {
          transform: scale(1.18);
          background: #28598e;
        }

        .objectSection {
          width: min(1200px, 100%);
          margin: 38px auto 0;
        }

        .objectSection h2 {
          margin: 0 0 18px;
          color: #102a4c;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(1.55rem, 3vw, 2.35rem);
          text-align: center;
        }

        .objectGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
        }

        .objectCard {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          min-height: 100%;
          padding: 17px;
          cursor: pointer;
          color: inherit;
          text-align: left;
          border: 1px solid rgba(99, 66, 31, 0.22);
          border-radius: 18px;
          background: rgba(255, 252, 245, 0.94);
          box-shadow: 0 9px 24px rgba(49, 34, 20, 0.08);
          transition:
            transform 160ms ease,
            border-color 160ms ease,
            box-shadow 160ms ease;
        }

        .objectCard:hover,
        .objectCard:focus-visible {
          transform: translateY(-3px);
          border-color: #b78a42;
          box-shadow: 0 13px 28px rgba(49, 34, 20, 0.14);
          outline: none;
        }

        .objectCardIcon {
          display: grid;
          flex: 0 0 52px;
          width: 52px;
          height: 52px;
          place-items: center;
          border: 2px solid #e4c67a;
          border-radius: 16px;
          background: #102a4c;
          box-shadow: inset 0 0 0 3px rgba(255, 255, 255, 0.07);
          font-size: 1.8rem;
        }

        .objectCardCopy {
          display: grid;
          gap: 7px;
        }

        .objectCardCopy strong {
          color: #58391f;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 1.08rem;
        }

        .objectCardCopy span {
          color: #614326;
          font-size: 0.94rem;
          line-height: 1.5;
        }

        .comingSoon {
          margin: 28px auto 0;
          color: #614326;
          font-family: Georgia, "Times New Roman", serif;
          font-style: italic;
          text-align: center;
        }

        .dialogBackdrop {
          position: fixed;
          z-index: 1000;
          inset: 0;
          display: grid;
          padding: 24px;
          place-items: center;
          background: rgba(29, 20, 14, 0.72);
          backdrop-filter: blur(5px);
        }

        .dialog {
          position: relative;
          width: min(520px, 100%);
          padding: 38px 34px 32px;
          text-align: center;
          border: 3px solid #c79a45;
          border-radius: 22px;
          background: #fffaf0;
          box-shadow: 0 28px 70px rgba(0, 0, 0, 0.38);
        }

        .dialogSymbol {
          margin: 0 0 6px;
          color: #b07a25;
          font-size: 2rem;
        }

        .dialog h2 {
          margin: 0 0 16px;
          color: #58391f;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 1.8rem;
        }

        .dialog p {
          line-height: 1.7;
        }

        .closeButton {
          position: absolute;
          top: 10px;
          right: 14px;
          cursor: pointer;
          color: #694629;
          font-size: 2rem;
          border: 0;
          background: transparent;
        }

        .returnButton {
          margin-top: 12px;
          padding: 11px 20px;
          cursor: pointer;
          color: white;
          font-weight: 800;
          border: 0;
          border-radius: 999px;
          background: #76502d;
        }

        @keyframes caponeBreath {
          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.018, 0.985);
          }
        }

        @keyframes nikoWalk {
          0% {
            left: -18%;
            transform: translateY(0);
          }

          48% {
            transform: translateY(-3px);
          }

          50% {
            transform: translateY(0);
          }

          90% {
            left: 103%;
            opacity: 1;
          }

          91%,
          100% {
            left: 103%;
            opacity: 0;
          }
        }

        @keyframes amateurArrival {
          0%,
          8% {
            left: 82%;
            top: 5%;
            transform: scale(0.45) rotate(8deg);
            opacity: 0;
          }

          12% {
            opacity: 1;
          }

          38% {
            left: 64%;
            top: 25%;
            transform: scale(1) rotate(0);
          }

          75% {
            left: 64%;
            top: 25%;
            transform: scale(0.75) rotate(0);
            opacity: 1;
          }

          88%,
          100% {
            left: 64%;
            top: 25%;
            transform: scale(0.75);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            box-shadow:
              0 0 0 3px rgba(231, 189, 89, 0.28),
              0 4px 10px rgba(0, 0, 0, 0.32);
          }

          50% {
            box-shadow:
              0 0 0 9px rgba(231, 189, 89, 0),
              0 4px 10px rgba(0, 0, 0, 0.32);
          }
        }

        @media (max-width: 700px) {
          .salonPage {
            padding: 24px 10px 44px;
          }

          .introduction {
            margin-bottom: 16px;
            padding: 0 8px;
          }

          .eyebrow {
            font-size: 0.7rem;
            letter-spacing: 0.11em;
          }

          h1 {
            font-size: clamp(2rem, 10vw, 2.75rem);
          }

          .introduction > p:last-child {
            font-size: 1rem;
            line-height: 1.55;
          }

          .mobileHint {
            display: block;
            margin: 0 auto 10px;
            padding: 9px 12px;
            color: #58391f;
            font-size: 0.9rem;
            font-weight: 800;
            text-align: center;
            border: 1px solid rgba(135, 98, 31, 0.35);
            border-radius: 12px;
            background: rgba(255, 250, 240, 0.78);
          }

          .salon {
            overflow-x: auto;
            overflow-y: hidden;
            border-width: 5px;
            border-radius: 14px;
            overscroll-behavior-x: contain;
            scrollbar-color: #c99a45 #6b4527;
            -webkit-overflow-scrolling: touch;
          }

          .sceneCanvas {
            width: 1000px;
          }

          .hotspotMarker {
            width: 46px;
            height: 46px;
            right: 5px;
            bottom: 5px;
            font-size: 1.6rem;
          }

          .gramophoneButton {
            width: 16%;
          }

          .objectSection {
            margin-top: 28px;
          }

          .objectGrid {
            grid-template-columns: 1fr;
          }

          .objectCard {
            padding: 14px;
          }

          .comingSoon {
            max-width: 330px;
            margin-top: 20px;
            padding: 0 8px;
            line-height: 1.55;
          }

          .dialogBackdrop {
            align-items: end;
            padding: 12px;
          }

          .dialog {
            max-height: 82vh;
            overflow-y: auto;
            padding: 34px 22px 24px;
            border-radius: 22px 22px 14px 14px;
          }

          .dialog h2 {
            font-size: 1.55rem;
          }

          .dialog p {
            font-size: 1rem;
            line-height: 1.6;
          }

          .closeButton {
            top: 6px;
            right: 10px;
            width: 44px;
            height: 44px;
          }

          .returnButton {
            min-height: 46px;
            width: 100%;
            font-size: 1rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hotspotMarker,
          .gramophoneButton span,
          .capone,
          .niko,
          .amateur {
            animation: none;
          }

          .niko {
            left: 45%;
          }

          .amateur {
            left: 64%;
            top: 25%;
            transform: scale(0.75);
          }
        }
      `}</style>
    </main>
  );
}
