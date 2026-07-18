export type RecipeCategory =
  | "breakfast"
  | "soups"
  | "meals"
  | "vegetarian"
  | "snacks"
  | "desserts";

type LanguageRecipe = {
  title: string;
  ingredients: string[];
  steps: string[];
};

export type Recipe = {
  id: number;
  category: RecipeCategory;
  emoji: string;
  portions: number;
  preparation: number;
  cooking: number;
  temperature: string | null;
  fr: LanguageRecipe;
  en: LanguageRecipe;
  es: LanguageRecipe;
};

type Method =
  | "assemble"
  | "chill"
  | "bake"
  | "simmer"
  | "roast"
  | "skillet"
  | "blend"
  | "pasta";

type Triple = [
  french: string,
  english: string,
  spanish: string,
];

export const categories: {
  key: RecipeCategory;
  icon: string;
  fr: string;
  en: string;
  es: string;
}[] = [
  {
    key: "breakfast",
    icon: "🌅",
    fr: "Déjeuners",
    en: "Breakfasts",
    es: "Desayunos",
  },
  {
    key: "soups",
    icon: "🥗",
    fr: "Soupes et salades",
    en: "Soups and salads",
    es: "Sopas y ensaladas",
  },
  {
    key: "meals",
    icon: "🍽️",
    fr: "Repas",
    en: "Meals",
    es: "Comidas",
  },
  {
    key: "vegetarian",
    icon: "🌱",
    fr: "Végétarien",
    en: "Vegetarian",
    es: "Vegetariano",
  },
  {
    key: "snacks",
    icon: "🥨",
    fr: "Collations",
    en: "Snacks",
    es: "Meriendas",
  },
  {
    key: "desserts",
    icon: "🍰",
    fr: "Desserts",
    en: "Desserts",
    es: "Postres",
  },
];

function splitIngredients(
  value: string,
) {
  return value
    .split(";")
    .map((ingredient) =>
      ingredient.trim(),
    )
    .filter(Boolean);
}

function instructions(
  method: Method,
  temperature: string | null,
  cooking: number,
): {
  fr: string[];
  en: string[];
  es: string[];
} {
  const oven =
    temperature ??
    "180 °C / 350 °F";

  if (method === "assemble") {
    return {
      fr: [
        "Préparer les ingrédients.",
        "Mélanger ou assembler, puis servir.",
      ],
      en: [
        "Prepare the ingredients.",
        "Mix or assemble, then serve.",
      ],
      es: [
        "Preparar los ingredientes.",
        "Mezclar o montar y servir.",
      ],
    };
  }

  if (method === "chill") {
    return {
      fr: [
        "Mélanger tous les ingrédients dans un contenant.",
        "Réfrigérer au moins 2 heures avant de servir.",
      ],
      en: [
        "Mix all the ingredients in a container.",
        "Refrigerate for at least 2 hours before serving.",
      ],
      es: [
        "Mezclar todos los ingredientes en un recipiente.",
        "Refrigerar durante al menos 2 horas antes de servir.",
      ],
    };
  }

  if (method === "bake") {
    return {
      fr: [
        `Préchauffer le four à ${oven}.`,
        `Mélanger les ingrédients, verser dans un moule et cuire environ ${cooking} minutes.`,
      ],
      en: [
        `Preheat the oven to ${oven}.`,
        `Mix the ingredients, pour into a baking dish and bake for about ${cooking} minutes.`,
      ],
      es: [
        `Precalentar el horno a ${oven}.`,
        `Mezclar los ingredientes, verter en un molde y hornear durante unos ${cooking} minutos.`,
      ],
    };
  }

  if (method === "roast") {
    return {
      fr: [
        `Préchauffer le four à ${oven}.`,
        `Mélanger les ingrédients sur une plaque et rôtir environ ${cooking} minutes, en remuant à mi-cuisson.`,
      ],
      en: [
        `Preheat the oven to ${oven}.`,
        `Combine the ingredients on a baking sheet and roast for about ${cooking} minutes, stirring halfway through.`,
      ],
      es: [
        `Precalentar el horno a ${oven}.`,
        `Mezclar los ingredientes en una bandeja y asar durante unos ${cooking} minutos, removiendo a mitad de cocción.`,
      ],
    };
  }

  if (method === "simmer") {
    return {
      fr: [
        "Mettre les ingrédients dans une casserole et ajouter de l’eau au besoin.",
        `Porter à ébullition, puis laisser mijoter environ ${cooking} minutes.`,
      ],
      en: [
        "Place the ingredients in a pot and add water as needed.",
        `Bring to a boil, then simmer for about ${cooking} minutes.`,
      ],
      es: [
        "Poner los ingredientes en una olla y añadir agua según sea necesario.",
        `Llevar a ebullición y cocinar a fuego lento durante unos ${cooking} minutos.`,
      ],
    };
  }

  if (method === "skillet") {
    return {
      fr: [
        "Chauffer une grande poêle à feu moyen.",
        `Ajouter les ingrédients et cuire environ ${cooking} minutes en remuant régulièrement.`,
      ],
      en: [
        "Heat a large skillet over medium heat.",
        `Add the ingredients and cook for about ${cooking} minutes, stirring regularly.`,
      ],
      es: [
        "Calentar una sartén grande a fuego medio.",
        `Añadir los ingredientes y cocinar durante unos ${cooking} minutos, removiendo regularmente.`,
      ],
    };
  }

  if (method === "blend") {
    return {
      fr: [
        "Mettre tous les ingrédients dans un mélangeur.",
        "Mélanger jusqu’à consistance lisse, puis servir.",
      ],
      en: [
        "Place all the ingredients in a blender.",
        "Blend until smooth, then serve.",
      ],
      es: [
        "Poner todos los ingredientes en una licuadora.",
        "Licuar hasta obtener una mezcla suave y servir.",
      ],
    };
  }

  return {
    fr: [
      "Cuire les pâtes selon les instructions du paquet, puis les égoutter.",
      "Ajouter les autres ingrédients, mélanger et réchauffer quelques minutes.",
    ],
    en: [
      "Cook the pasta according to the package directions, then drain.",
      "Add the remaining ingredients, mix and warm for a few minutes.",
    ],
    es: [
      "Cocer la pasta según las instrucciones del paquete y escurrir.",
      "Añadir los demás ingredientes, mezclar y calentar unos minutos.",
    ],
  };
}

