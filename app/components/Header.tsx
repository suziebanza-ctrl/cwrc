import Link from "next/link";

export default function Header() {
  return (
    <header style={headerStyle}>
      <Link href="/" style={logoStyle}>
        <strong>CWRC</strong>
      </Link>

      <nav style={navStyle}>
        <Link href="/home" style={linkStyle}>Main Hall</Link>
        <Link href="/about" style={linkStyle}>About Us</Link>
        <Link href="/rooms" style={linkStyle}>Rooms</Link>
        <Link href="/research" style={linkStyle}>Research</Link>
        <Link href="/ask-cathy" style={linkStyle}>Ask Cathy</Link>
        <Link href="/submit-case" style={linkStyle}>Submit a Case</Link>
        <Link href="/development-log" style={linkStyle}>Development Log</Link>
        <Link href="/contact" style={linkStyle}>Contact</Link>
      </nav>

      <div style={languageStyle}>
        <Link href="/fr" style={languageButton}>🇫🇷 FR</Link>
        <Link href="/home" style={languageButton}>🇬🇧 EN</Link>
        <Link href="/es" style={languageButton}>🇪🇸 ES</Link>
      </div>
    </header>
  );
}

const headerStyle = {
  background: "#102A4C",
  color: "#F7F1E6",
  padding: "18px 30px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap" as const,
  gap: "18px",
  position: "sticky" as const,
  top: 0,
  zIndex: 100,
};

const logoStyle = {
  color: "#F7F1E6",
  textDecoration: "none",
  fontSize: "1.4rem",
};

const navStyle = {
  display: "flex",
  gap: "18px",
  flexWrap: "wrap" as const,
};

const linkStyle = {
  color: "#F7F1E6",
  textDecoration: "none",
  fontWeight: "bold",
};

const languageStyle = {
  display: "flex",
  gap: "8px",
};

const languageButton = {
  background: "#F7F1E6",
  color: "#102A4C",
  textDecoration: "none",
  borderRadius: "999px",
  padding: "8px 14px",
  fontWeight: "bold",
};