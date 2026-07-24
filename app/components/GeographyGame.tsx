"use client";

import {useEffect, useMemo, useState} from "react";
import countries from "world-countries";
import {geoEqualEarth, geoPath} from "d3-geo";
import {feature} from "topojson-client";
import worldData from "world-atlas/countries-50m.json";
import * as FlagIcons from "country-flag-icons/react/3x2";
import type {Locale} from "../i18n/config";

type Mode = "world" | "continent";
type Stage = "country" | "capital" | "flag";
type Country = (typeof countries)[number];

const text = {
  fr: {
    eyebrow: "Département de géographie du CWRC",
    title: "Le défi des deux globes",
    intro:
      "Trouvez le pays, sa capitale, puis son drapeau. Le hibou surveille les frontières avec un sérieux tout à fait excessif.",
    world: "Grand globe : défi mondial",
    continent: "Petit globe : choisir un continent",
    africa: "Afrique",
    americas: "Amériques",
    asia: "Asie",
    europe: "Europe",
    oceania: "Océanie",
    countryQuestion: "Quel pays est illuminé sur la carte?",
    capitalQuestion: "Quelle est sa capitale?",
    flagQuestion: "Quel est son drapeau?",
    correct: "Exact!",
    wrong: "Pas tout à fait. La bonne réponse était :",
    next: "Question suivante",
    restart: "Recommencer",
    score: "Pointage",
    round: "Manche",
    choose: "Choisissez votre défi",
    back: "Changer de défi",
    finished: "Mission accomplie!",
    final:
      "Le hibou géographe inscrit officiellement votre résultat dans son petit carnet.",
  },

  en: {
    eyebrow: "CWRC Geography Department",
    title: "The Two-Globe Challenge",
    intro:
      "Find the country, its capital, and then its flag. The owl is monitoring the borders with entirely excessive seriousness.",
    world: "Large globe: world challenge",
    continent: "Small globe: choose a continent",
    africa: "Africa",
    americas: "Americas",
    asia: "Asia",
    europe: "Europe",
    oceania: "Oceania",
    countryQuestion: "Which country is highlighted on the map?",
    capitalQuestion: "What is its capital?",
    flagQuestion: "Which is its flag?",
    correct: "Correct!",
    wrong: "Not quite. The correct answer was:",
    next: "Next question",
    restart: "Play again",
    score: "Score",
    round: "Round",
    choose: "Choose your challenge",
    back: "Change challenge",
    finished: "Mission accomplished!",
    final:
      "The geography owl officially records your result in its little notebook.",
  },

  es: {
    eyebrow: "Departamento de Geografía del CWRC",
    title: "El desafío de los dos globos",
    intro:
      "Encuentra el país, su capital y luego su bandera. El búho vigila las fronteras con una seriedad totalmente excesiva.",
    world: "Globo grande: desafío mundial",
    continent: "Globo pequeño: elegir un continente",
    africa: "África",
    americas: "Américas",
    asia: "Asia",
    europe: "Europa",
    oceania: "Oceanía",
    countryQuestion: "¿Qué país está iluminado en el mapa?",
    capitalQuestion: "¿Cuál es su capital?",
    flagQuestion: "¿Cuál es su bandera?",
    correct: "¡Correcto!",
    wrong: "No exactamente. La respuesta correcta era:",
    next: "Siguiente pregunta",
    restart: "Jugar de nuevo",
    score: "Puntuación",
    round: "Ronda",
    choose: "Elige tu desafío",
    back: "Cambiar desafío",
    finished: "¡Misión cumplida!",
    final:
      "El búho geógrafo registra oficialmente tu resultado en su pequeño cuaderno.",
  },
} as const;

const regions = [
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
] as const;

type MapFeature = {
  type: "Feature";
  id?: string | number;
  properties?: {
    name?: string;
  };
  geometry: unknown;
};

