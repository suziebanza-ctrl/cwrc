"use client";

import { useEffect, useState } from "react";
import type { Locale } from "../i18n/config";

type TranslationValues = {
  category_en: string;
  statement_en: string;
  context_and_evidence_en: string;
  approved_verdict_en: string;
  category_es: string;
  statement_es: string;
  context_and_evidence_es: string;
  approved_verdict_es: string;
};

const copy = {
  fr: {
    title: "Traductions du cas",
    intro:
      "Ajoutez les versions anglaise et espagnole avant de publier le verdict dans le Hall.",
    english: "English",
    spanish: "Español",
    category: "Catégorie",
    statement: "Affirmation",
    context: "Contexte et éléments",
    verdict: "Verdict officiel du CWRC",
    save: "Enregistrer les traductions",
    saving: "Enregistrement…",
    saved:
      "Les traductions sont enregistrées dans les archives du CWRC.",
    missing:
      "Remplissez tous les champs anglais et espagnols.",
    session:
      "La session administrative est expirée. Veuillez vous reconnecter.",
    error:
      "Les traductions n’ont pas pu être enregistrées.",
  },

  en: {
    title: "Case translations",
    intro:
      "Add the English and Spanish versions before publishing the verdict in the Hall.",
    english: "English",
    spanish: "Español",
    category: "Category",
    statement: "Statement",
    context: "Context and evidence",
    verdict: "Official CWRC verdict",
    save: "Save translations",
    saving: "Saving…",
    saved:
      "The translations have been saved in the CWRC archives.",
    missing:
      "Complete every English and Spanish field.",
    session:
      "The administrative session has expired. Please sign in again.",
    error:
      "The translations could not be saved.",
  },

  es: {
    title: "Traducciones del caso",
    intro:
      "Añade las versiones inglesa y española antes de publicar el veredicto en el Salón.",
    english: "English",
    spanish: "Español",
    category: "Categoría",
    statement: "Afirmación",
    context: "Contexto y elementos",
    verdict: "Veredicto oficial del CWRC",
    save: "Guardar las traducciones",
    saving: "Guardando…",
    saved:
      "Las traducciones se guardaron en los archivos del CWRC.",
    missing:
      "Completa todos los campos en inglés y español.",
    session:
      "La sesión administrativa ha expirado. Vuelve a iniciar sesión.",
    error:
      "No se pudieron guardar las traducciones.",
  },
} as const;

