"use client";

import {useEffect, useState} from "react";

type Row = Record<string, any>;

const blankEntry = {
  title_fr: "",
  title_en: "",
  title_es: "",
  description_fr: "",
  description_en: "",
  description_es: "",
  poster_url: "",
  character_url: "",
  music_url: "",
  film_url: "",
  display_order: 1,
  is_published: false,
};

const blankStory = {
  chapter_number: 1,
  title_fr: "",
  title_en: "",
  title_es: "",
  story_fr: "",
  story_en: "",
  story_es: "",
  illustration_url: "",
  factual_notes: "",
  resource_url: "",
  is_published: false,
};

export default function TheatreStoryManager() {
  const [entries, setEntries] = useState<Row[]>([]);
  const [stories, setStories] = useState<Row[]>([]);
  const [entry, setEntry] = useState<Row>(blankEntry);
  const [story, setStory] = useState<Row>(blankStory);
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  const token = () =>
    sessionStorage.getItem("cwrc_admin_token") || key || "";

  const headers = () => ({
    apikey: key || "",
    Authorization: `Bearer ${token()}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  });

  const load = async () => {
    if (!base || !key) return;

    const [entriesResponse, storiesResponse] = await Promise.all([
      fetch(
        `${base}/rest/v1/theatre_entries?select=*&order=display_order.asc`,
        {headers: headers()},
      ),
      fetch(
        `${base}/rest/v1/imaginary_stories?select=*&order=chapter_number.asc`,
        {headers: headers()},
      ),
    ]);

    if (entriesResponse.ok) setEntries(await entriesResponse.json());
    if (storiesResponse.ok) setStories(await storiesResponse.json());
  };

  useEffect(() => {
    const readConnection = () => {
      setIsConnected(
        Boolean(sessionStorage.getItem("cwrc_admin_token")),
      );
    };

    readConnection();
    const interval = window.setInterval(readConnection, 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isConnected) {
      void load();
    }
  }, [isConnected]);

  const save = async (
    table: string,
    row: Row,
    setter: (value: Row) => void,
  ) => {
    if (!base) return;

    const id = row.id;
    const body = {...row};
    delete body.id;

    const response = await fetch(
      `${base}/rest/v1/${table}${id ? `?id=eq.${id}` : ""}`,
      {
        method: id ? "PATCH" : "POST",
        headers: headers(),
        body: JSON.stringify(body),
      },
    );

    const responseText = await response.text();

    if (!response.ok) {
      setMessage(
        `Enregistrement refusé (${response.status}) : ${responseText}`,
      );
      return;
    }

    setMessage("Enregistré avec succès.");
    const saved = JSON.parse(responseText)[0];
    setter(saved);
    void load();
  };

  const field = (
    label: string,
    name: string,
    row: Row,
    setter: (value: Row) => void,
    area = false,
  ) => (
    <label>
      {label}
      {area ? (
        <textarea
          value={row[name] || ""}
          onChange={(event) =>
            setter({...row, [name]: event.target.value})
          }
        />
      ) : (
        <input
          value={row[name] ?? ""}
          onChange={(event) =>
            setter({...row, [name]: event.target.value})
          }
        />
      )}
    </label>
  );

  if (!isConnected) {
    return null;
  }

  return (
    <section className="manager">
      <h2>🎭 Théâtre et recueil d’histoires</h2>
      <p>
        Créez les programmations du théâtre et les rencontres imaginaires
        dans les trois langues.
      </p>

      {message && <strong className="message">{message}</strong>}

      <div className="columns">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void save("theatre_entries", entry, setEntry);
          }}
        >
          <h3>Programmation du théâtre</h3>

          <select
            onChange={(event) =>
              setEntry(
                entries.find((item) => item.id === event.target.value) ||
                  blankEntry,
              )
            }
          >
            <option value="">Nouvelle programmation</option>
            {entries.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title_fr}
              </option>
            ))}
          </select>

          {field("Titre français", "title_fr", entry, setEntry)}
          {field("Titre anglais", "title_en", entry, setEntry)}
          {field("Titre espagnol", "title_es", entry, setEntry)}
          {field(
            "Résumé français",
            "description_fr",
            entry,
            setEntry,
            true,
          )}
          {field(
            "Résumé anglais",
            "description_en",
            entry,
            setEntry,
            true,
          )}
          {field(
            "Résumé espagnol",
            "description_es",
            entry,
            setEntry,
            true,
          )}

          {field(
            "URL de l’affiche (ex. /images/affiche-diva-alys-robi.png)",
            "poster_url",
            entry,
            setEntry,
          )}
          {entry.poster_url && (
            <img
              className="posterPreview"
              src={entry.poster_url}
              alt="Aperçu de l’affiche"
            />
          )}

          {field(
            "URL du personnage (ex. /images/alys-robi-scene.png)",
            "character_url",
            entry,
            setEntry,
          )}
          {entry.character_url && (
            <div className="characterPreview">
              <img
                src={entry.character_url}
                alt="Aperçu du personnage"
              />
            </div>
          )}

          {field("Lien musique", "music_url", entry, setEntry)}
          {field("Lien film", "film_url", entry, setEntry)}

          <label className="check">
            <input
              type="checkbox"
              checked={!!entry.is_published}
              onChange={(event) =>
                setEntry({
                  ...entry,
                  is_published: event.target.checked,
                })
              }
            />
            Publier
          </label>

          <button>Enregistrer la programmation</button>
        </form>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void save("imaginary_stories", story, setStory);
          }}
        >
          <h3>Rencontre imaginaire</h3>

          <select
            onChange={(event) =>
              setStory(
                stories.find((item) => item.id === event.target.value) ||
                  blankStory,
              )
            }
          >
            <option value="">Nouvelle histoire</option>
            {stories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title_fr}
              </option>
            ))}
          </select>

          {field("Numéro de chapitre", "chapter_number", story, setStory)}
          {field("Titre français", "title_fr", story, setStory)}
          {field("Titre anglais", "title_en", story, setStory)}
          {field("Titre espagnol", "title_es", story, setStory)}
          {field("Histoire française", "story_fr", story, setStory, true)}
          {field("Histoire anglaise", "story_en", story, setStory, true)}
          {field("Histoire espagnole", "story_es", story, setStory, true)}
          {field(
            "URL de l’illustration",
            "illustration_url",
            story,
            setStory,
          )}
          {field(
            "Repères historiques",
            "factual_notes",
            story,
            setStory,
            true,
          )}
          {field("Lien documentaire", "resource_url", story, setStory)}

          <label className="check">
            <input
              type="checkbox"
              checked={!!story.is_published}
              onChange={(event) =>
                setStory({
                  ...story,
                  is_published: event.target.checked,
                })
              }
            />
            Publier
          </label>

          <button>Enregistrer l’histoire</button>
        </form>
      </div>

      <style jsx>{`
        .manager{margin-top:42px;padding:28px;background:#f5ead0;border:2px solid #b48946;border-radius:20px;color:#382719}
        .message{display:block;margin:12px 0;color:#175b38}
        .columns{display:grid;grid-template-columns:1fr 1fr;gap:24px}
        form{display:grid;gap:12px;padding:20px;background:#fffaf0;border-radius:14px}
        label{display:grid;gap:5px;font-weight:700}
        input,textarea,select{padding:10px;border:1px solid #9a7848;border-radius:8px;font:inherit}
        textarea{min-height:90px}
        .check{display:flex;align-items:center;gap:8px}
        .posterPreview{display:block;width:130px;max-height:180px;object-fit:cover;margin:4px auto 8px;border:4px solid #8c642d}
        .characterPreview{padding:8px;background:#173a62;border-radius:10px;text-align:center}
        .characterPreview img{max-width:150px;max-height:220px;object-fit:contain}
        button{padding:12px;background:#173a62;color:white;border:0;border-radius:999px;font-weight:700;cursor:pointer}
        @media(max-width:800px){.columns{grid-template-columns:1fr}}
      `}</style>
    </section>
  );
}
