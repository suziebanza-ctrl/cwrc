"use client";

import { useEffect, useState } from "react";
import type { Locale } from "../i18n/config";

type DiningMessage = {
  id: string;
  created_at: string;
  updated_at: string;
  locale: Locale;
  visitor_name: string | null;
  visitor_email: string | null;
  subject_type: string;
  message: string;
  response_preference:
    | "private"
    | "public"
    | "none";
  publish_name: boolean;
  status:
    | "new"
    | "in_progress"
    | "answered"
    | "archived";
  internal_notes: string | null;
  public_response: string | null;
  public_response_en: string | null;
  public_response_es: string | null;
  answered_by: string | null;
  answered_at: string | null;
  published_at: string | null;
};

const copy = {
  fr: {
    title: "Messages de la Salle à manger",
    intro:
      "Les confidences, idées, recettes, blagues et œuvres déposées à notre table.",
    loading: "Amateur ouvre le classeur…",
    loadError:
      "Le classeur de la Salle à manger refuse de s’ouvrir.",
    empty: "Aucun message à la table pour le moment.",
    all: "Tous",
    new: "Nouveau",
    inProgress: "En traitement",
    answered: "Répondu",
    archived: "Archivé",
    anonymous: "Visiteur anonyme",
    received: "Reçu",
    language: "Langue",
    responseChoice: "Réponse souhaitée",
    private: "Privée",
    public: "Publique",
    none: "Aucune",
    email: "Courriel",
    copyEmail: "Copier le courriel",
    emailCopied: "Courriel copié.",
    noEmail: "Aucun courriel fourni",
    publishName: "Nom autorisé pour publication",
    keepAnonymous: "Publication anonyme",
    examine: "Ouvrir le message",
    selected: "Message sélectionné",
    message: "Message reçu",
    status: "Statut",
    notes: "Notes internes",
    notesHelp:
      "Ces notes sont visibles uniquement par Cathy et Suzie.",
    responseFr: "Réponse publique — français",
    responseEn: "Réponse publique — anglais",
    responseEs: "Réponse publique — espagnol",
    publicHelp:
      "Aucune réponse n’est publiée avant que vous activiez la publication.",
    publish: "Publier la réponse",
    unpublish: "Retirer la publication",
    publicationUnavailable:
      "La publication est possible uniquement pour une demande de réponse publique comportant une réponse française.",
    save: "Enregistrer",
    saving: "Enregistrement…",
    saved: "Le message a été mis à jour.",
    saveError:
      "La mise à jour n’a pas pu être enregistrée.",
    close: "Fermer le message",
    subjects: {
      recipe: "Suggestion de recette",
      joke: "Blague",
      artwork: "Soumission d’une œuvre",
      idea: "Idée",
      region: "Région",
      about: "À propos du visiteur",
      other: "Autre",
    },
  },

  en: {
    title: "Dining Room Messages",
    intro:
      "The stories, ideas, recipes, jokes and artwork left at our table.",
    loading: "Amateur is opening the file…",
    loadError:
      "The Dining Room file refuses to open.",
    empty: "No messages at the table for now.",
    all: "All",
    new: "New",
    inProgress: "In progress",
    answered: "Answered",
    archived: "Archived",
    anonymous: "Anonymous visitor",
    received: "Received",
    language: "Language",
    responseChoice: "Requested reply",
    private: "Private",
    public: "Public",
    none: "None",
    email: "Email",
    copyEmail: "Copy email",
    emailCopied: "Email copied.",
    noEmail: "No email provided",
    publishName: "Name authorized for publication",
    keepAnonymous: "Anonymous publication",
    examine: "Open message",
    selected: "Selected message",
    message: "Received message",
    status: "Status",
    notes: "Internal notes",
    notesHelp:
      "These notes are visible only to Cathy and Suzie.",
    responseFr: "Public reply — French",
    responseEn: "Public reply — English",
    responseEs: "Public reply — Spanish",
    publicHelp:
      "No reply is published until you activate publication.",
    publish: "Publish reply",
    unpublish: "Remove publication",
    publicationUnavailable:
      "Publication is available only for a public-reply request containing a French response.",
    save: "Save",
    saving: "Saving…",
    saved: "The message has been updated.",
    saveError: "The update could not be saved.",
    close: "Close message",
    subjects: {
      recipe: "Recipe suggestion",
      joke: "Joke",
      artwork: "Artwork submission",
      idea: "Idea",
      region: "Region",
      about: "About the visitor",
      other: "Other",
    },
  },

  es: {
    title: "Mensajes del Comedor",
    intro:
      "Las historias, ideas, recetas, bromas y obras compartidas en nuestra mesa.",
    loading: "Amateur abre el archivo…",
    loadError:
      "El archivo del Comedor se niega a abrirse.",
    empty: "No hay mensajes en la mesa por ahora.",
    all: "Todos",
    new: "Nuevo",
    inProgress: "En proceso",
    answered: "Respondido",
    archived: "Archivado",
    anonymous: "Visitante anónimo",
    received: "Recibido",
    language: "Idioma",
    responseChoice: "Respuesta solicitada",
    private: "Privada",
    public: "Pública",
    none: "Ninguna",
    email: "Correo",
    copyEmail: "Copiar correo",
    emailCopied: "Correo copiado.",
    noEmail: "No se proporcionó correo",
    publishName: "Nombre autorizado para publicación",
    keepAnonymous: "Publicación anónima",
    examine: "Abrir mensaje",
    selected: "Mensaje seleccionado",
    message: "Mensaje recibido",
    status: "Estado",
    notes: "Notas internas",
    notesHelp:
      "Estas notas solo son visibles para Cathy y Suzie.",
    responseFr: "Respuesta pública — francés",
    responseEn: "Respuesta pública — inglés",
    responseEs: "Respuesta pública — español",
    publicHelp:
      "Ninguna respuesta se publica hasta que active la publicación.",
    publish: "Publicar respuesta",
    unpublish: "Retirar publicación",
    publicationUnavailable:
      "La publicación solo es posible para una solicitud de respuesta pública que contenga una respuesta en francés.",
    save: "Guardar",
    saving: "Guardando…",
    saved: "El mensaje ha sido actualizado.",
    saveError:
      "No se pudo guardar la actualización.",
    close: "Cerrar mensaje",
    subjects: {
      recipe: "Sugerencia de receta",
      joke: "Broma",
      artwork: "Presentación de una obra",
      idea: "Idea",
      region: "Región",
      about: "Sobre el visitante",
      other: "Otro",
    },
  },
} as const;

