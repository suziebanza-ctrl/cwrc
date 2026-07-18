export type JokeCategory =
  | "animals"
  | "tea"
  | "food"
  | "school"
  | "work"
  | "technology"
  | "daily"
  | "family"
  | "objects"
  | "absurd";

export type Joke = {
  id: number;
  category: JokeCategory;
  emoji: string;
  fr: string;
  en: string;
  es: string;
  words: [
    french: string,
    english: string,
    spanish: string,
  ][];
};

export const jokeCategories: {
  key: JokeCategory;
  icon: string;
  fr: string;
  en: string;
  es: string;
}[] = [
  {
    key: "animals",
    icon: "🐾",
    fr: "Animaux",
    en: "Animals",
    es: "Animales",
  },
  {
    key: "tea",
    icon: "☕",
    fr: "Thé et café",
    en: "Tea and coffee",
    es: "Té y café",
  },
  {
    key: "food",
    icon: "🍫",
    fr: "Nourriture",
    en: "Food",
    es: "Comida",
  },
  {
    key: "school",
    icon: "🎓",
    fr: "École",
    en: "School",
    es: "Escuela",
  },
  {
    key: "work",
    icon: "💼",
    fr: "Travail",
    en: "Work",
    es: "Trabajo",
  },
  {
    key: "technology",
    icon: "💻",
    fr: "Technologie",
    en: "Technology",
    es: "Tecnología",
  },
  {
    key: "daily",
    icon: "🏠",
    fr: "Vie quotidienne",
    en: "Daily life",
    es: "Vida cotidiana",
  },
  {
    key: "family",
    icon: "👨‍👩‍👧",
    fr: "Famille et amis",
    en: "Family and friends",
    es: "Familia y amigos",
  },
  {
    key: "objects",
    icon: "🧦",
    fr: "Objets",
    en: "Objects",
    es: "Objetos",
  },
  {
    key: "absurd",
    icon: "🦆",
    fr: "Absurdités",
    en: "Absurdities",
    es: "Absurdidades",
  },
];

function joke(
  id: number,
  category: JokeCategory,
  emoji: string,
  fr: string,
  en: string,
  es: string,
  words: Joke["words"],
): Joke {
  return {
    id,
    category,
    emoji,
    fr,
    en,
    es,
    words,
  };
}