export default function CaseTranslations({
  locale,
  caseId,
  initialValues,
}: {
  locale: Locale;
  caseId: string;
  initialValues: TranslationValues;
}) {
  const t = copy[locale];

  const [form, setForm] =
    useState<TranslationValues>(initialValues);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const key =
    process.env
      .NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  useEffect(() => {
    setForm(initialValues);
    setSaved(false);
    setMessage("");
    setHasError(false);
  }, [caseId]);

  function update(
    field: keyof TranslationValues,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
    setMessage("");
    setHasError(false);
  }

  function translationsAreComplete() {
    return Object.values(form).every(
      (value) => value.trim().length > 0,
    );
  }

  async function saveTranslations() {
    if (!translationsAreComplete()) {
      setSaved(false);
      setHasError(true);
      setMessage(t.missing);
      return;
    }

    const token = sessionStorage.getItem(
      "cwrc_admin_token",
    );

    if (!token || !url || !key) {
      setSaved(false);
      setHasError(true);
      setMessage(t.session);
      return;
    }

    setSaving(true);
    setSaved(false);
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
            category_en: form.category_en.trim(),
            statement_en: form.statement_en.trim(),
            context_and_evidence_en:
              form.context_and_evidence_en.trim(),
            approved_verdict_en:
              form.approved_verdict_en.trim(),
            category_es: form.category_es.trim(),
            statement_es: form.statement_es.trim(),
            context_and_evidence_es:
              form.context_and_evidence_es.trim(),
            approved_verdict_es:
              form.approved_verdict_es.trim(),
          }),
        },
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setSaved(true);
      setMessage(t.saved);
    } catch {
      setSaved(false);
      setHasError(true);
      setMessage(t.error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section style={sectionStyle}>
      <h2 style={titleStyle}>{t.title}</h2>

      <p style={introStyle}>{t.intro}</p>

      <LanguagePanel title={t.english}>
        <Field label={t.category}>
          <input
            value={form.category_en}
            onChange={(event) =>
              update(
                "category_en",
                event.target.value,
              )
            }
            style={inputStyle}
          />
        </Field>

        <Field label={t.statement}>
          <textarea
            value={form.statement_en}
            onChange={(event) =>
              update(
                "statement_en",
                event.target.value,
              )
            }
            rows={4}
            style={textareaStyle}
          />
        </Field>

        <Field label={t.context}>
          <textarea
            value={
              form.context_and_evidence_en
            }
            onChange={(event) =>
              update(
                "context_and_evidence_en",
                event.target.value,
              )
            }
            rows={7}
            style={textareaStyle}
          />
        </Field>

        <Field label={t.verdict}>
          <textarea
            value={form.approved_verdict_en}
            onChange={(event) =>
              update(
                "approved_verdict_en",
                event.target.value,
              )
            }
            rows={9}
            style={textareaStyle}
          />
        </Field>
      </LanguagePanel>

      <LanguagePanel title={t.spanish}>
        <Field label={t.category}>
          <input
            value={form.category_es}
            onChange={(event) =>
              update(
                "category_es",
                event.target.value,
              )
            }
            style={inputStyle}
          />
        </Field>

        <Field label={t.statement}>
          <textarea
            value={form.statement_es}
            onChange={(event) =>
              update(
                "statement_es",
                event.target.value,
              )
            }
            rows={4}
            style={textareaStyle}
          />
        </Field>

        <Field label={t.context}>
          <textarea
            value={
              form.context_and_evidence_es
            }
            onChange={(event) =>
              update(
                "context_and_evidence_es",
                event.target.value,
              )
            }
            rows={7}
            style={textareaStyle}
          />
        </Field>

        <Field label={t.verdict}>
          <textarea
            value={form.approved_verdict_es}
            onChange={(event) =>
              update(
                "approved_verdict_es",
                event.target.value,
              )
            }
            rows={9}
            style={textareaStyle}
          />
        </Field>
      </LanguagePanel>

      <button
        type="button"
        onClick={saveTranslations}
        disabled={saving || saved}
        style={{
          ...buttonStyle,
          opacity: saving ? 0.65 : 1,
          ...(saved ? savedButtonStyle : {}),
        }}
      >
        {saving
          ? t.saving
          : saved
            ? `✓ ${t.saved}`
            : t.save}
      </button>

      {message && !saved && (
        <p
          role={hasError ? "alert" : "status"}
          style={
            hasError
              ? errorStyle
              : successStyle
          }
        >
          {message}
        </p>
      )}
    </section>
  );
}

function LanguagePanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={languageStyle}>
      <h3 style={languageTitleStyle}>
        {title}
      </h3>

      <div style={fieldsStyle}>
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label style={fieldStyle}>
      {label}
      {children}
    </label>
  );
}

const sectionStyle = {
  display: "grid",
  gap: "22px",
  paddingTop: "26px",
  marginTop: "8px",
  borderTop: "2px solid #D8C49A",
};

const titleStyle = {
  margin: 0,
  color: "#102A4C",
  fontSize: "1.8rem",
};

const introStyle = {
  margin: 0,
  color: "#6E5B3F",
  lineHeight: 1.7,
};

const languageStyle = {
  padding: "22px",
  borderRadius: "17px",
  backgroundColor: "#F7F1E6",
  border: "1px solid rgba(138,106,61,.25)",
};

const languageTitleStyle = {
  margin: "0 0 18px",
  color: "#8A6A3D",
  fontSize: "1.4rem",
};

const fieldsStyle = {
  display: "grid",
  gap: "18px",
};

const fieldStyle = {
  display: "grid",
  gap: "8px",
  fontWeight: "bold",
};

const inputStyle = {
  padding: "13px 15px",
  border: "1px solid rgba(16,42,76,.28)",
  borderRadius: "11px",
  fontSize: "1rem",
  backgroundColor: "white",
  color: "#102A4C",
  fontFamily: "Georgia, serif",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical" as const,
  lineHeight: 1.6,
};

const buttonStyle = {
  justifySelf: "start",
  padding: "13px 21px",
  border: 0,
  borderRadius: "999px",
  backgroundColor: "#102A4C",
  color: "#F7F1E6",
  fontWeight: "bold",
  cursor: "pointer",
};

const savedButtonStyle = {
  backgroundColor: "#D8C49A",
  color: "#102A4C",
};

const successStyle = {
  padding: "14px",
  borderRadius: "12px",
  backgroundColor: "#E4F4E8",
  color: "#244C2D",
  border: "1px solid #77A984",
};

const errorStyle = {
  padding: "14px",
  borderRadius: "12px",
  backgroundColor: "#FFF0ED",
  color: "#74372C",
  border: "1px solid #C77A6C",
};