"use client";

import { useEffect, useState } from "react";
import type { Locale } from "../i18n/config";

type PublicReply = {
  id: string;
  created_at: string;
  visitor_display_name: string | null;
  subject_type: string;
  message: string;
  response: string;
};

const copy = {
  fr: {
    title: "Conversations autour de la table",
    intro:
      "Des échanges que nos visiteurs ont choisi de partager publiquement.",
    loading: "Amateur consulte les conversations…",
    empty:
      "La table attend sa première conversation publique.",
    anonymous: "Visiteur anonyme",
    visitorSaid: "Notre visiteur nous a confié",
    cwrcReply: "La réponse du CWRC",
    loadError:
      "Les conversations publiques ne sont pas disponibles pour le moment.",
    subjects: {
      recipe: "Suggestion de recette",
      joke: "Blague",
      artwork: "Soumission d’une œuvre",
      idea: "Idée",
      region: "Région",
      about: "À propos de notre visiteur",
      other: "Autre",
    },
  },

  en: {
    title: "Conversations Around the Table",
    intro:
      "Conversations our visitors chose to share publicly.",
    loading:
      "Amateur is reviewing the conversations…",
    empty:
      "The table is waiting for its first public conversation.",
    anonymous: "Anonymous visitor",
    visitorSaid: "Our visitor shared",
    cwrcReply: "The CWRC reply",
    loadError:
      "Public conversations are not available at the moment.",
    subjects: {
      recipe: "Recipe suggestion",
      joke: "Joke",
      artwork: "Artwork submission",
      idea: "Idea",
      region: "Region",
      about: "About our visitor",
      other: "Other",
    },
  },

  es: {
    title: "Conversaciones alrededor de la mesa",
    intro:
      "Conversaciones que nuestros visitantes decidieron compartir públicamente.",
    loading: "Amateur revisa las conversaciones…",
    empty:
      "La mesa espera su primera conversación pública.",
    anonymous: "Visitante anónimo",
    visitorSaid: "Nuestro visitante compartió",
    cwrcReply: "La respuesta del CWRC",
    loadError:
      "Las conversaciones públicas no están disponibles en este momento.",
    subjects: {
      recipe: "Sugerencia de receta",
      joke: "Broma",
      artwork: "Presentación de una obra",
      idea: "Idea",
      region: "Región",
      about: "Sobre nuestro visitante",
      other: "Otro",
    },
  },
} as const;

export default function DiningRoomPublicReplies({
  locale,
}: {
  locale: Locale;
}) {
  const t = copy[locale];

  const [replies, setReplies] = useState<
    PublicReply[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    void loadReplies();
  }, [locale]);

  async function loadReplies() {
    const url =
      process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key =
      process.env
        .NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !key) {
      setError(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const response = await fetch(
        `${url}/rest/v1/rpc/get_public_dining_replies`,
        {
          method: "POST",
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requested_locale: locale,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setReplies(await response.json());
    } catch (loadError) {
      console.error(
        "Public dining-room replies failed",
        loadError,
      );
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function subjectLabel(subject: string) {
    return (
      t.subjects[
        subject as keyof typeof t.subjects
      ] ?? subject
    );
  }

  return (
    <section className="publicConversations">
      <header className="sectionHeader">
        <p className="eyebrow">
          💬 CWRC
        </p>
        <h2>{t.title}</h2>
        <p>{t.intro}</p>
      </header>

      {loading ? (
        <p className="notice">
          ☕ {t.loading}
        </p>
      ) : error ? (
        <p className="notice error">
          {t.loadError}
        </p>
      ) : replies.length === 0 ? (
        <p className="notice">{t.empty}</p>
      ) : (
        <div className="conversationList">
          {replies.map((reply) => (
            <article
              key={reply.id}
              className="conversationCard"
            >
              <header className="cardHeader">
                <div>
                  <p className="subject">
                    {subjectLabel(
                      reply.subject_type,
                    )}
                  </p>

                  <h3>
                    {reply.visitor_display_name ||
                      t.anonymous}
                  </h3>
                </div>

                <time
                  dateTime={reply.created_at}
                >
                  {new Intl.DateTimeFormat(
                    locale,
                    {
                      dateStyle: "long",
                    },
                  ).format(
                    new Date(reply.created_at),
                  )}
                </time>
              </header>

              <div className="visitorMessage">
                <p className="label">
                  {t.visitorSaid}
                </p>
                <p>{reply.message}</p>
              </div>

              <div className="cwrcResponse">
                <p className="label">
                  {t.cwrcReply}
                </p>
                <p>{reply.response}</p>
              </div>
            </article>
          ))}
        </div>
      )}

      <style jsx>{`
        .publicConversations {
          max-width: 1050px;
          margin: 42px auto 0;
          color: #33253b;
        }

        .sectionHeader {
          max-width: 760px;
          margin: 0 auto 24px;
          text-align: center;
        }

        .sectionHeader h2 {
          margin: 6px 0 10px;
          color: #5d315f;
          font-family: Georgia, serif;
          font-size: clamp(2rem, 5vw, 3rem);
        }

        .sectionHeader p:not(.eyebrow) {
          line-height: 1.65;
        }

        .eyebrow,
        .subject,
        .label {
          color: #9a7228;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .eyebrow {
          margin: 0;
        }

        .notice {
          padding: 20px;
          border: 1px solid
            rgba(93, 49, 95, 0.2);
          border-radius: 16px;
          background: #fbf4fa;
          text-align: center;
          line-height: 1.6;
        }

        .notice.error {
          border-color: #c77a6c;
          background: #fff0ed;
          color: #74372c;
        }

        .conversationList {
          display: grid;
          gap: 24px;
        }

        .conversationCard {
          overflow: hidden;
          border: 1px solid
            rgba(93, 49, 95, 0.24);
          border-radius: 20px;
          background: #fffdf8;
          box-shadow: 0 14px 32px
            rgba(74, 42, 75, 0.1);
        }

        .cardHeader {
          display: flex;
          padding: 20px 22px;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          background: #f2e6f1;
        }

        .cardHeader h3 {
          margin: 5px 0 0;
          color: #5d315f;
          font-family: Georgia, serif;
          font-size: 1.35rem;
        }

        .cardHeader time {
          color: #705f71;
          font-size: 0.85rem;
        }

        .subject,
        .label {
          margin: 0;
        }

        .visitorMessage,
        .cwrcResponse {
          padding: 22px;
        }

        .visitorMessage p:last-child,
        .cwrcResponse p:last-child {
          margin: 10px 0 0;
          white-space: pre-wrap;
          line-height: 1.75;
        }

        .visitorMessage {
          background: white;
        }

        .cwrcResponse {
          border-top: 1px solid
            rgba(154, 114, 40, 0.24);
          background: #faf3e7;
        }

        .cwrcResponse .label {
          color: #5d315f;
        }

        @media (max-width: 650px) {
          .cardHeader {
            flex-direction: column;
            gap: 8px;
          }

          .visitorMessage,
          .cwrcResponse {
            padding: 18px;
          }
        }
      `}</style>
    </section>
  );
}