"use client";

import {useEffect, useState} from "react";
import type {Locale} from "../i18n/config";

type Story = {
  id: string; chapter_number: number; title_fr: string; title_en: string; title_es: string;
  story_fr: string; story_en: string; story_es: string; illustration_url: string | null;
  factual_notes: string | null; resource_url: string | null;
};

const copy = {
  fr: {title: "Recueil d’histoires de rencontres imaginaires", toc: "Table des matières", fiction: "Cette rencontre est une œuvre de fiction inspirée de faits documentés.", facts: "Repères historiques", links: "Pour aller plus loin", empty: "Le premier chapitre est en préparation."},
  en: {title: "Collection of Imaginary Encounter Stories", toc: "Table of contents", fiction: "This encounter is a work of fiction inspired by documented facts.", facts: "Historical notes", links: "Learn more", empty: "The first chapter is being prepared."},
  es: {title: "Colección de historias de encuentros imaginarios", toc: "Índice", fiction: "Este encuentro es una obra de ficción inspirada en hechos documentados.", facts: "Referencias históricas", links: "Para saber más", empty: "El primer capítulo está en preparación."},
};

export default function ImaginaryEncounterBook({locale}: {locale: Locale}) {
  const [stories, setStories] = useState<Story[]>([]);
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return;
    fetch(`${url}/rest/v1/imaginary_stories?is_published=eq.true&select=*&order=chapter_number.asc`, {headers:{apikey:key}})
      .then((r) => r.ok ? r.json() : []).then(setStories).catch(() => setStories([]));
  }, []);
  const t = copy[locale];
  return <section className="book">
    <header><span>📖</span><h1>{t.title}</h1></header>
    <aside><h2>{t.toc}</h2><ol>{stories.map((s) => <li key={s.id}><a href={`#story-${s.id}`}>{s.chapter_number}. {s[`title_${locale}`]}</a></li>)}</ol></aside>
    {stories.length === 0 && <p>{t.empty}</p>}
    {stories.map((s) => <article id={`story-${s.id}`} key={s.id}>
      <h2>{s.chapter_number}. {s.title_fr} / {s.title_en} / {s.title_es}</h2>
      {s.illustration_url && <img src={s.illustration_url} alt="" />}
      <p className="fiction">{t.fiction}</p>
      <div className="languages">
        <section lang="fr"><h3>Français</h3><p>{s.story_fr}</p></section>
        <section lang="en"><h3>English</h3><p>{s.story_en}</p></section>
        <section lang="es"><h3>Español</h3><p>{s.story_es}</p></section>
      </div>
      {s.factual_notes && <div className="notes"><h3>{t.facts}</h3><p>{s.factual_notes}</p></div>}
      {s.resource_url && <a className="resource" href={s.resource_url} target="_blank" rel="noreferrer">{t.links} ↗</a>}
    </article>)}
    <style jsx>{`
      .book{max-width:1200px;margin:auto;padding:clamp(20px,5vw,65px);background:#f8efd9;color:#3e2a1d;border:3px solid #b6893e;border-radius:22px;box-shadow:0 20px 50px #26170d33}header{text-align:center}header span{font-size:4rem}h1,h2,h3{font-family:Georgia,serif}h1{font-size:clamp(2rem,5vw,4rem)}
      aside{padding:20px 28px;background:#efe0b9;border-left:6px solid #9d6729;margin:30px 0}aside a{color:#173a62}
      article{scroll-margin-top:20px;padding:36px 0;border-top:2px solid #b6893e}article>h2{text-align:center}.fiction{text-align:center;font-style:italic}
      img{display:block;max-width:min(100%,700px);max-height:540px;object-fit:contain;margin:22px auto;border:10px solid #6b451f}.languages{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.languages section{padding:20px;background:#fffaf0;border:1px solid #d6b77b}.languages p,.notes p{white-space:pre-wrap;line-height:1.75}.notes{margin-top:20px;padding:18px;background:#ead9b0}.resource{display:inline-block;margin-top:18px;color:#123a67;font-weight:700}
      @media(max-width:750px){.languages{grid-template-columns:1fr}}
    `}</style>
  </section>;
}
