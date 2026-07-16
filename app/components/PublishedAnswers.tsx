"use client";

import { useEffect, useState } from "react";
import type { Locale } from "../i18n/config";

type PublishedAnswer = {
  id: string;
  category: string;
  question: string;
  response: string;
  answered_at: string | null;
};

const copy = {
  fr: {
    title: "Les réponses officielles du CWRC",
    intro:
      "Questions examinées, réponses approuvées et café scientifiquement supervisé.",
    loading:
      "Ouverture des archives publiques… le hibou cherche la bonne clé.",
    empty:
      "Aucune réponse officielle n’est encore publiée. Le café profite de ce rare moment de calme.",
    answer: "Réponse officielle",
    published: "Approuvée le",
    error:
      "Les archives publiques refusent momentanément de s’ouvrir.",
  },

  en: {
    title: "Official CWRC answers",
    intro:
      "Questions examined, answers approved, and coffee scientifically supervised.",
    loading:
      "Opening the public archives… the owl is looking for the correct key.",
    empty:
      "No official response has been published yet. The coffee is enjoying this rare moment of peace.",
    answer: "Official response",
    published: "Approved on",
    error:
      "The public archives temporarily refuse to open.",
  },

  es: {
    title: "Respuestas oficiales del CWRC",
    intro:
      "Preguntas examinadas, respuestas aprobadas y café supervisado científicamente.",
    loading:
      "Abriendo los archivos públicos… el búho busca la llave correcta.",
    empty:
      "Todavía no se ha publicado ninguna respuesta oficial. El café disfruta de este raro momento de calma.",
    answer: "Respuesta oficial",
    published: "Aprobada el",
    error:
      "Los archivos públicos se niegan temporalmente a abrirse.",
  },
} as const;

export default function PublishedAnswers({
  locale,
}: {
  locale: Locale;
}) {
  const t = copy[locale];

  const [answers, setAnswers] = useState<
    PublishedAnswer[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  useEffect(() => {
    async function loadAnswers() {
      if (!url || !key) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${url}/rest/v1/ask_cathy_questions` +
            `?select=id,category,question,response,answered_at` +
            `&status=eq.approved` +
            `&response=not.is.null` +
            `&order=answered_at.desc`,
          {
            headers: {
              apikey: key,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Unable to read answers");
        }

        setAnswers(await response.json());
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    void loadAnswers();
  }, [url, key]);

  return (
    <section style={sectionStyle}>
      <p style={eyebrowStyle}>CWRC</p>

      <h1 style={titleStyle}>{t.title}</h1>

      <p style={introStyle}>{t.intro}</p>

      {loading && (
        <p style={noticeStyle}>☕ {t.loading}</p>
      )}

      {!loading && error && (
        <p role="alert" style={errorStyle}>
          {t.error}
        </p>
      )}

      {!loading && !error && answers.length === 0 && (
        <p style={noticeStyle}>{t.empty}</p>
      )}

      {!loading && !error && answers.length > 0 && (
        <div style={answersStyle}>
          {answers.map((item) => (
            <article key={item.id} style={cardStyle}>
              <div style={cardHeaderStyle}>
                <span style={categoryStyle}>
                  {item.category}
                </span>

                {item.answered_at && (
                  <span style={dateStyle}>
                    {t.published}{" "}
                    {new Intl.DateTimeFormat(locale, {
                      dateStyle: "long",
                    }).format(
                      new Date(item.answered_at),
                    )}
                  </span>
                )}
              </div>

              <h2 style={questionStyle}>
                {item.question}
              </h2>

              <div style={answerStyle}>
                <strong style={answerLabelStyle}>
                  {t.answer}
                </strong>

                <p style={responseStyle}>
                  {item.response}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

const sectionStyle = {
  marginTop: "24px",
};

const eyebrowStyle = {
  margin: 0,
  textAlign: "center" as const,
  letterSpacing: ".18em",
  color: "#8A6A3D",
  fontWeight: "bold",
  fontSize: ".82rem",
};

const titleStyle = {
  margin: "12px 0",
  textAlign: "center" as const,
  color: "#102A4C",
  fontSize: "clamp(2.4rem,6vw,4.6rem)",
  lineHeight: 1,
};

const introStyle = {
  maxWidth: "760px",
  margin: "20px auto 36px",
  textAlign: "center" as const,
  color: "#8A6A3D",
  fontSize: "1.25rem",
  lineHeight: 1.6,
};

const answersStyle = {
  display: "grid",
  gap: "26px",
};

const cardStyle = {
  padding: "28px",
  borderRadius: "22px",
  backgroundColor: "#FFFDF8",
  border: "1px solid rgba(138,106,61,.28)",
  boxShadow: "0 14px 34px rgba(16,42,76,.1)",
};

const cardHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  flexWrap: "wrap" as const,
  alignItems: "center",
};

const categoryStyle = {
  padding: "6px 12px",
  borderRadius: "999px",
  backgroundColor: "#D8C49A",
  color: "#102A4C",
  fontWeight: "bold",
  fontSize: ".85rem",
};

const dateStyle = {
  color: "#6E5B3F",
  fontSize: ".85rem",
};

const questionStyle = {
  margin: "22px 0",
  color: "#102A4C",
  fontSize: "1.65rem",
  lineHeight: 1.35,
};

const answerStyle = {
  padding: "22px",
  borderRadius: "17px",
  backgroundColor: "#F7F1E6",
  borderLeft: "7px solid #8A6A3D",
};

const answerLabelStyle = {
  display: "block",
  marginBottom: "12px",
  color: "#8A6A3D",
  letterSpacing: ".06em",
  textTransform: "uppercase" as const,
  fontSize: ".82rem",
};

const responseStyle = {
  margin: 0,
  color: "#102A4C",
  fontSize: "1.08rem",
  lineHeight: 1.8,
  whiteSpace: "pre-wrap" as const,
};

const noticeStyle = {
  padding: "24px",
  borderRadius: "16px",
  backgroundColor: "#F7F1E6",
  color: "#6E5B3F",
  textAlign: "center" as const,
  lineHeight: 1.7,
};

const errorStyle = {
  ...noticeStyle,
  backgroundColor: "#FFF0ED",
  color: "#74372C",
  border: "1px solid #C77A6C",
};