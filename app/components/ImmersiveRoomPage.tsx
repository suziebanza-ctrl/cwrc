"use client";

import { useEffect, useState } from "react";
import type { Locale } from "../i18n/config";
import type { StandardPage } from "../i18n/content";
import PublishedObjectContent from "./PublishedObjectContent";

type Translation = Record<Locale, string>;

type RoomObject = {
  key: string;
  icon: string;
  title: Translation;
  description: Translation;
  left: string;
  top: string;
};

type RoomDefinition = {
  instruction: Translation;
  objects: RoomObject[];
};

const tr = (fr: string, en: string, es: string): Translation => ({
  fr,
  en,
  es,
});

const roomDefinitions: Record<string, RoomDefinition> = {
  laboratory: {
    instruction: tr(
      "Cliquez sur les instruments, les dossiers ou les membres de l’équipe pour examiner le laboratoire.",
      "Click the instruments, files or team members to explore the laboratory.",
      "Haz clic en los instrumentos, expedientes o miembros del equipo para explorar el laboratorio.",
    ),
    objects: [
      {
        key: "microscope",
        icon: "🔬",
        title: tr("Le microscope", "The microscope", "El microscopio"),
        description: tr(
          "Pour regarder de plus près lorsque quelqu’un affirme que la réponse est évidente.",
          "For taking a closer look whenever someone claims the answer is obvious.",
          "Para mirar más de cerca cuando alguien afirma que la respuesta es evidente.",
        ),
        left: "12%",
        top: "54%",
      },
      {
        key: "samples",
        icon: "🧪",
        title: tr("Les bocaux d’échantillons", "Sample jars", "Los frascos de muestras"),
        description: tr(
          "Les échantillons du jour : bon sens, pensée critique, curiosité, intégrité des données et approbation officielle de Cathy.",
          "Today’s samples: common sense, critical thinking, curiosity, data integrity and Cathy’s official approval.",
          "Las muestras del día: sentido común, pensamiento crítico, curiosidad, integridad de los datos y aprobación oficial de Cathy.",
        ),
        left: "43%",
        top: "75%",
      },
      {
        key: "testingMachine",
        icon: "⚙️",
        title: tr("La machine d’essai", "The testing machine", "La máquina de ensayos"),
        description: tr(
          "Toute affirmation sérieuse doit résister à cette machine avant d’entrer au Hall des vérités confirmées.",
          "Every serious claim must survive this machine before entering the Hall of Confirmed Truths.",
          "Toda afirmación seria debe resistir esta máquina antes de entrar al Salón de las Verdades Confirmadas.",
        ),
        left: "80%",
        top: "28%",
      },
      {
        key: "scientificCoffee",
        icon: "☕",
        title: tr("La cafetière scientifique", "The scientific coffee maker", "La cafetera científica"),
        description: tr(
          "Parce que la science, l’expérience, le bon sens et le café donnent souvent de meilleurs résultats ensemble.",
          "Because science, experience, common sense and coffee often produce better results together.",
          "Porque la ciencia, la experiencia, el sentido común y el café suelen dar mejores resultados juntos.",
        ),
        left: "91%",
        top: "76%",
      },
      {
        key: "investigationFiles",
        icon: "📋",
        title: tr("Les dossiers d’enquête", "Investigation files", "Los expedientes de investigación"),
        description: tr(
          "Méthodes, observations et résultats y sont consignés avant toute conclusion officielle.",
          "Methods, observations and results are recorded here before any official conclusion.",
          "Aquí se registran métodos, observaciones y resultados antes de cualquier conclusión oficial.",
        ),
        left: "70%",
        top: "84%",
      },
      {
        key: "lilo",
        icon: "🐩",
        title: tr("Lilo au laboratoire", "Lilo in the laboratory", "Lilo en el laboratorio"),
        description: tr(
          "Compagne de recherche et spécialiste de l’intelligence émotionnelle, lorsqu’elle n’est pas en congé forcé.",
          "Research companion and emotional-intelligence specialist, whenever she is not on mandatory leave.",
          "Compañera de investigación y especialista en inteligencia emocional, cuando no está de licencia obligatoria.",
        ),
        left: "72%",
        top: "59%",
      },
    ],
  },
  greenhouse: {
    instruction: tr(
      "Explorez les plantes, les outils et les expériences botaniques de la grande serre.",
      "Explore the plants, tools and botanical experiments in the grand greenhouse.",
      "Explora las plantas, las herramientas y los experimentos botánicos del gran invernadero.",
    ),
    objects: [
      {
        key: "remarkablePlants",
        icon: "🌺",
        title: tr("Les plantes remarquables", "Remarkable plants", "Las plantas extraordinarias"),
        description: tr(
          "Des collections vivantes choisies pour leur beauté, leur histoire et leur étonnante capacité à contredire les jardiniers trop confiants.",
          "Living collections chosen for their beauty, history and surprising ability to contradict overconfident gardeners.",
          "Colecciones vivas elegidas por su belleza, historia y sorprendente capacidad para contradecir a los jardineros demasiado seguros.",
        ),
        left: "23%",
        top: "55%",
      },
      {
        key: "seeds",
        icon: "🌱",
        title: tr("Les graines et semis", "Seeds and seedlings", "Las semillas y plántulas"),
        description: tr(
          "Chaque grande découverte botanique commence par quelque chose de minuscule et beaucoup de patience.",
          "Every great botanical discovery begins with something tiny and a great deal of patience.",
          "Todo gran descubrimiento botánico comienza con algo diminuto y mucha paciencia.",
        ),
        left: "69%",
        top: "57%",
      },
      {
        key: "researchTools",
        icon: "🛠️",
        title: tr("Les outils de recherche", "Research tools", "Las herramientas de investigación"),
        description: tr(
          "Microscope, verrerie et instruments servent à observer sans déranger inutilement ce qui pousse.",
          "The microscope, glassware and instruments help researchers observe without needlessly disturbing what grows.",
          "El microscopio, el material de vidrio y los instrumentos permiten observar sin perturbar inútilmente lo que crece.",
        ),
        left: "91%",
        top: "59%",
      },
      {
        key: "botanicalNotebook",
        icon: "📓",
        title: tr("Le carnet botanique", "The botanical notebook", "El cuaderno botánico"),
        description: tr(
          "On y note les observations, les sources, les doutes utiles et les progrès qui prennent leur temps.",
          "It records observations, sources, useful doubts and progress that takes its time.",
          "Aquí se anotan observaciones, fuentes, dudas útiles y progresos que se toman su tiempo.",
        ),
        left: "32%",
        top: "87%",
      },
      {
        key: "medicinalPlants",
        icon: "🌿",
        title: tr("Les espèces médicinales", "Medicinal species", "Las especies medicinales"),
        description: tr(
          "Menthe, romarin, sauge, thym et basilic : cinq spécialistes très parfumés de la recherche appliquée.",
          "Mint, rosemary, sage, thyme and basil: five highly fragrant specialists in applied research.",
          "Menta, romero, salvia, tomillo y albahaca: cinco especialistas muy aromáticos de la investigación aplicada.",
        ),
        left: "69%",
        top: "82%",
      },
      {
        key: "botanicalExperiments",
        icon: "🧫",
        title: tr("Les petites expériences", "Small experiments", "Los pequeños experimentos"),
        description: tr(
          "Les essais sont modestes, documentés et arrosés avec exactement la bonne quantité de curiosité.",
          "The experiments are modest, documented and watered with exactly the right amount of curiosity.",
          "Los experimentos son modestos, documentados y regados con la cantidad exacta de curiosidad.",
        ),
        left: "62%",
        top: "64%",
      },
      {
        key: "gptBotanist",
        icon: "🤖",
        title: tr("GPT, assistant botaniste", "GPT, botanical assistant", "GPT, asistente botánico"),
        description: tr(
          "GPT aide à rempoter les idées. Il lui est strictement interdit de mettre à jour une plante sans sauvegarde préalable.",
          "GPT helps repot ideas. Updating a plant without a backup is strictly forbidden.",
          "GPT ayuda a trasplantar ideas. Está estrictamente prohibido actualizar una planta sin copia de seguridad.",
        ),
        left: "76%",
        top: "48%",
      },
    ],
  },
  "office-cathy": {
    instruction: tr(
      "Examinez les objets du cabinet de Dre Cathy. Chaque preuve semble avoir une histoire.",
      "Examine the objects in Dr. Cathy’s office. Every piece of evidence seems to have a story.",
      "Examina los objetos de la oficina de la Dra. Cathy. Cada prueba parece tener una historia.",
    ),
    objects: [
      {
        key: "officialMug",
        icon: "☕",
        title: tr("La tasse officielle", "The official mug", "La taza oficial"),
        description: tr(
          "Une tasse remplie de café et de certitude, vérifiée à cent pour cent par Cathy.",
          "A mug filled with coffee and certainty, one hundred percent verified by Cathy.",
          "Una taza llena de café y certeza, verificada al cien por cien por Cathy.",
        ),
        left: "49%",
        top: "43%",
      },
      {
        key: "caseFiles",
        icon: "📚",
        title: tr("Les dossiers en cours", "Current case files", "Los expedientes en curso"),
        description: tr(
          "Ce chaos est organisé. Cathy sait généralement où se trouve chaque preuve, surtout après que Suzie l’a classée.",
          "This chaos is organized. Cathy generally knows where every piece of evidence is, especially after Suzie files it.",
          "Este caos está organizado. Cathy suele saber dónde está cada prueba, especialmente después de que Suzie la archiva.",
        ),
        left: "40%",
        top: "60%",
      },
      {
        key: "diplomas",
        icon: "🎓",
        title: tr("Les diplômes et confirmations", "Diplomas and confirmations", "Los diplomas y confirmaciones"),
        description: tr(
          "Des années d’étude, plusieurs vérités confirmées et une certification officieuse en bon sens.",
          "Years of study, several confirmed truths and an unofficial certification in common sense.",
          "Años de estudio, varias verdades confirmadas y una certificación oficiosa en sentido común.",
        ),
        left: "84%",
        top: "18%",
      },
      {
        key: "equestrianObjects",
        icon: "🐴",
        title: tr("Les objets équestres", "Equestrian objects", "Los objetos ecuestres"),
        description: tr(
          "Les chevaux rappellent à Cathy que l’expérience, la patience et l’observation valent souvent plus qu’un long discours.",
          "The horses remind Cathy that experience, patience and observation are often worth more than a long speech.",
          "Los caballos le recuerdan a Cathy que la experiencia, la paciencia y la observación suelen valer más que un largo discurso.",
        ),
        left: "13%",
        top: "29%",
      },
      {
        key: "annie",
        icon: "🐕",
        title: tr("Annie", "Annie", "Annie"),
        description: tr(
          "Cheffe de la joie et du chaos, goûteuse autoproclamée et experte des interruptions parfaitement nécessaires.",
          "Chief of joy and chaos, self-appointed taster and expert in perfectly necessary interruptions.",
          "Jefa de alegría y caos, catadora autoproclamada y experta en interrupciones perfectamente necesarias.",
        ),
        left: "68%",
        top: "62%",
      },
      {
        key: "confirmedEvidence",
        icon: "✅",
        title: tr("Les preuves confirmées", "Confirmed evidence", "Las pruebas confirmadas"),
        description: tr(
          "Les conclusions gagnent leur place ici après avoir résisté aux questions, aux données et à au moins un deuxième café.",
          "Conclusions earn their place here after surviving questions, data and at least one second coffee.",
          "Las conclusiones se ganan su lugar aquí después de resistir preguntas, datos y al menos un segundo café.",
        ),
        left: "52%",
        top: "13%",
      },
    ],
  },
  "office-gpt": {
    instruction: tr(
      "Ouvrez les outils, les plans et les dossiers du studio technique de GPT.",
      "Open the tools, plans and files in GPT’s technical studio.",
      "Abre las herramientas, los planos y los expedientes del estudio técnico de GPT.",
    ),
    objects: [
      {
        key: "digitalTools",
        icon: "💻",
        title: tr("Les outils numériques", "Digital tools", "Las herramientas digitales"),
        description: tr(
          "Code, logique et traduction transforment les idées de Suzie en salles, jeux et histoires.",
          "Code, logic and translation turn Suzie’s ideas into rooms, games and stories.",
          "El código, la lógica y la traducción convierten las ideas de Suzie en salas, juegos e historias.",
        ),
        left: "35%",
        top: "38%",
      },
      {
        key: "centerPlans",
        icon: "🏛️",
        title: tr("Les plans du Centre", "Plans of the Center", "Los planos del Centro"),
        description: tr(
          "L’architecture du CWRC évolue une pièce à la fois, avec une sauvegarde avant chaque grande idée.",
          "The CWRC architecture grows one room at a time, with a backup before every big idea.",
          "La arquitectura del CWRC evoluciona una sala a la vez, con una copia de seguridad antes de cada gran idea.",
        ),
        left: "70%",
        top: "33%",
      },
      {
        key: "ranger",
        icon: "🐕",
        title: tr("Ranger, chef de la sécurité", "Ranger, Chief of Security", "Ranger, jefe de seguridad"),
        description: tr(
          "Ranger protège les données, surveille le périmètre et vérifie personnellement la qualité des collations.",
          "Ranger protects the data, patrols the perimeter and personally verifies snack quality.",
          "Ranger protege los datos, vigila el perímetro y verifica personalmente la calidad de los bocadillos.",
        ),
        left: "19%",
        top: "73%",
      },
      {
        key: "technicalConsole",
        icon: "🎛️",
        title: tr("La console technique", "The technical console", "La consola técnica"),
        description: tr(
          "Le cœur des systèmes du CWRC. Les boutons rouges sont documentés; les autres sont surtout très intéressants.",
          "The heart of the CWRC systems. The red buttons are documented; the others are mostly very interesting.",
          "El corazón de los sistemas del CWRC. Los botones rojos están documentados; los demás son sobre todo muy interesantes.",
        ),
        left: "89%",
        top: "59%",
      },
      {
        key: "technicalArchives",
        icon: "🗄️",
        title: tr("Les archives techniques", "Technical archives", "Los archivos técnicos"),
        description: tr(
          "Versions, décisions, preuves et quelques anciennes solutions qui fonctionneraient encore si personne n’y touchait.",
          "Versions, decisions, evidence and a few old solutions that would still work if nobody touched them.",
          "Versiones, decisiones, pruebas y algunas soluciones antiguas que aún funcionarían si nadie las tocara.",
        ),
        left: "68%",
        top: "88%",
      },
      {
        key: "itIncidents",
        icon: "📝",
        title: tr("Les incidents informatiques", "IT incidents", "Los incidentes informáticos"),
        description: tr(
          "Tester soigneusement, documenter clairement, sécuriser le tout et garder son sens de l’humour.",
          "Test thoroughly, document clearly, secure everything and keep a sense of humour.",
          "Probar cuidadosamente, documentar con claridad, protegerlo todo y conservar el sentido del humor.",
        ),
        left: "87%",
        top: "85%",
      },
    ],
  },
  gardens: {
    instruction: tr(
      "Promenez-vous parmi la fontaine, les oiseaux, les fleurs et les histoires du jardin.",
      "Wander among the fountain, birds, flowers and garden stories.",
      "Pasea entre la fuente, los pájaros, las flores y las historias del jardín.",
    ),
    objects: [
      {
        key: "fountain",
        icon: "⛲",
        title: tr("La fontaine", "The fountain", "La fuente"),
        description: tr(
          "L’eau circule doucement pendant que les idées cessent enfin de tourner en rond.",
          "Water flows gently while ideas finally stop going around in circles.",
          "El agua fluye suavemente mientras las ideas dejan por fin de dar vueltas.",
        ),
        left: "51%",
        top: "29%",
      },
      {
        key: "birdFeeders",
        icon: "🐦",
        title: tr("Les mangeoires", "The bird feeders", "Los comederos"),
        description: tr(
          "Un réseau très actif de visiteurs ailés qui observent le Centre sans jamais remettre de rapport.",
          "A very active network of winged visitors who observe the Center without ever submitting a report.",
          "Una red muy activa de visitantes alados que observan el Centro sin presentar nunca un informe.",
        ),
        left: "10%",
        top: "27%",
      },
      {
        key: "gardenRabbit",
        icon: "🐇",
        title: tr("Le lapin du jardin", "The garden rabbit", "El conejo del jardín"),
        description: tr(
          "Présent sans rendez-vous, silencieux pendant les discussions et manifestement au courant de tout.",
          "Present without an appointment, silent during discussions and apparently aware of everything.",
          "Presente sin cita, silencioso durante las conversaciones y aparentemente enterado de todo.",
        ),
        left: "10%",
        top: "79%",
      },
      {
        key: "teaTable",
        icon: "🫖",
        title: tr("La table du thé", "The tea table", "La mesa del té"),
        description: tr(
          "À quatre heures, les conversations autour du thé règlent parfois davantage de choses qu’une réunion.",
          "At four o’clock, conversations over tea sometimes solve more than a meeting.",
          "A las cuatro, las conversaciones durante el té a veces resuelven más que una reunión.",
        ),
        left: "49%",
        top: "58%",
      },
      {
        key: "gardenConversations",
        icon: "💬",
        title: tr("Les conversations de Cathy et Suzie", "Cathy and Suzie’s conversations", "Las conversaciones de Cathy y Suzie"),
        description: tr(
          "Un moment consacré aux projets, aux souvenirs et aux idées qui arrivent sans convocation officielle.",
          "A moment devoted to projects, memories and ideas that arrive without an official appointment.",
          "Un momento dedicado a proyectos, recuerdos e ideas que llegan sin convocatoria oficial.",
        ),
        left: "58%",
        top: "42%",
      },
      {
        key: "flowers",
        icon: "🌸",
        title: tr("Les fleurs du domaine", "The estate flowers", "Las flores de la finca"),
        description: tr(
          "Hydrangées, roses et fleurs saisonnières rappellent que la patience produit parfois des preuves magnifiques.",
          "Hydrangeas, roses and seasonal flowers remind us that patience sometimes produces beautiful evidence.",
          "Hortensias, rosas y flores de temporada recuerdan que la paciencia a veces produce pruebas magníficas.",
        ),
        left: "89%",
        top: "60%",
      },
      {
        key: "seasonalStories",
        icon: "📖",
        title: tr("Les histoires saisonnières", "Seasonal stories", "Las historias estacionales"),
        description: tr(
          "Le jardin change avec les saisons et conserve les histoires de ceux qui s’y arrêtent.",
          "The garden changes with the seasons and preserves the stories of those who pause here.",
          "El jardín cambia con las estaciones y conserva las historias de quienes se detienen aquí.",
        ),
        left: "77%",
        top: "16%",
      },
    ],
  },
};

