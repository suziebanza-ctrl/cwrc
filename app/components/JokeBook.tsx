"use client";

import {
  useMemo,
  useState,
} from "react";
import {
  jokeCategories,
  jokes,
  type JokeCategory,
} from "./jokeData";

type Language = "fr" | "en" | "es";

const text = {
  fr: {
    eyebrow:
      "Bibliothèque humoristique du CWRC",
    title:
      "Les 100 petites blagues à raconter",
    subtitle:
      "Courtes à apprendre. Difficiles à oublier. Présentées en trois langues.",
    search: "Rechercher une blague",
    placeholder:
      "Chat, thé, chocolat, école…",
    all: "Toutes",
    random: "Blague au hasard",
    words: "Mots à retenir",
    close: "Fermer",
    back: "Retour à la bibliothèque",
    noResult:
      "Aucune blague trouvée. Le chocolat refuse de commenter.",
  },

  en: {
    eyebrow:
      "CWRC Humour Library",
    title:
      "100 Little Jokes to Tell",
    subtitle:
      "Easy to learn. Hard to forget. Presented in three languages.",
    search: "Search for a joke",
    placeholder:
      "Cat, tea, chocolate, school…",
    all: "All",
    random: "Random joke",
    words: "Words to remember",
    close: "Close",
    back: "Back to the library",
    noResult:
      "No joke was found. The chocolate declined to comment.",
  },

  es: {
    eyebrow:
      "Biblioteca de humor del CWRC",
    title:
      "100 pequeños chistes para contar",
    subtitle:
      "Fáciles de aprender. Difíciles de olvidar. Presentados en tres idiomas.",
    search: "Buscar un chiste",
    placeholder:
      "Gato, té, chocolate, escuela…",
    all: "Todos",
    random: "Chiste al azar",
    words: "Palabras para recordar",
    close: "Cerrar",
    back: "Volver a la biblioteca",
    noResult:
      "No se encontró ningún chiste. El chocolate se negó a comentar.",
  },
} as const;

