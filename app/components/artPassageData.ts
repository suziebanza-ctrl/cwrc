export type PassageWall = "left" | "right";
export type ArtLocale = "fr" | "en" | "es";

type Localized = Record<ArtLocale, string>;

export type Artwork = {
  id: string;
  wall: PassageWall;
  artist: string;
  title: Localized;
  country: Localized;
  year: string;
  movement: Localized;
  description: Localized;
  image: string;
  woman?: boolean;
  quebec?: boolean;
};

const commons = (filename: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=900`;

const countries = {
  italy: {fr: "Italie", en: "Italy", es: "Italia"},
  netherlands: {fr: "Pays-Bas", en: "Netherlands", es: "Países Bajos"},
  france: {fr: "France", en: "France", es: "Francia"},
  canada: {fr: "Canada", en: "Canada", es: "Canadá"},
  spain: {fr: "Espagne", en: "Spain", es: "España"},
  germany: {fr: "Allemagne", en: "Germany", es: "Alemania"},
  norway: {fr: "Norvège", en: "Norway", es: "Noruega"},
  austria: {fr: "Autriche", en: "Austria", es: "Austria"},
  russia: {fr: "Russie", en: "Russia", es: "Rusia"},
  usa: {fr: "États-Unis", en: "United States", es: "Estados Unidos"},
  sweden: {fr: "Suède", en: "Sweden", es: "Suecia"},
  mexico: {fr: "Mexique", en: "Mexico", es: "México"},
} satisfies Record<string, Localized>;

const movements = {
  renaissance: {fr: "Renaissance", en: "Renaissance", es: "Renacimiento"},
  baroque: {fr: "Baroque", en: "Baroque", es: "Barroco"},
  rococo: {fr: "Rococo", en: "Rococo", es: "Rococó"},
  neoclassical: {fr: "Néoclassicisme", en: "Neoclassicism", es: "Neoclasicismo"},
  romantic: {fr: "Romantisme", en: "Romanticism", es: "Romanticismo"},
  realism: {fr: "Réalisme", en: "Realism", es: "Realismo"},
  impressionism: {fr: "Impressionnisme", en: "Impressionism", es: "Impresionismo"},
  postImpressionism: {fr: "Postimpressionnisme", en: "Post-Impressionism", es: "Postimpresionismo"},
  pointillism: {fr: "Pointillisme", en: "Pointillism", es: "Puntillismo"},
  symbolism: {fr: "Symbolisme", en: "Symbolism", es: "Simbolismo"},
  expressionism: {fr: "Expressionnisme", en: "Expressionism", es: "Expresionismo"},
  abstract: {fr: "Art abstrait", en: "Abstract art", es: "Arte abstracto"},
  suprematism: {fr: "Suprématisme", en: "Suprematism", es: "Suprematismo"},
  modernism: {fr: "Modernisme", en: "Modernism", es: "Modernismo"},
  goldenAge: {fr: "Âge d’or néerlandais", en: "Dutch Golden Age", es: "Siglo de Oro neerlandés"},
  northernRenaissance: {fr: "Renaissance nordique", en: "Northern Renaissance", es: "Renacimiento nórdico"},
  canadianImpressionism: {fr: "Impressionnisme canadien", en: "Canadian Impressionism", es: "Impresionismo canadiense"},
  canadianModernism: {fr: "Modernisme canadien", en: "Canadian Modernism", es: "Modernismo canadiense"},
  quebecLandscape: {fr: "Paysagisme québécois", en: "Quebec landscape painting", es: "Paisajismo quebequense"},
  surrealism: {fr: "Surréalisme", en: "Surrealism", es: "Surrealismo"},
} satisfies Record<string, Localized>;

export const artworks: Artwork[] = [
  {
    id: "mona-lisa", wall: "left", artist: "Léonard de Vinci",
    title: {fr: "La Joconde", en: "Mona Lisa", es: "La Gioconda"},
    country: countries.italy, year: "vers 1503–1519", movement: movements.renaissance,
    description: {
      fr: "Le portrait énigmatique d’une femme assise devant un paysage lointain, célèbre pour son sourire et son modelé délicat.",
      en: "The enigmatic portrait of a seated woman before a distant landscape, celebrated for her smile and delicate modelling.",
      es: "El enigmático retrato de una mujer sentada ante un paisaje lejano, célebre por su sonrisa y su delicado modelado.",
    },
    image: commons("Mona Lisa, by Leonardo da Vinci, from C2RMF retouched.jpg"),
  },
  {
    id: "starry-night", wall: "left", artist: "Vincent van Gogh",
    title: {fr: "La Nuit étoilée", en: "The Starry Night", es: "La noche estrellada"},
    country: countries.netherlands, year: "1889", movement: movements.postImpressionism,
    description: {
      fr: "Un ciel nocturne tourbillonnant domine un village calme, transformant le paysage observé en vision intérieure.",
      en: "A swirling night sky towers over a quiet village, transforming an observed landscape into an inner vision.",
      es: "Un cielo nocturno arremolinado domina un pueblo tranquilo, transformando el paisaje observado en una visión interior.",
    },
    image: commons("Van Gogh - Starry Night - Google Art Project.jpg"),
  },
  {
    id: "pearl-earring", wall: "left", artist: "Johannes Vermeer",
    title: {fr: "La Jeune Fille à la perle", en: "Girl with a Pearl Earring", es: "La joven de la perla"},
    country: countries.netherlands, year: "vers 1665", movement: movements.goldenAge,
    description: {
      fr: "Une jeune femme se retourne dans la lumière, sa grande perle et son regard créant une présence immédiate.",
      en: "A young woman turns toward the light, her large pearl and direct gaze creating an immediate presence.",
      es: "Una joven se vuelve hacia la luz; su gran perla y su mirada directa crean una presencia inmediata.",
    },
    image: commons("Meisje met de parel.jpg"),
  },
  {
    id: "birth-venus", wall: "left", artist: "Sandro Botticelli",
    title: {fr: "La Naissance de Vénus", en: "The Birth of Venus", es: "El nacimiento de Venus"},
    country: countries.italy, year: "vers 1484–1486", movement: movements.renaissance,
    description: {
      fr: "Vénus arrive sur le rivage dans une coquille, portée par les vents et accueillie par une figure du printemps.",
      en: "Venus arrives on shore in a shell, carried by the winds and welcomed by a figure of spring.",
      es: "Venus llega a la orilla sobre una concha, impulsada por los vientos y recibida por una figura de la primavera.",
    },
    image: commons("Sandro Botticelli - La nascita di Venere - Google Art Project - edited.jpg"),
  },
  {
    id: "school-athens", wall: "left", artist: "Raphaël",
    title: {fr: "L’École d’Athènes", en: "The School of Athens", es: "La escuela de Atenas"},
    country: countries.italy, year: "1509–1511", movement: movements.renaissance,
    description: {
      fr: "Les grands philosophes de l’Antiquité sont réunis dans une architecture idéale autour de Platon et d’Aristote.",
      en: "The great philosophers of antiquity gather in ideal architecture around Plato and Aristotle.",
      es: "Los grandes filósofos de la Antigüedad se reúnen en una arquitectura ideal alrededor de Platón y Aristóteles.",
    },
    image: commons("The School of Athens by Raffaello Sanzio da Urbino.jpg"),
  },
  {
    id: "judith", wall: "left", artist: "Artemisia Gentileschi", woman: true,
    title: {fr: "Judith décapitant Holopherne", en: "Judith Slaying Holofernes", es: "Judit decapitando a Holofernes"},
    country: countries.italy, year: "vers 1620", movement: movements.baroque,
    description: {
      fr: "Judith et sa servante accomplissent un acte dramatique avec une force physique et une intensité lumineuse remarquables.",
      en: "Judith and her maid carry out a dramatic act with remarkable physical force and luminous intensity.",
      es: "Judit y su criada realizan un acto dramático con una fuerza física y una intensidad luminosa extraordinarias.",
    },
    image: commons("Artemisia Gentileschi - Giuditta decapita Oloferne - Google Art Project.jpg"),
  },
  {
    id: "leyster-self", wall: "left", artist: "Judith Leyster", woman: true,
    title: {fr: "Autoportrait", en: "Self-Portrait", es: "Autorretrato"},
    country: countries.netherlands, year: "vers 1630", movement: movements.goldenAge,
    description: {
      fr: "L’artiste se représente souriante devant son chevalet, affirmant avec assurance son métier et sa maîtrise.",
      en: "The artist depicts herself smiling at her easel, confidently asserting her profession and skill.",
      es: "La artista se representa sonriente ante su caballete, afirmando con seguridad su profesión y su dominio.",
    },
    image: commons("Self-portrait by Judith Leyster.jpg"),
  },
  {
    id: "anguissola-self", wall: "left", artist: "Sofonisba Anguissola", woman: true,
    title: {fr: "Autoportrait au chevalet", en: "Self-Portrait at the Easel", es: "Autorretrato ante el caballete"},
    country: countries.italy, year: "1556", movement: movements.renaissance,
    description: {
      fr: "Anguissola se montre en train de peindre une scène religieuse, revendiquant sa place d’artiste savante.",
      en: "Anguissola shows herself painting a religious scene, claiming her place as a learned professional artist.",
      es: "Anguissola se muestra pintando una escena religiosa, reivindicando su lugar como artista culta y profesional.",
    },
    image: commons("Self-portrait at the Easel Painting a Devotional Panel by Sofonisba Anguissola.jpg"),
  },
  {
    id: "vigee-daughter", wall: "left", artist: "Élisabeth Vigée Le Brun", woman: true,
    title: {fr: "Autoportrait avec sa fille Julie", en: "Self-Portrait with Her Daughter Julie", es: "Autorretrato con su hija Julie"},
    country: countries.france, year: "1786", movement: movements.rococo,
    description: {
      fr: "La peintre enlace sa fille dans un portrait tendre qui unit intimité familiale et élégance mondaine.",
      en: "The painter embraces her daughter in a tender portrait joining family intimacy with fashionable elegance.",
      es: "La pintora abraza a su hija en un retrato tierno que une intimidad familiar y elegancia mundana.",
    },
    image: commons("Self-portrait with Her Daughter by Elisabeth-Louise Vigée Le Brun.jpg"),
  },
  {
    id: "horse-fair", wall: "left", artist: "Rosa Bonheur", woman: true,
    title: {fr: "Le Marché aux chevaux", en: "The Horse Fair", es: "La feria de caballos"},
    country: countries.france, year: "1852–1855", movement: movements.realism,
    description: {
      fr: "Des chevaux puissants et leurs conducteurs tournent dans un marché parisien animé avec une énergie monumentale.",
      en: "Powerful horses and their handlers circle through a busy Paris market with monumental energy.",
      es: "Caballos poderosos y sus cuidadores recorren un animado mercado parisino con energía monumental.",
    },
    image: commons("The Horse Fair.jpg"),
  },
  {
    id: "cradle", wall: "left", artist: "Berthe Morisot", woman: true,
    title: {fr: "Le Berceau", en: "The Cradle", es: "La cuna"},
    country: countries.france, year: "1872", movement: movements.impressionism,
    description: {
      fr: "Une mère veille sur son enfant endormi derrière un voile, dans une scène silencieuse de protection et de tendresse.",
      en: "A mother watches over her sleeping child behind a veil in a quiet scene of protection and tenderness.",
      es: "Una madre vela a su hija dormida tras un velo, en una escena silenciosa de protección y ternura.",
    },
    image: commons("Berthe Morisot - The Cradle - Google Art Project.jpg"),
  },
  {
    id: "child-bath", wall: "left", artist: "Mary Cassatt", woman: true,
    title: {fr: "Le Bain de l’enfant", en: "The Child’s Bath", es: "El baño del niño"},
    country: countries.usa, year: "1893", movement: movements.impressionism,
    description: {
      fr: "Une femme lave les pieds d’un enfant dans une composition intime aux motifs décoratifs et au point de vue plongeant.",
      en: "A woman washes a child’s feet in an intimate composition with decorative patterns and a high viewpoint.",
      es: "Una mujer lava los pies de un niño en una composición íntima de motivos decorativos y perspectiva elevada.",
    },
    image: commons("Mary cassatt, il bagno del bambino, 1893.jpg"),
  },
  {
    id: "meeting", wall: "left", artist: "Marie Bashkirtseff", woman: true,
    title: {fr: "Un meeting", en: "The Meeting", es: "La reunión"},
    country: countries.russia, year: "1884", movement: movements.realism,
    description: {
      fr: "Des garçons discutent sérieusement dans une rue parisienne, observés avec précision et sans idéalisation.",
      en: "Boys hold a serious discussion on a Paris street, observed precisely and without idealization.",
      es: "Unos niños conversan seriamente en una calle parisina, observados con precisión y sin idealización.",
    },
    image: commons("Marie Bashkirtseff - A meeting - Google Art Project.jpg"),
  },
  {
    id: "hilma-adulthood", wall: "left", artist: "Hilma af Klint", woman: true,
    title: {fr: "Les Dix Plus Grands, no 7, Âge adulte", en: "The Ten Largest, No. 7, Adulthood", es: "Los diez mayores, n.º 7, Edad adulta"},
    country: countries.sweden, year: "1907", movement: movements.abstract,
    description: {
      fr: "Formes florales, spirales et couleurs monumentales évoquent symboliquement une étape de la vie humaine.",
      en: "Floral forms, spirals, and monumental colours symbolically evoke a stage of human life.",
      es: "Formas florales, espirales y colores monumentales evocan simbólicamente una etapa de la vida humana.",
    },
    image: commons("Hilma af Klint - The Ten Largest No. 7 - Adulthood - 1907.jpg"),
  },
  {
    id: "blue-room", wall: "left", artist: "Suzanne Valadon", woman: true,
    title: {fr: "La Chambre bleue", en: "The Blue Room", es: "La habitación azul"},
    country: countries.france, year: "1923", movement: movements.modernism,
    description: {
      fr: "Une femme détendue lit et fume dans un intérieur coloré, loin des poses idéalisées du nu traditionnel.",
      en: "A relaxed woman reads and smokes in a colourful interior, far from idealized conventions of the traditional nude.",
      es: "Una mujer relajada lee y fuma en un interior colorido, lejos de las convenciones idealizadas del desnudo tradicional.",
    },
    image: commons("The Blue Room by Suzanne Valadon.jpg"),
  },
  {
    id: "girl-hill", wall: "left", artist: "Prudence Heward", woman: true, quebec: true,
    title: {fr: "Femme sur une colline", en: "Girl on a Hill", es: "Mujer en una colina"},
    country: countries.canada, year: "1928", movement: movements.canadianModernism,
    description: {
      fr: "Une femme monumentale se tient dans un paysage ouvert; sa présence ferme contraste avec le mouvement du terrain.",
      en: "A monumental woman stands in an open landscape; her firm presence contrasts with the movement of the land.",
      es: "Una mujer monumental se alza en un paisaje abierto; su presencia firme contrasta con el movimiento del terreno.",
    },
    image: commons("Femme sur une colline - Prudence Heward.jpg"),
  },
  {
    id: "boy-bread", wall: "left", artist: "Ozias Leduc", quebec: true,
    title: {fr: "L’Enfant au pain", en: "Boy with Bread", es: "Niño con pan"},
    country: countries.canada, year: "1892–1899", movement: movements.symbolism,
    description: {
      fr: "Un jeune garçon tient un morceau de pain dans une scène sobre où l’objet quotidien prend une valeur presque spirituelle.",
      en: "A young boy holds bread in a restrained scene where an everyday object takes on an almost spiritual value.",
      es: "Un joven sostiene un trozo de pan en una escena sobria donde el objeto cotidiano adquiere un valor casi espiritual.",
    },
    image: commons("Ozias Leduc - Boy with Bread.jpg"),
  },
  {
    id: "settlement-hillside", wall: "left", artist: "Marc-Aurèle de Foy Suzor-Coté", quebec: true,
    title: {fr: "Établissement sur le flanc de la colline", en: "Settlement on the Hillside", es: "Asentamiento en la ladera"},
    country: countries.canada, year: "vers 1909", movement: movements.canadianImpressionism,
    description: {
      fr: "Un village québécois s’étage sur une colline enneigée, animé par une lumière claire et une matière vibrante.",
      en: "A Quebec village climbs a snowy hillside, animated by clear light and lively brushwork.",
      es: "Un pueblo quebequense asciende por una ladera nevada, animado por una luz clara y una pincelada vibrante.",
    },
    image: commons("Marc-Aurèle de Foy Suzor-Coté - Settlement on the Hillside.jpg"),
  },
  {
    id: "chutes-ste-anne", wall: "left", artist: "Cornelius Krieghoff", quebec: true,
    title: {fr: "Les Chutes Sainte-Anne", en: "The Falls of Sainte-Anne", es: "Las cataratas de Sainte-Anne"},
    country: countries.canada, year: "vers 1850", movement: movements.quebecLandscape,
    description: {
      fr: "Des chutes puissantes traversent un paysage forestier québécois rendu avec précision et sens du spectacle.",
      en: "Powerful falls cut through a Quebec forest landscape rendered with precision and a sense of spectacle.",
      es: "Unas cataratas poderosas atraviesan un paisaje forestal quebequense representado con precisión y dramatismo.",
    },
    image: commons("Krieghoff Chutes Sainte-Anne.JPG"),
  },
  {
    id: "liseuse-leduc", wall: "left", artist: "Ozias Leduc", quebec: true,
    title: {fr: "La Liseuse", en: "The Reader", es: "La lectora"},
    country: countries.canada, year: "vers 1894", movement: movements.symbolism,
    description: {
      fr: "Une jeune femme absorbée par sa lecture incarne le calme, l’intériorité et le pouvoir silencieux du livre.",
      en: "A young woman absorbed in reading embodies calm, inwardness, and the quiet power of books.",
      es: "Una joven absorta en la lectura encarna la calma, la interioridad y el poder silencioso de los libros.",
    },
    image: commons("Ozias Leduc (1864–1955) - La Liseuse.png"),
  },
  {
    id: "suzor-self", wall: "left", artist: "Marc-Aurèle de Foy Suzor-Coté", quebec: true,
    title: {fr: "Autoportrait", en: "Self-Portrait", es: "Autorretrato"},
    country: countries.canada, year: "1894", movement: movements.canadianImpressionism,
    description: {
      fr: "Le jeune artiste se représente avec une attention directe au visage et à la lumière, au début de sa carrière.",
      en: "The young artist portrays himself with direct attention to face and light at the beginning of his career.",
      es: "El joven artista se representa con atención directa al rostro y a la luz al comienzo de su carrera.",
    },
    image: commons("Marc-Aurele de Foy Suzor-Cote - Autoportrait 1894.jpg"),
  },
  {
    id: "indian-church", wall: "left", artist: "Emily Carr", woman: true,
    title: {fr: "Église indienne", en: "Indian Church", es: "Iglesia indígena"},
    country: countries.canada, year: "1929", movement: movements.canadianModernism,
    description: {
      fr: "Une petite église blanche se dresse devant une forêt sombre, opposant géométrie humaine et présence enveloppante de la nature.",
      en: "A small white church stands before a dark forest, opposing human geometry to nature’s enveloping presence.",
      es: "Una pequeña iglesia blanca se alza ante un bosque oscuro, oponiendo la geometría humana a la presencia envolvente de la naturaleza.",
    },
    image: commons("Emily Carr - Indian Church.jpg"),
  },
  {
    id: "little-worker", wall: "left", artist: "Helen McNicoll", woman: true, quebec: true,
    title: {fr: "La Petite Ouvrière", en: "The Little Worker", es: "La pequeña trabajadora"},
    country: countries.canada, year: "1902–1912", movement: movements.canadianImpressionism,
    description: {
      fr: "Une jeune fille absorbée par son ouvrage est représentée dans une lumière claire, avec la touche vive de l’impressionnisme canadien.",
      en: "A young girl absorbed in her work is depicted in clear light, with the lively brushwork of Canadian Impressionism.",
      es: "Una joven concentrada en su labor aparece bajo una luz clara, con la pincelada viva del impresionismo canadiense.",
    },
    image: commons("Helen Galloway McNicoll - The Little Worker - Google Art Project.jpg"),
  },
  {
    id: "night-watch", wall: "left", artist: "Rembrandt van Rijn",
    title: {fr: "La Ronde de nuit", en: "The Night Watch", es: "La ronda de noche"},
    country: countries.netherlands, year: "1642", movement: movements.baroque,
    description: {
      fr: "Une compagnie de milice se met en marche dans une composition théâtrale traversée de lumière et de mouvement.",
      en: "A militia company sets out in a theatrical composition charged with light and movement.",
      es: "Una compañía de milicia se pone en marcha en una composición teatral llena de luz y movimiento.",
    },
    image: commons("The Night Watch - HD.jpg"),
  },
  {
    id: "las-meninas", wall: "left", artist: "Diego Velázquez",
    title: {fr: "Les Ménines", en: "Las Meninas", es: "Las meninas"},
    country: countries.spain, year: "1656", movement: movements.baroque,
    description: {
      fr: "La jeune infante et sa suite occupent l’atelier royal dans un jeu complexe de regards, de reflets et de présence.",
      en: "The young infanta and her attendants occupy the royal studio in a complex play of gazes, reflections, and presence.",
      es: "La joven infanta y su séquito ocupan el taller real en un complejo juego de miradas, reflejos y presencia.",
    },
    image: commons("Las Meninas, by Diego Velázquez, from Prado in Google Earth.jpg"),
  },
  {
    id: "creation-adam", wall: "right", artist: "Michel-Ange",
    title: {fr: "La Création d’Adam", en: "The Creation of Adam", es: "La creación de Adán"},
    country: countries.italy, year: "vers 1512", movement: movements.renaissance,
    description: {
      fr: "Les mains de Dieu et d’Adam se rapprochent dans l’un des gestes les plus célèbres de l’histoire de l’art.",
      en: "The hands of God and Adam reach toward one another in one of art history’s most famous gestures.",
      es: "Las manos de Dios y Adán se aproximan en uno de los gestos más célebres de la historia del arte.",
    },
    image: commons("Michelangelo - Creation of Adam (cropped).jpg"),
  },
  {
    id: "calling-matthew", wall: "right", artist: "Caravage",
    title: {fr: "La Vocation de saint Matthieu", en: "The Calling of Saint Matthew", es: "La vocación de san Mateo"},
    country: countries.italy, year: "1599–1600", movement: movements.baroque,
    description: {
      fr: "Un rayon lumineux accompagne le geste du Christ vers Matthieu dans une taverne plongée dans l’ombre.",
      en: "A beam of light accompanies Christ’s gesture toward Matthew in a shadowed tavern.",
      es: "Un rayo de luz acompaña el gesto de Cristo hacia Mateo en una taberna sumida en sombras.",
    },
    image: commons("The Calling of Saint Matthew-Caravaggo (1599-1600).jpg"),
  },
  {
    id: "earthly-delights", wall: "right", artist: "Jérôme Bosch",
    title: {fr: "Le Jardin des délices", en: "The Garden of Earthly Delights", es: "El jardín de las delicias"},
    country: countries.netherlands, year: "vers 1490–1510", movement: movements.northernRenaissance,
    description: {
      fr: "Un triptyque foisonnant passe du paradis aux plaisirs terrestres puis à un enfer peuplé d’inventions fantastiques.",
      en: "A teeming triptych moves from paradise to earthly pleasures and then to a hell filled with fantastic inventions.",
      es: "Un tríptico desbordante pasa del paraíso a los placeres terrenales y luego a un infierno lleno de invenciones fantásticas.",
    },
    image: commons("The Garden of Earthly Delights by Bosch High Resolution.jpg"),
  },
  {
    id: "hunters-snow", wall: "right", artist: "Pieter Bruegel l’Ancien",
    title: {fr: "Chasseurs dans la neige", en: "Hunters in the Snow", es: "Cazadores en la nieve"},
    country: countries.netherlands, year: "1565", movement: movements.northernRenaissance,
    description: {
      fr: "Des chasseurs reviennent vers un village hivernal animé, observé depuis un vaste point de vue montagneux.",
      en: "Hunters return toward a lively winter village seen from a vast mountainous viewpoint.",
      es: "Unos cazadores regresan hacia un animado pueblo invernal visto desde una amplia perspectiva montañosa.",
    },
    image: commons("Pieter Bruegel the Elder - Hunters in the Snow (Winter) - Google Art Project.jpg"),
  },
  {
    id: "kahlo-monkey", wall: "right", artist: "Frida Kahlo", woman: true,
    title: {fr: "Autoportrait avec un singe", en: "Self-Portrait with Monkey", es: "Autorretrato con mono"},
    country: countries.mexico, year: "1938", movement: movements.surrealism,
    description: {
      fr: "Frida Kahlo se représente devant une végétation dense, accompagnée d’un singe dont la présence renforce l’atmosphère intime et symbolique du portrait.",
      en: "Frida Kahlo depicts herself before dense vegetation, accompanied by a monkey whose presence deepens the portrait’s intimate and symbolic atmosphere.",
      es: "Frida Kahlo se representa ante una vegetación densa, acompañada de un mono cuya presencia intensifica la atmósfera íntima y simbólica del retrato.",
    },
    image: commons("Frida Kahlo Self-portrait with monkey 1938.jpg"),
  },
  {
    id: "third-may", wall: "right", artist: "Francisco de Goya",
    title: {fr: "Le 3 mai 1808", en: "The Third of May 1808", es: "El 3 de mayo de 1808"},
    country: countries.spain, year: "1814", movement: movements.romantic,
    description: {
      fr: "Un homme en chemise blanche fait face au peloton d’exécution dans une dénonciation bouleversante de la violence de guerre.",
      en: "A man in a white shirt faces a firing squad in a devastating condemnation of wartime violence.",
      es: "Un hombre de camisa blanca se enfrenta al pelotón de fusilamiento en una denuncia devastadora de la violencia bélica.",
    },
    image: commons("El tres de mayo de 1808 en Madrid.jpg"),
  },
  {
    id: "liberty", wall: "right", artist: "Eugène Delacroix",
    title: {fr: "La Liberté guidant le peuple", en: "Liberty Leading the People", es: "La Libertad guiando al pueblo"},
    country: countries.france, year: "1830", movement: movements.romantic,
    description: {
      fr: "Une allégorie de la Liberté brandit le drapeau français et entraîne une foule à travers les barricades.",
      en: "An allegory of Liberty raises the French flag and leads a crowd across the barricades.",
      es: "Una alegoría de la Libertad levanta la bandera francesa y guía a una multitud a través de las barricadas.",
    },
    image: commons("Eugène Delacroix - Le 28 Juillet. La Liberté guidant le peuple.jpg"),
  },
  {
    id: "napoleon-alps", wall: "right", artist: "Jacques-Louis David",
    title: {fr: "Bonaparte franchissant le Grand-Saint-Bernard", en: "Napoleon Crossing the Alps", es: "Napoleón cruzando los Alpes"},
    country: countries.france, year: "1801", movement: movements.neoclassical,
    description: {
      fr: "Napoléon maîtrise un cheval cabré dans une image héroïque soigneusement construite pour affirmer son autorité.",
      en: "Napoleon controls a rearing horse in a heroic image carefully constructed to assert his authority.",
      es: "Napoleón domina un caballo encabritado en una imagen heroica cuidadosamente construida para afirmar su autoridad.",
    },
    image: commons("David - Napoleon crossing the Alps - Malmaison2.jpg"),
  },
  {
    id: "odalisque", wall: "right", artist: "Jean-Auguste-Dominique Ingres",
    title: {fr: "La Grande Odalisque", en: "Grande Odalisque", es: "La gran odalisca"},
    country: countries.france, year: "1814", movement: movements.neoclassical,
    description: {
      fr: "Une figure allongée au dos volontairement étiré associe précision du dessin et imaginaire orientaliste.",
      en: "A reclining figure with a deliberately elongated back combines precise drawing and an Orientalist fantasy.",
      es: "Una figura reclinada de espalda deliberadamente alargada combina precisión del dibujo e imaginación orientalista.",
    },
    image: commons("Jean Auguste Dominique Ingres - The Grand Odalisque - WGA11841.jpg"),
  },
  {
    id: "fighting-temeraire", wall: "right", artist: "J. M. W. Turner",
    title: {fr: "Le Dernier Voyage du Téméraire", en: "The Fighting Temeraire", es: "El último viaje del Temerario"},
    country: {fr: "Royaume-Uni", en: "United Kingdom", es: "Reino Unido"},
    year: "1839", movement: movements.romantic,
    description: {
      fr: "Un vieux navire de guerre est remorqué vers son démantèlement sous un coucher de soleil éclatant.",
      en: "An old warship is towed toward dismantling beneath a brilliant sunset.",
      es: "Un viejo buque de guerra es remolcado hacia su desguace bajo una brillante puesta de sol.",
    },
    image: commons("The Fighting Temeraire, JMW Turner, National Gallery.jpg"),
  },
  {
    id: "hay-wain", wall: "right", artist: "John Constable",
    title: {fr: "La Charrette de foin", en: "The Hay Wain", es: "La carreta de heno"},
    country: {fr: "Royaume-Uni", en: "United Kingdom", es: "Reino Unido"},
    year: "1821", movement: movements.romantic,
    description: {
      fr: "Une charrette traverse une rivière dans une campagne anglaise décrite avec affection et attention aux changements du ciel.",
      en: "A cart crosses a river in an English countryside observed with affection and close attention to the changing sky.",
      es: "Una carreta cruza un río en una campiña inglesa observada con afecto y atención a los cambios del cielo.",
    },
    image: commons("John Constable - The Hay Wain (1821).jpg"),
  },
  {
    id: "wanderer", wall: "right", artist: "Caspar David Friedrich",
    title: {fr: "Le Voyageur contemplant une mer de nuages", en: "Wanderer above the Sea of Fog", es: "El caminante sobre el mar de nubes"},
    country: countries.germany, year: "vers 1818", movement: movements.romantic,
    description: {
      fr: "Un voyageur vu de dos contemple un paysage de sommets et de brume qui évoque l’immensité et l’introspection.",
      en: "A traveller seen from behind contemplates peaks and fog, evoking immensity and introspection.",
      es: "Un viajero visto de espaldas contempla cumbres y niebla, evocando inmensidad e introspección.",
    },
    image: commons("Caspar David Friedrich - Wanderer above the sea of fog.jpg"),
  },
  {
    id: "gleaners", wall: "right", artist: "Jean-François Millet",
    title: {fr: "Des glaneuses", en: "The Gleaners", es: "Las espigadoras"},
    country: countries.france, year: "1857", movement: movements.realism,
    description: {
      fr: "Trois femmes ramassent les épis laissés après la récolte, donnant une dignité monumentale au travail rural.",
      en: "Three women gather grain left after the harvest, lending monumental dignity to rural labour.",
      es: "Tres mujeres recogen las espigas dejadas tras la cosecha, otorgando dignidad monumental al trabajo rural.",
    },
    image: commons("Jean-François Millet - Gleaners - Google Art Project 2.jpg"),
  },
  {
    id: "olympia", wall: "right", artist: "Édouard Manet",
    title: {fr: "Olympia", en: "Olympia", es: "Olympia"},
    country: countries.france, year: "1863", movement: movements.realism,
    description: {
      fr: "Une femme nue regarde directement le spectateur, transformant les conventions du nu académique en scène moderne provocante.",
      en: "A nude woman looks directly at the viewer, turning academic conventions into a provocative modern scene.",
      es: "Una mujer desnuda mira directamente al espectador, transformando las convenciones académicas en una provocadora escena moderna.",
    },
    image: commons("Edouard Manet - Olympia - Google Art Project 3.jpg"),
  },
  {
    id: "impression-sunrise", wall: "right", artist: "Claude Monet",
    title: {fr: "Impression, soleil levant", en: "Impression, Sunrise", es: "Impresión, sol naciente"},
    country: countries.france, year: "1872", movement: movements.impressionism,
    description: {
      fr: "Le port du Havre émerge de la brume autour d’un soleil orange; le titre donnera son nom à l’impressionnisme.",
      en: "Le Havre harbour emerges from mist around an orange sun; the title gave Impressionism its name.",
      es: "El puerto de Le Havre emerge de la niebla alrededor de un sol naranja; el título dio nombre al impresionismo.",
    },
    image: commons("Claude Monet, Impression, soleil levant.jpg"),
  },
  {
    id: "moulin-galette", wall: "right", artist: "Pierre-Auguste Renoir",
    title: {fr: "Bal du moulin de la Galette", en: "Dance at Le Moulin de la Galette", es: "Baile en el Moulin de la Galette"},
    country: countries.france, year: "1876", movement: movements.impressionism,
    description: {
      fr: "Une foule parisienne danse et converse sous une lumière tachetée qui traverse les arbres.",
      en: "A Paris crowd dances and converses beneath dappled light filtering through the trees.",
      es: "Una multitud parisina baila y conversa bajo una luz moteada que atraviesa los árboles.",
    },
    image: commons("Pierre-Auguste Renoir, Le Moulin de la Galette.jpg"),
  },
  {
    id: "ballet-class", wall: "right", artist: "Edgar Degas",
    title: {fr: "La Classe de danse", en: "The Ballet Class", es: "La clase de danza"},
    country: countries.france, year: "1871–1874", movement: movements.impressionism,
    description: {
      fr: "Des danseuses répètent autour de leur maître dans une composition décentrée inspirée d’un instant saisi sur le vif.",
      en: "Dancers rehearse around their master in an off-centre composition inspired by a candid instant.",
      es: "Las bailarinas ensayan alrededor de su maestro en una composición descentrada inspirada en un instante espontáneo.",
    },
    image: commons("Edgar Degas - The Ballet Class - Google Art Project.jpg"),
  },
  {
    id: "grande-jatte", wall: "right", artist: "Georges Seurat",
    title: {fr: "Un dimanche après-midi à l’Île de la Grande Jatte", en: "A Sunday Afternoon on the Island of La Grande Jatte", es: "Tarde de domingo en la isla de la Grande Jatte"},
    country: countries.france, year: "1884–1886", movement: movements.pointillism,
    description: {
      fr: "Des promeneurs immobiles occupent un parc construit par une multitude de petites touches de couleur.",
      en: "Still figures occupy a park constructed from countless small touches of colour.",
      es: "Figuras inmóviles ocupan un parque construido mediante innumerables pequeños toques de color.",
    },
    image: commons("Georges Seurat - A Sunday on La Grande Jatte -- 1884 - Google Art Project.jpg"),
  },
  {
    id: "sainte-victoire", wall: "right", artist: "Paul Cézanne",
    title: {fr: "La Montagne Sainte-Victoire", en: "Mont Sainte-Victoire", es: "La montaña Sainte-Victoire"},
    country: countries.france, year: "vers 1904–1906", movement: movements.postImpressionism,
    description: {
      fr: "La montagne provençale est reconstruite par plans de couleur, faisant du paysage une architecture picturale.",
      en: "The Provençal mountain is rebuilt through planes of colour, turning landscape into pictorial architecture.",
      es: "La montaña provenzal se reconstruye mediante planos de color, convirtiendo el paisaje en arquitectura pictórica.",
    },
    image: commons("Paul Cezanne - Mont Sainte-Victoire and Château Noir - Google Art Project.jpg"),
  },
  {
    id: "where-come-from", wall: "right", artist: "Paul Gauguin",
    title: {fr: "D’où venons-nous? Que sommes-nous? Où allons-nous?", en: "Where Do We Come From? What Are We? Where Are We Going?", es: "¿De dónde venimos? ¿Qué somos? ¿Adónde vamos?"},
    country: countries.france, year: "1897–1898", movement: movements.postImpressionism,
    description: {
      fr: "Une vaste frise de figures tahitiennes médite sur les âges de la vie et les grandes questions de l’existence.",
      en: "A broad frieze of Tahitian figures meditates on the stages of life and the great questions of existence.",
      es: "Un amplio friso de figuras tahitianas medita sobre las etapas de la vida y las grandes preguntas de la existencia.",
    },
    image: commons("Gauguin - D'ou venons-nous Que sommes-nous Ou allons-nous.jpg"),
  },
  {
    id: "scream", wall: "right", artist: "Edvard Munch",
    title: {fr: "Le Cri", en: "The Scream", es: "El grito"},
    country: countries.norway, year: "1893", movement: movements.expressionism,
    description: {
      fr: "Une figure se bouche les oreilles sous un ciel ondulant, image universelle de l’angoisse et du vertige moderne.",
      en: "A figure covers its ears beneath a wavering sky, a universal image of anxiety and modern vertigo.",
      es: "Una figura se tapa los oídos bajo un cielo ondulante, imagen universal de la angustia y el vértigo moderno.",
    },
    image: commons("Edvard Munch - The Scream - Google Art Project.jpg"),
  },
  {
    id: "kiss", wall: "right", artist: "Gustav Klimt",
    title: {fr: "Le Baiser", en: "The Kiss", es: "El beso"},
    country: countries.austria, year: "1907–1908", movement: movements.modernism,
    description: {
      fr: "Un couple enlacé disparaît presque dans un manteau d’or et de motifs géométriques et floraux.",
      en: "An embracing couple nearly disappears into a field of gold, geometric forms, and floral patterns.",
      es: "Una pareja abrazada casi desaparece en un campo dorado de formas geométricas y motivos florales.",
    },
    image: commons("The Kiss - Gustav Klimt - Google Cultural Institute.jpg"),
  },
  {
    id: "composition-eight", wall: "right", artist: "Vassily Kandinsky",
    title: {fr: "Composition VIII", en: "Composition VIII", es: "Composición VIII"},
    country: countries.russia, year: "1923", movement: movements.abstract,
    description: {
      fr: "Cercles, lignes et formes géométriques composent un équilibre dynamique comparable à une musique visuelle.",
      en: "Circles, lines, and geometric forms create a dynamic balance comparable to visual music.",
      es: "Círculos, líneas y formas geométricas crean un equilibrio dinámico comparable a una música visual.",
    },
    image: commons("Vassily Kandinsky, 1923 - Composition 8, huile sur toile, 140 cm x 201 cm, Musée Guggenheim, New York.jpg"),
  },
  {
    id: "black-square", wall: "right", artist: "Kazimir Malevitch",
    title: {fr: "Carré noir", en: "Black Square", es: "Cuadrado negro"},
    country: countries.russia, year: "1915", movement: movements.suprematism,
    description: {
      fr: "Un carré noir irrégulier sur fond blanc réduit la peinture à une forme radicale et autonome.",
      en: "An irregular black square on white reduces painting to a radical and autonomous form.",
      es: "Un cuadrado negro irregular sobre blanco reduce la pintura a una forma radical y autónoma.",
    },
    image: commons("Kazimir Malevich, 1915, Black Suprematic Square, oil on linen canvas, 79.5 x 79.5 cm, Tretyakov Gallery, Moscow.jpg"),
  },
  {
    id: "mondrian", wall: "right", artist: "Piet Mondrian",
    title: {fr: "Composition en rouge, bleu et jaune", en: "Composition with Red, Blue and Yellow", es: "Composición con rojo, azul y amarillo"},
    country: countries.netherlands, year: "1930", movement: movements.abstract,
    description: {
      fr: "Des lignes noires et des rectangles de couleurs primaires recherchent un ordre visuel universel.",
      en: "Black lines and rectangles of primary colour seek a universal visual order.",
      es: "Líneas negras y rectángulos de colores primarios buscan un orden visual universal.",
    },
    image: commons("Piet Mondriaan, 1930 - Mondrian Composition II in Red, Blue, and Yellow.jpg"),
  },
];
