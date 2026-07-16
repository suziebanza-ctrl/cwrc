"use client";

import { useState } from "react";
import type { Locale } from "../i18n/config";
import AdminPortal, {
  type AdminQuestion,
} from "./AdminPortal";

type TranslationForm = {
  response: string;
  category_en: string;
  question_en: string;
  response_en: string;
  category_es: string;
  question_es: string;
  response_es: string;
};

const emptyForm: TranslationForm = {
  response: "",
  category_en: "",
  question_en: "",
  response_en: "",
  category_es: "",
  question_es: "",
  response_es: "",
};

const copy = {
  fr: {
    title: "Réponse officielle du CWRC",
    intro:
      "Rédigez la réponse française, puis ajoutez les traductions anglaise et espagnole.",
    selected: "Question en cours d’examen",
    noQuestion:
      "Choisissez d’abord une question dans le courrier arrivé.",
    copyQuestion: "Copier la question",
    copied: "Question copiée!",
    french: "Français",
    english: "English",
    spanish: "Español",
    category: "Catégorie",
    question: "Question",
    answer: "Réponse officielle",
    answerPlaceholder:
      "Écrivez ou collez ici la réponse officielle du CWRC…",
    questionPlaceholder:
      "Écrivez ou collez ici la traduction de la question…",
    categoryPlaceholder:
      "Traduisez la catégorie…",
    approve: "Approuver et enregistrer les trois langues",
    saving: "Enregistrement dans les archives…",
    saved:
      "La réponse et ses traductions sont enregistrées dans les archives du CWRC.",
    missing:
      "Remplissez la réponse française ainsi que les questions et réponses anglaise et espagnole.",
    sessionError:
      "La session administrative est expirée. Veuillez vous reconnecter.",
    saveError:
      "La réponse n’a pas pu être enregistrée.",
    technical: "Détail technique",
  },

  en: {
    title: "Official CWRC response",
    intro:
      "Write the French response, then add the English and Spanish translations.",
    selected: "Question under review",
    noQuestion:
      "First select a question from the incoming correspondence.",
    copyQuestion: "Copy the question",
    copied: "Question copied!",
    french: "Français",
    english: "English",
    spanish: "Español",
    category: "Category",
    question: "Question",
    answer: "Official response",
    answerPlaceholder:
      "Write or paste the official CWRC response here…",
    questionPlaceholder:
      "Write or paste the translated question here…",
    categoryPlaceholder:
      "Translate the category…",
    approve: "Approve and save all three languages",
    saving: "Saving to the archives…",
    saved:
      "The response and its translations have been saved in the CWRC archives.",
    missing:
      "Complete the French response and the English and Spanish questions and responses.",
    sessionError:
      "The administrative session has expired. Please sign in again.",
    saveError: "The response could not be saved.",
    technical: "Technical details",
  },

  es: {
    title: "Respuesta oficial del CWRC",
    intro:
      "Escribe la respuesta francesa y añade las traducciones inglesa y española.",
    selected: "Pregunta en revisión",
    noQuestion:
      "Primero selecciona una pregunta de la correspondencia recibida.",
    copyQuestion: "Copiar la pregunta",
    copied: "¡Pregunta copiada!",
    french: "Français",
    english: "English",
    spanish: "Español",
    category: "Categoría",
    question: "Pregunta",
    answer: "Respuesta oficial",
    answerPlaceholder:
      "Escribe o pega aquí la respuesta oficial del CWRC…",
    questionPlaceholder:
      "Escribe o pega aquí la traducción de la pregunta…",
    categoryPlaceholder:
      "Traduce la categoría…",
    approve: "Aprobar y guardar los tres idiomas",
    saving: "Guardando en los archivos…",
    saved:
      "La respuesta y sus traducciones se guardaron en los archivos del CWRC.",
    missing:
      "Completa la respuesta francesa y las preguntas y respuestas inglesa y española.",
    sessionError:
      "La sesión administrativa ha expirado. Vuelve a iniciar sesión.",
    saveError: "No se pudo guardar la respuesta.",
    technical: "Detalle técnico",
  },
} as const;

