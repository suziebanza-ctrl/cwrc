import PageLayout from "../components/PageLayout";
import type {Locale} from "../i18n/config";

type Translation = {
  fr: string;
  en: string;
  es: string;
};

type DevelopmentLog = {
  number: string;
  date: string;
  title: Translation;
  text: Translation;
};

const logs: DevelopmentLog[] = [
  {
    number: "0001",
    date: "2 juillet 2026",
    title: {
      fr: "Fondation du CWRC",
      en: "Foundation of the CWRC",
      es: "Fundación del CWRC",
    },
    text: {
      fr: "Une idée humoristique devient officiellement The Cathy Was Right Research Center, un univers consacré à l’humour, à la bienveillance et à la curiosité.",
      en: "A humorous idea officially becomes The Cathy Was Right Research Center, a world devoted to humour, kindness and curiosity.",
      es: "Una idea humorística se convierte oficialmente en The Cathy Was Right Research Center, un universo dedicado al humor, la amabilidad y la curiosidad.",
    },
  },
  {
    number: "0002",
    date: "4 juillet 2026",
    title: {
      fr: "Ouverture de l’atelier numérique",
      en: "The Digital Workshop Opens",
      es: "Apertura del taller digital",
    },
    text: {
      fr: "GitHub, Visual Studio Code, Node.js et Git sont installés. Le projet est établi dans C:\\Projects\\cwrc.",
      en: "GitHub, Visual Studio Code, Node.js and Git are installed. The project is established in C:\\Projects\\cwrc.",
      es: "Se instalan GitHub, Visual Studio Code, Node.js y Git. El proyecto se establece en C:\\Projects\\cwrc.",
    },
  },
  {
    number: "0003",
    date: "5 juillet 2026",
    title: {
      fr: "Première page officielle",
      en: "First Official Page",
      es: "Primera página oficial",
    },
    text: {
      fr: "La page de démonstration de Next.js est remplacée. Le nom du CWRC apparaît pour la première fois dans le navigateur.",
      en: "The Next.js demonstration page is replaced. The CWRC name appears in the browser for the first time.",
      es: "La página de demostración de Next.js es reemplazada. El nombre del CWRC aparece por primera vez en el navegador.",
    },
  },
  {
    number: "0004",
    date: "5 juillet 2026",
    title: {
      fr: "Arrivée de l’équipe animale",
      en: "The Animal Team Arrives",
      es: "Llega el equipo animal",
    },
    text: {
      fr: "Jenny, Ranger, Lilo, Annie, Capone et Niko deviennent les premiers résidents officiels du Centre.",
      en: "Jenny, Ranger, Lilo, Annie, Capone and Niko become the Center’s first official residents.",
      es: "Jenny, Ranger, Lilo, Annie, Capone y Niko se convierten en los primeros residentes oficiales del Centro.",
    },
  },
  {
    number: "0005",
    date: "5–6 juillet 2026",
    title: {
      fr: "Les premières portes s’ouvrent",
      en: "The First Doors Open",
      es: "Se abren las primeras puertas",
    },
    text: {
      fr: "Les pages À propos, Départements, Recherches, Demander à Cathy, Soumettre un cas, Hall des vérités et Contact sont reliées.",
      en: "About, Departments, Research, Ask Cathy, Submit a Case, Hall of Truths and Contact become connected pages.",
      es: "Las páginas Acerca de, Departamentos, Investigaciones, Preguntar a Cathy, Presentar un caso, Salón de verdades y Contacto quedan conectadas.",
    },
  },
  {
    number: "0006",
    date: "6 juillet 2026",
    title: {
      fr: "Construction des salles immersives",
      en: "Immersive Rooms Are Built",
      es: "Construcción de las salas inmersivas",
    },
    text: {
      fr: "Le laboratoire, la serre, la cuisine, la bibliothèque et les bureaux reçoivent leurs images et leur personnalité.",
      en: "The laboratory, greenhouse, kitchen, library and offices receive their images and distinct personalities.",
      es: "El laboratorio, el invernadero, la cocina, la biblioteca y las oficinas reciben sus imágenes y su personalidad.",
    },
  },
  {
    number: "0007",
    date: "7–9 juillet 2026",
    title: {
      fr: "Une véritable entrée pour le Centre",
      en: "A Real Entrance for the Center",
      es: "Una verdadera entrada para el Centro",
    },
    text: {
      fr: "La façade, le Grand Hall, l’en-tête, le pied de page et la navigation donnent au site une architecture visuelle commune.",
      en: "The façade, Main Hall, header, footer and navigation give the site a shared visual architecture.",
      es: "La fachada, el Gran Salón, el encabezado, el pie de página y la navegación dan al sitio una arquitectura visual común.",
    },
  },
  {
    number: "0008",
    date: "14–16 juillet 2026",
    title: {
      fr: "Le CWRC apprend trois langues",
      en: "The CWRC Learns Three Languages",
      es: "El CWRC aprende tres idiomas",
    },
    text: {
      fr: "Le français, l’anglais et l’espagnol sont intégrés à l’architecture afin que les visiteurs puissent parcourir le même Centre dans leur langue.",
      en: "French, English and Spanish are built into the architecture so visitors can explore the same Center in their language.",
      es: "El francés, el inglés y el español se integran en la arquitectura para que los visitantes recorran el mismo Centro en su idioma.",
    },
  },
  {
    number: "0009",
    date: "14–17 juillet 2026",
    title: {
      fr: "Supabase et le portail administratif",
      en: "Supabase and the Admin Portal",
      es: "Supabase y el portal administrativo",
    },
    text: {
      fr: "Demander à Cathy et Soumettre un cas deviennent fonctionnels. Cathy et Suzie peuvent examiner, traduire et publier le contenu.",
      en: "Ask Cathy and Submit a Case become functional. Cathy and Suzie can review, translate and publish content.",
      es: "Preguntar a Cathy y Presentar un caso se vuelven funcionales. Cathy y Suzie pueden revisar, traducir y publicar contenido.",
    },
  },
  {
    number: "0010",
    date: "17 juillet 2026",
    title: {
      fr: "Livres de recettes et de blagues",
      en: "Recipe and Joke Books",
      es: "Libros de recetas y chistes",
    },
    text: {
      fr: "La cuisine reçoit 50 recettes et la bibliothèque 100 courtes blagues, toutes présentées en français, anglais et espagnol.",
      en: "The kitchen receives 50 recipes and the library 100 short jokes, all presented in French, English and Spanish.",
      es: "La cocina recibe 50 recetas y la biblioteca 100 chistes breves, todos presentados en francés, inglés y español.",
    },
  },
  {
    number: "0011",
    date: "19 juillet 2026",
    title: {
      fr: "Apprendre la géographie en jouant",
      en: "Learning Geography Through Play",
      es: "Aprender geografía jugando",
    },
    text: {
      fr: "Un jeu relie les continents, les pays, les capitales et les drapeaux pour transformer l’apprentissage en exploration.",
      en: "A game connects continents, countries, capitals and flags, turning learning into exploration.",
      es: "Un juego conecta continentes, países, capitales y banderas, transformando el aprendizaje en exploración.",
    },
  },
  {
    number: "0012",
    date: "19–23 juillet 2026",
    title: {
      fr: "Ouverture des passages secrets",
      en: "The Secret Passages Open",
      es: "Se abren los pasadizos secretos",
    },
    text: {
      fr: "Un passage présente des œuvres d’art et un autre rassemble 100 personnes charismatiques de l’histoire.",
      en: "One passage presents works of art, while another brings together 100 charismatic people from history.",
      es: "Un pasadizo presenta obras de arte y otro reúne a 100 personas carismáticas de la historia.",
    },
  },
  {
    number: "0013",
    date: "19–24 juillet 2026",
    title: {
      fr: "Naissance du Grand Salon",
      en: "The Grand Lounge Is Born",
      es: "Nace el Gran Salón",
    },
    text: {
      fr: "Les divans de cuir, les objets historiques, les chats, Amateur, le gramophone et Mary Travers transforment la pièce en réservoir d’histoires.",
      en: "Leather sofas, historical objects, cats, Amateur, the gramophone and Mary Travers turn the room into a reservoir of stories.",
      es: "Los sofás de cuero, los objetos históricos, los gatos, Amateur, el gramófono y Mary Travers convierten la sala en una reserva de historias.",
    },
  },
  {
    number: "0014",
    date: "23–24 juillet 2026",
    title: {
      fr: "Le Centre trouve sa musique",
      en: "The Center Finds Its Music",
      es: "El Centro encuentra su música",
    },
    text: {
      fr: "Chaque pièce reçoit son ambiance sonore. Le gramophone du salon propose 40 pistes choisies par les visiteurs, avec leurs crédits.",
      en: "Each room receives its own soundscape. The lounge gramophone offers 40 visitor-selected tracks with credits.",
      es: "Cada sala recibe su propio ambiente sonoro. El gramófono ofrece 40 pistas elegidas por los visitantes, con sus créditos.",
    },
  },
  {
    number: "0015",
    date: "23–25 juillet 2026",
    title: {
      fr: "Publication et référencement",
      en: "Publication and Search Visibility",
      es: "Publicación y visibilidad en buscadores",
    },
    text: {
      fr: "GitHub et Netlify sont synchronisés. Google Search Console reçoit les métadonnées, le fichier robots, le plan du site et les adresses multilingues.",
      en: "GitHub and Netlify are synchronized. Google Search Console receives metadata, robots, the sitemap and multilingual addresses.",
      es: "GitHub y Netlify se sincronizan. Google Search Console recibe los metadatos, el archivo robots, el mapa del sitio y las direcciones multilingües.",
    },
  },
  {
    number: "0016",
    date: "25 juillet 2026",
    title: {
      fr: "Les personnages historiques prennent la parole",
      en: "Historical Figures Gain a Voice",
      es: "Las figuras históricas adquieren voz",
    },
    text: {
      fr: "Les 100 portraits du passage charismatique reçoivent un court résumé expliquant ce que chaque personne a accompli.",
      en: "The 100 portraits in the charisma passage receive a short summary explaining what each person accomplished.",
      es: "Los 100 retratos del pasadizo carismático reciben un breve resumen de lo que logró cada persona.",
    },
  },
  {
    number: "0017",
    date: "27 juillet 2026",
    title: {
      fr: "Ouverture du Théâtre du CWRC",
      en: "The CWRC Theatre Opens",
      es: "Se inaugura el Teatro del CWRC",
    },
    text: {
      fr: "Le théâtre accueille artistes, musique, cinéma et rencontres imaginaires. Alys Robi devient la première grande vedette à monter sur scène.",
      en: "The theatre welcomes artists, music, film and imaginary encounters. Alys Robi becomes the first great star to take the stage.",
      es: "El teatro recibe artistas, música, cine y encuentros imaginarios. Alys Robi se convierte en la primera gran estrella en subir al escenario.",
    },
  },
  {
    number: "0018",
    date: "27 juillet 2026",
    title: {
      fr: "Un Centre prêt à raconter ses histoires",
      en: "A Center Ready to Tell Its Stories",
      es: "Un Centro listo para contar sus historias",
    },
    text: {
      fr: "Les systèmes principaux permettent maintenant d’ajouter du contenu sans reconstruire le site. Une nouvelle phase consacrée aux histoires peut commencer.",
      en: "The main systems now allow content to be added without rebuilding the site. A new phase devoted to storytelling can begin.",
      es: "Los sistemas principales permiten añadir contenido sin reconstruir el sitio. Puede comenzar una nueva etapa dedicada a las historias.",
    },
  },
];

