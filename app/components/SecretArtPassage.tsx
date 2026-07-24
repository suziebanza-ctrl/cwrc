"use client";

import Link from "next/link";
import {useState} from "react";
import type {Locale} from "../i18n/config";
import {localizedHref} from "../i18n/config";
import {artworks, type Artwork, type PassageWall} from "./artPassageData";

const ui = {
  fr: {
    eyebrow: "Galerie secrète du CWRC",
    title: "Le passage secret des cinquante tableaux",
    intro: "Entre la bibliothèque et le bureau de Suzie s’étend une galerie que même Amateur n’a pas encore réussi à classer. Choisissez un mur, puis cliquez sur une œuvre pour ouvrir sa fiche trilingue.",
    choose: "Quel mur souhaitez-vous regarder?",
    left: "Regarder le mur de gauche",
    right: "Regarder le mur de droite",
    leftShort: "Mur de gauche",
    rightShort: "Mur de droite",
    change: "Choisir l’autre mur",
    library: "Retour à la bibliothèque",
    suzie: "Entrer dans le bureau de Suzie",
    close: "Fermer la fiche",
    artist: "Peintre",
    work: "Œuvre",
    origin: "Pays d’origine",
    year: "Année",
    movement: "Mouvement",
    description: "Description",
    women: "14 œuvres de femmes peintres",
    quebec: "7 œuvres liées à des peintres québécois",
  },
  en: {
    eyebrow: "CWRC Secret Gallery",
    title: "The Secret Passage of Fifty Paintings",
    intro: "Between the library and Suzie’s office stretches a gallery that even Amateur has not managed to classify. Choose a wall, then select a work to open its trilingual record.",
    choose: "Which wall would you like to view?",
    left: "View the left wall",
    right: "View the right wall",
    leftShort: "Left wall",
    rightShort: "Right wall",
    change: "Choose the other wall",
    library: "Return to the library",
    suzie: "Enter Suzie’s office",
    close: "Close the record",
    artist: "Painter",
    work: "Work",
    origin: "Country of origin",
    year: "Year",
    movement: "Movement",
    description: "Description",
    women: "14 works by women painters",
    quebec: "7 works connected to Quebec painters",
  },
  es: {
    eyebrow: "Galería secreta del CWRC",
    title: "El pasaje secreto de los cincuenta cuadros",
    intro: "Entre la biblioteca y la oficina de Suzie se extiende una galería que ni siquiera Amateur ha logrado clasificar. Elige una pared y selecciona una obra para abrir su ficha trilingüe.",
    choose: "¿Qué pared deseas contemplar?",
    left: "Ver la pared izquierda",
    right: "Ver la pared derecha",
    leftShort: "Pared izquierda",
    rightShort: "Pared derecha",
    change: "Elegir la otra pared",
    library: "Volver a la biblioteca",
    suzie: "Entrar en la oficina de Suzie",
    close: "Cerrar la ficha",
    artist: "Pintor o pintora",
    work: "Obra",
    origin: "País de origen",
    year: "Año",
    movement: "Movimiento",
    description: "Descripción",
    women: "14 obras de mujeres pintoras",
    quebec: "7 obras vinculadas a pintores quebequenses",
  },
} as const;

