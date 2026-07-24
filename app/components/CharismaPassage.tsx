"use client";

import Link from "next/link";
import {useEffect, useMemo, useState} from "react";
import type {Locale} from "../i18n/config";
import {localizedHref} from "../i18n/config";
import {
  charismaticPeople,
  type CharismaticPerson,
  type CharismaCategory,
} from "./charismaticPeopleData";

type Wall = "left" | "right";

const ui = {
  fr: {
    eyebrow: "Passage secret du CWRC",
    title: "La galerie des cent présences",
    intro: "Cent personnalités dont la présence, la voix, les idées ou l’audace ont marqué leur époque. Choisissez un mur et ouvrez un portrait pour découvrir ses repères biographiques.",
    choose: "Quel mur souhaitez-vous explorer?",
    left: "Le mur de gauche",
    right: "Le mur de droite",
    switch: "Regarder l’autre mur",
    birth: "Date de naissance",
    place: "Lieu de naissance",
    category: "Domaine",
    close: "Fermer la fiche",
    library: "Retour à la bibliothèque",
    cathy: "Entrer dans le bureau de Cathy",
    photoLoading: "Portrait en préparation…",
    source: "Portrait provenant de Wikipédia",
    note: "Les dates anciennes ou débattues sont indiquées approximativement.",
  },
  en: {
    eyebrow: "CWRC Secret Passage",
    title: "The Gallery of One Hundred Presences",
    intro: "One hundred personalities whose presence, voice, ideas, or daring marked their era. Choose a wall and open a portrait to discover key biographical details.",
    choose: "Which wall would you like to explore?",
    left: "The left wall",
    right: "The right wall",
    switch: "View the other wall",
    birth: "Date of birth",
    place: "Place of birth",
    category: "Field",
    close: "Close the record",
    library: "Return to the library",
    cathy: "Enter Cathy’s office",
    photoLoading: "Preparing portrait…",
    source: "Portrait from Wikipedia",
    note: "Ancient or disputed dates are shown approximately.",
  },
  es: {
    eyebrow: "Pasaje secreto del CWRC",
    title: "La galería de las cien presencias",
    intro: "Cien personalidades cuya presencia, voz, ideas o audacia marcaron su época. Elige una pared y abre un retrato para descubrir sus datos biográficos esenciales.",
    choose: "¿Qué pared deseas explorar?",
    left: "La pared izquierda",
    right: "La pared derecha",
    switch: "Ver la otra pared",
    birth: "Fecha de nacimiento",
    place: "Lugar de nacimiento",
    category: "Ámbito",
    close: "Cerrar la ficha",
    library: "Volver a la biblioteca",
    cathy: "Entrar en la oficina de Cathy",
    photoLoading: "Preparando el retrato…",
    source: "Retrato procedente de Wikipedia",
    note: "Las fechas antiguas o discutidas se indican de forma aproximada.",
  },
} as const;

const categoryLabels: Record<Locale, Record<CharismaCategory, string>> = {
  fr: {
    leaders: "Leadership et politique",
    activists: "Idéaux, spiritualité et engagement",
    thinkers: "Pensée, science et vision",
    artists: "Arts et culture",
    athletes: "Sport et aventure",
  },
  en: {
    leaders: "Leadership and politics",
    activists: "Ideals, spirituality and activism",
    thinkers: "Thought, science and vision",
    artists: "Arts and culture",
    athletes: "Sport and adventure",
  },
  es: {
    leaders: "Liderazgo y política",
    activists: "Ideales, espiritualidad y activismo",
    thinkers: "Pensamiento, ciencia y visión",
    artists: "Arte y cultura",
    athletes: "Deporte y aventura",
  },
};

function resolveTitle(
  title: string,
  aliases: Map<string, string>,
) {
  let current = title;
  const seen = new Set<string>();

  while (aliases.has(current) && !seen.has(current)) {
    seen.add(current);
    current = aliases.get(current) ?? current;
  }

  return current;
}

