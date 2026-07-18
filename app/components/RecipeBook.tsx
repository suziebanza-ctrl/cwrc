"use client";

import { useMemo, useState } from "react";
import {
  categories,
  recipes,
  type RecipeCategory,
} from "./recipeData";

type Language = "fr" | "en" | "es";

const interfaceText = {
  fr: {
    title:
      "Le livre des recettes raisonnablement simples du CWRC",
    subtitle:
      "50 recettes · 5 ingrédients maximum · Aucun doctorat en cuisine requis",
    search: "Rechercher une recette",
    all: "Toutes",
    portions: "Portions",
    preparation: "Préparation",
    cooking: "Cuisson",
    ingredients: "Ingrédients",
    instructions: "Instructions",
    noCooking: "Sans cuisson",
    noResults:
      "Aucune recette trouvée. Même Amateur le hibou a regardé derrière les casseroles.",
    back: "Retourner à la cuisine",
  },
  en: {
    title:
      "The CWRC Book of Reasonably Simple Recipes",
    subtitle:
      "50 recipes · 5 ingredients maximum · No cooking doctorate required",
    search: "Search for a recipe",
    all: "All",
    portions: "Servings",
    preparation: "Preparation",
    cooking: "Cooking",
    ingredients: "Ingredients",
    instructions: "Instructions",
    noCooking: "No cooking",
    noResults:
      "No recipe was found. Even Amateur the owl checked behind the pots.",
    back: "Return to the kitchen",
  },
  es: {
    title:
      "El libro de recetas razonablemente simples del CWRC",
    subtitle:
      "50 recetas · 5 ingredientes como máximo · No se requiere un doctorado en cocina",
    search: "Buscar una receta",
    all: "Todas",
    portions: "Porciones",
    preparation: "Preparación",
    cooking: "Cocción",
    ingredients: "Ingredientes",
    instructions: "Instrucciones",
    noCooking: "Sin cocción",
    noResults:
      "No se encontró ninguna receta. Incluso el búho Amateur buscó detrás de las ollas.",
    back: "Volver a la cocina",
  },
} as const;