export const jokes: Joke[] = [
  joke(
    1,
    "animals",
    "🐱",
    `Pourquoi le chat s’est-il assis sur les devoirs?
Parce qu’il voulait enfin être sur le sujet.`,
    `Why did the cat sit on the homework?
Because it finally wanted to be on the subject.`,
    `¿Por qué el gato se sentó sobre la tarea?
Porque por fin quería estar sobre el tema.`,
    [
      ["les devoirs", "homework", "la tarea"],
      ["le sujet", "the subject", "el tema"],
    ],
  ),

  joke(
    2,
    "animals",
    "🐶",
    `Mon chien sait exactement quand je mange.
Curieusement, il oublie toujours quand lui vient de manger.`,
    `My dog knows exactly when I am eating.
Curiously, he always forgets when he has just eaten.`,
    `Mi perro sabe exactamente cuándo estoy comiendo.
Curiosamente, siempre olvida cuándo acaba de comer.`,
    [
      ["oublier", "to forget", "olvidar"],
      ["manger", "to eat", "comer"],
    ],
  ),

  joke(
    3,
    "animals",
    "🐈",
    `Pourquoi le chat regarde-t-il par la fenêtre?
Pour vérifier si le monde fonctionne sans lui.`,
    `Why does the cat look out the window?
To check whether the world works without him.`,
    `¿Por qué el gato mira por la ventana?
Para comprobar si el mundo funciona sin él.`,
    [
      ["la fenêtre", "the window", "la ventana"],
      ["le monde", "the world", "el mundo"],
    ],
  ),

  joke(
    4,
    "animals",
    "🐕",
    `Le chien a caché la télécommande.
Il trouvait que nous manquions de marche.`,
    `The dog hid the remote control.
He thought we needed more walking.`,
    `El perro escondió el control remoto.
Pensó que necesitábamos caminar más.`,
    [
      [
        "la télécommande",
        "the remote control",
        "el control remoto",
      ],
      ["marcher", "to walk", "caminar"],
    ],
  ),

  joke(
    5,
    "animals",
    "🐦",
    `Pourquoi l’oiseau chante-t-il le matin?
Parce que ses voisins n’ont pas trouvé le bouton silence.`,
    `Why does the bird sing in the morning?
Because his neighbours have not found the mute button.`,
    `¿Por qué canta el pájaro por la mañana?
Porque sus vecinos no han encontrado el botón de silencio.`,
    [
      ["l’oiseau", "the bird", "el pájaro"],
      [
        "le bouton silence",
        "the mute button",
        "el botón de silencio",
      ],
    ],
  ),

  joke(
    6,
    "animals",
    "🐢",
    `Une tortue arrive en retard.
— Désolée, je suis partie demain.`,
    `A turtle arrives late.
“Sorry, I left tomorrow.”`,
    `Una tortuga llega tarde.
—Lo siento, salí mañana.`,
    [
      ["en retard", "late", "tarde"],
      ["demain", "tomorrow", "mañana"],
    ],
  ),

  joke(
    7,
    "animals",
    "🐠",
    `Pourquoi le poisson ne répond-il jamais au téléphone?
Il préfère laisser sonner dans le vide.`,
    `Why does the fish never answer the phone?
He prefers to let it ring in the empty room.`,
    `¿Por qué el pez nunca contesta el teléfono?
Prefiere dejarlo sonar en la habitación vacía.`,
    [
      ["le poisson", "the fish", "el pez"],
      ["répondre", "to answer", "contestar"],
    ],
  ),

  joke(
    8,
    "animals",
    "🐄",
    `La vache a demandé des vacances.
Elle trouvait son horaire beaucoup trop lait.`,
    `The cow asked for a vacation.
She thought her schedule was udderly exhausting.`,
    `La vaca pidió vacaciones.
Pensaba que su horario era agotador de verdad.`,
    [
      ["les vacances", "vacation", "las vacaciones"],
      ["la vache", "the cow", "la vaca"],
    ],
  ),

  joke(
    9,
    "animals",
    "🦉",
    `Un hibou entre dans une bibliothèque.
Il demande seulement les livres qui se lisent la nuit.`,
    `An owl walks into a library.
He asks only for books that can be read at night.`,
    `Un búho entra en una biblioteca.
Solo pide libros que puedan leerse de noche.`,
    [
      ["le hibou", "the owl", "el búho"],
      ["la nuit", "at night", "de noche"],
    ],
  ),

  joke(
    10,
    "animals",
    "🐿️",
    `Pourquoi l’écureuil fait-il des listes?
Parce qu’il en a assez d’oublier où il oublie ses noix.`,
    `Why does the squirrel make lists?
Because he is tired of forgetting where he forgets his nuts.`,
    `¿Por qué la ardilla hace listas?
Porque está cansada de olvidar dónde olvida sus nueces.`,
    [
      ["l’écureuil", "the squirrel", "la ardilla"],
      ["les noix", "nuts", "las nueces"],
    ],
  ),

  joke(
    11,
    "tea",
    "🍵",
    `Pourquoi le thé n’est-il jamais pressé?
Parce qu’il préfère prendre le temps d’infuser.`,
    `Why is tea never in a hurry?
Because it prefers to take time to steep.`,
    `¿Por qué el té nunca tiene prisa?
Porque prefiere tomarse el tiempo para infusionarse.`,
    [
      ["le thé", "tea", "el té"],
      ["infuser", "to steep", "infusionarse"],
    ],
  ),

  joke(
    12,
    "tea",
    "☕",
    `Mon café m’a demandé comment j’allais.
J’ai répondu : « Attends que je te finisse. »`,
    `My coffee asked how I was doing.
I replied, “Wait until I finish you.”`,
    `Mi café me preguntó cómo estaba.
Respondí: «Espera a que te termine».`,
    [
      ["le café", "coffee", "el café"],
      ["attendre", "to wait", "esperar"],
    ],
  ),

  joke(
    13,
    "tea",
    "🫖",
    `Le thé a refusé de participer au débat.
L’atmosphère était déjà assez chaude.`,
    `The tea refused to join the debate.
The atmosphere was already hot enough.`,
    `El té se negó a participar en el debate.
El ambiente ya estaba bastante caliente.`,
    [
      ["le débat", "the debate", "el debate"],
      ["chaud", "hot", "caliente"],
    ],
  ),

  joke(
    14,
    "tea",
    "☕",
    `Pourquoi le café est-il arrivé avant tout le monde?
Personne d’autre n’était encore réveillé.`,
    `Why did the coffee arrive before everyone else?
Nobody else was awake yet.`,
    `¿Por qué llegó el café antes que todos?
Nadie más estaba despierto todavía.`,
    [
      ["réveillé", "awake", "despierto"],
      ["avant", "before", "antes"],
    ],
  ),

  joke(
    15,
    "tea",
    "🍵",
    `— Tu prends ton thé avec du citron?
— Non, le citron prend trop de place sur la chaise.`,
    `“Do you take your tea with lemon?”
“No, the lemon takes up too much room on the chair.”`,
    `—¿Tomas el té con limón?
—No, el limón ocupa demasiado espacio en la silla.`,
    [
      ["le citron", "the lemon", "el limón"],
      ["la chaise", "the chair", "la silla"],
    ],
  ),

  joke(
    16,
    "tea",
    "☕",
    `J’ai demandé un café très patient.
On m’a servi celui qui attendait depuis hier.`,
    `I asked for a very patient coffee.
They served the one that had been waiting since yesterday.`,
    `Pedí un café muy paciente.
Me sirvieron el que esperaba desde ayer.`,
    [
      ["patient", "patient", "paciente"],
      ["hier", "yesterday", "ayer"],
    ],
  ),

  joke(
    17,
    "tea",
    "🫖",
    `Pourquoi la théière ne raconte-t-elle jamais de secret?
Elle finit toujours par laisser échapper la vapeur.`,
    `Why does the teapot never keep a secret?
It always ends up letting off steam.`,
    `¿Por qué la tetera nunca guarda un secreto?
Siempre termina dejando escapar el vapor.`,
    [
      ["la théière", "the teapot", "la tetera"],
      ["la vapeur", "steam", "el vapor"],
    ],
  ),

  joke(
    18,
    "tea",
    "☕",
    `Le café a posé une seule condition.
Ne lui parler qu’après l’avoir bu.`,
    `The coffee had only one condition.
Do not speak to it until after drinking it.`,
    `El café puso una sola condición.
No hablarle hasta después de beberlo.`,
    [
      ["la condition", "the condition", "la condición"],
      ["boire", "to drink", "beber"],
    ],
  ),

  joke(
    19,
    "tea",
    "🍵",
    `Pourquoi le sachet de thé a-t-il plongé?
Il avait reçu une invitation très chaude.`,
    `Why did the tea bag dive in?
It had received a very warm invitation.`,
    `¿Por qué se lanzó la bolsita de té?
Había recibido una invitación muy caliente.`,
    [
      ["le sachet de thé", "the tea bag", "la bolsita de té"],
      ["plonger", "to dive", "lanzarse"],
    ],
  ),

  joke(
    20,
    "tea",
    "☕",
    `Mon café était beaucoup trop fort.
Il a ouvert le pot tout seul.`,
    `My coffee was far too strong.
It opened the jar by itself.`,
    `Mi café era demasiado fuerte.
Abrió el frasco por sí solo.`,
    [
      ["fort", "strong", "fuerte"],
      ["le pot", "the jar", "el frasco"],
    ],
  ),

  joke(
    21,
    "food",
    "🍫",
    `Pourquoi le chocolat ne se dispute-t-il jamais?
Il sait qu’il finira par fondre.`,
    `Why does chocolate never argue?
It knows it will eventually melt.`,
    `¿Por qué el chocolate nunca discute?
Sabe que al final se derretirá.`,
    [
      ["le chocolat", "chocolate", "el chocolate"],
      ["fondre", "to melt", "derretirse"],
    ],
  ),

  joke(
    22,
    "food",
    "🍪",
    `Le biscuit a demandé un verre de lait.
Il traversait une période très sèche.`,
    `The cookie asked for a glass of milk.
It was going through a very dry period.`,
    `La galleta pidió un vaso de leche.
Estaba pasando por una etapa muy seca.`,
    [
      ["le biscuit", "the cookie", "la galleta"],
      ["sec", "dry", "seco"],
    ],
  ),

  joke(
    23,
    "food",
    "🍕",
    `Pourquoi la pizza est-elle venue à la réunion?
Quelqu’un avait promis de partager les décisions.`,
    `Why did the pizza attend the meeting?
Someone had promised to share the decisions.`,
    `¿Por qué fue la pizza a la reunión?
Alguien había prometido compartir las decisiones.`,
    [
      ["partager", "to share", "compartir"],
      ["la réunion", "the meeting", "la reunión"],
    ],
  ),

  joke(
    24,
    "food",
    "🥕",
    `La carotte voulait voir plus loin.
Elle a emprunté les lunettes du lapin.`,
    `The carrot wanted to see farther.
It borrowed the rabbit’s glasses.`,
    `La zanahoria quería ver más lejos.
Pidió prestados los lentes del conejo.`,
    [
      ["la carotte", "the carrot", "la zanahoria"],
      ["les lunettes", "glasses", "los lentes"],
    ],
  ),

  joke(
    25,
    "food",
    "🍌",
    `Pourquoi la banane a-t-elle mis une veste?
Elle trouvait sa pelure un peu légère.`,
    `Why did the banana put on a jacket?
It thought its peel was a little light.`,
    `¿Por qué se puso una chaqueta la banana?
Pensaba que su cáscara era un poco ligera.`,
    [
      ["la veste", "the jacket", "la chaqueta"],
      ["la pelure", "the peel", "la cáscara"],
    ],
  ),

  joke(
    26,
    "food",
    "🍞",
    `Le pain est entré dans le grille-pain.
Il voulait simplement prendre des couleurs.`,
    `The bread entered the toaster.
It simply wanted to get some colour.`,
    `El pan entró en la tostadora.
Solo quería tomar un poco de color.`,
    [
      ["le pain", "bread", "el pan"],
      ["le grille-pain", "the toaster", "la tostadora"],
    ],
  ),

  joke(
    27,
    "food",
    "🥚",
    `Pourquoi l’œuf ne raconte-t-il pas de blagues?
Il a peur que tout le monde éclate.`,
    `Why does the egg avoid telling jokes?
It is afraid everyone will crack up.`,
    `¿Por qué el huevo evita contar chistes?
Teme que todos se partan de risa.`,
    [
      ["l’œuf", "the egg", "el huevo"],
      ["avoir peur", "to be afraid", "tener miedo"],
    ],
  ),

  joke(
    28,
    "food",
    "🍰",
    `Le gâteau a refusé une deuxième bougie.
Il trouvait déjà son âge assez éclairé.`,
    `The cake refused a second candle.
It thought its age was already bright enough.`,
    `El pastel rechazó una segunda vela.
Pensaba que su edad ya estaba bastante iluminada.`,
    [
      ["la bougie", "the candle", "la vela"],
      ["le gâteau", "the cake", "el pastel"],
    ],
  ),

  joke(
    29,
    "food",
    "🍝",
    `Pourquoi les pâtes n’ont-elles pas répondu?
Elles étaient encore occupées à tourner autour du pot.`,
    `Why did the pasta not answer?
It was still busy going around the pot.`,
    `¿Por qué no respondió la pasta?
Todavía estaba ocupada dando vueltas alrededor de la olla.`,
    [
      ["les pâtes", "pasta", "la pasta"],
      ["le pot", "the pot", "la olla"],
    ],
  ),

  joke(
    30,
    "food",
    "🍎",
    `La pomme est tombée de la table.
Elle voulait vérifier si la gravité travaillait encore.`,
    `The apple fell off the table.
It wanted to check whether gravity was still working.`,
    `La manzana cayó de la mesa.
Quería comprobar si la gravedad seguía funcionando.`,
    [
      ["la pomme", "the apple", "la manzana"],
      ["la gravité", "gravity", "la gravedad"],
    ],
  ),

  joke(
    31,
    "school",
    "✏️",
    `Pourquoi le crayon est-il allé à l’école?
Il voulait enfin avoir une bonne pointe de vue.`,
    `Why did the pencil go to school?
It wanted to sharpen its point of view.`,
    `¿Por qué fue el lápiz a la escuela?
Quería afinar su punto de vista.`,
    [
      ["le crayon", "the pencil", "el lápiz"],
      ["le point de vue", "the point of view", "el punto de vista"],
    ],
  ),

  joke(
    32,
    "school",
    "📘",
    `Le livre de mathématiques semblait triste.
Il avait beaucoup trop de problèmes.`,
    `The mathematics book looked sad.
It had far too many problems.`,
    `El libro de matemáticas parecía triste.
Tenía demasiados problemas.`,
    [
      ["les mathématiques", "mathematics", "las matemáticas"],
      ["les problèmes", "problems", "los problemas"],
    ],
  ),

  joke(
    33,
    "school",
    "🎒",
    `Pourquoi le sac d’école était-il fatigué?
Tout le monde lui mettait des choses sur le dos.`,
    `Why was the school bag tired?
Everyone kept putting things on its back.`,
    `¿Por qué estaba cansada la mochila?
Todos seguían poniéndole cosas en la espalda.`,
    [
      ["le sac d’école", "the school bag", "la mochila"],
      ["fatigué", "tired", "cansado"],
    ],
  ),

  joke(
    34,
    "school",
    "📏",
    `La règle voulait devenir enseignante.
Elle savait déjà comment garder tout le monde en ligne.`,
    `The ruler wanted to become a teacher.
It already knew how to keep everyone in line.`,
    `La regla quería ser maestra.
Ya sabía cómo mantener a todos en línea.`,
    [
      ["la règle", "the ruler", "la regla"],
      ["en ligne", "in line", "en línea"],
    ],
  ),

  joke(
    35,
    "school",
    "🧠",
    `— Pourquoi regardes-tu ton cahier fermé?
— J’attends que les réponses sortent.`,
    `“Why are you staring at your closed notebook?”
“I am waiting for the answers to come out.”`,
    `—¿Por qué miras tu cuaderno cerrado?
—Estoy esperando que salgan las respuestas.`,
    [
      ["le cahier", "the notebook", "el cuaderno"],
      ["les réponses", "the answers", "las respuestas"],
    ],
  ),

  joke(
    36,
    "school",
    "🖍️",
    `Le crayon rouge a été nommé responsable.
C’était le seul qui corrigeait tout le monde.`,
    `The red pencil was put in charge.
It was the only one correcting everyone.`,
    `El lápiz rojo quedó a cargo.
Era el único que corregía a todos.`,
    [
      ["rouge", "red", "rojo"],
      ["corriger", "to correct", "corregir"],
    ],
  ),

  joke(
    37,
    "school",
    "📚",
    `Pourquoi les livres parlent-ils doucement?
Ils ne veulent pas déranger les lecteurs qui dorment.`,
    `Why do books speak quietly?
They do not want to disturb the readers who are sleeping.`,
    `¿Por qué hablan bajo los libros?
No quieren molestar a los lectores que duermen.`,
    [
      ["doucement", "quietly", "bajo"],
      ["dormir", "to sleep", "dormir"],
    ],
  ),

  joke(
    38,
    "school",
    "📝",
    `L’élève a rendu une page blanche.
Il ne voulait pas influencer la correction.`,
    `The student handed in a blank page.
He did not want to influence the grading.`,
    `El alumno entregó una página en blanco.
No quería influir en la corrección.`,
    [
      ["la page blanche", "the blank page", "la página en blanco"],
      ["la correction", "grading", "la corrección"],
    ],
  ),

  joke(
    39,
    "school",
    "🧮",
    `Pourquoi la calculatrice est-elle si calme?
Elle sait que tout finit par compter.`,
    `Why is the calculator so calm?
It knows that everything counts in the end.`,
    `¿Por qué está tan tranquila la calculadora?
Sabe que al final todo cuenta.`,
    [
      ["la calculatrice", "the calculator", "la calculadora"],
      ["compter", "to count", "contar"],
    ],
  ),

  joke(
    40,
    "school",
    "🔔",
    `La cloche a sonné avant la fin du cours.
Même elle en avait assez.`,
    `The bell rang before the class ended.
Even it had had enough.`,
    `La campana sonó antes de terminar la clase.
Hasta ella ya había tenido suficiente.`,
    [
      ["la cloche", "the bell", "la campana"],
      ["le cours", "the class", "la clase"],
    ],
  ),

  joke(
    41,
    "work",
    "💼",
    `Pourquoi l’ordinateur est-il arrivé en retard au travail?
Il avait trop de fenêtres ouvertes.`,
    `Why did the computer arrive late for work?
It had too many windows open.`,
    `¿Por qué llegó tarde la computadora al trabajo?
Tenía demasiadas ventanas abiertas.`,
    [
      ["en retard", "late", "tarde"],
      ["les fenêtres", "windows", "las ventanas"],
    ],
  ),

  joke(
    42,
    "work",
    "📅",
    `La réunion devait durer dix minutes.
La première heure a servi à le rappeler.`,
    `The meeting was supposed to last ten minutes.
The first hour was spent reminding everyone.`,
    `La reunión debía durar diez minutos.
La primera hora se dedicó a recordarlo.`,
    [
      ["la réunion", "the meeting", "la reunión"],
      ["durer", "to last", "durar"],
    ],
  ),

  joke(
    43,
    "work",
    "📎",
    `Le trombone a demandé une promotion.
Il tenait déjà toute l’équipe ensemble.`,
    `The paper clip asked for a promotion.
It was already holding the whole team together.`,
    `El clip pidió un ascenso.
Ya mantenía unido a todo el equipo.`,
    [
      ["le trombone", "the paper clip", "el clip"],
      ["la promotion", "the promotion", "el ascenso"],
    ],
  ),

  joke(
    44,
    "work",
    "🪑",
    `Ma chaise de bureau m’a donné un conseil.
Elle m’a dit de prendre du recul.`,
    `My office chair gave me some advice.
It told me to lean back.`,
    `Mi silla de oficina me dio un consejo.
Me dijo que me echara hacia atrás.`,
    [
      ["la chaise", "the chair", "la silla"],
      ["le conseil", "the advice", "el consejo"],
    ],
  ),

  joke(
    45,
    "work",
    "📋",
    `Pourquoi la liste de tâches s’est-elle cachée?
Elle ne voulait pas qu’on lui ajoute quelque chose.`,
    `Why did the task list hide?
It did not want anything else added to it.`,
    `¿Por qué se escondió la lista de tareas?
No quería que le añadieran nada más.`,
    [
      ["la liste", "the list", "la lista"],
      ["ajouter", "to add", "añadir"],
    ],
  ),

  joke(
    46,
    "work",
    "📧",
    `J’ai envoyé un courriel urgent à moi-même.
J’attends toujours une réponse sérieuse.`,
    `I sent an urgent email to myself.
I am still waiting for a serious reply.`,
    `Me envié un correo urgente.
Todavía espero una respuesta seria.`,
    [
      ["le courriel", "the email", "el correo"],
      ["urgent", "urgent", "urgente"],
    ],
  ),

  joke(
    47,
    "work",
    "🖨️",
    `L’imprimante refuse de travailler sous pression.
Elle préfère bloquer calmement.`,
    `The printer refuses to work under pressure.
It prefers to jam calmly.`,
    `La impresora se niega a trabajar bajo presión.
Prefiere atascarse tranquilamente.`,
    [
      ["l’imprimante", "the printer", "la impresora"],
      ["bloquer", "to jam", "atascarse"],
    ],
  ),

  joke(
    48,
    "work",
    "⏰",
    `Pourquoi l’horloge du bureau avance-t-elle lentement?
Elle aussi attend la fin de la journée.`,
    `Why does the office clock move slowly?
It is waiting for the end of the day too.`,
    `¿Por qué avanza lentamente el reloj de la oficina?
También espera el final del día.`,
    [
      ["l’horloge", "the clock", "el reloj"],
      ["lentement", "slowly", "lentamente"],
    ],
  ),

  joke(
    49,
    "work",
    "📁",
    `Le dossier marqué « urgent » était vide.
L’urgence était de trouver ce qu’on avait oublié d’y mettre.`,
    `The folder marked “urgent” was empty.
The emergency was finding what everyone had forgotten to put in it.`,
    `La carpeta marcada «urgente» estaba vacía.
La urgencia era encontrar lo que todos habían olvidado poner dentro.`,
    [
      ["le dossier", "the folder", "la carpeta"],
      ["vide", "empty", "vacía"],
    ],
  ),

  joke(
    50,
    "work",
    "💡",
    `Nous avons demandé une idée brillante.
Quelqu’un a allumé la lumière.`,
    `We asked for a brilliant idea.
Someone turned on the light.`,
    `Pedimos una idea brillante.
Alguien encendió la luz.`,
    [
      ["l’idée", "the idea", "la idea"],
      ["la lumière", "the light", "la luz"],
    ],
  ),
    joke(
    51,
    "technology",
    "💻",
    `Pourquoi l’ordinateur a-t-il pris une pause?
Il avait besoin de fermer quelques fenêtres.`,
    `Why did the computer take a break?
It needed to close a few windows.`,
    `¿Por qué se tomó un descanso la computadora?
Necesitaba cerrar algunas ventanas.`,
    [
      ["une pause", "a break", "un descanso"],
      ["les fenêtres", "windows", "las ventanas"],
    ],
  ),

  joke(
    52,
    "technology",
    "🔋",
    `Mon téléphone est très optimiste.
Même à 1 %, il affirme qu’il est encore avec nous.`,
    `My phone is very optimistic.
Even at 1%, it insists that it is still with us.`,
    `Mi teléfono es muy optimista.
Incluso al 1 %, insiste en que sigue con nosotros.`,
    [
      ["le téléphone", "the phone", "el teléfono"],
      ["encore", "still", "todavía"],
    ],
  ),

  joke(
    53,
    "technology",
    "🔑",
    `J’ai créé un mot de passe impossible à oublier.
Maintenant, j’ai oublié où je l’ai écrit.`,
    `I created a password that was impossible to forget.
Now I have forgotten where I wrote it.`,
    `Creé una contraseña imposible de olvidar.
Ahora olvidé dónde la escribí.`,
    [
      ["le mot de passe", "the password", "la contraseña"],
      ["oublier", "to forget", "olvidar"],
    ],
  ),

  joke(
    54,
    "technology",
    "📱",
    `Pourquoi le téléphone dort-il près du lit?
Pour être le premier à nous réveiller et le dernier à nous laisser dormir.`,
    `Why does the phone sleep beside the bed?
To be the first to wake us and the last to let us sleep.`,
    `¿Por qué duerme el teléfono junto a la cama?
Para ser el primero en despertarnos y el último en dejarnos dormir.`,
    [
      ["le lit", "the bed", "la cama"],
      ["réveiller", "to wake", "despertar"],
    ],
  ),

  joke(
    55,
    "technology",
    "📡",
    `Le Wi-Fi est comme un ami mystérieux.
Il disparaît précisément quand on a besoin de lui.`,
    `Wi-Fi is like a mysterious friend.
It disappears exactly when we need it.`,
    `El Wi-Fi es como un amigo misterioso.
Desaparece exactamente cuando lo necesitamos.`,
    [
      ["disparaître", "to disappear", "desaparecer"],
      ["avoir besoin", "to need", "necesitar"],
    ],
  ),

  joke(
    56,
    "technology",
    "⌨️",
    `Le clavier a demandé une journée de repos.
Il trouvait qu’on lui mettait trop de pression.`,
    `The keyboard asked for a day off.
It felt that people were putting too much pressure on it.`,
    `El teclado pidió un día libre.
Sentía que le hacían demasiada presión.`,
    [
      ["le clavier", "the keyboard", "el teclado"],
      ["la pression", "pressure", "la presión"],
    ],
  ),

  joke(
    57,
    "technology",
    "🖱️",
    `Pourquoi la souris d’ordinateur ne mange-t-elle pas de fromage?
Elle préfère cliquer sur le menu.`,
    `Why does the computer mouse not eat cheese?
It prefers clicking on the menu.`,
    `¿Por qué el ratón de la computadora no come queso?
Prefiere hacer clic en el menú.`,
    [
      ["la souris", "the mouse", "el ratón"],
      ["le menu", "the menu", "el menú"],
    ],
  ),

  joke(
    58,
    "technology",
    "🔌",
    `La prise électrique a mis fin à la conversation.
Elle ne sentait plus aucun contact.`,
    `The electrical outlet ended the conversation.
It no longer felt any connection.`,
    `El enchufe terminó la conversación.
Ya no sentía ninguna conexión.`,
    [
      ["la prise", "the outlet", "el enchufe"],
      ["le contact", "the connection", "la conexión"],
    ],
  ),

  joke(
    59,
    "technology",
    "🤖",
    `Le robot a demandé une augmentation.
Il effectuait déjà le travail de trois grille-pains.`,
    `The robot asked for a raise.
It was already doing the work of three toasters.`,
    `El robot pidió un aumento.
Ya hacía el trabajo de tres tostadoras.`,
    [
      ["le robot", "the robot", "el robot"],
      ["l’augmentation", "the raise", "el aumento"],
    ],
  ),

  joke(
    60,
    "technology",
    "💾",
    `Mon ordinateur m’a demandé de sauvegarder mon travail.
J’aimerais qu’il fasse preuve du même intérêt pour mes fins de semaine.`,
    `My computer asked me to save my work.
I wish it showed the same concern for my weekends.`,
    `Mi computadora me pidió guardar mi trabajo.
Ojalá mostrara el mismo interés por mis fines de semana.`,
    [
      ["sauvegarder", "to save", "guardar"],
      ["la fin de semaine", "the weekend", "el fin de semana"],
    ],
  ),

  joke(
    61,
    "daily",
    "🛏️",
    `Pourquoi mon lit est-il plus confortable le matin?
Il sait exactement quand je dois le quitter.`,
    `Why is my bed more comfortable in the morning?
It knows exactly when I have to leave it.`,
    `¿Por qué mi cama es más cómoda por la mañana?
Sabe exactamente cuándo tengo que dejarla.`,
    [
      ["le lit", "the bed", "la cama"],
      ["quitter", "to leave", "dejar"],
    ],
  ),

  joke(
    62,
    "daily",
    "🧺",
    `La chaussette disparue est finalement revenue.
Elle refusait de parler de ce qui se passe derrière la sécheuse.`,
    `The missing sock finally returned.
It refused to discuss what happens behind the dryer.`,
    `El calcetín perdido finalmente volvió.
Se negó a hablar de lo que ocurre detrás de la secadora.`,
    [
      ["la chaussette", "the sock", "el calcetín"],
      ["la sécheuse", "the dryer", "la secadora"],
    ],
  ),

  joke(
    63,
    "daily",
    "🧹",
    `Pourquoi le balai est-il toujours au courant?
Il ramasse tout ce qui traîne.`,
    `Why does the broom always know what is happening?
It picks up everything lying around.`,
    `¿Por qué la escoba siempre sabe lo que pasa?
Recoge todo lo que queda por ahí.`,
    [
      ["le balai", "the broom", "la escoba"],
      ["ramasser", "to pick up", "recoger"],
    ],
  ),

  joke(
    64,
    "daily",
    "🪞",
    `Mon miroir et moi avons eu une longue discussion.
Il répétait absolument tout.`,
    `My mirror and I had a long discussion.
It repeated absolutely everything.`,
    `Mi espejo y yo tuvimos una larga conversación.
Repetía absolutamente todo.`,
    [
      ["le miroir", "the mirror", "el espejo"],
      ["répéter", "to repeat", "repetir"],
    ],
  ),

  joke(
    65,
    "daily",
    "🛒",
    `Je suis allé au magasin pour acheter du lait.
Mon panier avait manifestement d’autres projets.`,
    `I went to the store to buy milk.
My shopping cart clearly had other plans.`,
    `Fui a la tienda para comprar leche.
Mi carrito claramente tenía otros planes.`,
    [
      ["le panier", "the shopping cart", "el carrito"],
      ["le projet", "the plan", "el plan"],
    ],
  ),

  joke(
    66,
    "daily",
    "🚪",
    `Pourquoi la porte était-elle vexée?
Tout le monde passait sans jamais rester.`,
    `Why was the door offended?
Everyone passed through without ever staying.`,
    `¿Por qué estaba ofendida la puerta?
Todos pasaban sin quedarse nunca.`,
    [
      ["la porte", "the door", "la puerta"],
      ["rester", "to stay", "quedarse"],
    ],
  ),

  joke(
    67,
    "daily",
    "⏰",
    `Mon réveil et moi avons une relation compliquée.
Il parle chaque matin et je refuse de l’écouter.`,
    `My alarm clock and I have a complicated relationship.
It speaks every morning and I refuse to listen.`,
    `Mi despertador y yo tenemos una relación complicada.
Habla cada mañana y me niego a escucharlo.`,
    [
      ["le réveil", "the alarm clock", "el despertador"],
      ["écouter", "to listen", "escuchar"],
    ],
  ),

  joke(
    68,
    "daily",
    "🔦",
    `La lampe de poche voulait devenir célèbre.
Elle rêvait d’être enfin sous les projecteurs.`,
    `The flashlight wanted to be famous.
It dreamed of finally being in the spotlight.`,
    `La linterna quería ser famosa.
Soñaba con estar por fin bajo los reflectores.`,
    [
      ["la lampe de poche", "the flashlight", "la linterna"],
      ["célèbre", "famous", "famoso"],
    ],
  ),

  joke(
    69,
    "daily",
    "🧊",
    `Pourquoi le glaçon ne panique-t-il jamais?
Il garde toujours son sang-froid.`,
    `Why does the ice cube never panic?
It always keeps its cool.`,
    `¿Por qué nunca entra en pánico el cubito de hielo?
Siempre mantiene la calma.`,
    [
      ["le glaçon", "the ice cube", "el cubito de hielo"],
      ["le calme", "calm", "la calma"],
    ],
  ),

  joke(
    70,
    "daily",
    "🌂",
    `J’ai oublié mon parapluie et il a plu.
Le parapluie affirme que c’est une coïncidence.`,
    `I forgot my umbrella and it rained.
The umbrella insists that it was a coincidence.`,
    `Olvidé mi paraguas y llovió.
El paraguas insiste en que fue una coincidencia.`,
    [
      ["le parapluie", "the umbrella", "el paraguas"],
      ["la pluie", "rain", "la lluvia"],
    ],
  ),

  joke(
    71,
    "family",
    "📞",
    `Ma mère m’a demandé pourquoi je ne répondais pas au téléphone.
Je lui ai dit que j’attendais qu’elle finisse de laisser son message.`,
    `My mother asked why I did not answer the phone.
I said I was waiting for her to finish leaving her message.`,
    `Mi madre preguntó por qué no contesté el teléfono.
Dije que esperaba a que terminara de dejar su mensaje.`,
    [
      ["répondre", "to answer", "contestar"],
      ["le message", "the message", "el mensaje"],
    ],
  ),

  joke(
    72,
    "family",
    "👵",
    `Grand-maman dit qu’elle ne parle jamais toute seule.
Elle consulte simplement une personne d’expérience.`,
    `Grandma says she never talks to herself.
She is simply consulting an experienced person.`,
    `La abuela dice que nunca habla sola.
Simplemente consulta a una persona con experiencia.`,
    [
      ["l’expérience", "experience", "la experiencia"],
      ["consulter", "to consult", "consultar"],
    ],
  ),

  joke(
    73,
    "family",
    "🎁",
    `Mon frère m’a offert une boîte vide.
Il savait que j’avais déjà tout ce qu’il ne pouvait pas payer.`,
    `My brother gave me an empty box.
He knew I already had everything he could not afford.`,
    `Mi hermano me regaló una caja vacía.
Sabía que yo ya tenía todo lo que él no podía pagar.`,
    [
      ["la boîte", "the box", "la caja"],
      ["offrir", "to give", "regalar"],
    ],
  ),

  joke(
    74,
    "family",
    "🍽️",
    `À table, quelqu’un a demandé qui voulait la dernière part.
Le silence a duré exactement le temps de la prendre.`,
    `At the table, someone asked who wanted the last piece.
The silence lasted exactly as long as it took to grab it.`,
    `En la mesa, alguien preguntó quién quería el último pedazo.
El silencio duró exactamente lo que tardaron en tomarlo.`,
    [
      ["la dernière part", "the last piece", "el último pedazo"],
      ["le silence", "silence", "el silencio"],
    ],
  ),

  joke(
    75,
    "family",
    "🧒",
    `— Papa, est-ce que tu peux faire mes devoirs?
— Non, mais je peux les regarder avec inquiétude.`,
    `“Dad, can you do my homework?”
“No, but I can look at it with concern.”`,
    `—Papá, ¿puedes hacer mi tarea?
—No, pero puedo mirarla con preocupación.`,
    [
      ["les devoirs", "homework", "la tarea"],
      ["l’inquiétude", "concern", "la preocupación"],
    ],
  ),

  joke(
    76,
    "family",
    "🚗",
    `Pourquoi les voyages en famille commencent-ils toujours tôt?
Pour avoir suffisamment de temps pour retourner chercher ce qu’on a oublié.`,
    `Why do family trips always start early?
To allow enough time to go back for what everyone forgot.`,
    `¿Por qué los viajes familiares siempre empiezan temprano?
Para tener tiempo de volver por lo que todos olvidaron.`,
    [
      ["le voyage", "the trip", "el viaje"],
      ["oublier", "to forget", "olvidar"],
    ],
  ),

  joke(
    77,
    "family",
    "🎂",
    `Un ami véritable se souvient de ton anniversaire.
Un excellent ami oublie ton âge.`,
    `A true friend remembers your birthday.
An excellent friend forgets your age.`,
    `Un amigo verdadero recuerda tu cumpleaños.
Un amigo excelente olvida tu edad.`,
    [
      ["l’anniversaire", "the birthday", "el cumpleaños"],
      ["l’âge", "age", "la edad"],
    ],
  ),

  joke(
    78,
    "family",
    "📸",
    `La photo de famille a pris vingt minutes.
Le sourire, lui, a duré un quarantième de seconde.`,
    `The family photograph took twenty minutes.
The smile lasted one fortieth of a second.`,
    `La foto familiar tardó veinte minutos.
La sonrisa duró una cuadragésima de segundo.`,
    [
      ["la photo", "the photograph", "la foto"],
      ["le sourire", "the smile", "la sonrisa"],
    ],
  ),

  joke(
    79,
    "family",
    "🛋️",
    `Tout le monde cherchait la télécommande.
Elle était assise avec nous sur le canapé.`,
    `Everyone was looking for the remote control.
It was sitting with us on the sofa.`,
    `Todos buscaban el control remoto.
Estaba sentado con nosotros en el sofá.`,
    [
      ["le canapé", "the sofa", "el sofá"],
      ["chercher", "to look for", "buscar"],
    ],
  ),

  joke(
    80,
    "family",
    "🍰",
    `Ma famille croit au partage.
Surtout lorsqu’il reste une facture ou une dernière bouchée.`,
    `My family believes in sharing.
Especially when there is a bill or one last bite left.`,
    `Mi familia cree en compartir.
Especialmente cuando queda una cuenta o un último bocado.`,
    [
      ["partager", "to share", "compartir"],
      ["la facture", "the bill", "la cuenta"],
    ],
  ),

  joke(
    81,
    "objects",
    "🧦",
    `Deux chaussettes entrent dans la laveuse.
Une seule connaît le chemin du retour.`,
    `Two socks enter the washing machine.
Only one knows the way back.`,
    `Dos calcetines entran en la lavadora.
Solo uno conoce el camino de regreso.`,
    [
      ["la laveuse", "the washing machine", "la lavadora"],
      ["le retour", "the way back", "el regreso"],
    ],
  ),

  joke(
    82,
    "objects",
    "✂️",
    `Pourquoi les ciseaux gagnent-ils toujours les discussions?
Ils savent exactement quand couper la parole.`,
    `Why do scissors always win discussions?
They know exactly when to cut someone off.`,
    `¿Por qué las tijeras siempre ganan las discusiones?
Saben exactamente cuándo cortar la palabra.`,
    [
      ["les ciseaux", "scissors", "las tijeras"],
      ["couper", "to cut", "cortar"],
    ],
  ),

  joke(
    83,
    "objects",
    "🕯️",
    `La bougie voulait économiser son énergie.
Elle a décidé de brûler la chandelle par aucun bout.`,
    `The candle wanted to save energy.
It decided not to burn at either end.`,
    `La vela quería ahorrar energía.
Decidió no arder por ninguno de los extremos.`,
    [
      ["la bougie", "the candle", "la vela"],
      ["économiser", "to save", "ahorrar"],
    ],
  ),

  joke(
    84,
    "objects",
    "🧲",
    `Pourquoi l’aimant reçoit-il autant d’invitations?
Il attire naturellement les gens.`,
    `Why does the magnet receive so many invitations?
It naturally attracts people.`,
    `¿Por qué recibe tantas invitaciones el imán?
Atrae naturalmente a la gente.`,
    [
      ["l’aimant", "the magnet", "el imán"],
      ["attirer", "to attract", "atraer"],
    ],
  ),

  joke(
    85,
    "objects",
    "🪜",
    `L’échelle voulait progresser dans la vie.
Elle a commencé un échelon à la fois.`,
    `The ladder wanted to move ahead in life.
It started one rung at a time.`,
    `La escalera quería avanzar en la vida.
Comenzó un peldaño a la vez.`,
    [
      ["l’échelle", "the ladder", "la escalera"],
      ["l’échelon", "the rung", "el peldaño"],
    ],
  ),

  joke(
    86,
    "objects",
    "🧴",
    `La bouteille de shampoing donne toujours les mêmes conseils.
Rincer, recommencer et ne jamais remettre sa vie en question.`,
    `The shampoo bottle always gives the same advice.
Rinse, repeat and never question your life choices.`,
    `La botella de champú siempre da el mismo consejo.
Enjuagar, repetir y nunca cuestionar tus decisiones.`,
    [
      ["rincer", "to rinse", "enjuagar"],
      ["recommencer", "to repeat", "repetir"],
    ],
  ),

  joke(
    87,
    "objects",
    "🧳",
    `Pourquoi la valise était-elle stressée?
Tout le monde lui demandait de se fermer.`,
    `Why was the suitcase stressed?
Everyone kept telling it to close.`,
    `¿Por qué estaba estresada la maleta?
Todos le pedían que se cerrara.`,
    [
      ["la valise", "the suitcase", "la maleta"],
      ["fermer", "to close", "cerrar"],
    ],
  ),

  joke(
    88,
    "objects",
    "🪥",
    `La brosse à dents est très courageuse.
Deux fois par jour, elle va là où personne d’autre ne veut aller.`,
    `The toothbrush is very brave.
Twice a day, it goes where nobody else wants to go.`,
    `El cepillo de dientes es muy valiente.
Dos veces al día, va donde nadie más quiere ir.`,
    [
      ["la brosse à dents", "the toothbrush", "el cepillo de dientes"],
      ["courageux", "brave", "valiente"],
    ],
  ),

  joke(
    89,
    "objects",
    "🧻",
    `Le rouleau de papier était très populaire.
Tout le monde voulait rester en contact avec lui jusqu’à la fin.`,
    `The paper roll was very popular.
Everyone wanted to stay in touch with it until the end.`,
    `El rollo de papel era muy popular.
Todos querían mantenerse en contacto con él hasta el final.`,
    [
      ["le rouleau", "the roll", "el rollo"],
      ["la fin", "the end", "el final"],
    ],
  ),

  joke(
    90,
    "objects",
    "🔨",
    `Le marteau pense que tous les problèmes se ressemblent.
Il trouve les solutions plutôt frappantes.`,
    `The hammer thinks all problems look alike.
It finds the solutions rather striking.`,
    `El martillo piensa que todos los problemas se parecen.
Encuentra soluciones bastante contundentes.`,
    [
      ["le marteau", "the hammer", "el martillo"],
      ["la solution", "the solution", "la solución"],
    ],
  ),

  joke(
    91,
    "absurd",
    "🦆",
    `Un canard entre dans une librairie.
Il demande un livre sur la marche et repart en volant.`,
    `A duck walks into a bookshop.
It asks for a book about walking and leaves by flying.`,
    `Un pato entra en una librería.
Pide un libro sobre caminar y se va volando.`,
    [
      ["le canard", "the duck", "el pato"],
      ["voler", "to fly", "volar"],
    ],
  ),

  joke(
    92,
    "absurd",
    "🚲",
    `Pourquoi le vélo est-il tombé?
Il avait oublié qu’il devait continuer d’avancer.`,
    `Why did the bicycle fall over?
It forgot that it had to keep moving.`,
    `¿Por qué se cayó la bicicleta?
Olvidó que tenía que seguir avanzando.`,
    [
      ["le vélo", "the bicycle", "la bicicleta"],
      ["avancer", "to move forward", "avanzar"],
    ],
  ),

  joke(
    93,
    "absurd",
    "🌙",
    `La lune a demandé une journée de congé.
On lui a répondu qu’elle avait déjà toutes ses nuits.`,
    `The moon asked for a day off.
It was told that it already had every night.`,
    `La luna pidió un día libre.
Le dijeron que ya tenía todas las noches.`,
    [
      ["la lune", "the moon", "la luna"],
      ["la nuit", "the night", "la noche"],
    ],
  ),

  joke(
    94,
    "absurd",
    "☁️",
    `Un nuage est entré dans un café.
Il a commandé quelque chose de léger.`,
    `A cloud walked into a café.
It ordered something light.`,
    `Una nube entró en un café.
Pidió algo ligero.`,
    [
      ["le nuage", "the cloud", "la nube"],
      ["léger", "light", "ligero"],
    ],
  ),

  joke(
    95,
    "absurd",
    "👻",
    `Pourquoi le fantôme a-t-il quitté la fête?
Personne ne remarquait sa présence.`,
    `Why did the ghost leave the party?
Nobody noticed its presence.`,
    `¿Por qué se fue el fantasma de la fiesta?
Nadie notaba su presencia.`,
    [
      ["le fantôme", "the ghost", "el fantasma"],
      ["la présence", "the presence", "la presencia"],
    ],
  ),

  joke(
    96,
    "absurd",
    "🦖",
    `Le dinosaure a essayé d’utiliser Internet.
On lui a dit que son navigateur était préhistorique.`,
    `The dinosaur tried to use the Internet.
It was told that its browser was prehistoric.`,
    `El dinosaurio intentó usar Internet.
Le dijeron que su navegador era prehistórico.`,
    [
      ["le dinosaure", "the dinosaur", "el dinosaurio"],
      ["préhistorique", "prehistoric", "prehistórico"],
    ],
  ),

  joke(
    97,
    "absurd",
    "🪐",
    `Deux planètes se rencontrent.
— Tu as l’air préoccupée.
— Oui, j’ai des humains. Mais il paraît que ça passe.`,
    `Two planets meet.
“You look worried.”
“Yes, I have humans. But apparently it passes.”`,
    `Dos planetas se encuentran.
—Pareces preocupada.
—Sí, tengo humanos. Pero dicen que se pasa.`,
    [
      ["la planète", "the planet", "el planeta"],
      ["préoccupé", "worried", "preocupado"],
    ],
  ),

  joke(
    98,
    "absurd",
    "🐌",
    `Un escargot a acheté une voiture rapide.
Il voulait enfin arriver avant son courrier.`,
    `A snail bought a fast car.
It finally wanted to arrive before its mail.`,
    `Un caracol compró un automóvil rápido.
Por fin quería llegar antes que su correo.`,
    [
      ["l’escargot", "the snail", "el caracol"],
      ["rapide", "fast", "rápido"],
    ],
  ),

  joke(
    99,
    "absurd",
    "🧙",
    `Le magicien a perdu sa baguette.
Depuis, il fait disparaître uniquement son temps.`,
    `The magician lost his wand.
Since then, he only makes his time disappear.`,
    `El mago perdió su varita.
Desde entonces, solo hace desaparecer su tiempo.`,
    [
      ["le magicien", "the magician", "el mago"],
      ["la baguette", "the wand", "la varita"],
    ],
  ),

  joke(
    100,
    "absurd",
    "🚀",
    `Pourquoi l’astronaute a-t-il apporté une chaise?
Il voulait s’asseoir un peu plus près des étoiles.`,
    `Why did the astronaut bring a chair?
He wanted to sit a little closer to the stars.`,
    `¿Por qué llevó una silla el astronauta?
Quería sentarse un poco más cerca de las estrellas.`,
    [
      ["l’astronaute", "the astronaut", "el astronauta"],
      ["les étoiles", "the stars", "las estrellas"],
    ],
  ),
];