import Link from "next/link";

const objects = [
  {
    name: "Universal Testing Machine",
    text: "Used to test the strength of claims before they are allowed into the Hall of Confirmed Truths.",
  },
  {
    name: "Microscope",
    text: "For looking closer when someone says, “It’s obvious.”",
  },
  {
    name: "Daily Lab Checklist",
    text: "Calibrate. Document. Double-check. Challenge bias. Publish truth.",
  },
  {
    name: "Lilo",
    text: "Chief Morale Officer. Present for emotional intelligence, quiet supervision and scientific calm.",
  },
];

export default function LaboratoryPage() {
  return (
    <main style={pageStyle}>
      <Header />

      <section style={heroStyle}>
        <p style={eyebrowStyle}>CWRC Experimental Division</p>

        <h1 style={titleStyle}>The Laboratory</h1>

        <p style={subtitleStyle}>
          Where claims are tested before they become official truths.
        </p>

        <img
          src="/images/laboratoire.png"
          alt="CWRC Laboratory with Suzie and Lilo"
          style={imageStyle}
        />

        <p style={bodyStyle}>
          The CWRC laboratory is a bright, modern research space where evidence
          is examined with care, methods are documented and conclusions are not
          allowed to skip the line.
        </p>

        <div style={gridStyle}>
          {objects.map((object) => (
            <article key={object.name} style={cardStyle}>
              <h2 style={{ marginTop: 0 }}>{object.name}</h2>
              <p style={{ lineHeight: "1.7" }}>{object.text}</p>
            </article>
          ))}
        </div>

        <NavigationButtons />
      </section>

      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header style={headerStyle}>
      <Link href="/" style={logoStyle}>CWRC</Link>

      <nav style={navStyle}>
        <Link href="/home" style={navLinkStyle}>Main Hall</Link>
        <Link href="/about" style={navLinkStyle}>About Us</Link>
        <Link href="/rooms" style={navLinkStyle}>Rooms</Link>
        <Link href="/development-log" style={navLinkStyle}>Development Log</Link>
      </nav>

      <div style={languageStyle}>
        <span>Français</span>
        <span>English</span>
        <span>Español</span>
      </div>
    </header>
  );
}

function NavigationButtons() {
  return (
    <div style={buttonRowStyle}>
      <Link href="/home" style={buttonStyle}>← Return to Main Hall</Link>
      <Link href="/rooms" style={buttonStyle}>Explore Rooms</Link>
      <Link href="/ask-cathy" style={buttonStyle}>Ask Cathy</Link>
      <Link href="/development-log" style={buttonStyle}>Development Log</Link>
    </div>
  );
}

function Footer() {
  return (
    <footer style={footerStyle}>
      © 2025-2026 The Cathy Was Right Research Center™ — Humour. Kindness. Curiosity.
    </footer>
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
  maxWidth: "1100px",
  margin: "48px auto",
  backgroundColor: "#FFFDF8",
  borderRadius: "24px",
  padding: "48px 32px",
  boxShadow: "0 20px 50px rgba(16, 42, 76, 0.15)",
};

const eyebrowStyle = {
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "#8A6A3D",
  fontSize: "0.85rem",
};

const titleStyle = {
  fontSize: "clamp(2.5rem, 6vw, 5rem)",
  lineHeight: "1",
  margin: "12px 0",
};

const subtitleStyle = {
  color: "#8A6A3D",
  fontSize: "1.5rem",
  lineHeight: "1.5",
};

const imageStyle = {
  width: "100%",
  borderRadius: "20px",
  marginTop: "28px",
  boxShadow: "0 12px 30px rgba(16, 42, 76, 0.18)",
};

const bodyStyle = {
  fontSize: "1.15rem",
  lineHeight: "1.8",
  marginTop: "30px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "20px",
  marginTop: "32px",
};

const cardStyle = {
  backgroundColor: "#F7F1E6",
  borderRadius: "18px",
  padding: "24px",
  borderTop: "6px solid #8A6A3D",
};

const buttonRowStyle = {
  marginTop: "40px",
  display: "flex",
  gap: "14px",
  flexWrap: "wrap" as const,
};

const buttonStyle = {
  display: "inline-block",
  padding: "14px 24px",
  borderRadius: "999px",
  backgroundColor: "#102A4C",
  color: "#F7F1E6",
  textDecoration: "none",
  fontWeight: "bold",
};

const footerStyle = {
  backgroundColor: "#102A4C",
  color: "#F7F1E6",
  textAlign: "center" as const,
  padding: "24px",
};