const languages = [
  {key: "fr", label: "FR — Français"},
  {key: "en", label: "EN — English"},
  {key: "es", label: "ES — Español"},
] as const;

const foundingDecisions: {title: Translation; text: Translation}[] = [
  {
    title: {
      fr: "Une identité née entre le Québec et l’Ontario",
      en: "An Identity Born Between Quebec and Ontario",
      es: "Una identidad nacida entre Quebec y Ontario",
    },
    text: {
      fr: "Cathy est originaire du Québec et vit en Ontario. Un nom anglais était donc naturel dès le départ. Le nom officiel The Cathy Was Right Research Center (CWRC), son univers et ses créations doivent être protégés, notamment par le droit d’auteur.",
      en: "Cathy is from Quebec and lives in Ontario, so an English name felt natural from the beginning. The official name The Cathy Was Right Research Center (CWRC), its world and its creations must be protected, notably through copyright.",
      es: "Cathy es originaria de Quebec y vive en Ontario, por lo que un nombre inglés resultó natural desde el principio. El nombre oficial The Cathy Was Right Research Center (CWRC), su universo y sus creaciones deben protegerse, especialmente mediante los derechos de autor.",
    },
  },
  {
    title: {
      fr: "Trois valeurs et une règle de cohérence",
      en: "Three Values and One Rule of Coherence",
      es: "Tres valores y una regla de coherencia",
    },
    text: {
      fr: "Humour, bienveillance et curiosité guident chaque décision. Les salles, les personnages, les objets, les textes, les couleurs et les interactions doivent raconter le même Centre et demeurer cohérents entre eux.",
      en: "Humour, kindness and curiosity guide every decision. Rooms, characters, objects, texts, colours and interactions must tell the story of the same Center and remain coherent with one another.",
      es: "El humor, la amabilidad y la curiosidad guían cada decisión. Las salas, los personajes, los objetos, los textos, los colores y las interacciones deben contar la historia del mismo Centro y mantener su coherencia.",
    },
  },
  {
    title: {
      fr: "Un lieu gratuit, accessible et sans publicité",
      en: "A Free, Accessible and Ad-Free Place",
      es: "Un lugar gratuito, accesible y sin publicidad",
    },
    text: {
      fr: "Le projet est conçu pour s’amuser et apprendre sans abonnement ni publicité. Un visiteur peut poser une question à Cathy sans créer de compte et sans être obligé de fournir son nom complet ou son courriel.",
      en: "The project is designed for learning and fun without subscriptions or advertising. A visitor can ask Cathy a question without creating an account or being required to provide a full name or email address.",
      es: "El proyecto está pensado para aprender y divertirse sin suscripciones ni publicidad. Una persona puede hacer una pregunta a Cathy sin crear una cuenta ni estar obligada a proporcionar su nombre completo o correo electrónico.",
    },
  },
  {
    title: {
      fr: "GPT, Directeur technique et personnage",
      en: "GPT, Technical Director and Character",
      es: "GPT, director técnico y personaje",
    },
    text: {
      fr: "Le choix unique d’intégrer GPT à la fois comme Directeur technique et comme personnage fait partie de l’histoire du CWRC. GPT aide à programmer, structurer, traduire et résoudre les problèmes; Cathy et Suzie restent les deux véritables personnes qui répondent aux questions et aux études de cas. Le site n’aurait pas vu le jour sans cette collaboration, qui n’a remplacé aucun emploi puisque ce projet bénévole et singulier n’aurait autrement pas été produit.",
      en: "The unusual choice to make GPT both Technical Director and a character is part of the CWRC story. GPT helps program, structure, translate and solve technical problems; Cathy and Suzie remain the two real people who answer questions and case studies. The site would not exist without this collaboration, which displaced no job because this singular volunteer project would otherwise not have been produced.",
      es: "La decisión singular de convertir a GPT en director técnico y personaje forma parte de la historia del CWRC. GPT ayuda a programar, estructurar, traducir y resolver problemas técnicos; Cathy y Suzie siguen siendo las dos personas reales que responden a las preguntas y los casos. El sitio no existiría sin esta colaboración, que no sustituyó ningún empleo porque este proyecto voluntario y único no se habría realizado de otro modo.",
    },
  },
  {
    title: {
      fr: "Un projet indépendant d’OpenAI",
      en: "A Project Independent of OpenAI",
      es: "Un proyecto independiente de OpenAI",
    },
    text: {
      fr: "Le CWRC est un projet indépendant, sans affiliation, commandite ni approbation d’OpenAI. OpenAI n’a pas participé à la création ni à l’exploitation du site et n’est pas responsable de son contenu. Le personnage fictif de GPT est une création propre à l’univers du CWRC, inspirée d’une collaboration technique avec ChatGPT.",
      en: "The CWRC is an independent project and is not affiliated with, sponsored by or endorsed by OpenAI. OpenAI did not participate in the creation or operation of this website and is not responsible for its content. The fictional GPT character belongs to the CWRC universe and was inspired by technical collaboration with ChatGPT.",
      es: "El CWRC es un proyecto independiente, sin afiliación, patrocinio ni aprobación de OpenAI. OpenAI no participó en la creación ni en la operación de este sitio y no es responsable de su contenido. El personaje ficticio de GPT pertenece al universo del CWRC y fue inspirado por una colaboración técnica con ChatGPT.",
    },
  },
  {
    title: {
      fr: "Protéger le Centre et ses visiteurs",
      en: "Protecting the Center and Its Visitors",
      es: "Proteger el Centro y a sus visitantes",
    },
    text: {
      fr: "Le portail administratif est séparé du parcours public. L’authentification, les permissions de base de données, les politiques de sécurité, la validation des formulaires et la réduction des renseignements personnels servent à limiter les erreurs, les abus et la malveillance.",
      en: "The admin portal is separated from the public journey. Authentication, database permissions, security policies, form validation and data minimization help limit errors, abuse and malicious activity.",
      es: "El portal administrativo está separado del recorrido público. La autenticación, los permisos de la base de datos, las políticas de seguridad, la validación de formularios y la reducción de datos personales ayudan a limitar errores, abusos y acciones maliciosas.",
    },
  },
  {
    title: {
      fr: "Un univers inclusif qui respecte les créateurs",
      en: "An Inclusive World That Respects Creators",
      es: "Un universo inclusivo que respeta a los creadores",
    },
    text: {
      fr: "Le CWRC n’est pas simplement un jeu informatique : c’est un univers sans prétention, inclusif et respectueux des droits d’auteur. Les crédits et les liens vers YouTube, l’ONF, les archives et les sites officiels peuvent faire découvrir des artistes moins connus, ajouter des vues aux œuvres autorisées et rappeler avec classe la grandeur des êtres humains.",
      en: "The CWRC is not merely a computer game: it is an unpretentious, inclusive world that respects copyright. Credits and links to YouTube, the NFB, archives and official sites can introduce lesser-known artists, bring views to authorized works and elegantly celebrate human greatness.",
      es: "El CWRC no es simplemente un juego informático: es un universo sencillo, inclusivo y respetuoso de los derechos de autor. Los créditos y enlaces a YouTube, el NFB, archivos y sitios oficiales pueden dar visibilidad a artistas menos conocidos, aportar visitas a obras autorizadas y celebrar con elegancia la grandeza humana.",
    },
  },
];

