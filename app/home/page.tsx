import Link from "next/link";

const estateMap = [
  { name: "About Us", emoji: "🏛️", href: "/about" },
  { name: "Rooms", emoji: "🚪", href: "/rooms" },
  { name: "Laboratory", emoji: "🧪", href: "/laboratory" },
  { name: "Greenhouse", emoji: "🌿", href: "/greenhouse" },
  { name: "Library", emoji: "📚", href: "/library" },
  { name: "Kitchen", emoji: "☕", href: "/kitchen" },
  { name: "Development Log", emoji: "📖", href: "/development-log" },
  { name: "Contact", emoji: "✉️", href: "/contact" },
];

const languages = ["Français", "English", "Español"];

export default function HomePage() {
  return (
    <main style={pageStyle}>
      <header style={headerStyle}>
        <Link href="/" style={logoStyle}>
          CWRC
        </Link>

        <nav style={navStyle}>
          <Link href="/about" style={navLinkStyle}>About Us</Link>
          <Link href="/rooms" style={navLinkStyle}>Rooms</Link>
          <Link href="/development-log" style={navLinkStyle}>Development Log</Link>
          <Link href="/ask-cathy" style={navLinkStyle}>Ask Cathy</Link>
          <Link href="/submit-case" style={navLinkStyle}>Submit a Case</Link>
        </nav>

        <div style={languageStyle}>
          {languages.map((language) => (
            <span key={language}>{language}</span>
          ))}
        </div>
      </header>

      <section style={heroStyle}>
        <p style={eyebrowStyle}>Main Hall</p>

        <h1 style={titleStyle}>Welcome to the CWRC</h1>

        <p style={subtitleStyle}>
          Exploring the world with humour, kindness and curiosity.
        </p>

        <div style={observationStyle}>
          <strong>Today’s Official Observation</strong>
          <p>Evidence may arrive late, but the coffee should not.</p>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Explore the Center</h2>

        <div style={mapStyle}>
          {estateMap.map((place) => (
            <Link key={place.name} href={place.href} style={mapCardStyle}>
              <span style={emojiStyle}>{place.emoji}</span>
              <strong>{place.name}</strong>
              <span style={enterStyle}>Enter →</span>
            </Link>
          ))}
        </div>
      </section>

      <section style={actionStyle}>
        <article style={featureStyle}>
          <h2>Ask Cathy</h2>
          <p>
            Ask a question. GPT may prepare a structured draft, but Cathy keeps
            the final word.
          </p>
          <Link href="/ask-cathy" style={buttonStyle}>Ask a question</Link>
        </article>

        <article style={featureStyle}>
          <h2>Submit a Case</h2>
          <p>
            Submit an affirmation, mystery or everyday debate for official CWRC
            review.
          </p>
          <Link href="/submit-case" style={buttonStyle}>Submit a case</Link>
        </article>

        <article style={featureStyle}>
          <h2>Development Log</h2>
          <p>
            Read the official memory of the Center’s creation, from the first
            idea to the immersive rooms.
          </p>
          <Link href="/development-log" style={buttonStyle}>Open the log</Link>
        </article>
      </section>

      <footer style={footerStyle}>
        © 2025-2026 The Cathy Was Right Research Center™ — Humour. Kindness.
        Curiosity.
      </footer>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#F7F1E6",
  color: "#102A4C",
  fontFamily: "Georgia, serif",
};

const headerStyle = {
  backgroundColor: "#102A4C",
  color: "#F7F1E6",
  padding: "16px 28px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  flexWrap: "wrap" as const,
  position: "sticky" as const,
  top: 0,
  zIndex: 10,
};

const logoStyle = {
  color: "#F7F1E6",
  textDecoration: "none",
  fontWeight: "bold",
  letterSpacing: "0.14em",
};

const navStyle = {
  display: "flex",
  gap: "18px",
  flexWrap: "wrap" as const,
};

const navLinkStyle = {
  color: "#F7F1E6",
  textDecoration: "none",
  fontWeight: "bold",
};

const languageStyle = {
  display: "flex",
  gap: "12px",
  fontWeight: "bold",
  color: "#D8C49A",
};

const heroStyle = {
  maxWidth: "1200px",
  margin: "40px auto 0",
  padding: "56px 28px",
  textAlign: "center" as const,
  backgroundColor: "#FFFDF8",
  borderRadius: "28px",
  boxShadow: "0 20px 50px rgba(16, 42, 76, 0.15)",
};

const eyebrowStyle = {
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const,
  color: "#8A6A3D",
  fontSize: "0.85rem",
};

const titleStyle = {
  fontSize: "clamp(3rem, 7vw, 6rem)",
  lineHeight: "0.95",
  margin: "12px 0",
};

const subtitleStyle = {
  fontSize: "1.45rem",
  color: "#8A6A3D",
};

const observationStyle = {
  margin: "32px auto 0",
  maxWidth: "720px",
  padding: "24px",
  borderRadius: "20px",
  backgroundColor: "#F7F1E6",
  borderLeft: "8px solid #8A6A3D",
  fontSize: "1.1rem",
};

const sectionStyle = {
  maxWidth: "1200px",
  margin: "40px auto 0",
  padding: "0 24px",
};

const sectionTitleStyle = {
  textAlign: "center" as const,
  fontSize: "2.2rem",
};

const mapStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
};

const mapCardStyle = {
  backgroundColor: "#FFFDF8",
  borderRadius: "22px",
  padding: "26px",
  textAlign: "center" as const,
  textDecoration: "none",
  color: "#102A4C",
  boxShadow: "0 12px 30px rgba(16, 42, 76, 0.12)",
  border: "1px solid rgba(138, 106, 61, 0.22)",
};

const emojiStyle = {
  display: "block",
  fontSize: "2.4rem",
  marginBottom: "12px",
};

const enterStyle = {
  display: "block",
  marginTop: "12px",
  color: "#8A6A3D",
  fontWeight: "bold",
};

const actionStyle = {
  maxWidth: "1200px",
  margin: "44px auto",
  padding: "0 24px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "24px",
};

const featureStyle = {
  backgroundColor: "#102A4C",
  color: "#F7F1E6",
  borderRadius: "22px",
  padding: "30px",
};

const buttonStyle = {
  display: "inline-block",
  marginTop: "14px",
  backgroundColor: "#F7F1E6",
  color: "#102A4C",
  padding: "14px 22px",
  borderRadius: "999px",
  textDecoration: "none",
  fontWeight: "bold",
};

const footerStyle = {
  backgroundColor: "#102A4C",
  color: "#F7F1E6",
  textAlign: "center" as const,
  padding: "24px",
};