const mapFeatures = (
  feature(
    worldData as never,
    (
      worldData as unknown as {
        objects: {
          countries: never;
        };
      }
    ).objects.countries,
  ) as unknown as {
    features: MapFeature[];
  }
).features;

function localizedName(country: Country, locale: Locale) {
  if (locale === "fr") {
    return country.translations.fra?.common ?? country.name.common;
  }

  if (locale === "es") {
    return country.translations.spa?.common ?? country.name.common;
  }

  return country.name.common;
}

function shuffled<T>(items: T[]) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function choices<T>(answer: T, pool: T[]) {
  const alternatives = shuffled(
    pool.filter((item) => item !== answer),
  ).slice(0, 2);

  return shuffled([answer, ...alternatives]);
}

export default function GeographyGame({
  locale,
}: {
  locale: Locale;
}) {
  const t = text[locale];

  const playable = useMemo(
    () =>
      countries.filter(
        (country) =>
          (country.independent || country.cca2 === "PS") &&
          country.capital.length > 0 &&
          country.latlng.length === 2,
      ),
    [],
  );

  const [mode, setMode] = useState<Mode | null>(null);
  const [entryMode, setEntryMode] = useState<Mode | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [deck, setDeck] = useState<Country[]>([]);
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<Stage>("country");
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const current = deck[index];

  const pool = useMemo(
    () =>
      region
        ? playable.filter((country) => country.region === region)
        : playable,
    [playable, region],
  );

  useEffect(() => {
    const requestedMode = new URLSearchParams(
      window.location.search,
    ).get("mode");

    if (requestedMode === "continent") {
      setEntryMode("continent");
      return;
    }

    if (requestedMode === "world") {
      setEntryMode("world");
      setMode("world");
      setRegion(null);
      setDeck(shuffled(playable));
      setIndex(0);
      setStage("country");
      setScore(0);
      setAnswered(false);
      setIsCorrect(false);
    }
  }, [playable]);

  function start(
    selectedMode: Mode,
    selectedRegion?: string,
  ) {
    const source = selectedRegion
      ? playable.filter(
          (country) => country.region === selectedRegion,
        )
      : playable;

    setMode(selectedMode);
    setRegion(selectedRegion ?? null);
    setDeck(shuffled(source));
    setIndex(0);
    setStage("country");
    setScore(0);
    setAnswered(false);
    setIsCorrect(false);
  }

  function expectedAnswer() {
    if (stage === "country") {
      return localizedName(current, locale);
    }

    if (stage === "capital") {
      return current.capital[0];
    }

    return current.cca2;
  }

  function answer(value: string) {
    if (answered) {
      return;
    }

    const correct = value === expectedAnswer();

    setIsCorrect(correct);
    setAnswered(true);

    if (correct) {
      setScore((oldScore) => oldScore + 1);
    }
  }

  function next() {
    setAnswered(false);
    setIsCorrect(false);

    if (stage === "country") {
      setStage("capital");
      return;
    }

    if (stage === "capital") {
      setStage("flag");
      return;
    }

    setStage("country");
    setIndex((oldIndex) => oldIndex + 1);
  }

  function changeChallenge() {
    setEntryMode(null);
    setMode(null);
    setRegion(null);
    setDeck([]);
    setIndex(0);
    setStage("country");
    setAnswered(false);
    setIsCorrect(false);
  }

  const options = useMemo(() => {
    if (!current) {
      return [];
    }

    if (stage === "country") {
      return choices(
        localizedName(current, locale),
        pool.map((country) => localizedName(country, locale)),
      );
    }

    if (stage === "capital") {
      return choices(
        current.capital[0],
        pool
          .map((country) => country.capital[0])
          .filter(Boolean),
      );
    }

    return choices(
      current.cca2,
      pool.map((country) => country.cca2),
    );
  }, [current, locale, pool, stage]);

  if (!mode) {
    return (
      <section style={shellStyle}>
        <Header t={t} />

        <h2 style={centerStyle}>{t.choose}</h2>

        <div style={modeGridStyle}>
          {entryMode !== "continent" && (
            <button
              type="button"
              style={modeButtonStyle}
              onClick={() => start("world")}
            >
              <span style={globeStyle}>🌍</span>
              <strong>{t.world}</strong>
            </button>
          )}

          {entryMode !== "world" && (
            <div style={continentCardStyle}>
              <span style={globeStyle}>🌐</span>
              <strong>{t.continent}</strong>

              <div style={continentGridStyle}>
                {regions.map((item) => (
                  <button
                    type="button"
                    key={item}
                    style={smallButtonStyle}
                    onClick={() => start("continent", item)}
                  >
                    {
                      t[
                        item.toLowerCase() as
                          | "africa"
                          | "americas"
                          | "asia"
                          | "europe"
                          | "oceania"
                      ]
                    }
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  if (index >= deck.length) {
    return (
      <section style={shellStyle}>
        <Header t={t} />

        <div style={finishStyle}>
          <div style={owlStyle}>🦉</div>

          <h2>{t.finished}</h2>
          <p>{t.final}</p>

          <p style={bigScoreStyle}>
            {t.score}: {score} / {deck.length * 3}
          </p>

          <button
            type="button"
            style={primaryButtonStyle}
            onClick={() => start(mode, region ?? undefined)}
          >
            {t.restart}
          </button>

          <button
            type="button"
            style={linkButtonStyle}
            onClick={changeChallenge}
          >
            {t.back}
          </button>
        </div>
      </section>
    );
  }

  const question =
    stage === "country"
      ? t.countryQuestion
      : stage === "capital"
        ? t.capitalQuestion
        : t.flagQuestion;

  return (
    <section style={shellStyle}>
      <Header t={t} />

      <div style={statusStyle}>
        <span>
          {t.round} {index + 1} / {deck.length}
        </span>

        <span>
          {t.score}: {score}
        </span>
      </div>

      <WorldMap country={current} region={region} />

      <article style={questionCardStyle}>
        <p style={stageStyle}>
          {stage === "country"
            ? "1 / 3"
            : stage === "capital"
              ? "2 / 3"
              : "3 / 3"}
        </p>

        <h2 style={questionStyle}>{question}</h2>

        <div style={answersGridStyle}>
          {options.map((option) => (
            <button
              type="button"
              key={option}
              disabled={answered}
              onClick={() => answer(option)}
              style={answerButtonStyle}
            >
              {stage === "flag" ? (
                <FlagIcon code={option} />
              ) : (
                option
              )}
            </button>
          ))}
        </div>

        {answered && (
          <div style={isCorrect ? successStyle : errorStyle}>
            <strong>{isCorrect ? t.correct : t.wrong}</strong>

            {!isCorrect && (
              <span>
                {" "}
                {stage === "flag"
                  ? localizedName(current, locale)
                  : expectedAnswer()}
              </span>
            )}

            <div>
              <button
                type="button"
                style={primaryButtonStyle}
                onClick={next}
              >
                {t.next}
              </button>
            </div>
          </div>
        )}
      </article>

      <button
        type="button"
        style={linkButtonStyle}
        onClick={changeChallenge}
      >
        {t.back}
      </button>
    </section>
  );
}

function Header({
  t,
}: {
  t: (typeof text)[Locale];
}) {
  return (
    <>
      <p style={eyebrowStyle}>{t.eyebrow}</p>
      <h1 style={titleStyle}>{t.title}</h1>
      <p style={introStyle}>{t.intro}</p>
    </>
  );
}

function FlagIcon({
  code,
}: {
  code: string;
}) {
  const Flag =
    FlagIcons[code as keyof typeof FlagIcons];

  if (!Flag) {
    return <span>{code}</span>;
  }

  return <Flag title={code} style={flagStyle} />;
}

function WorldMap({
  country,
  region,
}: {
  country: Country;
  region: string | null;
}) {
  const visibleFeatures = useMemo(() => {
    if (!region) {
      return mapFeatures;
    }

    const regionIds = new Set(
      countries
        .filter((item) => item.region === region)
        .map((item) => item.ccn3),
    );

    return mapFeatures.filter((mapCountry) =>
      regionIds.has(
        String(mapCountry.id ?? "").padStart(3, "0"),
      ),
    );
  }, [region]);

  const projection = useMemo(() => {
    const nextProjection = geoEqualEarth();

    if (!region) {
      return nextProjection.fitExtent(
        [
          [10, 10],
          [990, 490],
        ],
        {type: "Sphere"},
      );
    }

    return nextProjection.fitExtent(
      [
        [35, 28],
        [965, 460],
      ],
      {
        type: "FeatureCollection",
        features: visibleFeatures,
      } as never,
    );
  }, [region, visibleFeatures]);

  const drawPath = useMemo(
    () => geoPath(projection),
    [projection],
  );

  const countryPoint = projection([
    country.latlng[1],
    country.latlng[0],
  ]);

  return (
    <div style={mapFrameStyle}>
      <svg
        viewBox="0 0 1000 500"
        role="img"
        aria-label={`Map showing ${country.name.common}`}
        style={mapSvgStyle}
      >
        <rect
          width="1000"
          height="500"
          rx="22"
          fill="#A9D7E5"
        />

        <path
          d={
            drawPath({
              type: "Sphere",
            }) ?? undefined
          }
          fill="none"
          stroke="#102A4C"
          strokeWidth="3"
        />

        {visibleFeatures.map((mapCountry, mapIndex) => {
          const mapId = String(
            mapCountry.id ?? "",
          ).padStart(3, "0");

          const selected = mapId === country.ccn3;

          const path = drawPath(
            mapCountry as Parameters<typeof drawPath>[0],
          );

          if (!path) {
            return null;
          }

          return (
            <path
              key={`${mapId}-${mapIndex}`}
              d={path}
              fill={selected ? "#F3B61F" : "#F7F1E6"}
              stroke={selected ? "#8B3A2E" : "#8A6A3D"}
              strokeWidth={selected ? 3.5 : 0.75}
              vectorEffect="non-scaling-stroke"
              style={selected ? selectedCountryStyle : undefined}
            />
          );
        })}

        {countryPoint && (
          <g
            transform={`translate(${countryPoint[0]} ${countryPoint[1]})`}
            aria-hidden="true"
          >
            <circle
              r="10"
              fill="rgba(243,182,31,.3)"
              stroke="#8B3A2E"
              strokeWidth="2"
            />

            <circle
              r="4.5"
              fill="#F3B61F"
              stroke="#8B3A2E"
              strokeWidth="1.5"
            />
          </g>
        )}
      </svg>

      <div style={mapHintStyle}>
        ★ CWRC WORLD ATLAS
      </div>
    </div>
  );
}

const shellStyle = {
  maxWidth: "1050px",
  margin: "0 auto",
  padding: "22px 0 48px",
};

const eyebrowStyle = {
  textAlign: "center" as const,
  textTransform: "uppercase" as const,
  letterSpacing: ".16em",
  color: "#8A6A3D",
  fontWeight: "bold",
  fontSize: ".8rem",
};

const titleStyle = {
  textAlign: "center" as const,
  color: "#102A4C",
  fontSize: "clamp(2.3rem,6vw,4.5rem)",
  margin: "10px 0",
};

const introStyle = {
  maxWidth: "760px",
  margin: "18px auto 30px",
  textAlign: "center" as const,
  color: "#6E5B3F",
  fontSize: "1.12rem",
  lineHeight: 1.7,
};

const centerStyle = {
  textAlign: "center" as const,
  color: "#102A4C",
};

const modeGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(270px,1fr))",
  gap: "22px",
  marginTop: "28px",
};

const modeButtonStyle = {
  padding: "32px",
  borderRadius: "22px",
  border: "2px solid #D8C49A",
  background: "#FFFDF8",
  color: "#102A4C",
  cursor: "pointer",
  display: "grid",
  gap: "15px",
  fontSize: "1.15rem",
};

const continentCardStyle = {
  ...modeButtonStyle,
  cursor: "default",
};

const globeStyle = {
  fontSize: "4.8rem",
};

const continentGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2,1fr)",
  gap: "8px",
};

const smallButtonStyle = {
  padding: "10px",
  borderRadius: "999px",
  border: "1px solid #8A6A3D",
  background: "#F7F1E6",
  color: "#102A4C",
  cursor: "pointer",
  fontWeight: "bold",
};

const statusStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 18px",
  borderRadius: "999px",
  background: "#102A4C",
  color: "white",
  fontWeight: "bold",
  marginBottom: "18px",
};

const mapFrameStyle = {
  position: "relative" as const,
  overflow: "hidden",
  borderRadius: "22px",
  border: "7px solid #D8C49A",
  backgroundColor: "#A9D7E5",
  boxShadow:
    "inset 0 0 35px rgba(16,42,76,.25),0 12px 28px rgba(16,42,76,.12)",
};

const mapSvgStyle = {
  display: "block",
  width: "100%",
  height: "auto",
};

const selectedCountryStyle = {
  filter: "drop-shadow(0 0 8px #FFF4A8)",
  transition: "fill .25s ease",
};

const mapHintStyle = {
  position: "absolute" as const,
  bottom: "8px",
  right: "12px",
  padding: "5px 9px",
  borderRadius: "999px",
  backgroundColor: "rgba(16,42,76,.78)",
  color: "#FFFDF8",
  fontWeight: "bold",
  fontSize: "clamp(.55rem,1.4vw,.75rem)",
  letterSpacing: ".08em",
};

const questionCardStyle = {
  marginTop: "22px",
  padding: "clamp(20px,4vw,34px)",
  borderRadius: "22px",
  background: "#FFFDF8",
  border: "1px solid #D8C49A",
  boxShadow: "0 12px 30px rgba(16,42,76,.1)",
};

const stageStyle = {
  color: "#8A6A3D",
  fontWeight: "bold",
  letterSpacing: ".12em",
};

const questionStyle = {
  color: "#102A4C",
  fontSize: "clamp(1.5rem,4vw,2.2rem)",
};

const answersGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(180px,1fr))",
  gap: "12px",
};