function makeRecipe(
  id: number,
  category: RecipeCategory,
  emoji: string,
  portions: number,
  preparation: number,
  cooking: number,
  temperature: string | null,
  titles: Triple,
  ingredientLists: Triple,
  method: Method,
): Recipe {
  const steps = instructions(
    method,
    temperature,
    cooking,
  );

  return {
    id,
    category,
    emoji,
    portions,
    preparation,
    cooking,
    temperature,
    fr: {
      title: titles[0],
      ingredients:
        splitIngredients(
          ingredientLists[0],
        ),
      steps: steps.fr,
    },
    en: {
      title: titles[1],
      ingredients:
        splitIngredients(
          ingredientLists[1],
        ),
      steps: steps.en,
    },
    es: {
      title: titles[2],
      ingredients:
        splitIngredients(
          ingredientLists[2],
        ),
      steps: steps.es,
    },
  };
}

export const recipes: Recipe[] = [
  makeRecipe(
    1,
    "breakfast",
    "🥣",
    2,
    5,
    0,
    null,
    [
      "Gruau préparé la veille",
      "Overnight oats",
      "Avena preparada la noche anterior",
    ],
    [
      "1 tasse de flocons d’avoine;1 tasse de lait;1/2 tasse de yogourt;1 banane tranchée;1 c. à soupe de graines de chia",
      "1 cup rolled oats;1 cup milk;1/2 cup yogurt;1 sliced banana;1 tbsp chia seeds",
      "1 taza de avena;1 taza de leche;1/2 taza de yogur;1 banana en rodajas;1 cucharada de semillas de chía",
    ],
    "chill",
  ),

  makeRecipe(
    2,
    "breakfast",
    "🥞",
    2,
    5,
    10,
    null,
    [
      "Crêpes à la banane",
      "Banana pancakes",
      "Panqueques de banana",
    ],
    [
      "1 banane mûre;2 œufs;1/2 tasse de flocons d’avoine;1/2 c. à thé de cannelle",
      "1 ripe banana;2 eggs;1/2 cup rolled oats;1/2 tsp cinnamon",
      "1 banana madura;2 huevos;1/2 taza de avena;1/2 cucharadita de canela",
    ],
    "skillet",
  ),

  makeRecipe(
    3,
    "breakfast",
    "🍳",
    6,
    10,
    20,
    "180 °C / 350 °F",
    [
      "Petites omelettes au four",
      "Mini baked omelets",
      "Mini tortillas al horno",
    ],
    [
      "6 œufs;1/2 tasse de lait;1 tasse d’épinards hachés;1/2 tasse de fromage râpé",
      "6 eggs;1/2 cup milk;1 cup chopped spinach;1/2 cup shredded cheese",
      "6 huevos;1/2 taza de leche;1 taza de espinaca picada;1/2 taza de queso rallado",
    ],
    "bake",
  ),

  makeRecipe(
    4,
    "breakfast",
    "🫐",
    2,
    5,
    0,
    null,
    [
      "Bol de yogourt aux petits fruits",
      "Berry yogurt bowl",
      "Bol de yogur con frutos rojos",
    ],
    [
      "1 tasse de yogourt;1 tasse de petits fruits;1/2 tasse de céréales;2 c. à soupe de graines de citrouille;1 c. à soupe de miel",
      "1 cup yogurt;1 cup berries;1/2 cup cereal;2 tbsp pumpkin seeds;1 tbsp honey",
      "1 taza de yogur;1 taza de frutos rojos;1/2 taza de cereal;2 cucharadas de semillas de calabaza;1 cucharada de miel",
    ],
    "assemble",
  ),

  makeRecipe(
    5,
    "breakfast",
    "🍎",
    6,
    10,
    30,
    "180 °C / 350 °F",
    [
      "Gruau aux pommes au four",
      "Baked apple oatmeal",
      "Avena horneada con manzana",
    ],
    [
      "2 tasses de flocons d’avoine;2 tasses de lait;2 pommes en dés;1 œuf;1 c. à thé de cannelle",
      "2 cups rolled oats;2 cups milk;2 diced apples;1 egg;1 tsp cinnamon",
      "2 tazas de avena;2 tazas de leche;2 manzanas en cubos;1 huevo;1 cucharadita de canela",
    ],
    "bake",
  ),

  makeRecipe(
    6,
    "breakfast",
    "🥑",
    2,
    8,
    0,
    null,
    [
      "Rôties à l’avocat et aux œufs",
      "Avocado egg toast",
      "Tostadas con aguacate y huevo",
    ],
    [
      "2 tranches de pain grillé;1 avocat;2 œufs cuits;1 c. à soupe de jus de citron",
      "2 slices toasted bread;1 avocado;2 cooked eggs;1 tbsp lemon juice",
      "2 rebanadas de pan tostado;1 aguacate;2 huevos cocidos;1 cucharada de jugo de limón",
    ],
    "assemble",
  ),

  makeRecipe(
    7,
    "breakfast",
    "🍫",
    2,
    5,
    0,
    null,
    [
      "Pouding de chia au chocolat",
      "Chocolate chia pudding",
      "Pudín de chía con chocolate",
    ],
    [
      "1/4 tasse de graines de chia;1 tasse de lait;1 c. à soupe de cacao;1 c. à soupe de sirop d’érable;1/2 banane",
      "1/4 cup chia seeds;1 cup milk;1 tbsp cocoa;1 tbsp maple syrup;1/2 banana",
      "1/4 taza de semillas de chía;1 taza de leche;1 cucharada de cacao;1 cucharada de jarabe de arce;1/2 banana",
    ],
    "chill",
  ),

  makeRecipe(
    8,
    "soups",
    "🍅",
    4,
    10,
    25,
    null,
    [
      "Soupe tomate et lentilles",
      "Tomato lentil soup",
      "Sopa de tomate y lentejas",
    ],
    [
      "2 tasses de tomates en dés;1 tasse de lentilles rouges;1 oignon haché;1 c. à thé de basilic;4 tasses de bouillon",
      "2 cups diced tomatoes;1 cup red lentils;1 chopped onion;1 tsp basil;4 cups broth",
      "2 tazas de tomates en cubos;1 taza de lentejas rojas;1 cebolla picada;1 cucharadita de albahaca;4 tazas de caldo",
    ],
    "simmer",
  ),

  makeRecipe(
    9,
    "soups",
    "🍗",
    4,
    10,
    25,
    null,
    [
      "Soupe au poulet et au riz",
      "Chicken rice soup",
      "Sopa de pollo con arroz",
    ],
    [
      "2 tasses de poulet cuit;1 tasse de riz cuit;1 tasse de carottes tranchées;4 tasses de bouillon;1 c. à thé de thym",
      "2 cups cooked chicken;1 cup cooked rice;1 cup sliced carrots;4 cups broth;1 tsp thyme",
      "2 tazas de pollo cocido;1 taza de arroz cocido;1 taza de zanahorias en rodajas;4 tazas de caldo;1 cucharadita de tomillo",
    ],
    "simmer",
  ),

  makeRecipe(
    10,
    "soups",
    "🥕",
    4,
    10,
    25,
    null,
    [
      "Soupe carotte et gingembre",
      "Carrot ginger soup",
      "Sopa de zanahoria y jengibre",
    ],
    [
      "4 tasses de carottes tranchées;1 pomme de terre en dés;1 oignon haché;1 c. à soupe de gingembre;4 tasses de bouillon",
      "4 cups sliced carrots;1 diced potato;1 chopped onion;1 tbsp ginger;4 cups broth",
      "4 tazas de zanahorias en rodajas;1 papa en cubos;1 cebolla picada;1 cucharada de jengibre;4 tazas de caldo",
    ],
    "simmer",
  ),

  makeRecipe(
    11,
    "soups",
    "🥒",
    4,
    10,
    0,
    null,
    [
      "Salade de pois chiches et concombre",
      "Chickpea cucumber salad",
      "Ensalada de garbanzos y pepino",
    ],
    [
      "2 tasses de pois chiches;1 concombre en dés;1 tasse de tomates;2 c. à soupe de jus de citron;2 c. à soupe d’huile d’olive",
      "2 cups chickpeas;1 diced cucumber;1 cup tomatoes;2 tbsp lemon juice;2 tbsp olive oil",
      "2 tazas de garbanzos;1 pepino en cubos;1 taza de tomates;2 cucharadas de jugo de limón;2 cucharadas de aceite de oliva",
    ],
    "assemble",
  ),

  makeRecipe(
    12,
    "soups",
    "🐟",
    4,
    10,
    0,
    null,
    [
      "Salade de thon et maïs",
      "Tuna corn salad",
      "Ensalada de atún y maíz",
    ],
    [
      "2 boîtes de thon égoutté;1 tasse de maïs;1/2 tasse de céleri;1/4 tasse de yogourt;1 c. à soupe de jus de citron",
      "2 cans drained tuna;1 cup corn;1/2 cup celery;1/4 cup yogurt;1 tbsp lemon juice",
      "2 latas de atún escurrido;1 taza de maíz;1/2 taza de apio;1/4 taza de yogur;1 cucharada de jugo de limón",
    ],
    "assemble",
  ),

  makeRecipe(
    13,
    "soups",
    "🥔",
    4,
    10,
    30,
    null,
    [
      "Soupe pommes de terre et poireaux",
      "Potato leek soup",
      "Sopa de papa y puerro",
    ],
    [
      "4 tasses de pommes de terre en dés;2 tasses de poireaux tranchés;4 tasses de bouillon;1 tasse de lait;1 c. à thé de thym",
      "4 cups diced potatoes;2 cups sliced leeks;4 cups broth;1 cup milk;1 tsp thyme",
      "4 tazas de papas en cubos;2 tazas de puerros en rodajas;4 tazas de caldo;1 taza de leche;1 cucharadita de tomillo",
    ],
    "simmer",
  ),

  makeRecipe(
    14,
    "soups",
    "🥦",
    4,
    10,
    25,
    null,
    [
      "Soupe au brocoli et fromage",
      "Broccoli cheese soup",
      "Sopa de brócoli y queso",
    ],
    [
      "4 tasses de brocoli;1 pomme de terre en dés;4 tasses de bouillon;1 tasse de lait;1 tasse de fromage râpé",
      "4 cups broccoli;1 diced potato;4 cups broth;1 cup milk;1 cup shredded cheese",
      "4 tazas de brócoli;1 papa en cubos;4 tazas de caldo;1 taza de leche;1 taza de queso rallado",
    ],
    "simmer",
  ),

  makeRecipe(
    15,
    "meals",
    "🍋",
    4,
    10,
    30,
    "200 °C / 400 °F",
    [
      "Poulet au citron sur plaque",
      "Sheet-pan lemon chicken",
      "Pollo al limón en bandeja",
    ],
    [
      "4 poitrines de poulet;3 tasses de pommes de terre en dés;2 tasses de brocoli;2 c. à soupe de jus de citron;2 c. à soupe d’huile d’olive",
      "4 chicken breasts;3 cups diced potatoes;2 cups broccoli;2 tbsp lemon juice;2 tbsp olive oil",
      "4 pechugas de pollo;3 tazas de papas en cubos;2 tazas de brócoli;2 cucharadas de jugo de limón;2 cucharadas de aceite de oliva",
    ],
    "roast",
  ),

  makeRecipe(
    16,
    "meals",
    "🍯",
    4,
    8,
    30,
    "190 °C / 375 °F",
    [
      "Poulet miel et moutarde",
      "Honey mustard chicken",
      "Pollo con miel y mostaza",
    ],
    [
      "4 poitrines de poulet;2 c. à soupe de miel;2 c. à soupe de moutarde;1 c. à soupe d’huile d’olive;1 c. à thé de paprika",
      "4 chicken breasts;2 tbsp honey;2 tbsp mustard;1 tbsp olive oil;1 tsp paprika",
      "4 pechugas de pollo;2 cucharadas de miel;2 cucharadas de mostaza;1 cucharada de aceite de oliva;1 cucharadita de pimentón",
    ],
    "bake",
  ),

  makeRecipe(
    17,
    "meals",
    "🐟",
    4,
    8,
    15,
    "200 °C / 400 °F",
    [
      "Saumon à l’érable",
      "Maple salmon",
      "Salmón al jarabe de arce",
    ],
    [
      "4 filets de saumon;2 c. à soupe de sirop d’érable;1 c. à soupe de moutarde;1 c. à soupe de sauce soya;1 c. à thé d’ail",
      "4 salmon fillets;2 tbsp maple syrup;1 tbsp mustard;1 tbsp soy sauce;1 tsp garlic",
      "4 filetes de salmón;2 cucharadas de jarabe de arce;1 cucharada de mostaza;1 cucharada de salsa de soya;1 cucharadita de ajo",
    ],
    "bake",
  ),

  makeRecipe(
    18,
    "meals",
    "🌮",
    4,
    12,
    12,
    null,
    [
      "Tacos de poisson",
      "Fish tacos",
      "Tacos de pescado",
    ],
    [
      "4 filets de poisson;8 petites tortillas;2 tasses de chou râpé;1/2 tasse de yogourt;2 c. à soupe de jus de lime",
      "4 fish fillets;8 small tortillas;2 cups shredded cabbage;1/2 cup yogurt;2 tbsp lime juice",
      "4 filetes de pescado;8 tortillas pequeñas;2 tazas de repollo rallado;1/2 taza de yogur;2 cucharadas de jugo de lima",
    ],
    "skillet",
  ),

  makeRecipe(
    19,
    "meals",
    "🧆",
    4,
    12,
    25,
    "200 °C / 400 °F",
    [
      "Boulettes de dinde",
      "Turkey meatballs",
      "Albóndigas de pavo",
    ],
    [
      "2 tasses de dinde hachée;1 œuf;1/2 tasse de chapelure;1/2 tasse de fromage râpé;1 c. à thé d’herbes italiennes",
      "2 cups ground turkey;1 egg;1/2 cup breadcrumbs;1/2 cup shredded cheese;1 tsp Italian herbs",
      "2 tazas de pavo molido;1 huevo;1/2 taza de pan rallado;1/2 taza de queso rallado;1 cucharadita de hierbas italianas",
    ],
    "bake",
  ),

  makeRecipe(
    20,
    "meals",
    "🥩",
    4,
    10,
    15,
    null,
    [
      "Poêlée de bœuf et poivrons",
      "Beef pepper skillet",
      "Salteado de carne y pimientos",
    ],
    [
      "2 tasses de bœuf en lanières;2 tasses de poivrons;1 oignon tranché;2 c. à soupe de sauce soya;1 c. à soupe d’huile",
      "2 cups beef strips;2 cups bell peppers;1 sliced onion;2 tbsp soy sauce;1 tbsp oil",
      "2 tazas de carne en tiras;2 tazas de pimientos;1 cebolla en rodajas;2 cucharadas de salsa de soya;1 cucharada de aceite",
    ],
    "skillet",
  ),

  makeRecipe(
    21,
    "meals",
    "🍚",
    6,
    10,
    35,
    "190 °C / 375 °F",
    [
      "Gratin de poulet et riz",
      "Chicken rice casserole",
      "Cazuela de pollo y arroz",
    ],
    [
      "2 tasses de poulet cuit;3 tasses de riz cuit;2 tasses de légumes congelés;1 tasse de bouillon;1 tasse de fromage râpé",
      "2 cups cooked chicken;3 cups cooked rice;2 cups frozen vegetables;1 cup broth;1 cup shredded cheese",
      "2 tazas de pollo cocido;3 tazas de arroz cocido;2 tazas de verduras congeladas;1 taza de caldo;1 taza de queso rallado",
    ],
    "bake",
  ),

  makeRecipe(
    22,
    "meals",
    "🍤",
    4,
    10,
    12,
    null,
    [
      "Pâtes aux crevettes et à l’ail",
      "Garlic shrimp pasta",
      "Pasta con camarones y ajo",
    ],
    [
      "4 tasses de pâtes cuites;2 tasses de crevettes;2 c. à soupe d’huile d’olive;1 c. à soupe d’ail;2 c. à soupe de jus de citron",
      "4 cups cooked pasta;2 cups shrimp;2 tbsp olive oil;1 tbsp garlic;2 tbsp lemon juice",
      "4 tazas de pasta cocida;2 tazas de camarones;2 cucharadas de aceite de oliva;1 cucharada de ajo;2 cucharadas de jugo de limón",
    ],
    "skillet",
  ),

  makeRecipe(
    23,
    "meals",
    "🐟",
    4,
    10,
    12,
    null,
    [
      "Galettes de thon",
      "Tuna patties",
      "Tortitas de atún",
    ],
    [
      "2 boîtes de thon égoutté;1 œuf;1/2 tasse de chapelure;1/4 tasse de yogourt;1 c. à soupe de jus de citron",
      "2 cans drained tuna;1 egg;1/2 cup breadcrumbs;1/4 cup yogurt;1 tbsp lemon juice",
      "2 latas de atún escurrido;1 huevo;1/2 taza de pan rallado;1/4 taza de yogur;1 cucharada de jugo de limón",
    ],
    "skillet",
  ),

  makeRecipe(
    24,
    "meals",
    "🌭",
    4,
    10,
    30,
    "200 °C / 400 °F",
    [
      "Saucisses et légumes rôtis",
      "Roasted sausage and vegetables",
      "Salchichas y verduras asadas",
    ],
    [
      "4 saucisses tranchées;2 tasses de pommes de terre;2 tasses de poivrons;1 oignon tranché;2 c. à soupe d’huile",
      "4 sliced sausages;2 cups potatoes;2 cups bell peppers;1 sliced onion;2 tbsp oil",
      "4 salchichas en rodajas;2 tazas de papas;2 tazas de pimientos;1 cebolla en rodajas;2 cucharadas de aceite",
    ],
    "roast",
  ),

  makeRecipe(
    25,
    "vegetarian",
    "🍛",
    4,
    10,
    20,
    null,
    [
      "Cari de pois chiches",
      "Chickpea curry",
      "Curry de garbanzos",
    ],
    [
      "2 tasses de pois chiches;2 tasses de tomates en dés;1 tasse de lait de coco;1 oignon haché;1 c. à soupe de poudre de cari",
      "2 cups chickpeas;2 cups diced tomatoes;1 cup coconut milk;1 chopped onion;1 tbsp curry powder",
      "2 tazas de garbanzos;2 tazas de tomates en cubos;1 taza de leche de coco;1 cebolla picada;1 cucharada de curry en polvo",
    ],
    "simmer",
  ),

  makeRecipe(
    26,
    "vegetarian",
    "🫓",
    4,
    10,
    10,
    null,
    [
      "Quesadillas aux haricots noirs",
      "Black bean quesadillas",
      "Quesadillas de frijoles negros",
    ],
    [
      "8 petites tortillas;2 tasses de haricots noirs;1 tasse de fromage râpé;1 tasse de maïs;1/2 tasse de salsa",
      "8 small tortillas;2 cups black beans;1 cup shredded cheese;1 cup corn;1/2 cup salsa",
      "8 tortillas pequeñas;2 tazas de frijoles negros;1 taza de queso rallado;1 taza de maíz;1/2 taza de salsa",
    ],
    "skillet",
  ),

  makeRecipe(
    27,
    "vegetarian",
    "🥧",
    6,
    15,
    30,
    "190 °C / 375 °F",
    [
      "Hachis végétarien aux lentilles",
      "Lentil shepherd’s pie",
      "Pastel de lentejas",
    ],
    [
      "3 tasses de lentilles cuites;2 tasses de légumes congelés;3 tasses de pommes de terre en purée;1 tasse de bouillon;1 c. à thé de thym",
      "3 cups cooked lentils;2 cups frozen vegetables;3 cups mashed potatoes;1 cup broth;1 tsp thyme",
      "3 tazas de lentejas cocidas;2 tazas de verduras congeladas;3 tazas de puré de papa;1 taza de caldo;1 cucharadita de tomillo",
    ],
    "bake",
  ),

  makeRecipe(
    28,
    "vegetarian",
    "🍝",
    4,
    10,
    15,
    null,
    [
      "Pâtes tomate et basilic",
      "Tomato basil pasta",
      "Pasta con tomate y albahaca",
    ],
    [
      "4 tasses de pâtes;2 tasses de tomates en dés;1 tasse d’épinards;1/2 tasse de fromage râpé;1 c. à thé de basilic",
      "4 cups pasta;2 cups diced tomatoes;1 cup spinach;1/2 cup shredded cheese;1 tsp basil",
      "4 tazas de pasta;2 tazas de tomates en cubos;1 taza de espinaca;1/2 taza de queso rallado;1 cucharadita de albahaca",
    ],
    "pasta",
  ),

  makeRecipe(
    29,
    "vegetarian",
    "🥚",
    4,
    10,
    25,
    "180 °C / 350 °F",
    [
      "Frittata aux légumes",
      "Vegetable frittata",
      "Frittata de verduras",
    ],
    [
      "6 œufs;1/2 tasse de lait;2 tasses de légumes;1 tasse de fromage râpé;1 c. à thé d’herbes italiennes",
      "6 eggs;1/2 cup milk;2 cups vegetables;1 cup shredded cheese;1 tsp Italian herbs",
      "6 huevos;1/2 taza de leche;2 tazas de verduras;1 taza de queso rallado;1 cucharadita de hierbas italianas",
    ],
    "bake",
  ),

  makeRecipe(
    30,
    "vegetarian",
    "🫑",
    4,
    15,
    35,
    "190 °C / 375 °F",
    [
      "Poivrons farcis",
      "Stuffed peppers",
      "Pimientos rellenos",
    ],
    [
      "4 poivrons coupés en deux;2 tasses de riz cuit;2 tasses de haricots noirs;1 tasse de salsa;1 tasse de fromage râpé",
      "4 halved bell peppers;2 cups cooked rice;2 cups black beans;1 cup salsa;1 cup shredded cheese",
      "4 pimientos cortados por la mitad;2 tazas de arroz cocido;2 tazas de frijoles negros;1 taza de salsa;1 taza de queso rallado",
    ],
    "bake",
  ),

  makeRecipe(
    31,
    "vegetarian",
    "🍠",
    4,
    10,
    30,
    "200 °C / 400 °F",
    [
      "Patates douces et pois chiches rôtis",
      "Roasted sweet potatoes and chickpeas",
      "Batatas y garbanzos asados",
    ],
    [
      "3 tasses de patates douces;2 tasses de pois chiches;2 c. à soupe d’huile;1 c. à thé de paprika;1 c. à thé de cumin",
      "3 cups sweet potatoes;2 cups chickpeas;2 tbsp oil;1 tsp paprika;1 tsp cumin",
      "3 tazas de batatas;2 tazas de garbanzos;2 cucharadas de aceite;1 cucharadita de pimentón;1 cucharadita de comino",
    ],
    "roast",
  ),

  makeRecipe(
    32,
    "vegetarian",
    "🥦",
    4,
    10,
    15,
    null,
    [
      "Tofu et brocoli à la poêle",
      "Tofu broccoli skillet",
      "Tofu y brócoli a la sartén",
    ],
    [
      "2 tasses de tofu en cubes;3 tasses de brocoli;2 c. à soupe de sauce soya;1 c. à soupe de miel;1 c. à soupe d’huile",
      "2 cups cubed tofu;3 cups broccoli;2 tbsp soy sauce;1 tbsp honey;1 tbsp oil",
      "2 tazas de tofu en cubos;3 tazas de brócoli;2 cucharadas de salsa de soya;1 cucharada de miel;1 cucharada de aceite",
    ],
    "skillet",
  ),

  makeRecipe(
    33,
    "vegetarian",
    "🌶️",
    6,
    10,
    25,
    null,
    [
      "Chili végétarien",
      "Vegetarian chili",
      "Chili vegetariano",
    ],
    [
      "2 tasses de haricots rouges;2 tasses de haricots noirs;2 tasses de tomates;1 tasse de maïs;1 c. à soupe d’assaisonnement chili",
      "2 cups kidney beans;2 cups black beans;2 cups tomatoes;1 cup corn;1 tbsp chili seasoning",
      "2 tazas de frijoles rojos;2 tazas de frijoles negros;2 tazas de tomates;1 taza de maíz;1 cucharada de condimento para chili",
    ],
    "simmer",
  ),

  makeRecipe(
    34,
    "vegetarian",
    "🐚",
    6,
    15,
    30,
    "190 °C / 375 °F",
    [
      "Coquilles aux épinards",
      "Spinach ricotta shells",
      "Conchas rellenas de espinaca",
    ],
    [
      "20 grosses coquilles cuites;2 tasses de ricotta;2 tasses d’épinards;2 tasses de sauce tomate;1 tasse de fromage râpé",
      "20 cooked pasta shells;2 cups ricotta;2 cups spinach;2 cups tomato sauce;1 cup shredded cheese",
      "20 conchas de pasta cocidas;2 tazas de ricota;2 tazas de espinaca;2 tazas de salsa de tomate;1 taza de queso rallado",
    ],
    "bake",
  ),

  makeRecipe(
    35,
    "snacks",
    "🫘",
    6,
    8,
    0,
    null,
    [
      "Houmous simple",
      "Simple hummus",
      "Hummus sencillo",
    ],
    [
      "2 tasses de pois chiches;2 c. à soupe de tahini;2 c. à soupe de jus de citron;1 c. à soupe d’huile d’olive;1 c. à thé d’ail",
      "2 cups chickpeas;2 tbsp tahini;2 tbsp lemon juice;1 tbsp olive oil;1 tsp garlic",
      "2 tazas de garbanzos;2 cucharadas de tahini;2 cucharadas de jugo de limón;1 cucharada de aceite de oliva;1 cucharadita de ajo",
    ],
    "blend",
  ),

  makeRecipe(
    36,
    "snacks",
    "⚡",
    12,
    10,
    0,
    null,
    [
      "Bouchées énergétiques à l’avoine",
      "Oat energy bites",
      "Bocaditos energéticos de avena",
    ],
    [
      "1 tasse de flocons d’avoine;1/2 tasse de beurre d’arachide;1/3 tasse de miel;1/3 tasse de graines;1/3 tasse de pépites de chocolat",
      "1 cup rolled oats;1/2 cup peanut butter;1/3 cup honey;1/3 cup seeds;1/3 cup chocolate chips",
      "1 taza de avena;1/2 taza de mantequilla de maní;1/3 taza de miel;1/3 taza de semillas;1/3 taza de chispas de chocolate",
    ],
    "chill",
  ),

  makeRecipe(
    37,
    "snacks",
    "🫘",
    4,
    5,
    30,
    "200 °C / 400 °F",
    [
      "Pois chiches croustillants",
      "Crispy roasted chickpeas",
      "Garbanzos crujientes",
    ],
    [
      "2 tasses de pois chiches;1 c. à soupe d’huile;1 c. à thé de paprika;1/2 c. à thé d’ail",
      "2 cups chickpeas;1 tbsp oil;1 tsp paprika;1/2 tsp garlic",
      "2 tazas de garbanzos;1 cucharada de aceite;1 cucharadita de pimentón;1/2 cucharadita de ajo",
    ],
    "roast",
  ),

  makeRecipe(
    38,
    "snacks",
    "🥔",
    4,
    10,
    35,
    "210 °C / 425 °F",
    [
      "Pommes de terre à l’ail",
      "Garlic roasted potatoes",
      "Papas asadas con ajo",
    ],
    [
      "4 tasses de pommes de terre;2 c. à soupe d’huile;1 c. à thé d’ail;1 c. à thé de paprika;1 c. à thé de persil",
      "4 cups potatoes;2 tbsp oil;1 tsp garlic;1 tsp paprika;1 tsp parsley",
      "4 tazas de papas;2 cucharadas de aceite;1 cucharadita de ajo;1 cucharadita de pimentón;1 cucharadita de perejil",
    ],
    "roast",
  ),

  makeRecipe(
    39,
    "snacks",
    "🥬",
    6,
    10,
    0,
    null,
    [
      "Salade de chou crémeuse",
      "Creamy coleslaw",
      "Ensalada cremosa de repollo",
    ],
    [
      "4 tasses de chou râpé;1 tasse de carottes râpées;1/2 tasse de yogourt;1 c. à soupe de vinaigre;1 c. à soupe de miel",
      "4 cups shredded cabbage;1 cup shredded carrots;1/2 cup yogurt;1 tbsp vinegar;1 tbsp honey",
      "4 tazas de repollo rallado;1 taza de zanahorias ralladas;1/2 taza de yogur;1 cucharada de vinagre;1 cucharada de miel",
    ],
    "assemble",
  ),

  makeRecipe(
    40,
    "snacks",
    "🧁",
    12,
    10,
    20,
    "180 °C / 350 °F",
    [
      "Muffins banane et avoine",
      "Banana oat muffins",
      "Muffins de banana y avena",
    ],
    [
      "2 bananes mûres;2 œufs;2 tasses de flocons d’avoine;1/2 tasse de yogourt;1 c. à thé de poudre à pâte",
      "2 ripe bananas;2 eggs;2 cups rolled oats;1/2 cup yogurt;1 tsp baking powder",
      "2 bananas maduras;2 huevos;2 tazas de avena;1/2 taza de yogur;1 cucharadita de polvo de hornear",
    ],
    "bake",
  ),

  makeRecipe(
    41,
    "snacks",
    "🍎",
    2,
    8,
    0,
    null,
    [
      "Rondelles de pomme au beurre d’arachide",
      "Peanut butter apple rings",
      "Aros de manzana con mantequilla de maní",
    ],
    [
      "2 pommes tranchées;1/4 tasse de beurre d’arachide;2 c. à soupe de céréales;1 c. à soupe de raisins secs",
      "2 sliced apples;1/4 cup peanut butter;2 tbsp cereal;1 tbsp raisins",
      "2 manzanas en rodajas;1/4 taza de mantequilla de maní;2 cucharadas de cereal;1 cucharada de pasas",
    ],
    "assemble",
  ),

  makeRecipe(
    42,
    "snacks",
    "🧀",
    4,
    8,
    12,
    null,
    [
      "Mini-pizzas sur tortillas",
      "Tortilla mini pizzas",
      "Mini pizzas de tortilla",
    ],
    [
      "4 petites tortillas;1 tasse de sauce tomate;1 tasse de fromage râpé;1 tasse de légumes hachés",
      "4 small tortillas;1 cup tomato sauce;1 cup shredded cheese;1 cup chopped vegetables",
      "4 tortillas pequeñas;1 taza de salsa de tomate;1 taza de queso rallado;1 taza de verduras picadas",
    ],
    "skillet",
  ),

  makeRecipe(
    43,
    "desserts",
    "🍫",
    9,
    10,
    25,
    "180 °C / 350 °F",
    [
      "Carrés chocolat et banane",
      "Chocolate banana squares",
      "Cuadrados de chocolate y banana",
    ],
    [
      "2 bananes mûres;2 œufs;1/2 tasse de cacao;1 tasse de flocons d’avoine;1/3 tasse de sirop d’érable",
      "2 ripe bananas;2 eggs;1/2 cup cocoa;1 cup rolled oats;1/3 cup maple syrup",
      "2 bananas maduras;2 huevos;1/2 taza de cacao;1 taza de avena;1/3 taza de jarabe de arce",
    ],
    "bake",
  ),

  makeRecipe(
    44,
    "desserts",
    "🫐",
    6,
    10,
    30,
    "180 °C / 350 °F",
    [
      "Croustade aux petits fruits",
      "Berry crumble",
      "Crumble de frutos rojos",
    ],
    [
      "4 tasses de petits fruits;1 tasse de flocons d’avoine;1/2 tasse de farine;1/3 tasse de cassonade;1/3 tasse de beurre fondu",
      "4 cups berries;1 cup rolled oats;1/2 cup flour;1/3 cup brown sugar;1/3 cup melted butter",
      "4 tazas de frutos rojos;1 taza de avena;1/2 taza de harina;1/3 taza de azúcar morena;1/3 taza de mantequilla derretida",
    ],
    "bake",
  ),

  makeRecipe(
    45,
    "desserts",
    "🍎",
    4,
    10,
    30,
    "180 °C / 350 °F",
    [
      "Pommes farcies au four",
      "Stuffed baked apples",
      "Manzanas rellenas al horno",
    ],
    [
      "4 pommes évidées;1/2 tasse de flocons d’avoine;1/4 tasse de noix;2 c. à soupe de sirop d’érable;1 c. à thé de cannelle",
      "4 cored apples;1/2 cup rolled oats;1/4 cup nuts;2 tbsp maple syrup;1 tsp cinnamon",
      "4 manzanas sin corazón;1/2 taza de avena;1/4 taza de nueces;2 cucharadas de jarabe de arce;1 cucharadita de canela",
    ],
    "bake",
  ),

  makeRecipe(
    46,
    "desserts",
    "🍋",
    8,
    10,
    30,
    "180 °C / 350 °F",
    [
      "Gâteau au yogourt et citron",
      "Lemon yogurt cake",
      "Pastel de yogur y limón",
    ],
    [
      "1 tasse de yogourt;2 œufs;1 tasse de farine;1/2 tasse de sucre;2 c. à soupe de jus de citron",
      "1 cup yogurt;2 eggs;1 cup flour;1/2 cup sugar;2 tbsp lemon juice",
      "1 taza de yogur;2 huevos;1 taza de harina;1/2 taza de azúcar;2 cucharadas de jugo de limón",
    ],
    "bake",
  ),

  makeRecipe(
    47,
    "desserts",
    "🥜",
    12,
    8,
    12,
    "180 °C / 350 °F",
    [
      "Biscuits au beurre d’arachide",
      "Peanut butter cookies",
      "Galletas de mantequilla de maní",
    ],
    [
      "1 tasse de beurre d’arachide;1/2 tasse de sucre;1 œuf;1/2 c. à thé de vanille",
      "1 cup peanut butter;1/2 cup sugar;1 egg;1/2 tsp vanilla",
      "1 taza de mantequilla de maní;1/2 taza de azúcar;1 huevo;1/2 cucharadita de vainilla",
    ],
    "bake",
  ),

  makeRecipe(
    48,
    "desserts",
    "🍚",
    6,
    5,
    25,
    null,
    [
      "Pouding au riz",
      "Rice pudding",
      "Arroz con leche",
    ],
    [
      "2 tasses de riz cuit;3 tasses de lait;1/3 tasse de sucre;1 c. à thé de vanille;1 c. à thé de cannelle",
      "2 cups cooked rice;3 cups milk;1/3 cup sugar;1 tsp vanilla;1 tsp cinnamon",
      "2 tazas de arroz cocido;3 tazas de leche;1/3 taza de azúcar;1 cucharadita de vainilla;1 cucharadita de canela",
    ],
    "simmer",
  ),

  makeRecipe(
    49,
    "desserts",
    "🍫",
    4,
    8,
    0,
    null,
    [
      "Mousse chocolat et avocat",
      "Chocolate avocado mousse",
      "Mousse de chocolate y aguacate",
    ],
    [
      "2 avocats mûrs;1/3 tasse de cacao;1/3 tasse de sirop d’érable;1/2 tasse de lait;1 c. à thé de vanille",
      "2 ripe avocados;1/3 cup cocoa;1/3 cup maple syrup;1/2 cup milk;1 tsp vanilla",
      "2 aguacates maduros;1/3 taza de cacao;1/3 taza de jarabe de arce;1/2 taza de leche;1 cucharadita de vainilla",
    ],
    "blend",
  ),

  makeRecipe(
    50,
    "desserts",
    "🍑",
    6,
    10,
    30,
    "180 °C / 350 °F",
    [
      "Croustade aux pêches",
      "Peach crisp",
      "Crujiente de durazno",
    ],
    [
      "4 tasses de pêches tranchées;1 tasse de flocons d’avoine;1/2 tasse de farine;1/3 tasse de cassonade;1/3 tasse de beurre fondu",
      "4 cups sliced peaches;1 cup rolled oats;1/2 cup flour;1/3 cup brown sugar;1/3 cup melted butter",
      "4 tazas de duraznos en rodajas;1 taza de avena;1/2 taza de harina;1/3 taza de azúcar morena;1/3 taza de mantequilla derretida",
    ],
    "bake",
  ),
];