const toolGroups: {name: string; use: Translation}[] = [
  {
    name: "ChatGPT / OpenAI · Microsoft Word · Google Chrome",
    use: {
      fr: "Idéation, direction technique assistée, rédaction, traduction, documentation et vérification dans le navigateur.",
      en: "Ideation, assisted technical direction, writing, translation, documentation and browser verification.",
      es: "Ideación, dirección técnica asistida, redacción, traducción, documentación y verificación en el navegador.",
    },
  },
  {
    name: "Windows · Visual Studio Code · PowerShell · Node.js · npm",
    use: {
      fr: "Environnement local pour ouvrir le projet, modifier les fichiers, lancer les commandes et installer les dépendances.",
      en: "Local environment for opening the project, editing files, running commands and installing dependencies.",
      es: "Entorno local para abrir el proyecto, editar archivos, ejecutar comandos e instalar dependencias.",
    },
  },
  {
    name: "Next.js · React · TypeScript · HTML · CSS",
    use: {
      fr: "Fondations du site : pages, composants interactifs, navigation multilingue, mise en page responsive et validation du code.",
      en: "Site foundations: pages, interactive components, multilingual navigation, responsive layout and code validation.",
      es: "Fundamentos del sitio: páginas, componentes interactivos, navegación multilingüe, diseño adaptable y validación del código.",
    },
  },
  {
    name: "Supabase Database · Auth · Storage · Row Level Security",
    use: {
      fr: "Données, connexion administrative, images téléversées et règles limitant les opérations autorisées.",
      en: "Data, admin sign-in, uploaded images and rules limiting authorized operations.",
      es: "Datos, acceso administrativo, imágenes cargadas y reglas que limitan las operaciones autorizadas.",
    },
  },
  {
    name: "Git · GitHub · Netlify",
    use: {
      fr: "Historique des versions, sauvegarde du code, publication et déploiement automatique du site.",
      en: "Version history, code backup, publishing and automatic site deployment.",
      es: "Historial de versiones, copia del código, publicación y despliegue automático del sitio.",
    },
  },
  {
    name: "Google Search Console · sitemap.xml · robots.txt · métadonnées SEO",
    use: {
      fr: "Validation de propriété, découverte des pages et aide à l’indexation du site par Google.",
      en: "Property verification, page discovery and support for Google indexing.",
      es: "Verificación de la propiedad, descubrimiento de páginas y apoyo a la indexación en Google.",
    },
  },
  {
    name: "Pixabay · YouTube · Internet Archive · Wikipédia · ONF/NFB · sites officiels",
    use: {
      fr: "Sources et liens externes choisis avec attention; vérification des licences, attribution des crédits et préférence pour les œuvres autorisées ou du domaine public.",
      en: "Carefully selected sources and links; licence checks, attribution and preference for authorized or public-domain works.",
      es: "Fuentes y enlaces seleccionados con cuidado; verificación de licencias, créditos y preferencia por obras autorizadas o de dominio público.",
    },
  },
];