export default function RecipeBook() {
  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState<RecipeCategory | "all">(
      "all",
    );

  const [selectedId, setSelectedId] =
    useState<number | null>(null);

  const filteredRecipes = useMemo(
    () => {
      const normalizedSearch =
        search.trim().toLowerCase();

      return recipes.filter(
        (recipe) => {
          const matchesCategory =
            category === "all" ||
            recipe.category ===
              category;

          const searchableText = [
            recipe.fr.title,
            recipe.en.title,
            recipe.es.title,
            ...recipe.fr.ingredients,
            ...recipe.en.ingredients,
            ...recipe.es.ingredients,
          ]
            .join(" ")
            .toLowerCase();

          const matchesSearch =
            !normalizedSearch ||
            searchableText.includes(
              normalizedSearch,
            );

          return (
            matchesCategory &&
            matchesSearch
          );
        },
      );
    },
    [category, search],
  );

  const selectedRecipe =
    selectedId === null
      ? null
      : recipes.find(
          (recipe) =>
            recipe.id === selectedId,
        ) ?? null;

  return (
    <section style={bookStyle}>
      <header style={headerStyle}>
        <div style={bookIconStyle}>
          📖
        </div>

        <p style={eyebrowStyle}>
          CWRC · Nutrition et bonne
          compagnie
        </p>

        <h1 style={titleStyle}>
          {interfaceText.fr.title}
        </h1>

        <p style={translatedTitleStyle}>
          {interfaceText.en.title}
          <br />
          {interfaceText.es.title}
        </p>

        <p style={subtitleStyle}>
          {interfaceText.fr.subtitle}
          <br />
          {interfaceText.en.subtitle}
          <br />
          {interfaceText.es.subtitle}
        </p>
      </header>

      <div style={toolBarStyle}>
        <label style={searchLabelStyle}>
          <span>
            🔎{" "}
            {interfaceText.fr.search}
          </span>

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value,
              )
            }
            placeholder="Soupe, chicken, chocolate, pescado…"
            style={searchInputStyle}
          />
        </label>

        <div style={categoryGridStyle}>
          <button
            type="button"
            onClick={() =>
              setCategory("all")
            }
            style={{
              ...categoryButtonStyle,
              ...(category === "all"
                ? activeCategoryStyle
                : {}),
            }}
          >
            ✨ Toutes · All · Todas
          </button>

          {categories.map(
            (categoryItem) => (
              <button
                key={
                  categoryItem.key
                }
                type="button"
                onClick={() =>
                  setCategory(
                    categoryItem.key,
                  )
                }
                style={{
                  ...categoryButtonStyle,
                  ...(category ===
                  categoryItem.key
                    ? activeCategoryStyle
                    : {}),
                }}
              >
                {categoryItem.icon}{" "}
                {categoryItem.fr}
              </button>
            ),
          )}
        </div>
      </div>

      {filteredRecipes.length ===
      0 ? (
        <div style={emptyStyle}>
          <span style={{ fontSize: "3rem" }}>
            🦉
          </span>

          <p>
            {
              interfaceText.fr
                .noResults
            }
          </p>

          <p>
            {
              interfaceText.en
                .noResults
            }
          </p>

          <p>
            {
              interfaceText.es
                .noResults
            }
          </p>
        </div>
      ) : (
        <div style={recipeGridStyle}>
          {filteredRecipes.map(
            (recipe) => {
              const categoryItem =
                categories.find(
                  (item) =>
                    item.key ===
                    recipe.category,
                );

              return (
                <button
                  key={recipe.id}
                  type="button"
                  onClick={() =>
                    setSelectedId(
                      recipe.id,
                    )
                  }
                  style={
                    recipeCardStyle
                  }
                >
                  <span
                    style={
                      recipeNumberStyle
                    }
                  >
                    {recipe.id}
                  </span>

                  <span
                    style={
                      recipeEmojiStyle
                    }
                  >
                    {recipe.emoji}
                  </span>

                  <span
                    style={
                      categoryNameStyle
                    }
                  >
                    {
                      categoryItem?.icon
                    }{" "}
                    {categoryItem?.fr}
                  </span>

                  <strong
                    style={
                      recipeTitleStyle
                    }
                  >
                    {recipe.fr.title}
                  </strong>

                  <span
                    style={
                      recipeTranslationStyle
                    }
                  >
                    {recipe.en.title}
                    <br />
                    {recipe.es.title}
                  </span>

                  <span
                    style={
                      timeSummaryStyle
                    }
                  >
                    ⏱️{" "}
                    {recipe.preparation} min
                    {recipe.cooking > 0
                      ? ` + ${recipe.cooking} min`
                      : ""}
                  </span>
                </button>
              );
            },
          )}
        </div>
      )}

      <a
        href="/kitchen"
        style={backButtonStyle}
      >
        ← {interfaceText.fr.back} ·{" "}
        {interfaceText.en.back} ·{" "}
        {interfaceText.es.back}
      </a>

      {selectedRecipe && (
        <div
          style={overlayStyle}
          role="presentation"
          onClick={() =>
            setSelectedId(null)
          }
        >
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="recipe-title"
            style={recipeDetailStyle}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              aria-label="Fermer"
              onClick={() =>
                setSelectedId(null)
              }
              style={closeIconStyle}
            >
              ×
            </button>

            <div style={detailHeaderStyle}>
              <span
                style={
                  detailEmojiStyle
                }
              >
                {selectedRecipe.emoji}
              </span>

              <div>
                <p
                  style={
                    detailNumberStyle
                  }
                >
                  Recette · Recipe ·
                  Receta{" "}
                  {selectedRecipe.id}
                </p>

                <h2
                  id="recipe-title"
                  style={
                    detailTitleStyle
                  }
                >
                  {
                    selectedRecipe.fr
                      .title
                  }
                </h2>

                <p
                  style={
                    detailTranslationsStyle
                  }
                >
                  {
                    selectedRecipe.en
                      .title
                  }
                  <br />
                  {
                    selectedRecipe.es
                      .title
                  }
                </p>
              </div>
            </div>

            <div style={factsStyle}>
              <span>
                👥{" "}
                {
                  interfaceText.fr
                    .portions
                }
                :{" "}
                {
                  selectedRecipe.portions
                }
              </span>

              <span>
                🥣{" "}
                {
                  interfaceText.fr
                    .preparation
                }
                :{" "}
                {
                  selectedRecipe.preparation
                }{" "}
                min
              </span>

              <span>
                🔥{" "}
                {
                  interfaceText.fr
                    .cooking
                }
                :{" "}
                {selectedRecipe.cooking >
                0
                  ? `${selectedRecipe.cooking} min`
                  : interfaceText.fr
                      .noCooking}
              </span>

              {selectedRecipe.temperature && (
                <span>
                  🌡️{" "}
                  {
                    selectedRecipe.temperature
                  }
                </span>
              )}
            </div>

            <div
              style={languageGridStyle}
            >
              {(
                [
                  "fr",
                  "en",
                  "es",
                ] as Language[]
              ).map((language) => {
                const languageRecipe =
                  selectedRecipe[
                    language
                  ];

                return (
                  <section
                    key={language}
                    style={
                      languageCardStyle
                    }
                  >
                    <h3
                      style={
                        languageHeadingStyle
                      }
                    >
                      {language === "fr"
                        ? "🇨🇦 Français"
                        : language ===
                            "en"
                          ? "🇺🇸 English"
                          : "🇪🇸 Español"}
                    </h3>

                    <h4>
                      {
                        interfaceText[
                          language
                        ].ingredients
                      }
                    </h4>

                    <ul
                      style={
                        ingredientListStyle
                      }
                    >
                      {languageRecipe.ingredients.map(
                        (
                          ingredient,
                        ) => (
                          <li
                            key={
                              ingredient
                            }
                          >
                            {
                              ingredient
                            }
                          </li>
                        ),
                      )}
                    </ul>

                    <h4>
                      {
                        interfaceText[
                          language
                        ].instructions
                      }
                    </h4>

                    <ol
                      style={stepListStyle}
                    >
                      {languageRecipe.steps.map(
                        (
                          step,
                          index,
                        ) => (
                          <li
                            key={`${index}-${step}`}
                          >
                            {step}
                          </li>
                        ),
                      )}
                    </ol>
                  </section>
                );
              })}
            </div>

            <p style={basicNoteStyle}>
              🧂 L’eau, le sel et le
              poivre ne comptent pas
              parmi les cinq ingrédients.
              · Water, salt and pepper do
              not count among the five
              ingredients. · El agua, la
              sal y la pimienta no cuentan
              entre los cinco ingredientes.
            </p>

            <button
              type="button"
              onClick={() =>
                setSelectedId(null)
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

const bookStyle = {
  padding: "20px 0 50px",
};

const headerStyle = {
  maxWidth: "900px",
  margin: "0 auto 30px",
  textAlign: "center" as const,
};

const bookIconStyle = {
  fontSize: "4.5rem",
};

const eyebrowStyle = {
  margin: "8px 0",
  color: "#8A6A3D",
  fontWeight: "bold",
  letterSpacing: ".16em",
  textTransform:
    "uppercase" as const,
  fontSize: ".8rem",
};

const titleStyle = {
  margin: "12px 0",
  color: "#102A4C",
  fontSize:
    "clamp(2.1rem,5vw,4rem)",
  lineHeight: 1.08,
};

const translatedTitleStyle = {
  color: "#8A6A3D",
  fontFamily: "Georgia, serif",
  fontSize:
    "clamp(1rem,2.5vw,1.3rem)",
  lineHeight: 1.7,
};

const subtitleStyle = {
  padding: "15px",
  borderRadius: "16px",
  backgroundColor: "#F7F1E6",
  color: "#6E5B3F",
  lineHeight: 1.7,
};

const toolBarStyle = {
  marginBottom: "28px",
  padding: "20px",
  borderRadius: "20px",
  backgroundColor: "#FFFDF8",
  border: "1px solid #D8C49A",
};

const searchLabelStyle = {
  display: "grid",
  gap: "8px",
  maxWidth: "650px",
  margin: "0 auto 18px",
  color: "#102A4C",
  fontWeight: "bold",
};

const searchInputStyle = {
  width: "100%",
  padding: "13px 16px",
  borderRadius: "999px",
  border: "2px solid #D8C49A",
  backgroundColor: "white",
  color: "#102A4C",
  fontSize: "1rem",
};

const categoryGridStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  justifyContent: "center",
  gap: "8px",
};

const categoryButtonStyle = {
  padding: "9px 13px",
  borderRadius: "999px",
  border: "1px solid #8A6A3D",
  backgroundColor: "#F7F1E6",
  color: "#102A4C",
  fontWeight: "bold",
  cursor: "pointer",
};

const activeCategoryStyle = {
  backgroundColor: "#102A4C",
  color: "#FFFDF8",
};

const recipeGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(220px,1fr))",
  gap: "16px",
};

