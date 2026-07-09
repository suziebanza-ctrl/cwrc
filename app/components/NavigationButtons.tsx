import Link from "next/link";

export default function NavigationButtons() {
  return (
    <div style={containerStyle}>
      <Link href="/home" style={buttonStyle}>
        ← Return to Main Hall
      </Link>

      <Link href="/rooms" style={buttonStyle}>
        🚪 Explore Rooms
      </Link>

      <Link href="/ask-cathy" style={buttonStyle}>
        💬 Ask Cathy
      </Link>

      <Link href="/submit-case" style={buttonStyle}>
        📄 Submit a Case
      </Link>

      <Link href="/development-log" style={buttonStyle}>
        📖 Development Log
      </Link>
    </div>
  );
}

const containerStyle = {
  marginTop: "50px",
  display: "flex",
  justifyContent: "center",
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
  transition: "all 0.25s ease",
  border: "2px solid #102A4C",
};