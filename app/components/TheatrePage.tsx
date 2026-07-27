"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import type {Locale} from "../i18n/config";
import {localizedHref} from "../i18n/config";

type Entry = {
  id: string;
  title_fr: string;
  title_en: string;
  title_es: string;
  description_fr: string | null;
  description_en: string | null;
  description_es: string | null;
  poster_url: string | null;
  poster_alt_fr: string | null;
  poster_alt_en: string | null;
  poster_alt_es: string | null;
  character_url: string | null;
  music_url: string | null;
  film_url: string | null;
  featured_story_id: string | null;
};

const ui = {
  fr: {
    title: "Le Théâtre du CWRC",
    intro:
      "Choisissez une affiche pour découvrir l’artiste, sa musique, ses films et ses rencontres imaginaires.",
    music: "Musique",
    film: "Film",
    story: "Histoire",
    empty: "La première représentation est en préparation.",
  },
  en: {
    title: "The CWRC Theatre",
    intro:
      "Choose a poster to discover the artist, their music, films and imaginary encounters.",
    music: "Music",
    film: "Film",
    story: "Story",
    empty: "The first performance is being prepared.",
  },
  es: {
    title: "El Teatro del CWRC",
    intro:
      "Elige un cartel para descubrir al artista, su música, sus películas y sus encuentros imaginarios.",
    music: "Música",
    film: "Película",
    story: "Historia",
    empty: "La primera presentación está en preparación.",
  },
};