const recipeCardStyle = {
  position: "relative" as const,
  display: "grid",
  justifyItems: "center",
  gap: "7px",
  minHeight: "255px",
  padding: "25px 18px 18px",
  borderRadius: "18px",
  border: "1px solid #D8C49A",
  backgroundColor: "#FFFDF8",
  color: "#102A4C",
  textAlign: "center" as const,
  cursor: "pointer",
  boxShadow:
    "0 8px 20px rgba(16,42,76,.08)",
};

const recipeNumberStyle = {
  position: "absolute" as const,
  top: "10px",
  left: "12px",
  display: "grid",
  placeItems: "center",
  width: "28px",
  height: "28px",
  borderRadius: "50%",
  backgroundColor: "#102A4C",
  color: "white",
  fontSize: ".78rem",
  fontWeight: "bold",
};

const recipeEmojiStyle = {
  fontSize: "3rem",
};

const categoryNameStyle = {
  color: "#8A6A3D",
  fontSize: ".78rem",
  fontWeight: "bold",
  textTransform:
    "uppercase" as const,
  letterSpacing: ".08em",
};

const recipeTitleStyle = {
  fontFamily: "Georgia, serif",
  fontSize: "1.25rem",
};

const recipeTranslationStyle = {
  color: "#6E5B3F",
  lineHeight: 1.5,
  fontSize: ".9rem",
};