export default function DiningRoomAdmin({
  locale,
  token,
}: {
  locale: Locale;
  token: string;
}) {
  const t = copy[locale];

  const [messages, setMessages] = useState<
    DiningMessage[]
  >([]);
  const [selected, setSelected] =
    useState<DiningMessage | null>(null);
  const [filter, setFilter] = useState<
    "all" | DiningMessage["status"]
  >("all");
  const [status, setStatus] =
    useState<DiningMessage["status"]>("new");
  const [notes, setNotes] = useState("");
  const [responseFr, setResponseFr] =
    useState("");
  const [responseEn, setResponseEn] =
    useState("");
  const [responseEs, setResponseEs] =
    useState("");
  const [published, setPublished] =
    useState(false);
  const [busy, setBusy] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState(false);

  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env
      .NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  useEffect(() => {
    if (!token || !url || !key) {
      return;
    }

    void loadMessages();
  }, [token]);

  async function loadMessages() {
    if (!url || !key) {
      return;
    }

    setBusy(true);
    setNotice("");
    setError(false);

    try {
      const response = await fetch(
        `${url}/rest/v1/dining_room_messages?select=*&order=created_at.desc`,
        {
          headers: {
            apikey: key,
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setMessages(await response.json());
    } catch (loadError) {
      console.error(
        "Dining-room admin load failed",
        loadError,
      );
      setError(true);
      setNotice(t.loadError);
    } finally {
      setBusy(false);
    }
  }

  function selectMessage(item: DiningMessage) {
    setSelected(item);
    setStatus(item.status);
    setNotes(item.internal_notes ?? "");
    setResponseFr(item.public_response ?? "");
    setResponseEn(
      item.public_response_en ?? "",
    );
    setResponseEs(
      item.public_response_es ?? "",
    );
    setPublished(Boolean(item.published_at));
    setNotice("");
    setError(false);

    window.setTimeout(() => {
      document
        .getElementById(
          "cwrc-dining-message-review",
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  }

  function closeMessage() {
    setSelected(null);
    setNotice("");
    setError(false);
  }

  async function copyEmail() {
    if (!selected?.visitor_email) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        selected.visitor_email,
      );
      setError(false);
      setNotice(t.emailCopied);
    } catch {
      setError(true);
      setNotice(selected.visitor_email);
    }
  }

  function togglePublication() {
    if (
      !selected ||
      selected.response_preference !== "public" ||
      !responseFr.trim()
    ) {
      setError(true);
      setNotice(t.publicationUnavailable);
      return;
    }

    setError(false);
    setNotice("");
    setPublished((current) => !current);
  }

  async function saveMessage() {
    if (!selected || !url || !key) {
      return;
    }

    if (
      published &&
      (selected.response_preference !== "public" ||
        !responseFr.trim())
    ) {
      setError(true);
      setNotice(t.publicationUnavailable);
      return;
    }

    setSaving(true);
    setError(false);
    setNotice("");

    const now = new Date().toISOString();

    const payload = {
      status,
      internal_notes: notes.trim() || null,
      public_response:
        responseFr.trim() || null,
      public_response_en:
        responseEn.trim() || null,
      public_response_es:
        responseEs.trim() || null,
      answered_at:
        status === "answered"
          ? selected.answered_at ?? now
          : selected.answered_at,
      published_at: published
        ? selected.published_at ?? now
        : null,
      updated_at: now,
    };

    try {
      const response = await fetch(
        `${url}/rest/v1/dining_room_messages?id=eq.${encodeURIComponent(
          selected.id,
        )}`,
        {
          method: "PATCH",
          headers: {
            apikey: key,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Prefer: "return=representation",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const updatedRows: DiningMessage[] =
        await response.json();

      const updated =
        updatedRows[0] ?? {
          ...selected,
          ...payload,
        };

      setSelected(updated);
      setMessages((current) =>
        current.map((item) =>
          item.id === updated.id ? updated : item,
        ),
      );

      setPublished(Boolean(updated.published_at));
      setError(false);
      setNotice(t.saved);
    } catch (saveError) {
      console.error(
        "Dining-room admin save failed",
        saveError,
      );
      setError(true);
      setNotice(t.saveError);
    } finally {
      setSaving(false);
    }
  }

  const filteredMessages =
    filter === "all"
      ? messages
      : messages.filter(
          (item) => item.status === filter,
        );

  const statusOptions: Array<{
    value: DiningMessage["status"];
    label: string;
  }> = [
    { value: "new", label: t.new },
    {
      value: "in_progress",
      label: t.inProgress,
    },
    { value: "answered", label: t.answered },
    { value: "archived", label: t.archived },
  ];

  function responseLabel(
    preference: DiningMessage["response_preference"],
  ) {
    if (preference === "private") {
      return t.private;
    }

    if (preference === "public") {
      return t.public;
    }

    return t.none;
  }

  function subjectLabel(subject: string) {
    return (
      t.subjects[
        subject as keyof typeof t.subjects
      ] ?? subject
    );
  }

  return (
    <section className="diningAdmin">
      <header className="adminHeader">
        <div>
          <p className="eyebrow">
            🍽️ CWRC
          </p>
          <h2>{t.title}</h2>
          <p>{t.intro}</p>
        </div>

        <span className="total">
          {messages.length}
        </span>
      </header>

      <nav
        className="filters"
        aria-label={t.status}
      >
        <button
          type="button"
          className={
            filter === "all" ? "active" : ""
          }
          onClick={() => setFilter("all")}
        >
          {t.all}
        </button>

        {statusOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={
              filter === option.value
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter(option.value)
            }
          >
            {option.label}
          </button>
        ))}
      </nav>

      {busy ? (
        <p className="notice">
          ☕ {t.loading}
        </p>
      ) : filteredMessages.length === 0 ? (
        <p className="notice">{t.empty}</p>
      ) : (
        <div className="messageGrid">
          {filteredMessages.map((item) => (
            <article
              key={item.id}
              className={
                selected?.id === item.id
                  ? "messageCard selected"
                  : "messageCard"
              }
            >
              <div className="meta">
                <span>
                  {item.visitor_name ||
                    t.anonymous}
                </span>

                <span>
                  {new Intl.DateTimeFormat(
                    locale,
                    {
                      dateStyle: "medium",
                      timeStyle: "short",
                    },
                  ).format(
                    new Date(item.created_at),
                  )}
                </span>
              </div>

              <h3>
                {subjectLabel(item.subject_type)}
              </h3>

              <p className="messagePreview">
                {item.message}
              </p>

              <div className="badges">
                <span>
                  {t.language}:{" "}
                  {item.locale.toUpperCase()}
                </span>

                <span>
                  {t.responseChoice}:{" "}
                  {responseLabel(
                    item.response_preference,
                  )}
                </span>

                <span>{item.status}</span>
              </div>

              <button
                type="button"
                className="primaryButton"
                onClick={() =>
                  selectMessage(item)
                }
              >
                {selected?.id === item.id
                  ? `✓ ${t.selected}`
                  : t.examine}
              </button>
            </article>
          ))}
        </div>
      )}

      {selected && (
        <section
          id="cwrc-dining-message-review"
          className="reviewPanel"
        >
          <header className="reviewHeader">
            <div>
              <p className="eyebrow">
                💌 {t.selected}
              </p>
              <h2>
                {subjectLabel(
                  selected.subject_type,
                )}
              </h2>
            </div>

            <button
              type="button"
              className="outlineButton"
              onClick={closeMessage}
            >
              {t.close}
            </button>
          </header>

          <div className="messageBox">
            <p>
              <strong>{t.message}</strong>
            </p>
            <p>{selected.message}</p>

            <div className="details">
              <span>
                <strong>{t.language}:</strong>{" "}
                {selected.locale.toUpperCase()}
              </span>

              <span>
                <strong>
                  {t.responseChoice}:
                </strong>{" "}
                {responseLabel(
                  selected.response_preference,
                )}
              </span>

              <span>
                <strong>{t.received}:</strong>{" "}
                {new Intl.DateTimeFormat(locale, {
                  dateStyle: "long",
                  timeStyle: "short",
                }).format(
                  new Date(selected.created_at),
                )}
              </span>
            </div>
          </div>

          <div className="identityBox">
            <p>
              <strong>
                {selected.visitor_name ||
                  t.anonymous}
              </strong>
            </p>

            <p>
              {selected.publish_name
                ? `✓ ${t.publishName}`
                : t.keepAnonymous}
            </p>

            {selected.visitor_email ? (
              <div className="emailRow">
                <a
                  href={`mailto:${selected.visitor_email}`}
                >
                  {selected.visitor_email}
                </a>

                <button
                  type="button"
                  className="smallButton"
                  onClick={copyEmail}
                >
                  {t.copyEmail}
                </button>
              </div>
            ) : (
              <p>{t.noEmail}</p>
            )}
          </div>

          <div className="formGrid">
            <label className="field">
              {t.status}

              <select
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target
                      .value as DiningMessage["status"],
                  )
                }
              >
                {statusOptions.map(
                  (option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ),
                )}
              </select>
            </label>

            <label className="field">
              {t.notes}
              <small>{t.notesHelp}</small>

              <textarea
                rows={5}
                value={notes}
                onChange={(event) =>
                  setNotes(event.target.value)
                }
              />
            </label>

            {selected.response_preference ===
              "public" && (
              <div className="publicResponses">
                <p className="publicHelp">
                  🔒 {t.publicHelp}
                </p>

                <label className="field">
                  {t.responseFr}

                  <textarea
                    rows={7}
                    value={responseFr}
                    onChange={(event) =>
                      setResponseFr(
                        event.target.value,
                      )
                    }
                  />
                </label>

                <label className="field">
                  {t.responseEn}

                  <textarea
                    rows={7}
                    value={responseEn}
                    onChange={(event) =>
                      setResponseEn(
                        event.target.value,
                      )
                    }
                  />
                </label>

                <label className="field">
                  {t.responseEs}

                  <textarea
                    rows={7}
                    value={responseEs}
                    onChange={(event) =>
                      setResponseEs(
                        event.target.value,
                      )
                    }
                  />
                </label>

                <button
                  type="button"
                  className={
                    published
                      ? "unpublishButton"
                      : "publishButton"
                  }
                  onClick={togglePublication}
                >
                  {published
                    ? t.unpublish
                    : t.publish}
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            className="saveButton"
            disabled={saving}
            onClick={saveMessage}
          >
            {saving ? t.saving : t.save}
          </button>
        </section>
      )}

      {notice && (
        <p
          role={error ? "alert" : "status"}
          className={
            error
              ? "result error"
              : "result success"
          }
        >
          {notice}
        </p>
      )}

      <style jsx>{`
        .diningAdmin {
          margin-top: 42px;
          padding: 28px;
          border: 1px solid
            rgba(93, 49, 95, 0.25);
          border-radius: 24px;
          background: #fbf4fa;
          color: #33253b;
          box-shadow: 0 14px 35px
            rgba(74, 42, 75, 0.1);
        }

        .adminHeader,
        .reviewHeader {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
        }

        .adminHeader h2,
        .reviewHeader h2 {
          margin: 5px 0;
          color: #5d315f;
          font-family: Georgia, serif;
        }

        .adminHeader p,
        .reviewHeader p {
          line-height: 1.6;
        }

        .eyebrow {
          margin: 0;
          color: #9a7228;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .total {
          display: grid;
          min-width: 42px;
          height: 42px;
          place-items: center;
          border-radius: 50%;
          background: #5d315f;
          color: white;
          font-weight: 800;
        }

        .filters {
          display: flex;
          margin: 24px 0;
          flex-wrap: wrap;
          gap: 8px;
        }

        .filters button,
        .outlineButton,
        .smallButton {
          cursor: pointer;
          border: 1px solid #6d426f;
          border-radius: 999px;
          background: transparent;
          color: #5d315f;
          font-weight: 700;
        }

        .filters button {
          padding: 8px 13px;
        }

        .filters button.active {
          background: #5d315f;
          color: white;
        }

        .messageGrid {
          display: grid;
          grid-template-columns:
            repeat(auto-fit, minmax(280px, 1fr));
          gap: 18px;
        }

        .messageCard {
          display: grid;
          padding: 20px;
          gap: 13px;
          border: 1px solid
            rgba(93, 49, 95, 0.2);
          border-radius: 17px;
          background: white;
        }

        .messageCard.selected {
          border-color: #8c5c8e;
          box-shadow: 0 0 0 3px
            rgba(140, 92, 142, 0.13);
        }

        .messageCard h3 {
          margin: 0;
          color: #5d315f;
        }

        .meta,
        .details,
        .badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 14px;
          color: #705f71;
          font-size: 0.82rem;
        }

        .meta {
          justify-content: space-between;
        }

        .messagePreview {
          display: -webkit-box;
          margin: 0;
          overflow: hidden;
          line-height: 1.6;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
        }

        .badges span {
          padding: 5px 8px;
          border-radius: 999px;
          background: #f2e6f1;
        }

        .primaryButton,
        .saveButton,
        .publishButton,
        .unpublishButton {
          cursor: pointer;
          border: 0;
          border-radius: 999px;
          color: white;
          font-weight: 800;
        }

        .primaryButton {
          justify-self: start;
          padding: 10px 16px;
          background: #5d315f;
        }

        .reviewPanel {
          margin-top: 34px;
          padding: 26px;
          border: 2px solid #b89454;
          border-radius: 20px;
          background: #fffdf8;
        }

        .outlineButton {
          padding: 9px 15px;
        }

        .messageBox,
        .identityBox,
        .publicResponses {
          margin-top: 20px;
          padding: 18px;
          border-radius: 14px;
        }

        .messageBox {
          background: #f7f1e6;
        }

        .messageBox p {
          line-height: 1.65;
          white-space: pre-wrap;
        }

        .identityBox {
          background: #f2e6f1;
        }

        .identityBox p {
          margin: 6px 0;
        }

        .emailRow {
          display: flex;
          margin-top: 12px;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .smallButton {
          padding: 7px 11px;
        }

        .formGrid {
          display: grid;
          margin-top: 22px;
          gap: 20px;
        }

        .field {
          display: grid;
          gap: 7px;
          font-weight: 800;
        }

        .field small {
          color: #705f71;
          font-weight: 400;
        }

        select,
        textarea {
          box-sizing: border-box;
          width: 100%;
          padding: 12px 14px;
          border: 1px solid
            rgba(70, 45, 72, 0.28);
          border-radius: 11px;
          background: white;
          color: #33253b;
          font-family: Georgia, serif;
          font-size: 1rem;
        }

        textarea {
          resize: vertical;
        }

        .publicResponses {
          display: grid;
          gap: 18px;
          border: 1px solid
            rgba(93, 49, 95, 0.2);
          background: #fbf4fa;
        }

        .publicHelp {
          margin: 0;
          color: #6e5b3f;
          line-height: 1.6;
        }

        .publishButton,
        .unpublishButton {
          justify-self: start;
          padding: 11px 17px;
        }

        .publishButton {
          background: #346b4a;
        }

        .unpublishButton {
          background: #8b463e;
        }

        .saveButton {
          margin-top: 22px;
          padding: 13px 24px;
          background: #102a4c;
        }

        .saveButton:disabled {
          cursor: wait;
          opacity: 0.6;
        }

        .notice,
        .result {
          padding: 15px;
          border-radius: 12px;
          line-height: 1.6;
        }

        .notice {
          background: #f7f1e6;
        }

        .result {
          margin-top: 18px;
          font-weight: 700;
        }

        .success {
          border: 1px solid #77a984;
          background: #e4f4e8;
          color: #244c2d;
        }

        .error {
          border: 1px solid #c77a6c;
          background: #fff0ed;
          color: #74372c;
        }

        @media (max-width: 700px) {
          .diningAdmin,
          .reviewPanel {
            padding: 18px;
          }

          .adminHeader,
          .reviewHeader {
            flex-direction: column;
          }

          .messageGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}