export default function AdminDraftWorkspace({
  locale,
}: {
  locale: Locale;
}) {
  const t = copy[locale];

  const [selectedQuestion, setSelectedQuestion] =
    useState<AdminQuestion | null>(null);

  const [form, setForm] =
    useState<TranslationForm>(emptyForm);

  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  function selectQuestion(question: AdminQuestion) {
    setSelectedQuestion(question);

    setForm({
      response: question.response ?? "",
      category_en:
        question.category_en ?? question.category,
      question_en: question.question_en ?? "",
      response_en: question.response_en ?? "",
      category_es:
        question.category_es ?? question.category,
      question_es: question.question_es ?? "",
      response_es: question.response_es ?? "",
    });

    setCopied(false);
    setSaving(false);
    setSaved(false);
    setMessage("");
    setHasError(false);
  }

  function updateField(
    field: keyof TranslationForm,
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

  async function copyQuestion() {
    if (!selectedQuestion) {
      return;
    }

    await navigator.clipboard.writeText(
      selectedQuestion.question,
    );

    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 2500);
  }

  function translationsAreComplete() {
    return Boolean(
      form.response.trim() &&
        form.question_en.trim() &&
        form.response_en.trim() &&
        form.question_es.trim() &&
        form.response_es.trim(),
    );
  }

  async function approveAndSave() {
    if (!selectedQuestion) {
      return;
    }

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
      setMessage(t.sessionError);
      return;
    }

    setSaving(true);
    setSaved(false);
    setHasError(false);
    setMessage("");

    try {
      const response = await fetch(
        `${url}/rest/v1/ask_cathy_questions?id=eq.${encodeURIComponent(
          selectedQuestion.id,
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
            response: form.response.trim(),
            category_en:
              form.category_en.trim() ||
              selectedQuestion.category,
            question_en: form.question_en.trim(),
            response_en: form.response_en.trim(),
            category_es:
              form.category_es.trim() ||
              selectedQuestion.category,
            question_es: form.question_es.trim(),
            response_es: form.response_es.trim(),
            status: "approved",
            answered_at: new Date().toISOString(),
            answered_by: getAdministratorEmail(token),
          }),
        },
      );

      if (!response.ok) {
        const details = await response.text();

        throw new Error(
          details || `Supabase error ${response.status}`,
        );
      }

      setSelectedQuestion({
        ...selectedQuestion,
        response: form.response.trim(),
        category_en:
          form.category_en.trim() ||
          selectedQuestion.category,
        question_en: form.question_en.trim(),
        response_en: form.response_en.trim(),
        category_es:
          form.category_es.trim() ||
          selectedQuestion.category,
        question_es: form.question_es.trim(),
        response_es: form.response_es.trim(),
        answered_at: new Date().toISOString(),
        answered_by: getAdministratorEmail(token),
        status: "approved",
      });

      setSaved(true);
      setHasError(false);
      setMessage(t.saved);
    } catch (error) {
      setSaved(false);
      setHasError(true);

      const technicalDetails =
        error instanceof Error
          ? error.message
          : "Unknown error";

      setMessage(
        `${t.saveError} ${t.technical} : ${technicalDetails}`,
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <AdminPortal
        locale={locale}
        selectedQuestionId={selectedQuestion?.id}
        onSelectQuestion={selectQuestion}
      />

      <section
        id="cwrc-draft-workspace"
        style={workspaceStyle}
      >
        <h2 style={titleStyle}>{t.title}</h2>

        <p style={introStyle}>{t.intro}</p>

        {selectedQuestion ? (
          <div style={responseCardStyle}>
            <div style={selectedQuestionStyle}>
              <span style={selectedLabelStyle}>
                {t.selected}
              </span>

              <strong style={selectedQuestionTextStyle}>
                {selectedQuestion.question}
              </strong>

              <button
                type="button"
                onClick={copyQuestion}
                style={copyButtonStyle}
              >
                {copied
                  ? `✓ ${t.copied}`
                  : `📋 ${t.copyQuestion}`}
              </button>
            </div>

            <LanguagePanel title={t.french}>
              <Field label={t.category}>
                <input
                  value={selectedQuestion.category}
                  readOnly
                  style={readOnlyInputStyle}
                />
              </Field>

              <Field label={t.question}>
                <textarea
                  value={selectedQuestion.question}
                  readOnly
                  rows={3}
                  style={readOnlyTextareaStyle}
                />
              </Field>

              <Field label={t.answer}>
                <textarea
                  value={form.response}
                  onChange={(event) =>
                    updateField(
                      "response",
                      event.target.value,
                    )
                  }
                  placeholder={t.answerPlaceholder}
                  rows={9}
                  style={textareaStyle}
                />
              </Field>
            </LanguagePanel>

            <LanguagePanel title={t.english}>
              <Field label={t.category}>
                <input
                  value={form.category_en}
                  onChange={(event) =>
                    updateField(
                      "category_en",
                      event.target.value,
                    )
                  }
                  placeholder={t.categoryPlaceholder}
                  style={inputStyle}
                />
              </Field>

              <Field label={t.question}>
                <textarea
                  value={form.question_en}
                  onChange={(event) =>
                    updateField(
                      "question_en",
                      event.target.value,
                    )
                  }
                  placeholder={t.questionPlaceholder}
                  rows={3}
                  style={textareaStyle}
                />
              </Field>

              <Field label={t.answer}>
                <textarea
                  value={form.response_en}
                  onChange={(event) =>
                    updateField(
                      "response_en",
                      event.target.value,
                    )
                  }
                  placeholder={t.answerPlaceholder}
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
                    updateField(
                      "category_es",
                      event.target.value,
                    )
                  }
                  placeholder={t.categoryPlaceholder}
                  style={inputStyle}
                />
              </Field>

              <Field label={t.question}>
                <textarea
                  value={form.question_es}
                  onChange={(event) =>
                    updateField(
                      "question_es",
                      event.target.value,
                    )
                  }
                  placeholder={t.questionPlaceholder}
                  rows={3}
                  style={textareaStyle}
                />
              </Field>

              <Field label={t.answer}>
                <textarea
                  value={form.response_es}
                  onChange={(event) =>
                    updateField(
                      "response_es",
                      event.target.value,
                    )
                  }
                  placeholder={t.answerPlaceholder}
                  rows={9}
                  style={textareaStyle}
                />
              </Field>
            </LanguagePanel>

            <button
              type="button"
              onClick={approveAndSave}
              disabled={saving || saved}
              style={{
                ...approvalButtonStyle,
                ...(saved ? savedButtonStyle : {}),
                ...(saving ? disabledButtonStyle : {}),
              }}
            >
              {saving
                ? `☕ ${t.saving}`
                : saved
                  ? `✓ ${t.saved}`
                  : t.approve}
            </button>

            {message && (
              <p
                role={hasError ? "alert" : "status"}
                style={
                  hasError
                    ? errorMessageStyle
                    : successMessageStyle
                }
              >
                {message}
              </p>
            )}
          </div>
        ) : (
          <p style={waitingStyle}>{t.noQuestion}</p>
        )}
      </section>
    </>
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
    <section style={languagePanelStyle}>
      <h3 style={languageTitleStyle}>{title}</h3>
      <div style={fieldsGridStyle}>{children}</div>
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
      <span style={fieldLabelStyle}>{label}</span>
      {children}
    </label>
  );
}

function getAdministratorEmail(token: string) {
  try {
    const payload = token.split(".")[1];

    const normalized = payload
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const decoded = JSON.parse(
      decodeURIComponent(
        window
          .atob(normalized)
          .split("")
          .map(
            (character) =>
              `%${character
                .charCodeAt(0)
                .toString(16)
                .padStart(2, "0")}`,
          )
          .join(""),
      ),
    );

    return decoded.email || "CWRC Admin";
  } catch {
    return "CWRC Admin";
  }
}

const workspaceStyle = {
  marginTop: "38px",
  scrollMarginTop: "110px",
};

const titleStyle = {
  textAlign: "center" as const,
  fontSize: "2rem",
  marginBottom: "16px",
};

const introStyle = {
  textAlign: "center" as const,
  fontSize: "1.1rem",
  lineHeight: 1.7,
  maxWidth: "760px",
  margin: "0 auto 24px",
};

const responseCardStyle = {
  maxWidth: "950px",
  margin: "0 auto",
  padding: "28px",
  borderRadius: "22px",
  backgroundColor: "#FFFDF8",
  border: "1px solid rgba(138,106,61,.3)",
  boxShadow: "0 14px 32px rgba(16,42,76,.12)",
};

const selectedQuestionStyle = {
  display: "grid",
  gap: "12px",
  padding: "22px",
  borderRadius: "18px",
  backgroundColor: "#F1E4CA",
  borderLeft: "7px solid #102A4C",
};

const selectedLabelStyle = {
  color: "#8A6A3D",
  fontWeight: "bold",
  fontSize: ".82rem",
  letterSpacing: ".08em",
  textTransform: "uppercase" as const,
};

const selectedQuestionTextStyle = {
  color: "#102A4C",
  fontSize: "1.2rem",
  lineHeight: 1.5,
};

const copyButtonStyle = {
  width: "fit-content",
  padding: "10px 15px",
  border: "1px solid #102A4C",
  borderRadius: "999px",
  backgroundColor: "transparent",
  color: "#102A4C",
  fontWeight: "bold",
  cursor: "pointer",
};

const languagePanelStyle = {
  marginTop: "24px",
  padding: "22px",
  borderRadius: "18px",
  backgroundColor: "#F7F1E6",
  border: "1px solid rgba(138,106,61,.25)",
};

const languageTitleStyle = {
  margin: "0 0 18px",
  color: "#102A4C",
  fontSize: "1.45rem",
};

const fieldsGridStyle = {
  display: "grid",
  gap: "18px",
};

const fieldStyle = {
  display: "grid",
  gap: "8px",
};

const fieldLabelStyle = {
  color: "#102A4C",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "13px 15px",
  borderRadius: "12px",
  border: "1px solid rgba(16,42,76,.3)",
  backgroundColor: "#FFFDF8",
  color: "#102A4C",
  fontFamily: "Georgia, serif",
  fontSize: "1rem",
};

const readOnlyInputStyle = {
  ...inputStyle,
  backgroundColor: "#EEE7DA",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical" as const,
  lineHeight: 1.7,
};

const readOnlyTextareaStyle = {
  ...textareaStyle,
  backgroundColor: "#EEE7DA",
};

const approvalButtonStyle = {
  marginTop: "24px",
  padding: "13px 22px",
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

const disabledButtonStyle = {
  cursor: "wait",
  opacity: 0.75,
};

const successMessageStyle = {
  marginTop: "16px",
  padding: "14px",
  borderRadius: "12px",
  backgroundColor: "#EEF6E9",
  color: "#315A2D",
  fontWeight: "bold",
};

const errorMessageStyle = {
  marginTop: "16px",
  padding: "14px",
  borderRadius: "12px",
  backgroundColor: "#FFF0ED",
  color: "#74372C",
  fontWeight: "bold",
  whiteSpace: "pre-wrap" as const,
  overflowWrap: "anywhere" as const,
};

const waitingStyle = {
  maxWidth: "900px",
  margin: "0 auto",
  padding: "20px",
  borderRadius: "14px",
  backgroundColor: "#F7F1E6",
  color: "#6E5B3F",
  fontStyle: "italic",
  lineHeight: 1.6,
  textAlign: "center" as const,
};