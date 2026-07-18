import Link from "next/link";
import type { Locale } from "../i18n/config";
import { localizedHref } from "../i18n/config";

const copy = {
  fr: {
    eyebrow: "Aile administrative",
    title: "Le Bureau d’Amateur",
    text:
      "Explorez le bureau du hibou administratif, sa réserve secrète de chocolat, le protocole du thé de quatre heures et quelques dossiers que Ranger surveille de très près.",
    button: "Visiter le Bureau",
    alt: "Le Bureau administratif d’Amateur",
  },

  en: {
    eyebrow: "Administrative Wing",
    title: "Amateur’s Office",
    text:
      "Explore the administrative owl’s office, his secret chocolate supply, the four o’clock tea protocol, and several files closely watched by Ranger.",
    button: "Visit the Office",
    alt: "Amateur’s administrative office",
  },

  es: {
    eyebrow: "Ala administrativa",
    title: "La oficina de Amateur",
    text:
      "Explora la oficina del búho administrativo, su reserva secreta de chocolate, el protocolo del té de las cuatro y varios expedientes vigilados atentamente por Ranger.",
    button: "Visitar la oficina",
    alt: "La oficina administrativa de Amateur",
  },
} as const;

export default function AmateurOfficeCard({
  locale,
}: {
  locale: Locale;
}) {
  const t = copy[locale];

  return (
    <section style={sectionStyle}>
      <Link
        href={localizedHref(
          locale,
          "administrative-office",
        )}
        style={cardStyle}
      >
        <img
          src="/images/bureau-administratif.png"
          alt={t.alt}
          style={imageStyle}
        />

        <div style={contentStyle}>
          <p style={eyebrowStyle}>
            🦉 {t.eyebrow}
          </p>

          <h2 style={titleStyle}>{t.title}</h2>

          <p style={textStyle}>{t.text}</p>

          <span style={buttonStyle}>
            {t.button}
          </span>
        </div>
      </Link>
    </section>
  );
}

const sectionStyle = {
  maxWidth: "1200px",
  margin: "50px auto 0",
  padding: "0 24px",
};

const cardStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(min(100%,360px),1fr))",
  overflow: "hidden",
  borderRadius: "26px",
  backgroundColor: "#102A4C",
  color: "#F7F1E6",
  textDecoration: "none",
  border: "1px solid rgba(216,196,154,.5)",
  boxShadow:
    "0 18px 44px rgba(16,42,76,.2)",
};

const imageStyle = {
  display: "block",
  width: "100%",
  height: "100%",
  minHeight: "300px",
  objectFit: "cover" as const,
};

const contentStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "flex-start",
  justifyContent: "center",
  padding: "clamp(28px,5vw,52px)",
};

const eyebrowStyle = {
  margin: 0,
  color: "#D8C49A",
  letterSpacing: ".15em",
  textTransform: "uppercase" as const,
  fontSize: ".8rem",
  fontWeight: "bold",
};

const titleStyle = {
  margin: "14px 0",
  fontSize: "clamp(2rem,5vw,3.5rem)",
  lineHeight: 1,
};

const textStyle = {
  margin: "0 0 26px",
  color: "#F1E4CA",
  fontSize: "1.12rem",
  lineHeight: 1.75,
};

const buttonStyle = {
  display: "inline-block",
  padding: "13px 21px",
  borderRadius: "999px",
  backgroundColor: "#F7F1E6",
  color: "#102A4C",
  fontWeight: "bold",
};