const timeSummaryStyle = {
  marginTop: "auto",
  color: "#102A4C",
  fontWeight: "bold",
  fontSize: ".85rem",
};

const emptyStyle = {
  maxWidth: "650px",
  margin: "30px auto",
  padding: "30px",
  borderRadius: "20px",
  backgroundColor: "#F7F1E6",
  color: "#102A4C",
  textAlign: "center" as const,
  lineHeight: 1.6,
};

const backButtonStyle = {
  display: "block",
  width: "fit-content",
  margin: "34px auto 0",
  padding: "12px 20px",
  borderRadius: "999px",
  backgroundColor: "#102A4C",
  color: "#FFFDF8",
  fontWeight: "bold",
  textDecoration: "none",
};

const overlayStyle = {
  position: "fixed" as const,
  inset: 0,
  zIndex: 2000,
  overflowY: "auto" as const,
  padding: "20px",
  backgroundColor:
    "rgba(9,25,48,.88)",
};

const recipeDetailStyle = {
  position: "relative" as const,
  width: "min(1180px,100%)",
  margin: "20px auto",
  padding:
    "clamp(20px,4vw,38px)",
  borderRadius: "24px",
  backgroundColor: "#FFFDF8",
  color: "#102A4C",
  border: "4px solid #D8C49A",
  boxShadow:
    "0 25px 80px rgba(0,0,0,.45)",
};

const closeIconStyle = {
  position: "absolute" as const,
  top: "12px",
  right: "15px",
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  border: 0,
  backgroundColor: "#102A4C",
  color: "white",
  fontSize: "1.8rem",
  cursor: "pointer",
};

const detailHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  paddingRight: "45px",
};

const detailEmojiStyle = {
  fontSize: "4.5rem",
};

const detailNumberStyle = {
  margin: 0,
  color: "#8A6A3D",
  fontWeight: "bold",
};

const detailTitleStyle = {
  margin: "5px 0",
  fontSize:
    "clamp(1.8rem,4vw,3rem)",
};

const detailTranslationsStyle = {
  margin: 0,
  color: "#6E5B3F",
  lineHeight: 1.6,
};

const factsStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "10px",
  margin: "25px 0",
};

const languageGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(270px,1fr))",
  gap: "16px",
};

const languageCardStyle = {
  padding: "20px",
  borderRadius: "17px",
  backgroundColor: "#F7F1E6",
  borderTop: "6px solid #8A6A3D",
};

const languageHeadingStyle = {
  marginTop: 0,
  color: "#102A4C",
  fontSize: "1.35rem",
};

const ingredientListStyle = {
  paddingLeft: "20px",
  lineHeight: 1.75,
};

const stepListStyle = {
  paddingLeft: "22px",
  lineHeight: 1.75,
};

const basicNoteStyle = {
  marginTop: "22px",
  padding: "15px",
  borderRadius: "14px",
  backgroundColor: "#E4F4E8",
  color: "#244C2D",
  lineHeight: 1.65,
};

const closeButtonStyle = {
  display: "block",
  margin: "25px auto 0",
  padding: "12px 22px",
  border: 0,
  borderRadius: "999px",
  backgroundColor: "#102A4C",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};