export default function CharismaPassage({locale}: {locale: Locale}) {
  const t = ui[locale];
  const [wall, setWall] = useState<Wall | null>(null);
  const [selected, setSelected] = useState<CharismaticPerson | null>(null);
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    const batches = [
      charismaticPeople.slice(0, 50),
      charismaticPeople.slice(50),
    ];

    async function loadPortraits() {
      const loaded: Record<string, string> = {};

      await Promise.all(
        batches.map(async (batch) => {
          const params = new URLSearchParams({
            action: "query",
            format: "json",
            origin: "*",
            redirects: "1",
            prop: "pageimages",
            piprop: "thumbnail",
            pithumbsize: "700",
            titles: batch.map((person) => person.wiki).join("|"),
          });

          try {
            const response = await fetch(
              `https://en.wikipedia.org/w/api.php?${params.toString()}`,
            );
            if (!response.ok) return;

            const data = await response.json();
            const query = data?.query;
            const aliases = new Map<string, string>();

            for (const item of query?.normalized ?? []) {
              aliases.set(item.from, item.to);
            }
            for (const item of query?.redirects ?? []) {
              aliases.set(item.from, item.to);
            }

            const pages = Object.values(query?.pages ?? {}) as Array<{
              title?: string;
              thumbnail?: {source?: string};
            }>;
            const byTitle = new Map(
              pages.map((page) => [page.title, page.thumbnail?.source]),
            );

            for (const person of batch) {
              const finalTitle = resolveTitle(person.wiki, aliases);
              const source = byTitle.get(finalTitle);
              if (source) loaded[person.id] = source;
            }
          } catch {
            // A monogram remains visible if Wikipedia is temporarily unavailable.
          }
        }),
      );

      if (!cancelled) setImages(loaded);
    }

    void loadPortraits();
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = useMemo(
    () =>
      wall
        ? charismaticPeople.filter((person) => person.wall === wall)
        : [],
    [wall],
  );

  return (
    <section className="passage">
      <p className="eyebrow">{t.eyebrow}</p>
      <h1>{t.title}</h1>
      <p className="intro">{t.intro}</p>
      <div className="badges">
        <span>📷 100</span>
        <span>↙ 50</span>
        <span>50 ↘</span>
        <span>✦ 5 {locale === "fr" ? "domaines" : locale === "en" ? "fields" : "ámbitos"}</span>
      </div>

      {!wall ? (
        <section className="choice" aria-labelledby="charisma-wall-title">
          <h2 id="charisma-wall-title">{t.choose}</h2>
          <div>
            <button type="button" onClick={() => setWall("left")}>
              <b>←</b><strong>{t.left}</strong><small>50 portraits</small>
            </button>
            <button type="button" onClick={() => setWall("right")}>
              <b>→</b><strong>{t.right}</strong><small>50 portraits</small>
            </button>
          </div>
        </section>
      ) : (
        <>
          <div className="toolbar">
            <button type="button" onClick={() => setWall(wall === "left" ? "right" : "left")}>
              ⇄ {t.switch}
            </button>
            <strong>{wall === "left" ? t.left : t.right} · 50</strong>
          </div>

          <div className={`portraitWall ${wall}`}>
            {visible.map((person, index) => (
              <button
                type="button"
                className="portrait"
                key={person.id}
                onClick={() => setSelected(person)}
              >
                <span className="number">{String(index + 1).padStart(2, "0")}</span>
                <span className="photo">
                  {images[person.id] ? (
                    <img src={images[person.id]} alt={person.name} loading="lazy" />
                  ) : (
                    <i aria-label={t.photoLoading}>{person.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</i>
                  )}
                </span>
                <strong>{person.name}</strong>
                <small>{categoryLabels[locale][person.category]}</small>
              </button>
            ))}
          </div>
        </>
      )}

      <p className="note">{t.note}</p>
      <nav className="passageNav">
        <Link href={localizedHref(locale, "library")}>📚 {t.library}</Link>
        <Link href={localizedHref(locale, "office-cathy")}>🔎 {t.cathy}</Link>
      </nav>

      {selected && (
        <div className="overlay" role="presentation" onClick={() => setSelected(null)}>
          <article
            className="record"
            role="dialog"
            aria-modal="true"
            aria-labelledby="charisma-record-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="closeX" type="button" aria-label={t.close} onClick={() => setSelected(null)}>×</button>
            <div className="recordPhoto">
              {images[selected.id] ? (
                <img src={images[selected.id]} alt={selected.name} />
              ) : (
                <i>{selected.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</i>
              )}
            </div>
            <div className="recordText">
              <p>{categoryLabels[locale][selected.category]}</p>
              <h2 id="charisma-record-title">{selected.name}</h2>
              <dl>
                <div><dt>{t.birth}</dt><dd>{selected.birth}</dd></div>
                <div><dt>{t.place}</dt><dd>{selected.place}</dd></div>
                <div><dt>{t.category}</dt><dd>{categoryLabels[locale][selected.category]}</dd></div>
              </dl>
              <a href={`https://en.wikipedia.org/wiki/${encodeURIComponent(selected.wiki.replace(/ /g, "_"))}`} target="_blank" rel="noreferrer">
                {t.source} ↗
              </a>
              <button className="closeButton" type="button" onClick={() => setSelected(null)}>{t.close}</button>
            </div>
          </article>
        </div>
      )}

      <style jsx>{`
        .passage{width:min(1540px,100%);margin:0 auto;padding:24px 16px 65px;color:#2d211b}.eyebrow{text-align:center;text-transform:uppercase;letter-spacing:.18em;color:#8d692e;font-size:.78rem;font-weight:900}h1{max-width:1100px;margin:12px auto;color:#102a4c;font:700 clamp(2.4rem,6vw,5rem)/1 Georgia,serif;text-align:center}.intro{max-width:920px;margin:22px auto;text-align:center;line-height:1.75;color:#654d38}.badges{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:22px auto 34px}.badges span{padding:9px 14px;border:1px solid #cbaa6b;border-radius:999px;background:#fffaf0;color:#624722;font-weight:800}.choice{min-height:570px;display:grid;align-content:center;padding:clamp(26px,6vw,80px);border:10px solid #30231e;border-radius:30px;background:linear-gradient(90deg,#3b2a25 0 4%,#9b7659 4% 49.5%,#251b18 49.5% 50.5%,#88664e 50.5% 96%,#3b2a25 96%);box-shadow:inset 0 0 90px rgba(20,13,10,.55),0 24px 60px rgba(33,22,13,.25)}.choice h2{text-align:center;color:#fff8df;text-shadow:0 2px 5px #1a110d;font:700 clamp(1.5rem,4vw,2.6rem) Georgia,serif}.choice>div{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(18px,4vw,55px);max-width:1000px;margin:25px auto;width:100%}.choice button{min-height:235px;display:grid;place-items:center;padding:28px;cursor:pointer;border:7px double #e4c77e;border-radius:20px;background:rgba(16,42,76,.95);color:#fff9e7;box-shadow:0 14px 35px rgba(0,0,0,.4);transition:transform .18s ease}.choice button:hover,.choice button:focus-visible{transform:translateY(-7px) scale(1.02);outline:4px solid rgba(255,245,190,.5)}.choice b{font-size:3.7rem}.choice strong{font:700 clamp(1.2rem,3vw,2rem) Georgia,serif}.choice small{color:#e7ca83}.toolbar{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-bottom:18px;padding:13px 18px;border-radius:14px;background:#102a4c;color:#fff}.toolbar button{padding:9px 15px;cursor:pointer;border:1px solid #d7b66d;border-radius:999px;background:#fff9e8;color:#102a4c;font-weight:800}.portraitWall{display:grid;grid-template-columns:repeat(10,minmax(0,1fr));gap:clamp(10px,1.4vw,20px);padding:clamp(20px,3vw,42px);border:12px solid #30231e;border-radius:28px;background:#9b7659;background-image:linear-gradient(90deg,rgba(255,255,255,.06) 50%,transparent 50%),linear-gradient(rgba(45,26,18,.08) 50%,transparent 50%);background-size:24px 24px;box-shadow:inset 0 0 90px rgba(31,18,12,.45),0 24px 55px rgba(40,26,14,.24)}.portraitWall.right{background-color:#85644f}.portrait{position:relative;display:flex;flex-direction:column;align-items:center;min-width:0;padding:7px 6px 10px;cursor:pointer;border:0;border-radius:7px;background:#f4ead0;color:#281c15;box-shadow:0 7px 15px rgba(25,14,8,.4);transition:transform .18s ease,box-shadow .18s ease}.portrait:hover,.portrait:focus-visible{z-index:2;transform:translateY(-7px) scale(1.06);box-shadow:0 15px 28px rgba(25,14,8,.55);outline:3px solid #f5dc91}.photo{display:grid;place-items:center;width:100%;aspect-ratio:4/5;padding:5px;border:5px ridge #b88935;background:#39251a;overflow:hidden}.photo img{width:100%;height:100%;display:block;object-fit:cover;object-position:top center}.photo i,.recordPhoto i{display:grid;place-items:center;width:100%;height:100%;background:#102a4c;color:#e8cd8a;font:700 1.5rem Georgia,serif}.portrait strong{margin-top:8px;font:700 .78rem/1.15 Georgia,serif}.portrait small{margin-top:4px;color:#755332;font-size:.62rem;line-height:1.15}.number{position:absolute;z-index:1;top:2px;left:2px;padding:2px 5px;border-radius:999px;background:#102a4c;color:#fff;font-size:.58rem}.note{max-width:760px;margin:22px auto 0;text-align:center;color:#745737;font-style:italic}.passageNav{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;margin:25px auto 0}.passageNav a{padding:12px 18px;border-radius:999px;background:#102a4c;color:#fff;text-decoration:none;font-weight:800}.overlay{position:fixed;z-index:2100;inset:0;display:grid;place-items:center;padding:18px;background:rgba(16,11,9,.84);backdrop-filter:blur(7px)}.record{position:relative;display:grid;grid-template-columns:minmax(240px,460px) 1fr;gap:clamp(25px,5vw,65px);align-items:center;width:min(1100px,100%);max-height:94vh;overflow:auto;padding:clamp(22px,4vw,48px);border:6px solid #c5a158;border-radius:26px;background:#fffaf0;box-shadow:0 35px 90px rgba(0,0,0,.58)}.closeX{position:absolute;z-index:2;right:12px;top:8px;width:46px;height:46px;cursor:pointer;border:0;background:transparent;color:#58391f;font-size:2.3rem}.recordPhoto{display:grid;place-items:center;min-height:430px;border:10px ridge #b88935;background:#39251a;overflow:hidden}.recordPhoto img{width:100%;max-height:560px;display:block;object-fit:contain}.recordText>p{margin:0;color:#96702c;font-weight:900;text-transform:uppercase;letter-spacing:.11em}.recordText h2{margin:12px 0 25px;color:#102a4c;font:700 clamp(2.2rem,5vw,4.3rem)/1 Georgia,serif}.recordText dl{display:grid;gap:15px;margin:0 0 24px}.recordText dl div{padding:13px 15px;border-left:4px solid #c5a158;background:#fff}.recordText dt{color:#96702c;font-size:.72rem;font-weight:900;text-transform:uppercase;letter-spacing:.08em}.recordText dd{margin:5px 0 0;color:#403022;font-size:1.12rem;line-height:1.45}.recordText a{color:#102a4c;font-weight:800}.closeButton{display:block;margin-top:25px;padding:12px 24px;cursor:pointer;border:0;border-radius:999px;background:#102a4c;color:#fff;font-weight:900}@media(max-width:1180px){.portraitWall{grid-template-columns:repeat(7,1fr)}}@media(max-width:900px){.portraitWall{grid-template-columns:repeat(5,1fr)}.record{grid-template-columns:1fr}.recordPhoto{min-height:300px}.recordPhoto img{max-height:430px}}@media(max-width:650px){.choice>div{grid-template-columns:1fr}.choice{min-height:500px}.portraitWall{grid-template-columns:repeat(2,1fr);padding:18px 12px;gap:12px}.toolbar{align-items:stretch;flex-direction:column}.portrait strong{font-size:.82rem}.portrait small{font-size:.68rem}.passageNav{flex-direction:column}.passageNav a{text-align:center}}@media(prefers-reduced-motion:reduce){.portrait,.choice button{transition:none}}
      `}</style>
    </section>
  );
}