export default function SecretArtPassage({locale}: {locale: Locale}) {
  const t = ui[locale];
  const [wall, setWall] = useState<PassageWall | null>(null);
  const [selected, setSelected] = useState<Artwork | null>(null);
  const visible = wall ? artworks.filter((artwork) => artwork.wall === wall) : [];

  return (
    <section className="passagePage">
      <p className="eyebrow">{t.eyebrow}</p>
      <h1>{t.title}</h1>
      <p className="intro">{t.intro}</p>

      <div className="badges">
        <span>🖼️ 50</span>
        <span>👩‍🎨 {t.women}</span>
        <span>⚜️ {t.quebec}</span>
      </div>

      {!wall ? (
        <section className="choiceHall" aria-labelledby="wall-choice-title">
          <h2 id="wall-choice-title">{t.choose}</h2>
          <div className="wallChoices">
            <button type="button" onClick={() => setWall("left")}>
              <span>←</span>
              <strong>{t.left}</strong>
              <small>25</small>
            </button>
            <button type="button" onClick={() => setWall("right")}>
              <span>→</span>
              <strong>{t.right}</strong>
              <small>25</small>
            </button>
          </div>
        </section>
      ) : (
        <>
          <div className="wallToolbar">
            <button type="button" onClick={() => setWall(wall === "left" ? "right" : "left")}>
              ⇄ {t.change}
            </button>
            <strong>{wall === "left" ? t.leftShort : t.rightShort} · 25</strong>
          </div>

          <div className={`galleryWall ${wall}`}>
            {visible.map((artwork, index) => (
              <button
                type="button"
                className="painting"
                key={artwork.id}
                onClick={() => setSelected(artwork)}
                aria-label={`${artwork.artist} — ${artwork.title[locale]}`}
              >
                <span className="number">{String(index + 1).padStart(2, "0")}</span>
                <span className="frame">
                  <img src={artwork.image} alt={artwork.title[locale]} loading="lazy" />
                </span>
                <strong>{artwork.title[locale]}</strong>
                <small>{artwork.artist}</small>
                <span className="tags">
                  {artwork.woman && <i>👩‍🎨</i>}
                  {artwork.quebec && <i>⚜️</i>}
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      <nav className="passageNav" aria-label="Passage secret">
        <Link href={localizedHref(locale, "library")}>📚 {t.library}</Link>
        <Link href={localizedHref(locale, "office-suzie")}>📋 {t.suzie}</Link>
      </nav>

      {selected && (
        <div className="overlay" role="presentation" onClick={() => setSelected(null)}>
          <article
            className="artRecord"
            role="dialog"
            aria-modal="true"
            aria-labelledby="art-record-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="closeX" type="button" aria-label={t.close} onClick={() => setSelected(null)}>×</button>
            <div className="recordHero">
              <img src={selected.image} alt={selected.title[locale]} />
              <div>
                <p>{selected.artist}</p>
                <h2 id="art-record-title">{selected.title[locale]}</h2>
                <span>{selected.year}</span>
              </div>
            </div>

            <div className="languages">
              {(["fr", "en", "es"] as const).map((language) => (
                <section key={language} lang={language}>
                  <h3>{language === "fr" ? "Français" : language === "en" ? "English" : "Español"}</h3>
                  <dl>
                    <div><dt>{ui[language].artist}</dt><dd>{selected.artist}</dd></div>
                    <div><dt>{ui[language].work}</dt><dd>{selected.title[language]}</dd></div>
                    <div><dt>{ui[language].origin}</dt><dd>{selected.country[language]}</dd></div>
                    <div><dt>{ui[language].year}</dt><dd>{selected.year}</dd></div>
                    <div><dt>{ui[language].movement}</dt><dd>{selected.movement[language]}</dd></div>
                    <div><dt>{ui[language].description}</dt><dd>{selected.description[language]}</dd></div>
                  </dl>
                </section>
              ))}
            </div>

            <button className="closeButton" type="button" onClick={() => setSelected(null)}>{t.close}</button>
          </article>
        </div>
      )}

      <style jsx>{`
        .passagePage{width:min(1500px,100%);margin:0 auto;padding:22px 16px 60px;color:#2f2117}.eyebrow{text-align:center;text-transform:uppercase;letter-spacing:.18em;color:#997331;font-size:.78rem;font-weight:900}h1{max-width:1050px;margin:12px auto;color:#102a4c;font:700 clamp(2.3rem,6vw,5rem)/1 Georgia,serif;text-align:center}.intro{max-width:850px;margin:22px auto;text-align:center;line-height:1.7;color:#6b5133}.badges{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin:22px auto 34px}.badges span{padding:9px 14px;border:1px solid #cfb276;border-radius:999px;background:#fffaf0;color:#634a2a;font-weight:800}.choiceHall{min-height:560px;display:grid;align-content:center;padding:clamp(28px,6vw,80px);border:10px solid #40291b;border-radius:30px;background:linear-gradient(90deg,#6d4128 0 3%,#d2b078 3% 49.6%,#51321f 49.6% 50.4%,#c4a06c 50.4% 97%,#6d4128 97%);box-shadow:inset 0 0 80px rgba(38,22,12,.45),0 24px 60px rgba(33,22,13,.25)}.choiceHall h2{text-align:center;color:#fff8df;text-shadow:0 2px 5px #23150d;font:700 clamp(1.5rem,4vw,2.6rem) Georgia,serif}.wallChoices{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(18px,4vw,55px);max-width:1000px;margin:25px auto;width:100%}.wallChoices button{min-height:230px;display:grid;place-items:center;padding:28px;cursor:pointer;border:7px double #e6ca85;border-radius:20px;background:rgba(16,42,76,.94);color:#fff9e7;box-shadow:0 14px 35px rgba(0,0,0,.35);transition:transform .18s ease}.wallChoices button:hover,.wallChoices button:focus-visible{transform:translateY(-7px) scale(1.02);outline:4px solid rgba(255,245,190,.5)}.wallChoices span{font-size:3.5rem}.wallChoices strong{font:700 clamp(1.2rem,3vw,2rem) Georgia,serif}.wallChoices small{font-size:1rem;color:#e7ca83}.wallToolbar{display:flex;align-items:center;justify-content:space-between;gap:15px;margin:0 0 18px;padding:13px 18px;border-radius:14px;background:#102a4c;color:#fff}.wallToolbar button{padding:9px 15px;cursor:pointer;border:1px solid #d7b66d;border-radius:999px;background:#fff9e8;color:#102a4c;font-weight:800}.galleryWall{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:clamp(14px,2vw,28px);padding:clamp(24px,4vw,55px);border:12px solid #3f281a;border-radius:28px;background-color:#b99562;background-image:linear-gradient(90deg,rgba(255,255,255,.08) 50%,transparent 50%),linear-gradient(rgba(70,39,18,.08) 50%,transparent 50%);background-size:28px 28px;box-shadow:inset 0 0 90px rgba(42,24,13,.38),0 24px 55px rgba(40,26,14,.24)}.galleryWall.right{background-color:#9e7d59}.painting{position:relative;display:flex;flex-direction:column;align-items:center;min-width:0;padding:10px 8px 13px;cursor:pointer;border:0;border-radius:10px;background:rgba(250,239,209,.9);color:#2c1d13;box-shadow:0 8px 17px rgba(29,17,9,.35);transition:transform .18s ease,box-shadow .18s ease}.painting:hover,.painting:focus-visible{z-index:2;transform:translateY(-7px) scale(1.035);box-shadow:0 16px 28px rgba(29,17,9,.48);outline:3px solid #f7df94}.frame{display:block;width:100%;aspect-ratio:4/5;padding:7px;border:6px ridge #b88935;background:#4c2e19}.frame img{width:100%;height:100%;display:block;object-fit:cover;background:#eadbb9}.painting strong{margin-top:10px;font:700 .92rem/1.2 Georgia,serif}.painting small{margin-top:5px;color:#765431;line-height:1.2}.number{position:absolute;z-index:1;top:3px;left:3px;padding:3px 6px;border-radius:999px;background:#102a4c;color:#fff;font-size:.65rem}.tags{position:absolute;right:5px;top:5px;display:flex;gap:2px}.tags i{font-style:normal}.passageNav{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;margin:28px auto 0}.passageNav a{padding:12px 18px;border-radius:999px;background:#102a4c;color:#fff;text-decoration:none;font-weight:800}.overlay{position:fixed;z-index:2000;inset:0;display:grid;place-items:center;padding:18px;background:rgba(18,13,10,.82);backdrop-filter:blur(7px)}.artRecord{position:relative;width:min(1350px,100%);max-height:94vh;overflow:auto;padding:clamp(20px,4vw,42px);border:5px solid #c9a65f;border-radius:26px;background:#fffaf0;box-shadow:0 35px 90px rgba(0,0,0,.55)}.closeX{position:absolute;z-index:2;right:12px;top:8px;width:46px;height:46px;cursor:pointer;border:0;background:transparent;color:#58391f;font-size:2.3rem}.recordHero{display:grid;grid-template-columns:minmax(220px,420px) 1fr;align-items:center;gap:clamp(22px,5vw,60px);padding-bottom:28px;border-bottom:1px solid #d9c49b}.recordHero img{width:100%;max-height:430px;object-fit:contain;border:10px ridge #b88935;background:#4c2e19}.recordHero p{margin:0;color:#96702c;font-weight:900;text-transform:uppercase;letter-spacing:.12em}.recordHero h2{margin:10px 0;color:#102a4c;font:700 clamp(2rem,5vw,4rem)/1 Georgia,serif}.recordHero span{color:#65482d;font-size:1.2rem}.languages{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:28px}.languages section{padding:20px;border:1px solid #dbc69d;border-radius:18px;background:#fff}.languages h3{margin:0 0 15px;color:#102a4c;font-family:Georgia,serif}.languages dl{display:grid;gap:11px;margin:0}.languages dl div{display:grid;gap:3px}.languages dt{color:#96702c;font-size:.72rem;font-weight:900;text-transform:uppercase;letter-spacing:.08em}.languages dd{margin:0;color:#47311f;line-height:1.5}.closeButton{display:block;margin:25px auto 0;padding:12px 24px;cursor:pointer;border:0;border-radius:999px;background:#102a4c;color:#fff;font-weight:900}@media(max-width:950px){.galleryWall{grid-template-columns:repeat(3,1fr)}.languages{grid-template-columns:1fr}.recordHero{grid-template-columns:1fr}.recordHero img{max-height:360px}}@media(max-width:650px){.wallChoices{grid-template-columns:1fr}.choiceHall{min-height:500px}.galleryWall{grid-template-columns:repeat(2,1fr);padding:18px 12px;gap:12px}.wallToolbar{align-items:stretch;flex-direction:column}.painting strong{font-size:.8rem}.painting small{font-size:.7rem}.passageNav{flex-direction:column}.passageNav a{text-align:center}}@media(prefers-reduced-motion:reduce){.painting,.wallChoices button{transition:none}}
      `}</style>
    </section>
  );
}