export default function TheatrePage({locale}: {locale: Locale}) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !key) return;

    fetch(
      `${url}/rest/v1/theatre_entries?is_published=eq.true&select=*&order=display_order.asc`,
      {headers: {apikey: key}},
    )
      .then((response) => (response.ok ? response.json() : []))
      .then((rows: Entry[]) => {
        setEntries(rows);
        if (rows[0]) setSelectedId(rows[0].id);
      })
      .catch(() => setEntries([]));
  }, []);

  const t = ui[locale];
  const selected =
    entries.find((entry) => entry.id === selectedId) ?? entries[0];

  const text = (
    entry: Entry,
    field: "title" | "description" | "poster_alt",
  ) =>
    (entry[`${field}_${locale}` as keyof Entry] ||
      entry[`${field}_fr` as keyof Entry] ||
      "") as string;

  return (
    <section className="theatrePage">
      <header>
        <p className="eyebrow">✦ CWRC ✦</p>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
      </header>

      <div className="theatreRoom">
        <img
          className="roomImage"
          src="/images/theatre-cwrc.png"
          alt=""
        />

        {selected?.character_url && (
          <img
            className="character"
            src={selected.character_url}
            alt={text(selected, "title")}
          />
        )}

        {selected?.poster_url && (
          <img
            className="poster"
            src={selected.poster_url}
            alt={text(selected, "poster_alt") || text(selected, "title")}
          />
        )}

        {selected && (
          <div className="theatreButtons">
            {selected.music_url ? (
              <a
                href={selected.music_url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${t.music}: ${text(selected, "title")}`}
              >
                <span>🎙️</span>
                <strong>{t.music}</strong>
              </a>
            ) : (
              <span className="inactive" aria-hidden="true">
                🎙️
              </span>
            )}

            {selected.film_url ? (
              <a
                href={selected.film_url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${t.film}: ${text(selected, "title")}`}
              >
                <span>🎬</span>
                <strong>{t.film}</strong>
              </a>
            ) : (
              <span className="inactive" aria-hidden="true">
                🎬
              </span>
            )}

            {selected.featured_story_id ? (
              <Link
                href={`${localizedHref(locale, "imaginary-encounters")}?story=${selected.featured_story_id}`}
                aria-label={`${t.story}: ${text(selected, "title")}`}
              >
                <span>📖</span>
                <strong>{t.story}</strong>
              </Link>
            ) : (
              <span className="inactive" aria-hidden="true">
                📖
              </span>
            )}
          </div>
        )}
      </div>

      {selected && text(selected, "description") && (
        <div className="artistDescription">
          <h2>{text(selected, "title")}</h2>
          <p>{text(selected, "description")}</p>
        </div>
      )}

      {entries.length === 0 ? (
        <p className="empty">{t.empty}</p>
      ) : (
        <nav className="programme" aria-label={t.title}>
          {entries.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className={entry.id === selected?.id ? "active" : ""}
              onClick={() => setSelectedId(entry.id)}
            >
              {text(entry, "title")}
            </button>
          ))}
        </nav>
      )}

      <style jsx>{`
        .theatrePage {
          color: #342217;
        }

        header {
          max-width: 850px;
          margin: 0 auto 28px;
          text-align: center;
        }

        .eyebrow {
          color: #9b6b28;
          font-weight: 800;
          letter-spacing: 0.2em;
        }

        h1 {
          margin: 0.15em 0;
          color: #102a4c;
          font: 700 clamp(2.5rem, 6vw, 5rem) Georgia, serif;
        }

        header > p:last-child {
          font-size: 1.1rem;
          line-height: 1.65;
        }

        .theatreRoom {
          position: relative;
          width: 100%;
          overflow: hidden;
          border: 5px solid #b78939;
          border-radius: 22px;
          background: #0b0b10;
          box-shadow: 0 22px 55px #25170d55;
        }

        .roomImage {
          display: block;
          width: 100%;
          height: auto;
        }

        .character {
          position: absolute;
          z-index: 2;
          left: 27%;
          bottom: 18%;
          width: 22%;
          height: 62%;
          object-fit: contain;
          object-position: center bottom;
          filter: drop-shadow(0 10px 9px #0008);
        }

        .poster {
          position: absolute;
          z-index: 2;
          left: 80.15%;
          top: 17.2%;
          width: 12.65%;
          height: 33.4%;
          object-fit: cover;
        }

        .theatreButtons {
          position: absolute;
          z-index: 3;
          left: 80.25%;
          top: 56.8%;
          display: grid;
          width: 12.45%;
          height: 22%;
          grid-template-rows: repeat(3, 1fr);
          gap: 4.5%;
        }

        .theatreButtons a,
        .theatreButtons .inactive {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-width: 0;
          gap: 6px;
          border: 1px solid #c99b46;
          border-radius: 8px;
          background: #102a4ce8;
          color: #fff4d2;
          font-size: clamp(0.58rem, 1vw, 1rem);
          text-decoration: none;
          transition: 0.2s;
        }

        .theatreButtons a:hover,
        .theatreButtons a:focus-visible {
          background: #255485;
          outline: 2px solid white;
          transform: scale(1.04);
        }

        .theatreButtons .inactive {
          opacity: 0.35;
        }

        .artistDescription {
          max-width: 760px;
          margin: 20px auto 4px;
          padding: 18px 24px;
          border: 2px solid #c6a15b;
          border-radius: 14px;
          background: #fffaf0;
          color: #342217;
          text-align: center;
        }

        .artistDescription h2 {
          margin: 0 0 8px;
          color: #102a4c;
          font: 700 1.5rem Georgia, serif;
        }

        .artistDescription p {
          margin: 0;
          font-size: 1.05rem;
          line-height: 1.55;
        }

        .programme {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          padding: 22px 3px 8px;
        }

        .programme button {
          flex: 0 0 auto;
          min-width: 150px;
          padding: 14px 22px;
          cursor: pointer;
          border: 2px solid #c6a15b;
          border-radius: 14px;
          background: #fffaf0;
          color: #102a4c;
          font: 700 0.95rem Georgia, serif;
        }

        .programme button.active {
          border-color: #102a4c;
          box-shadow: 0 0 0 3px #d8b56f;
        }

        .empty {
          padding: 20px;
          text-align: center;
          font-style: italic;
        }

        @media (max-width: 700px) {
          .theatreRoom {
            border-width: 3px;
            border-radius: 13px;
          }

          .character {
            left: 25%;
            bottom: 17%;
            width: 24%;
            height: 63%;
          }

          .theatreButtons {
            gap: 3%;
          }

          .theatreButtons a strong {
            display: none;
          }

          .artistDescription {
            margin-top: 14px;
            padding: 14px 16px;
          }
        }
      `}</style>
    </section>
  );
}