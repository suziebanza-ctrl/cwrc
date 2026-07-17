import Link from "next/link";
import type { Locale } from "../i18n/config";
import { localizedHref } from "../i18n/config";

const copy = {
  fr: {
    eyebrow: "Archives publiques",
    title: "Les conclusions officielles du CWRC",
    intro:
      "Deux collections soigneusement examinées par Cathy et Suzie, sous la surveillance administrative du café.",
    truthsTitle: "Vérités de Cathy",
    truthsText:
      "Les questions examinées et les réponses officielles de Cathy et Suzie.",
    truthsButton: "Consulter les vérités",
    verdictsTitle: "Verdicts du CWRC",
    verdictsText:
      "Les cas soumis, évalués et officiellement publiés dans le Hall.",
    verdictsButton: "Entrer dans le Hall",
  },

  en: {
    eyebrow: "Public archives",
    title: "The official conclusions of the CWRC",
    intro:
      "Two collections carefully reviewed by Cathy and Suzie, under the administrative supervision of coffee.",
    truthsTitle: "Cathy’s Truths",
    truthsText:
      "Reviewed questions and the official answers from Cathy and Suzie.",
    truthsButton: "View the truths",
    verdictsTitle: "CWRC Verdicts",
    verdictsText:
      "Submitted cases, evaluated and officially published in the Hall.",
    verdictsButton: "Enter the Hall",
  },

  es: {
    eyebrow: "Archivos públicos",
    title: "Las conclusiones oficiales del CWRC",
    intro:
      "Dos colecciones examinadas cuidadosamente por Cathy y Suzie, bajo la supervisión administrativa del café.",
    truthsTitle: "Verdades de Cathy",
    truthsText:
      "Las preguntas examinadas y las respuestas oficiales de Cathy y Suzie.",
    truthsButton: "Consultar las verdades",
    verdictsTitle: "Veredictos del CWRC",
    verdictsText:
      "Los casos presentados, evaluados y publicados oficialmente en el Salón.",
    verdictsButton: "Entrar en el Salón",
  },
} as const;

export default function PublicArchives({
  locale,
}: {
  locale: Locale;
}) {
  const t = copy[locale];

  return (
    <section style={sectionStyle}>
      <p style={eyebrowStyle}>{t.eyebrow}</p>

      <h2 style={titleStyle}>{t.title}</h2>

      <p style={introStyle}>{t.intro}</p>

      <div style={gridStyle}>
        <ArchiveCard
          href={localizedHref(locale, "research")}
          image="/images/cathy-truths.png"
          imageAlt={t.truthsTitle}
          title={t.truthsTitle}
          text={t.truthsText}
          button={t.truthsButton}
        />

        <ArchiveCard
          href={localizedHref(
            locale,
            "confirmed-truths",
          )}
          image="/images/cwrc-verdicts.png"
          imageAlt={t.verdictsTitle}
          title={t.verdictsTitle}
          text={t.verdictsText}
          button={t.verdictsButton}
        />
      </div>
    </section>
  );
}

function ArchiveCard({
  href,
  image,
  imageAlt,
  title,
  text,
  button,
}: {
  href: string;
  image: string;
  imageAlt: string;
  title: string;
  text: string;
  button: string;
}) {
  return (
    <Link href={href} style={cardStyle}>
      <img
        src={image}
        alt={imageAlt}
        style={imageStyle}
      />

      <div style={contentStyle}>
        <h3 style={cardTitleStyle}>{title}</h3>

        <p style={textStyle}>{text}</p>

        <span style={buttonStyle}>{button}</span>
      </div>
    </Link>
  );
}

const sectionStyle = {
  maxWidth: "1200px",
  margin: "54px auto 0",
  padding: "0 24px",
};

const eyebrowStyle = {
  margin: 0,
  textAlign: "center" as const,
  letterSpacing: ".18em",
  textTransform: "uppercase" as const,
  color: "#8A6A3D",
  fontWeight: "bold",
  fontSize: ".82rem",
};

const titleStyle = {
  margin: "12px 0",
  textAlign: "center" as const,
  color: "#102A4C",
  fontSize: "clamp(2rem,5vw,3.4rem)",
};

const introStyle = {
  maxWidth: "760px",
  margin: "14px auto 30px",
  textAlign: "center" as const,
  color: "#6E5B3F",
  fontSize: "1.1rem",
  lineHeight: 1.7,
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(min(100%,320px),1fr))",
  gap: "28px",
};

const cardStyle = {
  display: "grid",
  gridTemplateRows: "auto 1fr",
  overflow: "hidden",
  borderRadius: "24px",
  backgroundColor: "#FFFDF8",
  color: "#102A4C",
  textDecoration: "none",
  border: "1px solid rgba(138,106,61,.28)",
  boxShadow: "0 16px 38px rgba(16,42,76,.13)",
};

const imageStyle = {
  display: "block",
  width: "100%",
  aspectRatio: "16 / 10",
  objectFit: "cover" as const,
};

const contentStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "flex-start",
  padding: "26px",
};

const cardTitleStyle = {
  margin: "0 0 12px",
  fontSize: "1.7rem",
};

const textStyle = {
  margin: "0 0 22px",
  lineHeight: 1.7,
  flexGrow: 1,
};

const buttonStyle = {
  display: "inline-block",
  padding: "12px 19px",
  borderRadius: "999px",
  backgroundColor: "#102A4C",
  color: "#F7F1E6",
  fontWeight: "bold",
};