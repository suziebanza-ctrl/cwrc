"use client";

import { useEffect, useState } from "react";
import type { Locale } from "../i18n/config";

type PublishedCase = {
  id: string;
  category: string;
  statement: string;
  context_and_evidence: string;
  approved_verdict: string;
  published_at: string | null;
};

const copy = {
  fr: {
    eyebrow: "Archives officielles du CWRC",
    title: "Le Hall des vérités confirmées",
    intro:
      "Cas examinés par Cathy et Suzie, verdicts officiellement approuvés et café convenablement supervisé.",
    loading:
      "Ouverture du Hall… le hibou administratif cherche encore ses lunettes.",
    empty:
      "Aucune vérité confirmée n’est encore exposée. Les cadres attendent patiemment.",
    context: "Contexte et éléments",
    verdict: "Verdict officiel du CWRC",
    published: "Publié le",
    error:
      "Les grandes portes du Hall refusent momentanément de s’ouvrir.",
  },

  en: {
    eyebrow: "Official CWRC archives",
    title: "The Hall of Confirmed Truths",
    intro:
      "Cases reviewed by Cathy and Suzie, officially approved verdicts, and properly supervised coffee.",
    loading:
      "Opening the Hall… the administrative owl is still looking for its glasses.",
    empty:
      "No confirmed truth is currently on display. The frames are waiting patiently.",
    context: "Context and evidence",
    verdict: "Official CWRC verdict",
    published: "Published on",
    error:
      "The great doors of the Hall temporarily refuse to open.",
  },

  es: {
    eyebrow: "Archivos oficiales del CWRC",
    title: "El Salón de las Verdades Confirmadas",
    intro:
      "Casos examinados por Cathy y Suzie, veredictos oficialmente aprobados y café debidamente supervisado.",
    loading:
      "Abriendo el Salón… el búho administrativo todavía busca sus gafas.",
    empty:
      "Todavía no hay verdades confirmadas expuestas. Los marcos esperan pacientemente.",
    context: "Contexto y elementos",
    verdict: "Veredicto oficial del CWRC",
    published: "Publicado el",
    error:
      "Las grandes puertas del Salón se niegan temporalmente a abrirse.",
  },
} as const;

export default function PublishedCases({
  locale,
}: {
  locale: Locale;
}) {
  const t = copy[locale];

  const [cases, setCases] = useState<
    PublishedCase[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  useEffect(() => {
    async function loadCases() {
      if (!url || !key) {
        setError(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(false);

      let selectedColumns =
        "id,category,statement,context_and_evidence,approved_verdict,published_at";

      let verdictField = "approved_verdict";

      if (locale === "en") {
        selectedColumns =
          "id,category:category_en,statement:statement_en,context_and_evidence:context_and_evidence_en,approved_verdict:approved_verdict_en,published_at";

        verdictField = "approved_verdict_en";
      }

      if (locale === "es") {
        selectedColumns =
          "id,category:category_es,statement:statement_es,context_and_evidence:context_and_evidence_es,approved_verdict:approved_verdict_es,published_at";

        verdictField = "approved_verdict_es";
      }

      try {
        const response = await fetch(
          `${url}/rest/v1/submitted_cases` +
            `?select=${selectedColumns}` +
            `&status=eq.published` +
            `&${verdictField}=not.is.null` +
            `&order=published_at.desc`,
          {
            headers: {
              apikey: key,
            },
          },
        );

        if (!response.ok) {
          throw new Error(
            "Unable to read cases",
          );
        }

        setCases(await response.json());
      } catch {
        setCases([]);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    void loadCases();
  }, [url, key, locale]);

  return (
    <section style={sectionStyle}>
      <p style={eyebrowStyle}>
        {t.eyebrow}
      </p>

      <h1 style={titleStyle}>{t.title}</h1>

      <p style={introStyle}>{t.intro}</p>

      {loading && (
        <p style={noticeStyle}>
          📚 {t.loading}
        </p>
      )}

      {!loading && error && (
        <p role="alert" style={errorStyle}>
          {t.error}
        </p>
      )}

      {!loading &&
        !error &&
        cases.length === 0 && (
          <p style={noticeStyle}>
            {t.empty}
          </p>
        )}

      {!loading &&
        !error &&
        cases.length > 0 && (
          <div style={casesStyle}>
            {cases.map((item) => (
              <article
                key={item.id}
                style={cardStyle}
              >
                <div style={cardHeaderStyle}>
                  <span style={categoryStyle}>
                    {item.category}
                  </span>

                  {item.published_at && (
                    <span style={dateStyle}>
                      {t.published}{" "}
                      {new Intl.DateTimeFormat(
                        locale,
                        {
                          dateStyle: "long",
                        },
                      ).format(
                        new Date(
                          item.published_at,
                        ),
                      )}
                    </span>
                  )}
                </div>

                <h2 style={statementStyle}>
                  {item.statement}
                </h2>

                <div style={contextStyle}>
                  <strong style={labelStyle}>
                    {t.context}
                  </strong>

                  <p style={textStyle}>
                    {
                      item.context_and_evidence
                    }
                  </p>
                </div>

                <div style={verdictStyle}>
                  <strong
                    style={verdictLabelStyle}
                  >
                    {t.verdict}
                  </strong>

                  <p style={textStyle}>
                    {item.approved_verdict}
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
  textTransform: "uppercase" as const,
};

const titleStyle = {
  margin: "12px 0",
  textAlign: "center" as const,
  color: "#102A4C",
  fontSize: "clamp(2.4rem,6vw,4.6rem)",
  lineHeight: 1,
};

const introStyle = {
  maxWidth: "800px",
  margin: "20px auto 36px",
  textAlign: "center" as const,
  color: "#8A6A3D",
  fontSize: "1.25rem",
  lineHeight: 1.6,
};

const casesStyle = {
  display: "grid",
  gap: "26px",
};

const cardStyle = {
  padding: "28px",
  borderRadius: "22px",
  backgroundColor: "#FFFDF8",
  border: "1px solid rgba(138,106,61,.28)",
  boxShadow:
    "0 14px 34px rgba(16,42,76,.1)",
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

const statementStyle = {
  margin: "22px 0",
  color: "#102A4C",
  fontSize: "1.65rem",
  lineHeight: 1.35,
};

const contextStyle = {
  padding: "20px",
  borderRadius: "16px",
  backgroundColor: "#F7F1E6",
  marginBottom: "18px",
};

const verdictStyle = {
  padding: "22px",
  borderRadius: "17px",
  backgroundColor: "#102A4C",
  color: "#F7F1E6",
  borderLeft: "7px solid #D8C49A",
};

const labelStyle = {
  display: "block",
  marginBottom: "10px",
  color: "#8A6A3D",
};

const verdictLabelStyle = {
  display: "block",
  marginBottom: "12px",
  color: "#D8C49A",
  letterSpacing: ".06em",
  textTransform: "uppercase" as const,
  fontSize: ".82rem",
};

const textStyle = {
  margin: 0,
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