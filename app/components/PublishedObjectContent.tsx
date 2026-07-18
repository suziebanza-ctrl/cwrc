"use client";

import {
  useEffect,
  useState,
} from "react";

type Locale = "fr" | "en" | "es";

type PublishedContent = {
  id: string;
  content_type:
    | "story"
    | "article"
    | "photo"
    | "ai_map"
    | "announcement";
  title_fr: string;
  title_en: string | null;
  title_es: string | null;
  body_fr: string;
  body_en: string | null;
  body_es: string | null;
  image_path: string | null;
  image_alt_fr: string | null;
  image_alt_en: string | null;
  image_alt_es: string | null;
  publish_at: string | null;
  created_at: string;
};

const labels = {
  fr: {
    loading:
      "Ouverture du contenu publié…",
    story: "Histoire",
    article: "Article",
    photo: "Photo",
    ai_map: "Carte créée par IA",
    announcement: "Annonce",
  },

  en: {
    loading:
      "Opening published content…",
    story: "Story",
    article: "Article",
    photo: "Photo",
    ai_map: "AI-created map",
    announcement: "Announcement",
  },

  es: {
    loading:
      "Abriendo el contenido publicado…",
    story: "Historia",
    article: "Artículo",
    photo: "Foto",
    ai_map: "Mapa creado por IA",
    announcement: "Anuncio",
  },
} as const;

export default function PublishedObjectContent({
  roomKey,
  objectKey,
}: {
  roomKey: string;
  objectKey: string;
}) {
  const [contents, setContents] =
    useState<PublishedContent[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [failed, setFailed] =
    useState(false);

  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const key =
    process.env
      .NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  const locale = getCurrentLocale();
  const t = labels[locale];

  useEffect(() => {
    if (!url || !key) {
      setLoading(false);
      setFailed(true);
      return;
    }

    const controller =
      new AbortController();

    async function loadContent() {
      setLoading(true);
      setFailed(false);

      try {
        const query =
          `${url}/rest/v1/cwrc_content` +
          `?select=id,content_type,title_fr,title_en,title_es,body_fr,body_en,body_es,image_path,image_alt_fr,image_alt_en,image_alt_es,publish_at,created_at` +
          `&room_key=eq.${encodeURIComponent(
            roomKey,
          )}` +
          `&object_key=eq.${encodeURIComponent(
            objectKey,
          )}` +
          `&status=eq.published` +
          `&order=publish_at.desc.nullslast,created_at.desc`;

        const response = await fetch(
          query,
          {
            headers: {
              apikey: key!,
            },
            signal: controller.signal,
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error(
            "Published content read failed",
          );
        }

        const data =
          await response.json();

        setContents(data);
      } catch (error) {
        if (
          error instanceof Error &&
          error.name === "AbortError"
        ) {
          return;
        }

        setFailed(true);
      } finally {
        setLoading(false);
      }
    }

    void loadContent();

    return () => controller.abort();
  }, [
    key,
    objectKey,
    roomKey,
    url,
  ]);

  if (loading) {
    return (
      <p style={loadingStyle}>
        {t.loading}
      </p>
    );
  }

  if (failed || contents.length === 0) {
    return null;
  }

  return (
    <div style={contentListStyle}>
      {contents.map((content) => {
        const title =
          localizedValue(
            content.title_fr,
            content.title_en,
            content.title_es,
            locale,
          );

        const body =
          localizedValue(
            content.body_fr,
            content.body_en,
            content.body_es,
            locale,
          );

        const imageAlt =
          localizedValue(
            content.image_alt_fr,
            content.image_alt_en,
            content.image_alt_es,
            locale,
          ) || title;

        const imageUrl =
          content.image_path &&
          url
            ? `${url}/storage/v1/object/public/cwrc-public-content/${content.image_path
                .split("/")
                .map(
                  encodeURIComponent,
                )
                .join("/")}`
            : null;

        return (
          <article
            key={content.id}
            style={contentCardStyle}
          >
            <p style={typeStyle}>
              {
                t[
                  content.content_type
                ]
              }
            </p>

            <h3 style={titleStyle}>
              {title}
            </h3>

            {imageUrl && (
              <img
                src={imageUrl}
                alt={imageAlt}
                style={imageStyle}
              />
            )}

            <p style={bodyStyle}>
              {body}
            </p>
          </article>
        );
      })}
    </div>
  );
}

function getCurrentLocale(): Locale {
  if (typeof window === "undefined") {
    return "fr";
  }

  const firstPart =
    window.location.pathname
      .split("/")
      .filter(Boolean)[0];

  if (
    firstPart === "en" ||
    firstPart === "es"
  ) {
    return firstPart;
  }

  return "fr";
}

function localizedValue(
  french: string | null,
  english: string | null,
  spanish: string | null,
  locale: Locale,
) {
  if (locale === "en") {
    return (
      english?.trim() ||
      french?.trim() ||
      ""
    );
  }

  if (locale === "es") {
    return (
      spanish?.trim() ||
      french?.trim() ||
      ""
    );
  }

  return french?.trim() || "";
}

const contentListStyle = {
  display: "grid",
  gap: "18px",
  marginTop: "22px",
};

const contentCardStyle = {
  padding: "20px",
  borderRadius: "17px",
  backgroundColor: "#FFFDF8",
  border: "1px solid #D8C49A",
  boxShadow:
    "0 8px 20px rgba(16,42,76,.1)",
};

const typeStyle = {
  margin: "0 0 8px",
  color: "#8A6A3D",
  fontSize: ".78rem",
  fontWeight: "bold",
  letterSpacing: ".12em",
  textTransform:
    "uppercase" as const,
};

const titleStyle = {
  margin: "0 0 14px",
  color: "#102A4C",
  fontSize: "1.45rem",
};

const imageStyle = {
  display: "block",
  width: "100%",
  maxHeight: "520px",
  objectFit: "contain" as const,
  margin: "14px 0",
  borderRadius: "14px",
  backgroundColor: "#F7F1E6",
  border: "1px solid #D8C49A",
};

const bodyStyle = {
  margin: 0,
  color: "#102A4C",
  whiteSpace: "pre-wrap" as const,
  fontSize: "1.05rem",
  lineHeight: 1.75,
};

const loadingStyle = {
  marginTop: "18px",
  padding: "12px",
  borderRadius: "12px",
  backgroundColor: "#F7F1E6",
  color: "#6E5B3F",
  textAlign: "center" as const,
  fontStyle: "italic",
};