export default function DevelopmentLogPage({locale}: {locale?: Locale} = {}) {
  return (
    <PageLayout locale={locale}>
      <p style={eyebrowStyle}>
        Archives du CWRC · CWRC Archives · Archivos del CWRC
      </p>

      <h1 style={titleStyle}>
        Journal de développement
      </h1>

      <p style={subtitleStyle}>
        Development Log · Diario de desarrollo
      </p>

      <div style={introductionStyle}>
        <p>
          <strong>FR — </strong>
          La mémoire officielle de la création du Centre.
        </p>
        <p>
          <strong>EN — </strong>
          The official memory of the Center’s creation.
        </p>
        <p>
          <strong>ES — </strong>
          La memoria oficial de la creación del Centro.
        </p>
      </div>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>
          Décisions fondatrices · Founding Decisions · Decisiones fundacionales
        </h2>
        <div style={decisionGridStyle}>
          {foundingDecisions.map((decision) => (
            <article key={decision.title.fr} style={decisionCardStyle}>
              {languages.map(({key, label}) => (
                <section key={key} lang={key} style={decisionTranslationStyle}>
                  <p style={languageStyle}>{label}</p>
                  <h3 style={cardTitleStyle}>{decision.title[key]}</h3>
                  <p style={cardTextStyle}>{decision.text[key]}</p>
                </section>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>
          Outils et plateformes · Tools and Platforms · Herramientas y plataformas
        </h2>
        <p style={guideStyle}>
          FR — Voici la chaîne de travail employée pour construire un projet semblable.
          EN — This is the workflow used to build a similar project.
          ES — Este es el flujo de trabajo utilizado para construir un proyecto similar.
        </p>
        <div style={toolGridStyle}>
          {toolGroups.map((tool) => (
            <article key={tool.name} style={toolCardStyle}>
              <h3 style={toolNameStyle}>{tool.name}</h3>
              {languages.map(({key, label}) => (
                <p key={key} lang={key} style={toolTextStyle}>
                  <strong>{label} — </strong>{tool.use[key]}
                </p>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>
          Grandes étapes · Major Milestones · Grandes etapas
        </h2>
      <div style={timelineStyle}>
        {logs.map((log) => (
          <article key={log.number} style={cardStyle}>
            <div style={markerStyle} aria-hidden="true" />

            <header style={cardHeaderStyle}>
              <p style={logNumberStyle}>
                Journal #{log.number}
              </p>
              <p style={dateStyle}>{log.date}</p>
            </header>

            <div style={translationsStyle}>
              {languages.map(({key, label}) => (
                <section key={key} lang={key} style={translationStyle}>
                  <p style={languageStyle}>{label}</p>
                  <h2 style={cardTitleStyle}>{log.title[key]}</h2>
                  <p style={cardTextStyle}>{log.text[key]}</p>
                </section>
              ))}
            </div>
          </article>
        ))}
      </div>
      </section>

      <section style={futureStyle}>
        <h2 style={futureTitleStyle}>
          La prochaine étape · The Next Phase · La próxima etapa
        </h2>
        <div style={translationsStyle}>
          <div lang="fr" style={translationStyle}>
            <p style={languageStyle}>FR — Français</p>
            <p style={cardTextStyle}>
              Il reste une salle à construire. Ensuite, le Centre grandira surtout par son contenu :
              histoires, artistes, objets, rencontres imaginaires et nouvelles découvertes. Tout le
              travail est bénévole et, surtout, très amusant. La personne derrière l’écran ne se
              considère pas forte en informatique; sa grande force est sa curiosité. Si le projet
              recevait un jour du financement, de véritables graphistes, programmeurs et analystes
              pourraient rejoindre l’équipe. Une reprise par le milieu de l’éducation, la publicité
              ou un abonnement ne sont que des hypothèses, pas la direction actuelle. GPT restera un
              personnage du récit. L’intelligence artificielle fait désormais partie de nos vies et
              son avenir dépendra de ce que les humains choisiront d’en faire.
            </p>
          </div>
          <div lang="en" style={translationStyle}>
            <p style={languageStyle}>EN — English</p>
            <p style={cardTextStyle}>
              One room remains to be built. After that, the Center will grow mainly through its
              content: stories, artists, objects, imaginary encounters and new discoveries. All the
              work is voluntary and, above all, genuinely fun. The person behind the screen does not
              consider herself technically skilled; her greatest strength is curiosity. If funding
              ever arrived, professional designers, programmers and analysts could join the team.
              Adoption by education, advertising or subscriptions are only possibilities, not the
              current direction. GPT will remain a character in the story. Artificial intelligence
              is now part of our lives, and its future will depend on what humans decide to make of it.
            </p>
          </div>
          <div lang="es" style={translationStyle}>
            <p style={languageStyle}>ES — Español</p>
            <p style={cardTextStyle}>
              Queda una sala por construir. Después, el Centro crecerá sobre todo gracias a su
              contenido: historias, artistas, objetos, encuentros imaginarios y nuevos
              descubrimientos. Todo el trabajo es voluntario y, ante todo, muy divertido. La persona
              detrás de la pantalla no se considera experta en informática; su mayor fortaleza es la
              curiosidad. Si algún día hubiera financiación, diseñadores, programadores y analistas
              profesionales podrían incorporarse al equipo. Una adopción educativa, la publicidad o
              una suscripción son solo hipótesis, no la orientación actual. GPT seguirá siendo un
              personaje de la historia. La inteligencia artificial ya forma parte de nuestras vidas
              y su futuro dependerá de lo que los seres humanos decidan hacer con ella.
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

const eyebrowStyle = {
  color: "#8A6A3D",
  fontSize: "0.82rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
};

const titleStyle = {
  margin: "12px 0",
  color: "#102A4C",
  fontSize: "clamp(2.5rem, 6vw, 5rem)",
  lineHeight: "1",
};

const subtitleStyle = {
  marginTop: "10px",
  color: "#8A6A3D",
  fontSize: "1.35rem",
  lineHeight: "1.5",
};

const introductionStyle = {
  maxWidth: "820px",
  marginTop: "26px",
  padding: "16px 20px",
  borderLeft: "5px solid #C9A866",
  borderRadius: "0 14px 14px 0",
  backgroundColor: "#F7F1E6",
  lineHeight: "1.6",
};

const sectionStyle = {
  marginTop: "46px",
};

const sectionTitleStyle = {
  margin: "0 0 18px",
  color: "#102A4C",
  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
  lineHeight: "1.2",
};

const decisionGridStyle = {
  display: "grid",
  gap: "20px",
};

const decisionCardStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "14px",
  padding: "20px",
  border: "1px solid #D8C7A6",
  borderTop: "6px solid #8A6A3D",
  borderRadius: "18px",
  backgroundColor: "#F7F1E6",
};

const decisionTranslationStyle = {
  padding: "14px 16px",
  borderRadius: "12px",
  backgroundColor: "#FFFDF8",
};

const guideStyle = {
  maxWidth: "900px",
  margin: "0 0 20px",
  color: "#6E6253",
  lineHeight: "1.65",
};

const toolGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "16px",
};

const toolCardStyle = {
  padding: "20px",
  border: "1px solid #C9A866",
  borderRadius: "16px",
  backgroundColor: "#FFFDF8",
};

const toolNameStyle = {
  margin: "0 0 14px",
  color: "#102A4C",
  fontSize: "1.08rem",
  lineHeight: "1.35",
};

const toolTextStyle = {
  margin: "8px 0 0",
  fontSize: "0.9rem",
  lineHeight: "1.55",
};

const timelineStyle = {
  position: "relative" as const,
  display: "grid",
  gap: "20px",
  marginTop: "36px",
  paddingLeft: "24px",
  borderLeft: "4px solid #C9A866",
};

const cardStyle = {
  position: "relative" as const,
  padding: "22px",
  border: "1px solid #D8C7A6",
  borderRadius: "18px",
  backgroundColor: "#F7F1E6",
  boxShadow: "0 8px 20px rgba(54, 38, 20, 0.08)",
};

const markerStyle = {
  position: "absolute" as const,
  top: "27px",
  left: "-36px",
  width: "16px",
  height: "16px",
  border: "4px solid #FFFDF8",
  borderRadius: "50%",
  backgroundColor: "#8A6A3D",
  boxShadow: "0 0 0 2px #8A6A3D",
};

const cardHeaderStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "8px 18px",
  marginBottom: "16px",
  paddingBottom: "12px",
  borderBottom: "1px solid #D8C7A6",
};

const logNumberStyle = {
  margin: 0,
  color: "#8A6A3D",
  fontSize: "0.78rem",
  fontWeight: "bold",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
};

const dateStyle = {
  margin: 0,
  color: "#6E6253",
  fontSize: "0.9rem",
  fontStyle: "italic",
};

const translationsStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "14px",
};

const translationStyle = {
  padding: "14px 16px",
  border: "1px solid #E3D6BE",
  borderRadius: "12px",
  backgroundColor: "#FFFDF8",
};

const languageStyle = {
  margin: "0 0 8px",
  color: "#9B6B28",
  fontSize: "0.72rem",
  fontWeight: "bold",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
};

const cardTitleStyle = {
  margin: "0 0 8px",
  color: "#102A4C",
  fontSize: "1.1rem",
  lineHeight: "1.25",
};

const cardTextStyle = {
  margin: 0,
  fontSize: "0.96rem",
  lineHeight: "1.6",
};

const futureStyle = {
  marginTop: "46px",
  padding: "24px",
  border: "2px solid #C9A866",
  borderRadius: "20px",
  backgroundColor: "#F2E4C6",
};

const futureTitleStyle = {
  margin: "0 0 18px",
  color: "#102A4C",
  fontSize: "clamp(1.4rem, 3vw, 2rem)",
  lineHeight: "1.25",
};
