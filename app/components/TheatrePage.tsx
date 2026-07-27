"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import type {Locale} from "../i18n/config";
import {localizedHref} from "../i18n/config";

type Entry = {
  id: string; title_fr: string; title_en: string; title_es: string;
  description_fr: string | null; description_en: string | null; description_es: string | null;
  poster_url: string | null; poster_alt_fr: string | null; poster_alt_en: string | null; poster_alt_es: string | null;
  music_url: string | null; film_url: string | null; featured_story_id: string | null;
};

const ui = {
  fr: {title: "Le Théâtre du CWRC", intro: "Des artistes, des chansons, des films et des rencontres imaginaires.", music: "Écouter", film: "Regarder", story: "Lire la rencontre imaginaire", empty: "La programmation arrive bientôt."},
  en: {title: "The CWRC Theatre", intro: "Artists, songs, films and imaginary encounters.", music: "Listen", film: "Watch", story: "Read the imaginary encounter", empty: "The programme is coming soon."},
  es: {title: "El Teatro del CWRC", intro: "Artistas, canciones, películas y encuentros imaginarios.", music: "Escuchar", film: "Ver", story: "Leer el encuentro imaginario", empty: "La programación llegará pronto."},
};

export default function TheatrePage({locale}: {locale: Locale}) {
  const [entries, setEntries] = useState<Entry[]>([]);
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return;
    fetch(`${url}/rest/v1/theatre_entries?is_published=eq.true&select=*&order=display_order.asc`, {headers: {apikey: key}})
      .then((r) => r.ok ? r.json() : []).then(setEntries).catch(() => setEntries([]));
  }, []);
  const t = ui[locale];
  const value = (entry: Entry, field: "title" | "description" | "poster_alt") =>
    (entry[`${field}_${locale}` as keyof Entry] || entry[`${field}_fr` as keyof Entry] || "") as string;
  return <section className="theatre">
    <div className="curtain left" aria-hidden="true" /><div className="curtain right" aria-hidden="true" />
    <header><p>✦ CWRC ✦</p><h1>{t.title}</h1><p>{t.intro}</p></header>
    <div className="stage">
      {entries.length === 0 && <p className="empty">{t.empty}</p>}
      {entries.map((entry) => <article key={entry.id}>
        {entry.poster_url && <img src={entry.poster_url} alt={value(entry, "poster_alt")} />}
        <div><h2>{value(entry, "title")}</h2><p>{value(entry, "description")}</p>
          <nav>
            {entry.music_url && <a href={entry.music_url} target="_blank" rel="noreferrer">🎙️ {t.music}</a>}
            {entry.film_url && <a href={entry.film_url} target="_blank" rel="noreferrer">🎬 {t.film}</a>}
            {entry.featured_story_id && <Link href={`${localizedHref(locale, "imaginary-encounters")}?story=${entry.featured_story_id}`}>📖 {t.story}</Link>}
          </nav>
        </div>
      </article>)}
    </div>
    <style jsx>{`
      .theatre{position:relative;overflow:hidden;min-height:70vh;padding:42px clamp(20px,7vw,100px);border-radius:24px;background:radial-gradient(circle at 50% 25%,#693a22,#160d0b 72%);color:#fff4d4}
      header{text-align:center;position:relative;z-index:2} header p:first-child{letter-spacing:.2em;color:#e3bd67} h1{font-family:Georgia,serif;font-size:clamp(2.6rem,7vw,5.5rem);margin:.2em}
      .curtain{position:absolute;top:0;bottom:0;width:15%;background:repeating-linear-gradient(90deg,#5d0715,#a8162d 30%,#520512 58%);z-index:1}.left{left:0}.right{right:0}
      .stage{position:relative;z-index:2;display:grid;gap:24px;max-width:920px;margin:36px auto}.empty{text-align:center}
      article{display:grid;grid-template-columns:minmax(180px,280px) 1fr;gap:28px;padding:22px;background:#fff8e9;color:#352116;border:3px solid #c69b42;border-radius:18px;box-shadow:0 16px 40px #0008}
      img{width:100%;aspect-ratio:3/4;object-fit:cover;border:8px solid #6d431c}h2{font:700 2rem Georgia,serif;margin:.2em 0}nav{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}a{padding:11px 15px;border-radius:999px;background:#14385e;color:white;text-decoration:none;font-weight:700}
      @media(max-width:650px){article{grid-template-columns:1fr}.curtain{width:7%}.theatre{padding-inline:28px}}
    `}</style>
  </section>;
}