const answerButtonStyle = {
  minHeight: "92px",
  padding: "14px",
  borderRadius: "15px",
  border: "2px solid #D8C49A",
  background: "#F7F1E6",
  color: "#102A4C",
  cursor: "pointer",
  fontWeight: "bold",
};

const flagStyle = {
  display: "block",
  width: "100%",
  maxWidth: "150px",
  height: "auto",
  margin: "0 auto",
  borderRadius: "6px",
  boxShadow: "0 3px 10px rgba(16,42,76,.22)",
};

const successStyle = {
  marginTop: "18px",
  padding: "18px",
  borderRadius: "15px",
  background: "#E4F4E8",
  color: "#244C2D",
  lineHeight: 1.7,
};

const errorStyle = {
  ...successStyle,
  background: "#FFF0ED",
  color: "#74372C",
};

const primaryButtonStyle = {
  marginTop: "14px",
  padding: "12px 20px",
  borderRadius: "999px",
  border: "none",
  background: "#102A4C",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const linkButtonStyle = {
  display: "block",
  margin: "18px auto",
  padding: "8px",
  border: "none",
  background: "transparent",
  color: "#8A6A3D",
  textDecoration: "underline",
  cursor: "pointer",
};

const finishStyle = {
  maxWidth: "650px",
  margin: "30px auto",
  padding: "35px",
  textAlign: "center" as const,
  borderRadius: "24px",
  background: "#F7F1E6",
  color: "#102A4C",
};

const owlStyle = {
  fontSize: "5rem",
};

const bigScoreStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
};