const ui = {
  fr: {
    close: "Fermer",
    open: "Ouvrir",
  },
  en: {
    close: "Close",
    open: "Open",
  },
  es: {
    close: "Cerrar",
    open: "Abrir",
  },
} satisfies Record<Locale, Record<string, string>>;

export default function ImmersiveRoomPage({
  locale,
  roomKey,
  page,
}: {
  locale: Locale;
  roomKey: keyof typeof roomDefinitions;
  page: StandardPage;
}) {
  const room = roomDefinitions[roomKey];
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const selected = room.objects.find((item) => item.key === selectedKey) ?? null;

  useEffect(() => {
    if (!selected) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedKey(null);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selected]);

  return (
    <section className="immersiveRoom">
      <p className="eyebrow">{page.eyebrow}</p>
      <h1>{page.title}</h1>
      <p className="subtitle">{page.subtitle}</p>
      <p className="instruction">{room.instruction[locale]}</p>

      <div className="scene">
        <img src={page.image} alt={page.imageAlt ?? page.title} />

        {room.objects.map((item) => {
          const active = item.key === hoveredKey || item.key === selectedKey;

          return (
            <button
              key={item.key}
              type="button"
              className={active ? "hotspot active" : "hotspot"}
              style={{ left: item.left, top: item.top }}
              aria-label={`${ui[locale].open} : ${item.title[locale]}`}
              title={item.title[locale]}
              onMouseEnter={() => setHoveredKey(item.key)}
              onMouseLeave={() => setHoveredKey(null)}
              onFocus={() => setHoveredKey(item.key)}
              onBlur={() => setHoveredKey(null)}
              onClick={() => setSelectedKey(item.key)}
            >
              {item.icon}
            </button>
          );
        })}
      </div>

      <div className="objectGrid">
        {room.objects.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setSelectedKey(item.key)}
          >
            <span aria-hidden="true">{item.icon}</span>
            <strong>{item.title[locale]}</strong>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedKey(null);
            }
          }}
        >
          <article
            className="dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="immersive-object-title"
          >
            <span className="dialogIcon" aria-hidden="true">{selected.icon}</span>
            <h2 id="immersive-object-title">{selected.title[locale]}</h2>
            <p className="description">{selected.description[locale]}</p>

            <PublishedObjectContent
              roomKey={roomKey}
              objectKey={selected.key}
              locale={locale}
            />

            <button
              type="button"
              className="close"
              onClick={() => setSelectedKey(null)}
            >
              {ui[locale].close}
            </button>
          </article>
        </div>
      )}

      <style jsx>{`
        .immersiveRoom {
          margin-top: 20px;
          color: #102a4c;
        }

        .eyebrow {
          margin: 0;
          text-align: center;
          color: #8a6a3d;
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        h1 {
          margin: 12px 0 8px;
          text-align: center;
          font-size: clamp(2.4rem, 6vw, 5rem);
          line-height: 1;
        }

        .subtitle,
        .instruction {
          max-width: 880px;
          margin: 14px auto;
          text-align: center;
          line-height: 1.7;
        }

        .subtitle {
          color: #8a6a3d;
          font-family: Georgia, serif;
          font-size: 1.18rem;
          font-weight: 700;
        }

        .instruction {
          margin-bottom: 22px;
          color: #6e5b3f;
          font-size: 1.05rem;
        }

        .scene {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(138, 106, 61, 0.4);
          border-radius: 24px;
          box-shadow: 0 18px 44px rgba(16, 42, 76, 0.25);
        }

        .scene img {
          display: block;
          width: 100%;
          height: auto;
        }

        .hotspot {
          position: absolute;
          display: grid;
          width: clamp(38px, 4.5vw, 58px);
          height: clamp(38px, 4.5vw, 58px);
          padding: 0;
          place-items: center;
          transform: translate(-50%, -50%);
          border: 3px solid #fffdf8;
          border-radius: 50%;
          background: #102a4c;
          box-shadow: 0 5px 18px rgba(0, 0, 0, 0.45);
          color: #fffdf8;
          cursor: pointer;
          font-size: clamp(1rem, 2vw, 1.45rem);
          transition: transform 0.2s, background 0.2s, box-shadow 0.2s;
        }

        .hotspot.active,
        .hotspot:hover,
        .hotspot:focus-visible {
          transform: translate(-50%, -50%) scale(1.2);
          outline: none;
          background: #d8c49a;
          box-shadow: 0 0 0 8px rgba(216, 196, 154, 0.35), 0 0 28px #f7d77a;
          color: #102a4c;
        }

        .objectGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 13px;
          margin-top: 24px;
        }

        .objectGrid button {
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 68px;
          padding: 14px 16px;
          border: 1px solid rgba(138, 106, 61, 0.35);
          border-radius: 15px;
          background: #fffdf8;
          color: #102a4c;
          cursor: pointer;
          font-family: Georgia, serif;
          font-size: 1rem;
          text-align: left;
        }

        .objectGrid button:hover,
        .objectGrid button:focus-visible {
          border-color: #8a6a3d;
          outline: none;
          background: #f7f1e6;
          transform: translateY(-1px);
        }

        .objectGrid span {
          flex: 0 0 auto;
          font-size: 1.8rem;
        }

        .overlay {
          position: fixed;
          inset: 0;
          z-index: 3000;
          display: grid;
          overflow-y: auto;
          padding: 24px;
          place-items: center;
          background: rgba(5, 17, 31, 0.82);
          backdrop-filter: blur(5px);
        }

        .dialog {
          width: min(760px, 100%);
          max-height: calc(100vh - 48px);
          overflow-y: auto;
          padding: clamp(24px, 5vw, 42px);
          border: 2px solid #d8c49a;
          border-radius: 22px;
          background: #fffdf8;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.45);
          text-align: center;
        }

        .dialogIcon {
          display: block;
          font-size: 3rem;
        }

        .dialog h2 {
          margin: 10px 0;
          font-size: clamp(1.8rem, 5vw, 2.65rem);
        }

        .description {
          margin: 0 auto;
          color: #6e5b3f;
          font-size: 1.08rem;
          line-height: 1.75;
        }

        .close {
          margin-top: 26px;
          padding: 12px 24px;
          border: 0;
          border-radius: 999px;
          background: #102a4c;
          color: #fffdf8;
          cursor: pointer;
          font-weight: 800;
        }

        @media (max-width: 640px) {
          .hotspot {
            width: 34px;
            height: 34px;
            border-width: 2px;
            font-size: 0.95rem;
          }

          .overlay {
            padding: 12px;
          }

          .dialog {
            max-height: calc(100vh - 24px);
          }
        }
      `}</style>
    </section>
  );
}
