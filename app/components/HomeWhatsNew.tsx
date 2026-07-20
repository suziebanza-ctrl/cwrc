"use client";

import {useEffect, useState} from "react";
import type {Locale} from "../i18n/config";

type NewsItem = {
  title_fr: string;
  title_en: string | null;
  title_es: string | null;
  body_fr: string;
  body_en: string | null;
  body_es: string | null;
  updated_at: string;
};

const labels: Record<Locale, {heading: string; fallbackTitle: string; fallbackBody: string}> = {
  fr: {
    heading: "✨ Quoi de neuf au CWRC?",
    fallbackTitle: "Le Grand Salon de détente est maintenant ouvert!",
    fallbackBody: "Venez rencontrer Capone, suivre Niko dans sa promenade et observer l’arrivée aérienne d’Amateur.",
  },
  en: {
    heading: "✨ What’s New at the CWRC?",
    fallbackTitle: "The Grand Lounge is now open!",
    fallbackBody: "Come meet Capone, follow Niko on his walk, and watch Amateur make his airborne arrival.",
  },
  es: {
    heading: "✨ ¿Qué hay de nuevo en el CWRC?",
    fallbackTitle: "¡El Gran Salón de Descanso ya está abierto!",
    fallbackBody: "Ven a conocer a Capone, sigue el paseo de Niko y observa la llegada aérea de Amateur.",
  },
};

export default function HomeWhatsNew({locale}: {locale: Locale}) {
  const [news, setNews] = useState<NewsItem | null>(null);
  const label = labels[locale];

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return;

    const controller = new AbortController();
    const query =
      "room_key=eq.home&object_key=eq.whats-new&status=eq.published&select=title_fr,title_en,title_es,body_fr,body_en,body_es,updated_at&order=updated_at.desc&limit=1";

    fetch(`${url}/rest/v1/cwrc_content?${query}`, {
      headers: {apikey: key},
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : []))
      .then((items: NewsItem[]) => setNews(items[0] ?? null))
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  const title =
    locale === "en" ? news?.title_en || news?.title_fr :
    locale === "es" ? news?.title_es || news?.title_fr :
    news?.title_fr;
  const body =
    locale === "en" ? news?.body_en || news?.body_fr :
    locale === "es" ? news?.body_es || news?.body_fr :
    news?.body_fr;

  const date = news?.updated_at
    ? new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : locale === "es" ? "es" : "en-CA", {
        year: "numeric", month: "long", day: "numeric",
      }).format(new Date(news.updated_at))
    : null;

  return (
    <div style={cardStyle}>
      <strong style={headingStyle}>{label.heading}</strong>
      {date && <p style={dateStyle}>{date}</p>}
      <h2 style={titleStyle}>{title || label.fallbackTitle}</h2>
      <p style={bodyStyle}>{body || label.fallbackBody}</p>
    </div>
  );
}

const cardStyle = {
  margin: "32px auto 0", maxWidth: "760px", padding: "26px 30px",
  borderRadius: "20px", backgroundColor: "#F7F1E6",
  borderLeft: "8px solid #C79A45", boxShadow: "0 12px 30px rgba(16,42,76,.12)",
};
const headingStyle = {color: "#8A621F", fontSize: "1.05rem", letterSpacing: ".04em"};
const dateStyle = {margin: "10px 0 0", color: "#6E6A62", fontSize: ".9rem"};
const titleStyle = {margin: "10px 0 8px", color: "#102A4C", fontSize: "1.45rem"};
const bodyStyle = {margin: 0, color: "#352417", fontSize: "1.08rem", lineHeight: 1.65};