export default function JokeBook() {
  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState<JokeCategory | "all">(
      "all",
    );

  const [selectedId, setSelectedId] =
    useState<number | null>(null);

  const filteredJokes = useMemo(() => {
    const normalized =
      search.trim().toLowerCase();

    return jokes.filter((joke) => {
      const matchesCategory =
        category === "all" ||
        joke.category === category;

      const searchable = [
        joke.fr,
        joke.en,
        joke.es,
        ...joke.words.flat(),
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesCategory &&
        (!normalized ||
          searchable.includes(
            normalized,
          ))
      );
    });
  }, [category, search]);

  const selectedJoke =
    selectedId === null
      ? null
      : jokes.find(
          (joke) =>
            joke.id === selectedId,
        ) ?? null;

  function openRandomJoke() {
    const source =
      filteredJokes.length > 0
        ? filteredJokes
        : jokes;

    const randomIndex = Math.floor(
      Math.random() * source.length,
    );

    setSelectedId(
      source[randomIndex].id,
    );
  }

  return (
    <section style={bookStyle}>
      <header style={headerStyle}>
        <div style={bookIconStyle}>
          📚😄
        </div>

        <p style={eyebrowStyle}>
          {text.fr.eyebrow}
        </p>

        <h1 style={titleStyle}>
          {text.fr.title}
        </h1>

        <p style={translatedTitleStyle}>
          {text.en.title}
          <br />
          {text.es.title}
        </p>

        <div style={subtitleBoxStyle}>
          <p>{text.fr.subtitle}</p>
          <p>{text.en.subtitle}</p>
          <p>{text.es.subtitle}</p>
        </div>
      </header>

      <section style={controlsStyle}>
        <label style={searchLabelStyle}>
          <span>
            🔎 {text.fr.search} ·{" "}
            {text.en.search} ·{" "}
            {text.es.search}
          </span>

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value,
              )
            }
            placeholder={
              text.fr.placeholder
            }
            style={searchInputStyle}
          />
        </label>

        <button
          type="button"
          onClick={openRandomJoke}
          style={randomButtonStyle}
        >
          🎲 {text.fr.random} ·{" "}
          {text.en.random} ·{" "}
          {text.es.random}
        </button>

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
            ✨ {text.fr.all} ·{" "}
            {text.en.all} ·{" "}
            {text.es.all}
          </button>

          {jokeCategories.map(
            (item) => (
              <button
                key={item.key}
                type="button"
                onClick={() =>
                  setCategory(item.key)
                }
                style={{
                  ...categoryButtonStyle,
                  ...(category ===
                  item.key
                    ? activeCategoryStyle
                    : {}),
                }}
              >
                {item.icon} {item.fr}
              </button>
            ),
          )}
        </div>
      </section>

      {filteredJokes.length === 0 ? (
        <div style={emptyStyle}>
          <span style={emptyIconStyle}>
            🍫
          </span>

          <p>{text.fr.noResult}</p>
          <p>{text.en.noResult}</p>
          <p>{text.es.noResult}</p>
        </div>
      ) : (
        <div style={jokeGridStyle}>
          {filteredJokes.map((joke) => {
            const categoryItem =
              jokeCategories.find(
                (item) =>
                  item.key ===
                  joke.category,
              );

            return (
              <button
                key={joke.id}
                type="button"
                onClick={() =>
                  setSelectedId(
                    joke.id,
                  )
                }
                style={jokeCardStyle}
              >
                <span
                  style={
                    jokeNumberStyle
                  }
                >
                  {joke.id}
                </span>

                <span
                  style={
                    jokeEmojiStyle
                  }
                >
                  {joke.emoji}
                </span>

                <span
                  style={
                    categoryLabelStyle
                  }
                >
                  {categoryItem?.icon}{" "}
                  {categoryItem?.fr}
                </span>

                <span
                  style={
                    jokePreviewStyle
                  }
                >
                  {joke.fr}
                </span>

                <span
                  style={readStyle}
                >
                  FR · EN · ES
                </span>
              </button>
            );
          })}
        </div>
      )}

      <a
        href="/library"
        style={backButtonStyle}
      >
        ← {text.fr.back} ·{" "}
        {text.en.back} ·{" "}
        {text.es.back}
      </a>

      {selectedJoke && (
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
            aria-labelledby="joke-title"
            style={detailStyle}
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

            <header style={detailHeaderStyle}>
              <span
                style={
                  detailEmojiStyle
                }
              >
                {selectedJoke.emoji}
              </span>

              <div>
                <p
                  style={
                    detailNumberStyle
                  }
                >
                  Blague · Joke ·
                  Chiste{" "}
                  {selectedJoke.id}
                </p>

                <h2
                  id="joke-title"
                  style={
                    detailTitleStyle
                  }
                >
                  À raconter partout
                </h2>
              </div>
            </header>

            <div
              style={languageGridStyle}
            >
              {(
                [
                  "fr",
                  "en",
                  "es",
                ] as Language[]
              ).map((language) => (
                <section
                  key={language}
                  style={
                    languageCardStyle
                  }
                >
                  <h3
                    style={
                      languageTitleStyle
                    }
                  >
                    {language === "fr"
                      ? "🇨🇦 Français"
                      : language ===
                          "en"
                        ? "🇺🇸 English"
                        : "🇪🇸 Español"}
                  </h3>

                  <p
                    style={
                      fullJokeStyle
                    }
                  >
                    {
                      selectedJoke[
                        language
                      ]
                    }
                  </p>
                </section>
              ))}
            </div>

            <section style={wordsStyle}>
              <h3 style={{ marginTop: 0 }}>
                🧠 {text.fr.words} ·{" "}
                {text.en.words} ·{" "}
                {text.es.words}
              </h3>

              <div
                style={wordGridStyle}
              >
                {selectedJoke.words.map(
                  (word, index) => (
                    <div
                      key={`${index}-${word.join("-")}`}
                      style={
                        wordCardStyle
                      }
                    >
                      <span>
                        🇨🇦 {word[0]}
                      </span>

                      <span>
                        🇺🇸 {word[1]}
                      </span>

                      <span>
                        🇪🇸 {word[2]}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </section>

            <div
              style={
                detailButtonsStyle
              }
            >
              <button
                type="button"
                onClick={
                  openRandomJoke
                }
                style={
                  randomDetailButtonStyle
                }
              >
                🎲 {text.fr.random}
              </button>

              <button
                type="button"
                onClick={() =>
                  setSelectedId(null)
                }
                style={closeButtonStyle}
              >
                {text.fr.close} ·{" "}
                {text.en.close} ·{" "}
                {text.es.close}
              </button>
            </div>
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
  margin: "10px 0",
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
    "clamp(2.2rem,5vw,4.2rem)",
  lineHeight: 1.08,
};

const translatedTitleStyle = {
  color: "#8A6A3D",
  fontFamily: "Georgia, serif",
  fontSize:
    "clamp(1rem,2.5vw,1.3rem)",
  lineHeight: 1.7,
};

const subtitleBoxStyle = {
  marginTop: "20px",
  padding: "14px 20px",
  borderRadius: "18px",
  backgroundColor: "#F7F1E6",
  color: "#6E5B3F",
  lineHeight: 1.5,
};

const controlsStyle = {
  marginBottom: "28px",
  padding: "20px",
  borderRadius: "20px",
  backgroundColor: "#FFFDF8",
  border: "1px solid #D8C49A",
};

const searchLabelStyle = {
  display: "grid",
  gap: "8px",
  maxWidth: "680px",
  margin: "0 auto 15px",
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

const randomButtonStyle = {
  display: "block",
  margin: "0 auto 18px",
  padding: "12px 19px",
  border: 0,
  borderRadius: "999px",
  backgroundColor: "#8A6A3D",
  color: "#FFFDF8",
  fontWeight: "bold",
  cursor: "pointer",
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

const jokeGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(230px,1fr))",
  gap: "16px",
};

const jokeCardStyle = {
  position: "relative" as const,
  display: "grid",
  justifyItems: "center",
  gap: "9px",
  minHeight: "260px",
  padding: "28px 18px 18px",
  borderRadius: "18px",
  border: "1px solid #D8C49A",
  backgroundColor: "#FFFDF8",
  color: "#102A4C",
  textAlign: "center" as const,
  cursor: "pointer",
  boxShadow:
    "0 8px 20px rgba(16,42,76,.08)",
};

const jokeNumberStyle = {
  position: "absolute" as const,
  top: "10px",
  left: "12px",
  display: "grid",
  placeItems: "center",
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  backgroundColor: "#102A4C",
  color: "white",
  fontSize: ".78rem",
  fontWeight: "bold",
};

const jokeEmojiStyle = {
  fontSize: "3rem",
};

const categoryLabelStyle = {
  color: "#8A6A3D",
  fontSize: ".78rem",
  fontWeight: "bold",
  textTransform:
    "uppercase" as const,
  letterSpacing: ".08em",
};

const jokePreviewStyle = {
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient:
    "vertical" as const,
  WebkitLineClamp: 5,
  fontFamily: "Georgia, serif",
  fontSize: "1.05rem",
  lineHeight: 1.55,
  whiteSpace: "pre-line" as const,
};

const readStyle = {
  marginTop: "auto",
  color: "#8A6A3D",
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

const emptyIconStyle = {
  fontSize: "3rem",
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
    "rgba(9,25,48,.9)",
};

const detailStyle = {
  position: "relative" as const,
  width: "min(1100px,100%)",
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
  gap: "18px",
  paddingRight: "45px",
};

const detailEmojiStyle = {
  fontSize: "4rem",
};

const detailNumberStyle = {
  margin: 0,
  color: "#8A6A3D",
  fontWeight: "bold",
};

const detailTitleStyle = {
  margin: "5px 0",
  fontSize:
    "clamp(1.7rem,4vw,2.7rem)",
};

const languageGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(270px,1fr))",
  gap: "16px",
  marginTop: "25px",
};

const languageCardStyle = {
  padding: "22px",
  borderRadius: "18px",
  backgroundColor: "#F7F1E6",
  borderTop: "6px solid #8A6A3D",
};

const languageTitleStyle = {
  marginTop: 0,
  color: "#102A4C",
  fontSize: "1.3rem",
};

const fullJokeStyle = {
  marginBottom: 0,
  whiteSpace: "pre-line" as const,
  fontFamily: "Georgia, serif",
  fontSize: "1.18rem",
  lineHeight: 1.7,
};

const wordsStyle = {
  marginTop: "22px",
  padding: "20px",
  borderRadius: "18px",
  backgroundColor: "#E4F4E8",
  color: "#244C2D",
};

const wordGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(180px,1fr))",
  gap: "10px",
};

const wordCardStyle = {
  display: "grid",
  gap: "5px",
  padding: "12px",
  borderRadius: "12px",
  backgroundColor:
    "rgba(255,255,255,.7)",
};

const detailButtonsStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  justifyContent: "center",
  gap: "10px",
  marginTop: "25px",
};

const randomDetailButtonStyle = {
  padding: "12px 20px",
  border: 0,
  borderRadius: "999px",
  backgroundColor: "#8A6A3D",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const closeButtonStyle = {
  padding: "12px 20px",
  border: 0,
  borderRadius: "999px",
  backgroundColor: "#102A4C",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};