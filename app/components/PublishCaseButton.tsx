"use client";

import { useState } from "react";
import type { Locale } from "../i18n/config";

const copy = {
  fr: {
    publish: "Publier dans le Hall",
    publishing: "Publication…",
    published: "Publié dans le Hall",
    error: "La publication a échoué.",
    session:
      "La session administrative est expirée. Veuillez vous reconnecter.",
  },

  en: {
    publish: "Publish in the Hall",
    publishing: "Publishing…",
    published: "Published in the Hall",
    error: "Publication failed.",
    session:
      "The administrative session has expired. Please sign in again.",
  },

  es: {
    publish: "Publicar en el Salón",
    publishing: "Publicando…",
    published: "Publicado en el Salón",
    error: "La publicación falló.",
    session:
      "La sesión administrativa ha expirado. Vuelve a iniciar sesión.",
  },
} as const;

export default function PublishCaseButton({
  locale,
  caseId,
  status,
  hasVerdict,
}: {
  locale: Locale;
  caseId: string;
  status: string;
  hasVerdict: boolean;
}) {
  const t = copy[locale];

  const [currentStatus, setCurrentStatus] =
    useState(status);

  const [publishing, setPublishing] =
    useState(false);

  const [message, setMessage] = useState("");
  const [hasError, setHasError] =
    useState(false);

  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const key =
    process.env
      .NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!hasVerdict) {
    return null;
  }

  if (currentStatus === "published") {
    return (
      <p style={publishedStyle}>
        ✓ {t.published}
      </p>
    );
  }

  async function publishCase() {
    const token = sessionStorage.getItem(
      "cwrc_admin_token",
    );

    if (!token || !url || !key) {
      setHasError(true);
      setMessage(t.session);
      return;
    }

    setPublishing(true);
    setHasError(false);
    setMessage("");

    try {
      const response = await fetch(
        `${url}/rest/v1/submitted_cases?id=eq.${encodeURIComponent(
          caseId,
        )}`,
        {
          method: "PATCH",
          headers: {
            apikey: key,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
          body: JSON.stringify({
            status: "published",
            published_at:
              new Date().toISOString(),
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          await response.text(),
        );
      }

      setCurrentStatus("published");
      setMessage("");
    } catch {
      setHasError(true);
      setMessage(t.error);
    } finally {
      setPublishing(false);
    }
  }

  return (
    <div style={wrapperStyle}>
      <button
        type="button"
        onClick={publishCase}
        disabled={publishing}
        style={{
          ...buttonStyle,
          opacity: publishing ? 0.65 : 1,
        }}
      >
        {publishing
          ? t.publishing
          : `🏛️ ${t.publish}`}
      </button>

      {message && (
        <p
          role={hasError ? "alert" : "status"}
          style={errorStyle}
        >
          {message}
        </p>
      )}
    </div>
  );
}

const wrapperStyle = {
  display: "grid",
  gap: "10px",
  marginTop: "12px",
};

const buttonStyle = {
  justifySelf: "start",
  padding: "12px 18px",
  border: 0,
  borderRadius: "999px",
  backgroundColor: "#8A6A3D",
  color: "#FFFDF8",
  fontWeight: "bold",
  cursor: "pointer",
};

const publishedStyle = {
  display: "inline-block",
  margin: "12px 0 0",
  padding: "8px 12px",
  borderRadius: "999px",
  backgroundColor: "#E4F4E8",
  color: "#244C2D",
  fontWeight: "bold",
  fontSize: ".9rem",
};

const errorStyle = {
  margin: 0,
  padding: "10px 12px",
  borderRadius: "10px",
  backgroundColor: "#FFF0ED",
  color: "#74372C",
};